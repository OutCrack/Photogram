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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBRXZELG1EQUFrRDtBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsMEVBQXdFO0FBRXhFLDZDQUE0QztBQUU1QyxrREFBa0U7QUFFbEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUzVGO0lBMEJJLHVCQUFvQixtQkFBc0MsRUFBVSxJQUFVO1FBQTFELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBeEJ2RSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUzQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFxQmxELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFL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ZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1Bob3RvXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9Vc2VyXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9FdmVudFwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvQ29tbWVudFwiO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuXG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaG9tZS10YWJcIixcbiAgICAvL21vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCB7XG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgcHVibGljIHZpc2liaWxpdHkxID0gdHJ1ZTtcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTIgPSBmYWxzZTtcblxuICAgIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gICAgLy9mb3Igc3RvcmluZyBmZXRjaGVkIHBob3Rvc1xuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBwaG90b0lkOiBudW1iZXI7XG4gICAgcHVibGljIHBob3RvVXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHBob3RvQ3JlYXRlZDogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0Rlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHVibGljIHBob3RvQ29tbWVudHM6IEFycmF5PENvbW1lbnQ+O1xuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRQaG90bzogUGhvdG87XG4gICAgcHVibGljIGNhbkdpdmVMaWtlOiBib29sZWFuO1xuICAgIHB1YmxpYyBwdWJsaWNFdmVudHM6IEFycmF5PEV2ZW50PjsgICAgXG4gICAgcHVibGljIHBhcnRpY2lwRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcEV2ZW50czogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgc2VsZWN0ZWRJZDogbnVtYmVyOyBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IFwiUGhvdG9zXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIkV2ZW50c1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkluIGhvbWUgY29uc3RydWN0b3JcIik7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5waG90b0lkID0gMDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgICAgIHRoaXMuZ2V0TXlFdmVudHMoKTtcbiAgICAgICAgdGhpcy5mZXRjaFB1YmxpY0V2ZW50cygpO1xuICAgIH1cblxuICAgIHJlZnJlc2hGZWVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5nZXRQaG90b3MoKTtcbiAgICAgICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBmZXRjaFB1YmxpY0V2ZW50cygpIHtcbiAgICAgICAgdGhpcy5wdWJsaWNFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wdWJsaWNFdmVudHMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBnZXRNeUV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5wYXJ0aWNpcEV2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucGFydGljaXBFdmVudHMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBqb2luRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCBcIiArIGV2ZW50SWQgKyBcInlvdXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgdmFyIG9rID0gdGhpcy5zZXJ2ZXIuam9pbkV2ZW50KGV2ZW50SWQsIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuICAgICAgICB0aGlzLnBFdmVudHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZXRjaFB1YmxpY0V2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIEhFUiBNQU5HTEVSIERFVCBLT0RFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBvcGVuRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgaWQgdGFwcGVkIFwiICsgZXZlbnRJZCArIFwiIHVzZXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgLy90aGlzLnNlcnZlci5vcGVuRXZlbnQoZXZlbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIC8vYWxlcnQoXCJFdmVudCByZW1vdmVkXCIpO1xuICAgICAgICAvL3RoaXMubUV2ZW50cyA9IGZhbHNlO1xuICAgICAgICAvL3RoaXMuZ2V0RXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLy9nZXQgcGhvdG9zIGZyb20gZGIsIHB1dCB0aGVtIGluIHBob3RvcyBhcnJheVxuICAgIGdldFBob3RvcygpIHtcbiAgICAgICAgLy92YXIgX3NlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgLy90aGlzLnBob3RvcyA9IF9zZXJ2ZXIuZ2V0UHVibGljUGhvdG9zKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJIYXZlIFwiICsgdGhpcy5waG90b3MubGVuZ3RoICsgXCIgcGhvdG9zXCIpO1xuXG4gICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiSW4gZ2V0UGhvdG9zXCIpO1xuICAgICAgICB0aGlzLnBob3RvcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAvL2dldCBwdWJsaWMgcGhvdG9zIHRoYXQgYXJlIG5vdCBjb25uZWN0ZWQgdG8gYSBldmVudCwgYXJlIG5vdCBpbiBhbiBhbGJ1bSBhbmQgYXJlIG1heCAyIGRheXMgb2xkXG4gICAgICAgIHZhciBsaW1pdERhdGU6IHN0cmluZyA9IGdldExpbWl0RGF0ZSgpO1xuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwiZmlsZXM/dHJhbnNmb3JtPTEmZmlsdGVyW109ZmlsZV9QZXJtaXNzaW9uLGVxLHB1YmxpYyZmaWx0ZXJbXT1ldmVudF9JZCxpcyxudWxsJmZpbHRlcltdPWFsYnVtX0lkLG5vdCxudWxsJmZpbHRlcltdPWNyZWF0ZWRfYXQsZ3QsXCIgKyBsaW1pdERhdGUgKyBcIiZvcmRlcj1jcmVhdGVkX2F0LGRlc2NcIjtcbiAgICAgICAgY29uc29sZS5sb2coXCJMSU1JVCBEQVRFIElOIFFVRVJZIFwiICsgcXVlcnkpO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGaWxlcy5sZW5ndGggaXNcIiArIHIuZmlsZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGJ1bSBpZCBcIiArIHIuZmlsZXNbaV0uYWxidW1fSWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBob3Rvcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBob3RvKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJzL1wiICsgci5maWxlc1tpXS51c2VyX0lkICsgci5maWxlc1tpXS5maWxlX1VSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLnVzZXJfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIuZmlsZXNbaV0uY3JlYXRlZF9hdCkuc2xpY2UoMCwgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9EZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmFsYnVtX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9OYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coci5maWxlc1tpXS5maWxlX1VSTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8qZnVuY3Rpb24gZ2V0QWxidW1OYW1lKGFsYnVtSWQ6IG51bWJlciwgc2l0ZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgYWxidW1OYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKGFsYnVtSWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGFsYnVtUXVlcnkgPSBzaXRlICsgXCJhbGJ1bXM/dHJhbnNmb3JtPTEmZmlsdGVyPWFsYnVtX0lkLGVxLFwiICsgYWxidW1JZDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUVFRUVFRUVFRXCIgKyBhbGJ1bVF1ZXJ5KTtcbiAgICAgICAgICAgIGh0dHAuZ2V0SlNPTihhbGJ1bVF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGFsYnVtTmFtZSArPSByZXMuYWxidW1zWzBdLmFsYnVtX05hbWU7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlKSB7IGNvbnNvbGUubG9nKGUpO30pO1xuICAgICAgICAgICAgdmFyIHJlcGxhY2UgPSAvIC9naTtcbiAgICAgICAgICAgIGFsYnVtTmFtZSA9IFwiL1wiICsgYWxidW1OYW1lLnJlcGxhY2UocmVwbGFjZSwgXCIlMjBcIik7XG4gICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhbGJ1bU5hbWU7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIC8vZ2V0IHN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGRheSBiZWZvcmUgeWVzdGVyZGF5XG4gICAgICAgIGZ1bmN0aW9uIGdldExpbWl0RGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xuICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gMik7IC8vQW50YWxsIGRhZ2VyIGdhbWxlIGJpbGRlciBzb20gc2thbCB2aXNlc1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRlIG5ldyBkYXRlIGlzIFwiICsgZGF0ZS50b0RhdGVTdHJpbmcoKSk7XG4gICAgICAgICAgICB2YXIgZGF0ZVN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiO1xuICAgICAgICAgICAgdmFyIG1vbnRoOiBudW1iZXIgPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiMFwiICsgbW9udGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIi1cIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF5IFwiICsgZGF0ZS5nZXREYXRlKCkpXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXREYXkoKSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgZGF0ZSBcIiArIGRhdGVTdHJpbmcpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGVjdFBob3RvKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLnBob3Rvcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJfX19fX19fX19fX19fX1wiICsgcC51cmwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZCA9IHBhcnNlSW50KGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG8odGhpcy5zZWxlY3RlZElkKTtcbiAgICAgICAgLyp0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBpZCBpcyBcIiArIGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgZXZlbnQgbmFtZSBpcyBcIiArIGFyZ3MuZXZlbnROYW1lKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IHBhcnNlSW50KGFyZ3Mudmlldy5pZCkpO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIuZmlyc3ROICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5sYXN0TjtcbiAgICAgICAgdGhpcy5waG90b0lkID0gdGhpcy5zZWxlY3RlZFBob3RvLmlkO1xuICAgICAgICB0aGlzLnBob3RvVXJsID0gdGhpcy5zZWxlY3RlZFBob3RvLnVybDtcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY3JlYXRlZDtcbiAgICAgICAgdGhpcy5waG90b0Rlc2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZFBob3RvLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHM7XG4gICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVVJMIFwiICsgdGhpcy5waG90b1VybCk7Ki9cbiAgICB9XG5cbiAgICBnZXRQaG90byhpZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XG4gICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhlIGlkIGlzIFwiICsgYXJncy52aWV3LmlkKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZSBldmVudCBuYW1lIGlzIFwiICsgYXJncy5ldmVudE5hbWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSB0aGlzLnBob3Rvcy5maW5kKGkgPT4gaS5pZCA9PT0gaWQpO1xuICAgICAgICB0aGlzLnNlcnZlci5nZXRMaWtlcyh0aGlzLnNlbGVjdGVkUGhvdG8uaWQsIHRoaXMudXNlcklkKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcyA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgICAgICAgdGhpcy5jYW5HaXZlTGlrZSA9IGZhbHNlO1xuICAgICAgICB9KS5jYXRjaCgocmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeShyZWplY3QpKTtcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmZpcnN0TiArIFwiIFwiICsgdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIubGFzdE47XG4gICAgICAgIHRoaXMucGhvdG9JZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5pZDtcbiAgICAgICAgdGhpcy5waG90b1VybCA9IHRoaXMuc2VsZWN0ZWRQaG90by51cmw7XG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gdGhpcy5zZWxlY3RlZFBob3RvLmNyZWF0ZWQ7XG4gICAgICAgIHRoaXMucGhvdG9EZXNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWRQaG90by5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzID0gdGhpcy5zZWxlY3RlZFBob3RvLmNvbW1lbnRzO1xuICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVSTCBcIiArIHRoaXMucGhvdG9VcmwpO1xuICAgIH1cbiAgICBwcml2YXRlIGNoZWNrQ29tbWVudFJpZ2h0cygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyByaWdodHMgZm9yIGNvbW1lbnRzXCIpO1xuICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cykge1xuICAgICAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY29tbWVudCB1c2VyIGlkIFwiICsgYy51c2VySWQgKyBcIiBsb2dnZW4gaW4gYXMgXCIgKyB0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBpZiAoYy51c2VySWQgPT0gdGhpcy51c2VySWQpIHtcbiAgICAgICAgICAgICAgICBjLnJpZ2h0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSaWdodHMgY2hhbmdlZCB0byB0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsb3NlUGhvdG8oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkID0gMDtcbiAgICAgICAgdGhpcy5waG90b1VybCA9IFwiXCI7XG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gXCJcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvID0gbnVsbDtcbiAgICB9XG5cbiAgICBhZGRDb21tZW50KHJlc3VsdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbW1lbnQgXCIgKyByZXN1bHQudGV4dCk7XG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBhbGVydChcIkNhbm5vdCBpbnNlcnQgZW1wdHkgY29tbWVudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50SWQgPSB0aGlzLnNlcnZlci51cGRhdGVDb21tZW50KHRoaXMucGhvdG9JZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgQ29tbWVudChjb21tZW50SWQsIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIHJlc3VsdC50ZXh0KTtcbiAgICAgICAgICAgIGNvbW1lbnQucmlnaHRzID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGhvdG8odGhpcy5zZWxlY3RlZElkKTtcbiAgICAgICAgICAgIC8vdGhpcy5waG90b0NvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmdldENvbW1lbnRzKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XG4gICAgICAgICAgICAgICAgfSk7IH1cbiAgICAgICAgcmVzdWx0LnRleHQgPSBcIlwiO1xuICAgIH1cblxuICAgIHJlbW92ZUNvbW1lbnQoY29tbWVudElkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrIGNvbW1lbnQgaWQgXCIgKyBjb21tZW50SWQpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnJlbW92ZUNvbW1lbnQoY29tbWVudElkKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5nZXRDb21tZW50cygpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tDb21tZW50UmlnaHRzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUxpa2VzKGlkOiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgYWRkaW5nID0gdGhpcy5jYW5HaXZlTGlrZTtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnVwZGF0ZUxpa2VzKGlkLCB0aGlzLnVzZXJJZCwgYWRkaW5nKTtcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSAhdGhpcy5jYW5HaXZlTGlrZTtcbiAgICAgICAgICAgIHJlc29sdmUoYWRkaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2UudGhlbigoZnJvbVJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmIChmcm9tUmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcysrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHRhcHBlZCBcIiArIGlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59Il19