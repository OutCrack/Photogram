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
            var commentId = this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            var comment = new Comment_1.Comment(commentId, this.data.storage["id"], result.text);
            comment.rights = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBRXZELG1EQUFrRDtBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsMEVBQXdFO0FBRXhFLDZDQUE0QztBQUU1QyxrREFBa0U7QUFFbEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUzVGO0lBMEJJLHVCQUFvQixtQkFBc0MsRUFBVSxJQUFVO1FBQTFELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBeEJ2RSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUzQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFxQmxELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFL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ZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0NvbW1lbnRcIjtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuXHJcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxyXG4gICAgLy9tb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTEgPSB0cnVlO1xyXG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XHJcblxyXG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcclxuICAgIC8vZm9yIHN0b3JpbmcgZmV0Y2hlZCBwaG90b3NcclxuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcclxuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwaG90b0lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBob3RvRGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcclxuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBob3RvOiBQaG90bztcclxuICAgIHB1YmxpYyBjYW5HaXZlTGlrZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwdWJsaWNFdmVudHM6IEFycmF5PEV2ZW50PjsgICAgXHJcbiAgICBwdWJsaWMgcGFydGljaXBFdmVudHM6IEFycmF5PEV2ZW50PjtcclxuICAgIHBFdmVudHM6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZWxlY3RlZElkOiBudW1iZXI7IFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YTogRGF0YSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XHJcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIlBob3Rvc1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IFwiRXZlbnRzXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBob21lIGNvbnN0cnVjdG9yXCIpO1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGhvdG9JZCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgICAgICAgdGhpcy5nZXRNeUV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuZmV0Y2hQdWJsaWNFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRmVlZChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQaG90b3MoKTtcclxuICAgICAgICB2YXIgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoUHVibGljRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMucHVibGljRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0UHVibGljRXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wdWJsaWNFdmVudHMubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNeUV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2lwRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0TXlFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudHMgXCIgKyB0aGlzLnBhcnRpY2lwRXZlbnRzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgam9pbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCBcIiArIGV2ZW50SWQgKyBcInlvdXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICB2YXIgb2sgPSB0aGlzLnNlcnZlci5qb2luRXZlbnQoZXZlbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XHJcbiAgICAgICAgdGhpcy5wRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mZXRjaFB1YmxpY0V2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhFUiBNQU5HTEVSIERFVCBLT0RFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9wZW5FdmVudChldmVudElkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50IGlkIHRhcHBlZCBcIiArIGV2ZW50SWQgKyBcIiB1c2VyIGlkIFwiICsgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XHJcbiAgICAgICAgLy90aGlzLnNlcnZlci5vcGVuRXZlbnQoZXZlbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XHJcbiAgICAgICAgLy9hbGVydChcIkV2ZW50IHJlbW92ZWRcIik7XHJcbiAgICAgICAgLy90aGlzLm1FdmVudHMgPSBmYWxzZTtcclxuICAgICAgICAvL3RoaXMuZ2V0RXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZXQgcGhvdG9zIGZyb20gZGIsIHB1dCB0aGVtIGluIHBob3RvcyBhcnJheVxyXG4gICAgZ2V0UGhvdG9zKCkge1xyXG4gICAgICAgIC8vdmFyIF9zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgICAgICAgLy90aGlzLnBob3RvcyA9IF9zZXJ2ZXIuZ2V0UHVibGljUGhvdG9zKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkhhdmUgXCIgKyB0aGlzLnBob3Rvcy5sZW5ndGggKyBcIiBwaG90b3NcIik7XHJcblxyXG4gICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJJbiBnZXRQaG90b3NcIik7XHJcbiAgICAgICAgdGhpcy5waG90b3MgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvL2dldCBwdWJsaWMgcGhvdG9zIHRoYXQgYXJlIG5vdCBjb25uZWN0ZWQgdG8gYSBldmVudCwgYXJlIG5vdCBpbiBhbiBhbGJ1bSBhbmQgYXJlIG1heCAyIGRheXMgb2xkXHJcbiAgICAgICAgdmFyIGxpbWl0RGF0ZTogc3RyaW5nID0gZ2V0TGltaXREYXRlKCk7XHJcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcltdPWZpbGVfUGVybWlzc2lvbixlcSxwdWJsaWMmZmlsdGVyW109ZXZlbnRfSWQsaXMsbnVsbCZmaWx0ZXJbXT1hbGJ1bV9JZCxub3QsbnVsbCZmaWx0ZXJbXT1jcmVhdGVkX2F0LGd0LFwiICsgbGltaXREYXRlICsgXCImb3JkZXI9Y3JlYXRlZF9hdCxkZXNjXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMSU1JVCBEQVRFIElOIFFVRVJZIFwiICsgcXVlcnkpO1xyXG4gICAgICAgIGh0dHAuZ2V0SlNPTihxdWVyeSlcclxuICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkZpbGVzLmxlbmd0aCBpc1wiICsgci5maWxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGJ1bSBpZCBcIiArIHIuZmlsZXNbaV0uYWxidW1fSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhvdG9zLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQaG90byhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcnMvXCIgKyByLmZpbGVzW2ldLnVzZXJfSWQgKyByLmZpbGVzW2ldLmZpbGVfVVJMLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS51c2VyX0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIuZmlsZXNbaV0uY3JlYXRlZF9hdCkuc2xpY2UoMCwgMTApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX0Rlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5hbGJ1bV9JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyLmZpbGVzW2ldLmZpbGVfVVJMKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLypmdW5jdGlvbiBnZXRBbGJ1bU5hbWUoYWxidW1JZDogbnVtYmVyLCBzaXRlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGFsYnVtTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGFsYnVtSWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgYWxidW1RdWVyeSA9IHNpdGUgKyBcImFsYnVtcz90cmFuc2Zvcm09MSZmaWx0ZXI9YWxidW1fSWQsZXEsXCIgKyBhbGJ1bUlkO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlFRUVFRUVFRUVwiICsgYWxidW1RdWVyeSk7XHJcbiAgICAgICAgICAgIGh0dHAuZ2V0SlNPTihhbGJ1bVF1ZXJ5KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGJ1bU5hbWUgKz0gcmVzLmFsYnVtc1swXS5hbGJ1bV9OYW1lO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlKSB7IGNvbnNvbGUubG9nKGUpO30pO1xyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZSA9IC8gL2dpO1xyXG4gICAgICAgICAgICBhbGJ1bU5hbWUgPSBcIi9cIiArIGFsYnVtTmFtZS5yZXBsYWNlKHJlcGxhY2UsIFwiJTIwXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFsYnVtTmFtZTtcclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgLy9nZXQgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUgZGF5IGJlZm9yZSB5ZXN0ZXJkYXlcclxuICAgICAgICBmdW5jdGlvbiBnZXRMaW1pdERhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRlIGlzIFwiICsgZGF0ZS50b0RhdGVTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIDIpOyAvL0FudGFsbCBkYWdlciBnYW1sZSBiaWxkZXIgc29tIHNrYWwgdmlzZXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRlIG5ldyBkYXRlIGlzIFwiICsgZGF0ZS50b0RhdGVTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHZhciBkYXRlU3RyaW5nID0gZGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCI7XHJcbiAgICAgICAgICAgIHZhciBtb250aDogbnVtYmVyID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCIwXCIgKyBtb250aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gZGF0ZS5nZXRNb250aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCItXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF5IFwiICsgZGF0ZS5nZXREYXRlKCkpXHJcbiAgICAgICAgICAgIGlmIChkYXRlLmdldERheSgpIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCIwXCIgKyBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgZGF0ZSBcIiArIGRhdGVTdHJpbmcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFBob3RvKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcclxuICAgICAgICBmb3IgKGxldCBwIG9mIHRoaXMucGhvdG9zKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19fX19fX19fX19fX19cIiArIHAudXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkID0gcGFyc2VJbnQoYXJncy52aWV3LmlkKTtcclxuICAgICAgICB0aGlzLmdldFBob3RvKHRoaXMuc2VsZWN0ZWRJZCk7XHJcbiAgICAgICAgLyp0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XHJcbiAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBpZCBpcyBcIiArIGFyZ3Mudmlldy5pZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBldmVudCBuYW1lIGlzIFwiICsgYXJncy5ldmVudE5hbWUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90byA9IHRoaXMucGhvdG9zLmZpbmQoaSA9PiBpLmlkID09PSBwYXJzZUludChhcmdzLnZpZXcuaWQpKTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIuZmlyc3ROICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5sYXN0TjtcclxuICAgICAgICB0aGlzLnBob3RvSWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uaWQ7XHJcbiAgICAgICAgdGhpcy5waG90b1VybCA9IHRoaXMuc2VsZWN0ZWRQaG90by51cmw7XHJcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY3JlYXRlZDtcclxuICAgICAgICB0aGlzLnBob3RvRGVzY3JpcHRpb24gPSB0aGlzLnNlbGVjdGVkUGhvdG8uZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzID0gdGhpcy5zZWxlY3RlZFBob3RvLmNvbW1lbnRzO1xyXG4gICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVUkwgXCIgKyB0aGlzLnBob3RvVXJsKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBob3RvKGlkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XHJcbiAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBpZCBpcyBcIiArIGFyZ3Mudmlldy5pZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBldmVudCBuYW1lIGlzIFwiICsgYXJncy5ldmVudE5hbWUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90byA9IHRoaXMucGhvdG9zLmZpbmQoaSA9PiBpLmlkID09PSBpZCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZ2V0TGlrZXModGhpcy5zZWxlY3RlZFBob3RvLmlkLCB0aGlzLnVzZXJJZCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcyA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkdpdmVMaWtlID0gZmFsc2U7XHJcbiAgICAgICAgfSkuY2F0Y2goKHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeShyZWplY3QpKTtcclxuICAgICAgICAgICAgdGhpcy5jYW5HaXZlTGlrZSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmZpcnN0TiArIFwiIFwiICsgdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIubGFzdE47XHJcbiAgICAgICAgdGhpcy5waG90b0lkID0gdGhpcy5zZWxlY3RlZFBob3RvLmlkO1xyXG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXJsO1xyXG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gdGhpcy5zZWxlY3RlZFBob3RvLmNyZWF0ZWQ7XHJcbiAgICAgICAgdGhpcy5waG90b0Rlc2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZFBob3RvLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMucGhvdG9Db21tZW50cyA9IHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cztcclxuICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVVJMIFwiICsgdGhpcy5waG90b1VybCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrQ29tbWVudFJpZ2h0cygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nIHJpZ2h0cyBmb3IgY29tbWVudHNcIik7XHJcbiAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHMpIHtcclxuICAgICAgICAgICAgLy90ZXN0aW5nXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjb21tZW50IHVzZXIgaWQgXCIgKyBjLnVzZXJJZCArIFwiIGxvZ2dlbiBpbiBhcyBcIiArIHRoaXMudXNlcklkKTtcclxuICAgICAgICAgICAgaWYgKGMudXNlcklkID09IHRoaXMudXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICBjLnJpZ2h0cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJpZ2h0cyBjaGFuZ2VkIHRvIHRydWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbG9zZVBob3RvKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSWQgPSAwO1xyXG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbW1lbnQocmVzdWx0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb21tZW50IFwiICsgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IGluc2VydCBlbXB0eSBjb21tZW50XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50SWQgPSB0aGlzLnNlcnZlci51cGRhdGVDb21tZW50KHRoaXMucGhvdG9JZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IG5ldyBDb21tZW50KGNvbW1lbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xyXG4gICAgICAgICAgICBjb21tZW50LnJpZ2h0cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UGhvdG8odGhpcy5zZWxlY3RlZElkKTtcclxuICAgICAgICAgICAgLy90aGlzLnBob3RvQ29tbWVudHMucHVzaChjb21tZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5nZXRDb21tZW50cygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTsgfVxyXG4gICAgICAgIHJlc3VsdC50ZXh0ID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDb21tZW50KGNvbW1lbnRJZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrIGNvbW1lbnQgaWQgXCIgKyBjb21tZW50SWQpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5yZW1vdmVDb21tZW50KGNvbW1lbnRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5nZXRDb21tZW50cygpO1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVMaWtlcyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBhZGRpbmcgPSB0aGlzLmNhbkdpdmVMaWtlO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci51cGRhdGVMaWtlcyhpZCwgdGhpcy51c2VySWQsIGFkZGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSAhdGhpcy5jYW5HaXZlTGlrZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShhZGRpbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21pc2UudGhlbigoZnJvbVJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGZyb21SZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcy0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHRhcHBlZCBcIiArIGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==