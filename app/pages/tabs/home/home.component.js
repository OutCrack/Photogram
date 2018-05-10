"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../../../shared/Photo");
var Server_1 = require("../../../shared/Server/Server");
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
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].user_Id + r.files[i].file_URL, r.files[i].user_Id, (r.files[i].created_at).slice(0, 16), r.files[i].file_Description, r.files[i].album_Id, r.files[i].file_Name));
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
        for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
            var p = _a[_i];
            console.log("______________" + p.url);
        }
        this.selectedId = parseInt(args.view.id);
        this.getPhoto(this.selectedId);
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
        this.selectedId = 0;
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
            this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            //var comment = new Comment(commentId, this.data.storage["id"], result.text, true);
            //comment.rights = true;
            this.getPhoto(this.selectedId);
            //this.photoComments.push(comment);
            this.selectedPhoto.getComments().then(function () {
                _this.checkCommentRights();
            });
        }
        result.text = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBR3ZELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQiwwRUFBd0U7QUFFeEUsNkNBQTRDO0FBRTVDLGtEQUFrRTtBQUVsRSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFTNUY7SUEwQkksdUJBQW9CLG1CQUFzQyxFQUFVLElBQVU7UUFBMUQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUF4QnZFLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTNCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQXFCbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QixJQUFJLGdCQUFnQixHQUFxQixJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDaEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osZ0JBQWdCLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUN0QyxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENB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LGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSw2Q0FBcUIsR0FBNUIsVUFBNkIsSUFBSTtRQUM3QixJQUFJLFdBQVcsR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUE3UlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsc0JBQXNCO1lBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0E0QjJDLHdCQUFpQixFQUFnQixXQUFJO09BMUJyRSxhQUFhLENBOFJ6QjtJQUFELG9CQUFDO0NBQUEsQUE5UkQsSUE4UkM7QUE5Ulksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRXZlbnRcIjtcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0NvbW1lbnRcIjtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcblxucmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImhvbWUtdGFiXCIsXG4gICAgLy9tb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgIHB1YmxpYyB2aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XG5cbiAgICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICAgIC8vZm9yIHN0b3JpbmcgZmV0Y2hlZCBwaG90b3NcbiAgICBwdWJsaWMgcGhvdG9zOiBBcnJheTxQaG90bz47XG4gICAgcHVibGljIHNlcnZlcjogU2VydmVyO1xuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBwdWJsaWMgcGhvdG9JZDogbnVtYmVyO1xuICAgIHB1YmxpYyBwaG90b1VybDogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9EZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcbiAgICBwdWJsaWMgdXNlcklkOiBudW1iZXI7XG4gICAgcHVibGljIHNlbGVjdGVkUGhvdG86IFBob3RvO1xuICAgIHB1YmxpYyBjYW5HaXZlTGlrZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgcHVibGljRXZlbnRzOiBBcnJheTxFdmVudD47ICAgIFxuICAgIHB1YmxpYyBwYXJ0aWNpcEV2ZW50czogQXJyYXk8RXZlbnQ+O1xuICAgIHBFdmVudHM6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIHNlbGVjdGVkSWQ6IG51bWJlcjsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIlBob3Rvc1wiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gXCJFdmVudHNcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBob21lIGNvbnN0cnVjdG9yXCIpO1xuICAgICAgICB0aGlzLmdldFBob3RvcygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGhvdG9JZCA9IDA7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICB0aGlzLmdldE15RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuZmV0Y2hQdWJsaWNFdmVudHMoKTtcbiAgICB9XG5cbiAgICByZWZyZXNoRmVlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XG4gICAgICAgIHZhciBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgZmV0Y2hQdWJsaWNFdmVudHMoKSB7XG4gICAgICAgIHRoaXMucHVibGljRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0UHVibGljRXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucHVibGljRXZlbnRzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgZ2V0TXlFdmVudHMoKSB7XG4gICAgICAgIHRoaXMucGFydGljaXBFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRNeUV2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudHMgXCIgKyB0aGlzLnBhcnRpY2lwRXZlbnRzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgam9pbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgXCIgKyBldmVudElkICsgXCJ5b3VyIGlkIFwiICsgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIHZhciBvayA9IHRoaXMuc2VydmVyLmpvaW5FdmVudChldmVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgdGhpcy5wRXZlbnRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmV0Y2hQdWJsaWNFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvLyBIRVIgTUFOR0xFUiBERVQgS09ERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgb3BlbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IGlkIHRhcHBlZCBcIiArIGV2ZW50SWQgKyBcIiB1c2VyIGlkIFwiICsgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIC8vdGhpcy5zZXJ2ZXIub3BlbkV2ZW50KGV2ZW50SWQsIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuICAgICAgICAvL2FsZXJ0KFwiRXZlbnQgcmVtb3ZlZFwiKTtcbiAgICAgICAgLy90aGlzLm1FdmVudHMgPSBmYWxzZTtcbiAgICAgICAgLy90aGlzLmdldEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vZ2V0IHBob3RvcyBmcm9tIGRiLCBwdXQgdGhlbSBpbiBwaG90b3MgYXJyYXlcbiAgICBnZXRQaG90b3MoKSB7XG4gICAgICAgIC8vdmFyIF9zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgICAgIC8vdGhpcy5waG90b3MgPSBfc2VydmVyLmdldFB1YmxpY1Bob3RvcygpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiSGF2ZSBcIiArIHRoaXMucGhvdG9zLmxlbmd0aCArIFwiIHBob3Rvc1wiKTtcblxuICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkluIGdldFBob3Rvc1wiKTtcbiAgICAgICAgdGhpcy5waG90b3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgLy9nZXQgcHVibGljIHBob3RvcyB0aGF0IGFyZSBub3QgY29ubmVjdGVkIHRvIGEgZXZlbnQsIGFyZSBub3QgaW4gYW4gYWxidW0gYW5kIGFyZSBtYXggMiBkYXlzIG9sZFxuICAgICAgICB2YXIgbGltaXREYXRlOiBzdHJpbmcgPSBnZXRMaW1pdERhdGUoKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcltdPWZpbGVfUGVybWlzc2lvbixlcSxwdWJsaWMmZmlsdGVyW109ZXZlbnRfSWQsaXMsbnVsbCZmaWx0ZXJbXT1hbGJ1bV9JZCxub3QsbnVsbCZmaWx0ZXJbXT1jcmVhdGVkX2F0LGd0LFwiICsgbGltaXREYXRlICsgXCImb3JkZXI9Y3JlYXRlZF9hdCxkZXNjXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTElNSVQgREFURSBJTiBRVUVSWSBcIiArIHF1ZXJ5KTtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRmlsZXMubGVuZ3RoIGlzXCIgKyByLmZpbGVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxidW0gaWQgXCIgKyByLmZpbGVzW2ldLmFsYnVtX0lkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waG90b3MucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQaG90byhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2Vycy9cIiArIHIuZmlsZXNbaV0udXNlcl9JZCArIHIuZmlsZXNbaV0uZmlsZV9VUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS51c2VyX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyLmZpbGVzW2ldLmNyZWF0ZWRfYXQpLnNsaWNlKDAsIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5hbGJ1bV9JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHIuZmlsZXNbaV0uZmlsZV9VUkwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvKmZ1bmN0aW9uIGdldEFsYnVtTmFtZShhbGJ1bUlkOiBudW1iZXIsIHNpdGU6IHN0cmluZykge1xuICAgICAgICAgICAgdmFyIGFsYnVtTmFtZSA9IFwiXCI7XG4gICAgICAgIGlmIChhbGJ1bUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBhbGJ1bVF1ZXJ5ID0gc2l0ZSArIFwiYWxidW1zP3RyYW5zZm9ybT0xJmZpbHRlcj1hbGJ1bV9JZCxlcSxcIiArIGFsYnVtSWQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlFRUVFRUVFRUVwiICsgYWxidW1RdWVyeSk7XG4gICAgICAgICAgICBodHRwLmdldEpTT04oYWxidW1RdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBhbGJ1bU5hbWUgKz0gcmVzLmFsYnVtc1swXS5hbGJ1bV9OYW1lO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSkgeyBjb25zb2xlLmxvZyhlKTt9KTtcbiAgICAgICAgICAgIHZhciByZXBsYWNlID0gLyAvZ2k7XG4gICAgICAgICAgICBhbGJ1bU5hbWUgPSBcIi9cIiArIGFsYnVtTmFtZS5yZXBsYWNlKHJlcGxhY2UsIFwiJTIwXCIpO1xuICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWxidW1OYW1lO1xuICAgICAgICB9Ki9cblxuICAgICAgICAvL2dldCBzdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBkYXkgYmVmb3JlIHllc3RlcmRheVxuICAgICAgICBmdW5jdGlvbiBnZXRMaW1pdERhdGUoKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGUgaXMgXCIgKyBkYXRlLnRvRGF0ZVN0cmluZygpKTtcbiAgICAgICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIDIpOyAvL0FudGFsbCBkYWdlciBnYW1sZSBiaWxkZXIgc29tIHNrYWwgdmlzZXNcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBuZXcgZGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xuICAgICAgICAgICAgdmFyIGRhdGVTdHJpbmcgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIjtcbiAgICAgICAgICAgIHZhciBtb250aDogbnVtYmVyID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIjBcIiArIG1vbnRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCItXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRheSBcIiArIGRhdGUuZ2V0RGF0ZSgpKVxuICAgICAgICAgICAgaWYgKGRhdGUuZ2V0RGF5KCkgPCAxMCkge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCIwXCIgKyBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRhdGUgXCIgKyBkYXRlU3RyaW5nKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZWxlY3RQaG90byhhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgICAgIGZvciAobGV0IHAgb2YgdGhpcy5waG90b3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19fX19fX19fX19fX19cIiArIHAudXJsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkSWQgPSBwYXJzZUludChhcmdzLnZpZXcuaWQpO1xuICAgICAgICB0aGlzLmdldFBob3RvKHRoaXMuc2VsZWN0ZWRJZCk7XG4gICAgICAgIC8qdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcbiAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgaWQgaXMgXCIgKyBhcmdzLnZpZXcuaWQpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90byA9IHRoaXMucGhvdG9zLmZpbmQoaSA9PiBpLmlkID09PSBwYXJzZUludChhcmdzLnZpZXcuaWQpKTtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmZpcnN0TiArIFwiIFwiICsgdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIubGFzdE47XG4gICAgICAgIHRoaXMucGhvdG9JZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5pZDtcbiAgICAgICAgdGhpcy5waG90b1VybCA9IHRoaXMuc2VsZWN0ZWRQaG90by51cmw7XG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gdGhpcy5zZWxlY3RlZFBob3RvLmNyZWF0ZWQ7XG4gICAgICAgIHRoaXMucGhvdG9EZXNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWRQaG90by5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzID0gdGhpcy5zZWxlY3RlZFBob3RvLmNvbW1lbnRzO1xuICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVSTCBcIiArIHRoaXMucGhvdG9VcmwpOyovXG4gICAgfVxuXG4gICAgZ2V0UGhvdG8oaWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBpZCBpcyBcIiArIGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgZXZlbnQgbmFtZSBpcyBcIiArIGFyZ3MuZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IGlkKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZ2V0TGlrZXModGhpcy5zZWxlY3RlZFBob3RvLmlkLCB0aGlzLnVzZXJJZCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSBmYWxzZTtcbiAgICAgICAgfSkuY2F0Y2goKHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmxpa2VzID0gcGFyc2VJbnQoSlNPTi5zdHJpbmdpZnkocmVqZWN0KSk7XG4gICAgICAgICAgICB0aGlzLmNhbkdpdmVMaWtlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5maXJzdE4gKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmxhc3ROO1xuICAgICAgICB0aGlzLnBob3RvSWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uaWQ7XG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXJsO1xuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5jcmVhdGVkO1xuICAgICAgICB0aGlzLnBob3RvRGVzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkUGhvdG8uZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucGhvdG9Db21tZW50cyA9IHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cztcbiAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJVUkwgXCIgKyB0aGlzLnBob3RvVXJsKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjaGVja0NvbW1lbnRSaWdodHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgcmlnaHRzIGZvciBjb21tZW50c1wiKTtcbiAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHMpIHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvbW1lbnQgdXNlciBpZCBcIiArIGMudXNlcklkICsgXCIgbG9nZ2VuIGluIGFzIFwiICsgdGhpcy51c2VySWQpO1xuICAgICAgICAgICAgaWYgKGMudXNlcklkID09IHRoaXMudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgYy5yaWdodHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmlnaHRzIGNoYW5nZWQgdG8gdHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbG9zZVBob3RvKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZCA9IDA7XG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSBcIlwiO1xuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90byA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkQ29tbWVudChyZXN1bHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDb21tZW50IFwiICsgcmVzdWx0LnRleHQpO1xuICAgICAgICBpZiAocmVzdWx0LnRleHQubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgYWxlcnQoXCJDYW5ub3QgaW5zZXJ0IGVtcHR5IGNvbW1lbnRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci51cGRhdGVDb21tZW50KHRoaXMucGhvdG9JZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xuICAgICAgICAgICAgLy92YXIgY29tbWVudCA9IG5ldyBDb21tZW50KGNvbW1lbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQsIHRydWUpO1xuICAgICAgICAgICAgLy9jb21tZW50LnJpZ2h0cyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldFBob3RvKHRoaXMuc2VsZWN0ZWRJZCk7XG4gICAgICAgICAgICAvL3RoaXMucGhvdG9Db21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5nZXRDb21tZW50cygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xuICAgICAgICAgICAgICAgIH0pOyB9XG4gICAgICAgIHJlc3VsdC50ZXh0ID0gXCJcIjtcbiAgICB9XG5cbiAgICByZW1vdmVDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGljayBjb21tZW50IGlkIFwiICsgY29tbWVudElkKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci5yZW1vdmVDb21tZW50KGNvbW1lbnRJZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8uZ2V0Q29tbWVudHMoKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVMaWtlcyhpZDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdmFyIGFkZGluZyA9IHRoaXMuY2FuR2l2ZUxpa2U7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci51cGRhdGVMaWtlcyhpZCwgdGhpcy51c2VySWQsIGFkZGluZyk7XG4gICAgICAgICAgICB0aGlzLmNhbkdpdmVMaWtlID0gIXRoaXMuY2FuR2l2ZUxpa2U7XG4gICAgICAgICAgICByZXNvbHZlKGFkZGluZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlLnRoZW4oKGZyb21SZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJvbVJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmxpa2VzLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSB0YXBwZWQgXCIgKyBpZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==