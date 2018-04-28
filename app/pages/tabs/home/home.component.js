"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../../../shared/Photo");
var Server_1 = require("../../../shared/Server/Server");
var Comment_1 = require("../../../shared/Comment");
var http = require("http");
var element_registry_1 = require("nativescript-angular/element-registry");
var Data_1 = require("../../../shared/Data");
var segmented_bar_1 = require("ui/segmented-bar");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_changeDetectionRef, data) {
        this._changeDetectionRef = _changeDetectionRef;
        this.data = data;
        this.selectedIndex = 0;
        this.visibility1 = true;
        this.visibility2 = false;
        this.site = "http://188.166.127.207:5555/api.php/";
        this.items = [];
        for (var i = 1; i < 3; i++) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            if (i == 1) {
                segmentedBarItem.title = "Photos";
            }
            else {
                segmentedBarItem.title = "Events";
            }
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
        console.log("In home constructor");
        this.getPhotos();
        this.selected = false;
        this.photoId = 0;
        this.server = new Server_1.Server();
    }
    HomeComponent.prototype.refreshFeed = function (args) {
        this.getPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    //get photos from db, put them in photos array
    HomeComponent.prototype.getPhotos = function () {
        //var _server = new Server();
        //this.photos = _server.getPublicPhotos();
        //console.log("Have " + this.photos.length + " photos");
        var _this = this;
        //testing
        //console.log("In getPhotos");
        this.photos = new Array();
        //get public photos that are not connected to a event, are not in an album and are max 2 days old
        var limitDate = getLimitDate();
        var query = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&filter[]=album_Id,not,null&filter[]=created_at,gt," + limitDate + "&order=created_at,desc";
        console.log("LIMIT DATE IN QUERY " + query);
        http.getJSON(query)
            .then(function (r) {
            //testing
            //console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("album id " + r.files[i].album_Id);
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].user_Id + r.files[i].file_URL, r.files[i].user_Id, (r.files[i].created_at).slice(0, 10), r.files[i].file_Description, r.files[i].album_Id, r.files[i].file_Name));
                //testing
                //console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        });
        /*function getAlbumName(albumId: number, site: string) {
            var albumName = "";
        if (albumId != null) {
            var albumQuery = site + "albums?transform=1&filter=album_Id,eq," + albumId;
            console.log("QQQQQQQQQ" + albumQuery);
            http.getJSON(albumQuery)
            .then((res) => {
                albumName += res.albums[0].album_Name;
            }, function(e) { console.log(e);});
            var replace = / /gi;
            albumName = "/" + albumName.replace(replace, "%20");
        }
            return albumName;
        }*/
        //get string that represents the day before yesterday
        function getLimitDate() {
            var date = new Date();
            console.log("Date is " + date.toDateString());
            date.setDate(date.getDate() - 2); //Antall dager gamle bilder som skal vises
            console.log("Date new date is " + date.toDateString());
            var dateString = date.getFullYear() + "-";
            var month = date.getMonth() + 1;
            if (month < 10) {
                dateString += "0" + month;
            }
            else {
                dateString += date.getMonth();
            }
            dateString += "-";
            console.log("Day " + date.getDate());
            if (date.getDay() < 10) {
                dateString += "0" + date.getDate();
            }
            else {
                dateString += date.getDate();
            }
            console.log("The date " + dateString);
            return dateString;
        }
    };
    HomeComponent.prototype.selectPhoto = function (args) {
        this.getPhoto(parseInt(args.view.id));
        /*this.selected = true;
        this.userId = this.data.storage["id"];
        //testing
        //console.log("The id is " + args.view.id);
        //console.log("The event name is " + args.eventName);
        this.selectedPhoto = this.photos.find(i => i.id === parseInt(args.view.id));
        this.username = this.selectedPhoto.user.firstN + " " + this.selectedPhoto.user.lastN;
        this.photoId = this.selectedPhoto.id;
        this.photoUrl = this.selectedPhoto.url;
        this.photoCreated = this.selectedPhoto.created;
        this.photoDescription = this.selectedPhoto.description;
        this.photoComments = this.selectedPhoto.comments;
        this.checkCommentRights();
        console.log("URL " + this.photoUrl);*/
    };
    HomeComponent.prototype.getPhoto = function (id) {
        var _this = this;
        this.selected = true;
        this.userId = this.data.storage["id"];
        //testing
        //console.log("The id is " + args.view.id);
        //console.log("The event name is " + args.eventName);
        this.selectedPhoto = this.photos.find(function (i) { return i.id === id; });
        this.server.getLikes(this.selectedPhoto.id, this.userId).then(function (result) {
            _this.selectedPhoto.likes = parseInt(JSON.stringify(result));
            _this.canGiveLike = false;
        }).catch(function (reject) {
            _this.selectedPhoto.likes = parseInt(JSON.stringify(reject));
            _this.canGiveLike = true;
        });
        this.username = this.selectedPhoto.user.firstN + " " + this.selectedPhoto.user.lastN;
        this.photoId = this.selectedPhoto.id;
        this.photoUrl = this.selectedPhoto.url;
        this.photoCreated = this.selectedPhoto.created;
        this.photoDescription = this.selectedPhoto.description;
        this.photoComments = this.selectedPhoto.comments;
        this.checkCommentRights();
        console.log("URL " + this.photoUrl);
    };
    HomeComponent.prototype.checkCommentRights = function () {
        console.log("Checking rights for comments");
        for (var _i = 0, _a = this.selectedPhoto.comments; _i < _a.length; _i++) {
            var c = _a[_i];
            //testing
            //console.log("comment user id " + c.userId + " loggen in as " + this.userId);
            if (c.userId == this.userId) {
                c.rights = true;
                console.log("Rights changed to true");
            }
        }
    };
    HomeComponent.prototype.closePhoto = function () {
        this.selected = false;
        this.photoUrl = "";
        this.photoCreated = "";
        this.selectedPhoto = null;
    };
    HomeComponent.prototype.addComment = function (result) {
        var _this = this;
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        }
        else {
            var commentId = this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            var comment = new Comment_1.Comment(commentId, this.data.storage["id"], result.text);
            comment.rights = true;
            //this.photoComments.push(comment);
            var promise = new Promise(function (resolve, reject) {
                _this.selectedPhoto.getComments();
                resolve();
            });
            promise.then(function () {
                _this.checkCommentRights();
            });
            result.text = "";
        }
    };
    HomeComponent.prototype.removeComment = function (commentId) {
        var _this = this;
        console.log("You click comment id " + commentId);
        var promise = new Promise(function (resolve, reject) {
            _this.server.removeComment(commentId);
            _this.selectedPhoto.getComments();
            resolve();
        });
        promise.then(function () {
            _this.checkCommentRights();
        });
    };
    HomeComponent.prototype.updateLikes = function (id) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var adding = _this.canGiveLike;
            _this.server.updateLikes(id, _this.userId, adding);
            _this.canGiveLike = !_this.canGiveLike;
            resolve(adding);
        });
        promise.then(function (fromResolve) {
            if (fromResolve) {
                _this.selectedPhoto.likes++;
            }
            else {
                _this.selectedPhoto.likes--;
            }
            console.log("You tapped " + id);
        });
    };
    HomeComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        switch (this.selectedIndex) {
            case 0:
                this.visibility1 = true;
                this.visibility2 = false;
                break;
            case 1:
                this.visibility1 = false;
                this.visibility2 = true;
                break;
            default:
                break;
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home-tab",
            //moduleId: module.id,
            templateUrl: "./pages/tabs/home/home.tab.html",
            styleUrls: ["./pages/tabs/home/home.tab.css"]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, Data_1.Data])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBQ3ZELG1EQUFrRDtBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsMEVBQXdFO0FBRXhFLDZDQUE0QztBQUU1QyxrREFBa0U7QUFFbEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUcsY0FBSyxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUzVGO0lBcUJJLHVCQUFvQixtQkFBc0MsRUFBVSxJQUFVO1FBQTFELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBbkJ2RSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUzQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFnQmxELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hFLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNMLGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFL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QUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSw2Q0FBcUIsR0FBNUIsVUFBNkIsSUFBSTtRQUM3QixJQUFJLFdBQVcsR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUEzUFEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsc0JBQXNCO1lBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUUsZ0NBQWdDLENBQUU7U0FDbEQsQ0FBQzt5Q0F1QjJDLHdCQUFpQixFQUFnQixXQUFJO09BckJyRSxhQUFhLENBNFB6QjtJQUFELG9CQUFDO0NBQUEsQUE1UEQsSUE0UEM7QUE1UFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1Bob3RvXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1VzZXJcIjtcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0NvbW1lbnRcIjtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuXHJcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiAsICgpPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG4gXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiaG9tZS10YWJcIixcclxuICAgIC8vbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWyBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmNzc1wiIF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTEgPSB0cnVlO1xyXG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XHJcblxyXG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcclxuICAgIC8vZm9yIHN0b3JpbmcgZmV0Y2hlZCBwaG90b3NcclxuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcclxuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwaG90b0lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBob3RvRGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcclxuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBob3RvOiBQaG90bztcclxuICAgIHB1YmxpYyBjYW5HaXZlTGlrZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBpZihpPT0xKXtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIlBob3Rvc1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IFwiRXZlbnRzXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBob21lIGNvbnN0cnVjdG9yXCIpO1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGhvdG9JZCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEZlZWQoYXJncykge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XHJcbiAgICAgICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZ2V0IHBob3RvcyBmcm9tIGRiLCBwdXQgdGhlbSBpbiBwaG90b3MgYXJyYXlcclxuICAgIGdldFBob3RvcygpIHtcclxuICAgICAgICAvL3ZhciBfc2VydmVyID0gbmV3IFNlcnZlcigpO1xyXG4gICAgICAgIC8vdGhpcy5waG90b3MgPSBfc2VydmVyLmdldFB1YmxpY1Bob3RvcygpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJIYXZlIFwiICsgdGhpcy5waG90b3MubGVuZ3RoICsgXCIgcGhvdG9zXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJJbiBnZXRQaG90b3NcIik7XHJcbiAgICAgICAgdGhpcy5waG90b3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvL2dldCBwdWJsaWMgcGhvdG9zIHRoYXQgYXJlIG5vdCBjb25uZWN0ZWQgdG8gYSBldmVudCwgYXJlIG5vdCBpbiBhbiBhbGJ1bSBhbmQgYXJlIG1heCAyIGRheXMgb2xkXHJcbiAgICAgICAgdmFyIGxpbWl0RGF0ZTogc3RyaW5nID0gZ2V0TGltaXREYXRlKCk7XHJcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcltdPWZpbGVfUGVybWlzc2lvbixlcSxwdWJsaWMmZmlsdGVyW109ZXZlbnRfSWQsaXMsbnVsbCZmaWx0ZXJbXT1hbGJ1bV9JZCxub3QsbnVsbCZmaWx0ZXJbXT1jcmVhdGVkX2F0LGd0LFwiICsgbGltaXREYXRlICsgXCImb3JkZXI9Y3JlYXRlZF9hdCxkZXNjXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMSU1JVCBEQVRFIElOIFFVRVJZIFwiICsgcXVlcnkpO1xyXG4gICAgICAgIGh0dHAuZ2V0SlNPTihxdWVyeSlcclxuICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkZpbGVzLmxlbmd0aCBpc1wiICsgci5maWxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxidW0gaWQgXCIgKyByLmZpbGVzW2ldLmFsYnVtX0lkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9zLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFBob3RvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcnMvXCIgKyByLmZpbGVzW2ldLnVzZXJfSWQgKyByLmZpbGVzW2ldLmZpbGVfVVJMLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLnVzZXJfSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChyLmZpbGVzW2ldLmNyZWF0ZWRfYXQpLnNsaWNlKDAsMTApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uYWxidW1fSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHIuZmlsZXNbaV0uZmlsZV9VUkwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qZnVuY3Rpb24gZ2V0QWxidW1OYW1lKGFsYnVtSWQ6IG51bWJlciwgc2l0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGJ1bU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChhbGJ1bUlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGFsYnVtUXVlcnkgPSBzaXRlICsgXCJhbGJ1bXM/dHJhbnNmb3JtPTEmZmlsdGVyPWFsYnVtX0lkLGVxLFwiICsgYWxidW1JZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRUVFRUVFRUVFcIiArIGFsYnVtUXVlcnkpO1xyXG4gICAgICAgICAgICBodHRwLmdldEpTT04oYWxidW1RdWVyeSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxidW1OYW1lICs9IHJlcy5hbGJ1bXNbMF0uYWxidW1fTmFtZTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSkgeyBjb25zb2xlLmxvZyhlKTt9KTtcclxuICAgICAgICAgICAgdmFyIHJlcGxhY2UgPSAvIC9naTtcclxuICAgICAgICAgICAgYWxidW1OYW1lID0gXCIvXCIgKyBhbGJ1bU5hbWUucmVwbGFjZShyZXBsYWNlLCBcIiUyMFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhbGJ1bU5hbWU7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIC8vZ2V0IHN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGRheSBiZWZvcmUgeWVzdGVyZGF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGltaXREYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAyKTsgLy9BbnRhbGwgZGFnZXIgZ2FtbGUgYmlsZGVyIHNvbSBza2FsIHZpc2VzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBuZXcgZGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZVN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiO1xyXG4gICAgICAgICAgICB2YXIgbW9udGg6IG51bWJlciA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRheSBcIiArIGRhdGUuZ2V0RGF0ZSgpKVxyXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXREYXkoKSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiMFwiICsgZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRhdGUgXCIgKyBkYXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UGhvdG8oYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG8ocGFyc2VJbnQoYXJncy52aWV3LmlkKSlcclxuICAgICAgICAvKnRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcclxuICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGlkIGlzIFwiICsgYXJncy52aWV3LmlkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IHBhcnNlSW50KGFyZ3Mudmlldy5pZCkpO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5maXJzdE4gKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmxhc3ROO1xyXG4gICAgICAgIHRoaXMucGhvdG9JZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5pZDtcclxuICAgICAgICB0aGlzLnBob3RvVXJsID0gdGhpcy5zZWxlY3RlZFBob3RvLnVybDtcclxuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5jcmVhdGVkO1xyXG4gICAgICAgIHRoaXMucGhvdG9EZXNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWRQaG90by5kZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHM7XHJcbiAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVSTCBcIiArIHRoaXMucGhvdG9VcmwpOyovXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhvdG8oaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcclxuICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGlkIGlzIFwiICsgYXJncy52aWV3LmlkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IGlkKTtcclxuICAgICAgICB0aGlzLnNlcnZlci5nZXRMaWtlcyh0aGlzLnNlbGVjdGVkUGhvdG8uaWQsIHRoaXMudXNlcklkKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmxpa2VzID0gcGFyc2VJbnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSBmYWxzZTtcclxuICAgICAgICB9KS5jYXRjaCgocmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcyA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHJlamVjdCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkdpdmVMaWtlID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIuZmlyc3ROICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5sYXN0TjtcclxuICAgICAgICB0aGlzLnBob3RvSWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uaWQ7XHJcbiAgICAgICAgdGhpcy5waG90b1VybCA9IHRoaXMuc2VsZWN0ZWRQaG90by51cmw7XHJcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY3JlYXRlZDtcclxuICAgICAgICB0aGlzLnBob3RvRGVzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkUGhvdG8uZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzID0gdGhpcy5zZWxlY3RlZFBob3RvLmNvbW1lbnRzO1xyXG4gICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVUkwgXCIgKyB0aGlzLnBob3RvVXJsKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tDb21tZW50UmlnaHRzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgcmlnaHRzIGZvciBjb21tZW50c1wiKTtcclxuICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cykge1xyXG4gICAgICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvbW1lbnQgdXNlciBpZCBcIiArIGMudXNlcklkICsgXCIgbG9nZ2VuIGluIGFzIFwiICsgdGhpcy51c2VySWQpO1xyXG4gICAgICAgICAgICBpZiAoYy51c2VySWQgPT0gdGhpcy51c2VySWQpIHtcclxuICAgICAgICAgICAgICAgIGMucmlnaHRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmlnaHRzIGNoYW5nZWQgdG8gdHJ1ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsb3NlUGhvdG8oKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbW1lbnQocmVzdWx0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb21tZW50IFwiICsgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IGluc2VydCBlbXB0eSBjb21tZW50XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50SWQgPSB0aGlzLnNlcnZlci51cGRhdGVDb21tZW50KHRoaXMucGhvdG9JZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IG5ldyBDb21tZW50KGNvbW1lbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgICAgICBjb21tZW50LnJpZ2h0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy5waG90b0NvbW1lbnRzLnB1c2goY29tbWVudCk7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmdldENvbW1lbnRzKCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQ29tbWVudChjb21tZW50SWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGljayBjb21tZW50IGlkIFwiICsgY29tbWVudElkKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIucmVtb3ZlQ29tbWVudChjb21tZW50SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8uZ2V0Q29tbWVudHMoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTGlrZXMoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4geyAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhZGRpbmcgPSB0aGlzLmNhbkdpdmVMaWtlO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci51cGRhdGVMaWtlcyhpZCwgdGhpcy51c2VySWQsIGFkZGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSAhdGhpcy5jYW5HaXZlTGlrZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShhZGRpbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21pc2UudGhlbigoZnJvbVJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGZyb21SZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcy0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHRhcHBlZCBcIiArIGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==