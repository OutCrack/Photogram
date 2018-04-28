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
        this.getMyEvents();
        this.fetchPublicEvents();
    }
    HomeComponent.prototype.refreshFeed = function (args) {
        this.getPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    HomeComponent.prototype.fetchPublicEvents = function () {
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        console.log("Events " + this.publicEvents.length);
    };
    HomeComponent.prototype.getMyEvents = function () {
        this.participEvents = this.server.getMyEvents(this.data.storage["id"]);
        console.log("Events " + this.participEvents.length);
    };
    HomeComponent.prototype.joinEvent = function (eventId) {
        //console.log("You clicked " + eventId + "your id " + this.data.storage["id"]);
        var ok = this.server.joinEvent(eventId, this.data.storage["id"]);
        this.pEvents = false;
        this.fetchPublicEvents();
    };
    // HER MANGLER DET KODE -------------------------------------------------------------------------
    HomeComponent.prototype.openEvent = function (eventId) {
        console.log("Event id tapped " + eventId + " user id " + this.data.storage["id"]);
        //this.server.openEvent(eventId, this.data.storage["id"]);
        //alert("Event removed");
        //this.mEvents = false;
        //this.getEvents();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBRXZELG1EQUFrRDtBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsMEVBQXdFO0FBRXhFLDZDQUE0QztBQUU1QyxrREFBa0U7QUFFbEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUzVGO0lBeUJJLHVCQUFvQixtQkFBc0MsRUFBVSxJQUFVO1FBQTFELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBdkJ2RSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUzQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFvQmxELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFL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QUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZDQUFxQixHQUE1QixVQUE2QixJQUFJO1FBQzdCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQTVSUSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixzQkFBc0I7WUFDdEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQTJCMkMsd0JBQWlCLEVBQWdCLFdBQUk7T0F6QnJFLGFBQWEsQ0E2UnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdSRCxJQTZSQztBQTdSWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0NvbW1lbnRcIjtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuXHJcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxyXG4gICAgLy9tb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTEgPSB0cnVlO1xyXG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XHJcblxyXG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcclxuICAgIC8vZm9yIHN0b3JpbmcgZmV0Y2hlZCBwaG90b3NcclxuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcclxuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwaG90b0lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBob3RvRGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcclxuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBob3RvOiBQaG90bztcclxuICAgIHB1YmxpYyBjYW5HaXZlTGlrZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwdWJsaWNFdmVudHM6IEFycmF5PEV2ZW50PjsgICAgXHJcbiAgICBwdWJsaWMgcGFydGljaXBFdmVudHM6IEFycmF5PEV2ZW50PjtcclxuICAgIHBFdmVudHM6IGJvb2xlYW47XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gXCJQaG90b3NcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIkV2ZW50c1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW4gaG9tZSBjb25zdHJ1Y3RvclwiKTtcclxuICAgICAgICB0aGlzLmdldFBob3RvcygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBob3RvSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xyXG4gICAgICAgIHRoaXMuZ2V0TXlFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmZldGNoUHVibGljRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEZlZWQoYXJncykge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XHJcbiAgICAgICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFB1YmxpY0V2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnB1YmxpY0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldFB1YmxpY0V2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucHVibGljRXZlbnRzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXlFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNpcEV2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wYXJ0aWNpcEV2ZW50cy5sZW5ndGgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBqb2luRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIFwiICsgZXZlbnRJZCArIFwieW91ciBpZCBcIiArIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIHZhciBvayA9IHRoaXMuc2VydmVyLmpvaW5FdmVudChldmVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICB0aGlzLnBFdmVudHMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZldGNoUHVibGljRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSEVSIE1BTkdMRVIgREVUIEtPREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb3BlbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgaWQgdGFwcGVkIFwiICsgZXZlbnRJZCArIFwiIHVzZXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICAvL3RoaXMuc2VydmVyLm9wZW5FdmVudChldmVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICAvL2FsZXJ0KFwiRXZlbnQgcmVtb3ZlZFwiKTtcclxuICAgICAgICAvL3RoaXMubUV2ZW50cyA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5nZXRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2dldCBwaG90b3MgZnJvbSBkYiwgcHV0IHRoZW0gaW4gcGhvdG9zIGFycmF5XHJcbiAgICBnZXRQaG90b3MoKSB7XHJcbiAgICAgICAgLy92YXIgX3NlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcclxuICAgICAgICAvL3RoaXMucGhvdG9zID0gX3NlcnZlci5nZXRQdWJsaWNQaG90b3MoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiSGF2ZSBcIiArIHRoaXMucGhvdG9zLmxlbmd0aCArIFwiIHBob3Rvc1wiKTtcclxuXHJcbiAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkluIGdldFBob3Rvc1wiKTtcclxuICAgICAgICB0aGlzLnBob3RvcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8vZ2V0IHB1YmxpYyBwaG90b3MgdGhhdCBhcmUgbm90IGNvbm5lY3RlZCB0byBhIGV2ZW50LCBhcmUgbm90IGluIGFuIGFsYnVtIGFuZCBhcmUgbWF4IDIgZGF5cyBvbGRcclxuICAgICAgICB2YXIgbGltaXREYXRlOiBzdHJpbmcgPSBnZXRMaW1pdERhdGUoKTtcclxuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwiZmlsZXM/dHJhbnNmb3JtPTEmZmlsdGVyW109ZmlsZV9QZXJtaXNzaW9uLGVxLHB1YmxpYyZmaWx0ZXJbXT1ldmVudF9JZCxpcyxudWxsJmZpbHRlcltdPWFsYnVtX0lkLG5vdCxudWxsJmZpbHRlcltdPWNyZWF0ZWRfYXQsZ3QsXCIgKyBsaW1pdERhdGUgKyBcIiZvcmRlcj1jcmVhdGVkX2F0LGRlc2NcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxJTUlUIERBVEUgSU4gUVVFUlkgXCIgKyBxdWVyeSk7XHJcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxyXG4gICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRmlsZXMubGVuZ3RoIGlzXCIgKyByLmZpbGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsYnVtIGlkIFwiICsgci5maWxlc1tpXS5hbGJ1bV9JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waG90b3MucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBob3RvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2Vycy9cIiArIHIuZmlsZXNbaV0udXNlcl9JZCArIHIuZmlsZXNbaV0uZmlsZV9VUkwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLnVzZXJfSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoci5maWxlc1tpXS5jcmVhdGVkX2F0KS5zbGljZSgwLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmFsYnVtX0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHIuZmlsZXNbaV0uZmlsZV9VUkwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKmZ1bmN0aW9uIGdldEFsYnVtTmFtZShhbGJ1bUlkOiBudW1iZXIsIHNpdGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgYWxidW1OYW1lID0gXCJcIjtcclxuICAgICAgICBpZiAoYWxidW1JZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGJ1bVF1ZXJ5ID0gc2l0ZSArIFwiYWxidW1zP3RyYW5zZm9ybT0xJmZpbHRlcj1hbGJ1bV9JZCxlcSxcIiArIGFsYnVtSWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUVFRUVFRUVFRXCIgKyBhbGJ1bVF1ZXJ5KTtcclxuICAgICAgICAgICAgaHR0cC5nZXRKU09OKGFsYnVtUXVlcnkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsYnVtTmFtZSArPSByZXMuYWxidW1zWzBdLmFsYnVtX05hbWU7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGUpIHsgY29uc29sZS5sb2coZSk7fSk7XHJcbiAgICAgICAgICAgIHZhciByZXBsYWNlID0gLyAvZ2k7XHJcbiAgICAgICAgICAgIGFsYnVtTmFtZSA9IFwiL1wiICsgYWxidW1OYW1lLnJlcGxhY2UocmVwbGFjZSwgXCIlMjBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWxidW1OYW1lO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICAvL2dldCBzdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBkYXkgYmVmb3JlIHllc3RlcmRheVxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExpbWl0RGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGUgaXMgXCIgKyBkYXRlLnRvRGF0ZVN0cmluZygpKTtcclxuICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gMik7IC8vQW50YWxsIGRhZ2VyIGdhbWxlIGJpbGRlciBzb20gc2thbCB2aXNlc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGUgbmV3IGRhdGUgaXMgXCIgKyBkYXRlLnRvRGF0ZVN0cmluZygpKTtcclxuICAgICAgICAgICAgdmFyIGRhdGVTdHJpbmcgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIjtcclxuICAgICAgICAgICAgdmFyIG1vbnRoOiBudW1iZXIgPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICBpZiAobW9udGggPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIjBcIiArIG1vbnRoO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBkYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIi1cIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXkgXCIgKyBkYXRlLmdldERhdGUoKSlcclxuICAgICAgICAgICAgaWYgKGRhdGUuZ2V0RGF5KCkgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkYXRlIFwiICsgZGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UGhvdG8oYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG8ocGFyc2VJbnQoYXJncy52aWV3LmlkKSlcclxuICAgICAgICAvKnRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcclxuICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGlkIGlzIFwiICsgYXJncy52aWV3LmlkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IHBhcnNlSW50KGFyZ3Mudmlldy5pZCkpO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5maXJzdE4gKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmxhc3ROO1xyXG4gICAgICAgIHRoaXMucGhvdG9JZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5pZDtcclxuICAgICAgICB0aGlzLnBob3RvVXJsID0gdGhpcy5zZWxlY3RlZFBob3RvLnVybDtcclxuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5jcmVhdGVkO1xyXG4gICAgICAgIHRoaXMucGhvdG9EZXNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWRQaG90by5kZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHM7XHJcbiAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVSTCBcIiArIHRoaXMucGhvdG9VcmwpOyovXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhvdG8oaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcclxuICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGlkIGlzIFwiICsgYXJncy52aWV3LmlkKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IGlkKTtcclxuICAgICAgICB0aGlzLnNlcnZlci5nZXRMaWtlcyh0aGlzLnNlbGVjdGVkUGhvdG8uaWQsIHRoaXMudXNlcklkKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmxpa2VzID0gcGFyc2VJbnQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSBmYWxzZTtcclxuICAgICAgICB9KS5jYXRjaCgocmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcyA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHJlamVjdCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkdpdmVMaWtlID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIuZmlyc3ROICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5sYXN0TjtcclxuICAgICAgICB0aGlzLnBob3RvSWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uaWQ7XHJcbiAgICAgICAgdGhpcy5waG90b1VybCA9IHRoaXMuc2VsZWN0ZWRQaG90by51cmw7XHJcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY3JlYXRlZDtcclxuICAgICAgICB0aGlzLnBob3RvRGVzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkUGhvdG8uZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzID0gdGhpcy5zZWxlY3RlZFBob3RvLmNvbW1lbnRzO1xyXG4gICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVUkwgXCIgKyB0aGlzLnBob3RvVXJsKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tDb21tZW50UmlnaHRzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgcmlnaHRzIGZvciBjb21tZW50c1wiKTtcclxuICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cykge1xyXG4gICAgICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvbW1lbnQgdXNlciBpZCBcIiArIGMudXNlcklkICsgXCIgbG9nZ2VuIGluIGFzIFwiICsgdGhpcy51c2VySWQpO1xyXG4gICAgICAgICAgICBpZiAoYy51c2VySWQgPT0gdGhpcy51c2VySWQpIHtcclxuICAgICAgICAgICAgICAgIGMucmlnaHRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmlnaHRzIGNoYW5nZWQgdG8gdHJ1ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsb3NlUGhvdG8oKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbW1lbnQocmVzdWx0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb21tZW50IFwiICsgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IGluc2VydCBlbXB0eSBjb21tZW50XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50SWQgPSB0aGlzLnNlcnZlci51cGRhdGVDb21tZW50KHRoaXMucGhvdG9JZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IG5ldyBDb21tZW50KGNvbW1lbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgICAgICBjb21tZW50LnJpZ2h0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy5waG90b0NvbW1lbnRzLnB1c2goY29tbWVudCk7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmdldENvbW1lbnRzKCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQ29tbWVudChjb21tZW50SWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGljayBjb21tZW50IGlkIFwiICsgY29tbWVudElkKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIucmVtb3ZlQ29tbWVudChjb21tZW50SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8uZ2V0Q29tbWVudHMoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTGlrZXMoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYWRkaW5nID0gdGhpcy5jYW5HaXZlTGlrZTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIudXBkYXRlTGlrZXMoaWQsIHRoaXMudXNlcklkLCBhZGRpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkdpdmVMaWtlID0gIXRoaXMuY2FuR2l2ZUxpa2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUoYWRkaW5nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcm9taXNlLnRoZW4oKGZyb21SZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tUmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmxpa2VzKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSB0YXBwZWQgXCIgKyBpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=