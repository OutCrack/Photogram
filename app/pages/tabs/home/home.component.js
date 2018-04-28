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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBRXZELG1EQUFrRDtBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsMEVBQXdFO0FBRXhFLDZDQUE0QztBQUU1QyxrREFBa0U7QUFFbEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUzVGO0lBeUJJLHVCQUFvQixtQkFBc0MsRUFBVSxJQUFVO1FBQTFELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBdkJ2RSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUUzQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFvQmxELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGdCQUFnQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDWixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixVQUFVLENBQUM7WUFDUCxXQUFXLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQseUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsaUNBQVMsR0FBVCxVQUFVLE9BQWU7UUFDckIsK0VBQStFO1FBQy9FLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpR0FBaUc7SUFDakcsaUNBQVMsR0FBVCxVQUFVLE9BQWU7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEYsMERBQTBEO1FBQzFELHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsbUJBQW1CO0lBQ3ZCLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsaUNBQVMsR0FBVDtRQUNJLDZCQUE2QjtRQUM3QiwwQ0FBMEM7UUFDMUMsd0RBQXdEO1FBSDVELGlCQTJFQztRQXRFRyxTQUFTO1FBQ1QsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQixpR0FBaUc7UUFDakcsSUFBSSxTQUFTLEdBQVcsWUFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxtSUFBbUksR0FBRyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7UUFDM00sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUNkLElBQUksQ0FBQyxVQUFDLENBQUM7WUFDSixTQUFTO1lBQ1Qsa0RBQWtEO1lBQ2xELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ1osSUFBSSxhQUFLLENBQ0wsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQ2xCLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFDbkQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQ2xCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNwQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUMzQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFDbkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3ZCLENBQ0osQ0FBQTtnQkFDRCxTQUFTO2dCQUNULG1DQUFtQztZQUN2QyxDQUFDO1FBQ0wsQ0FBQyxFQUFFLFVBQVUsQ0FBQztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFUDs7Ozs7Ozs7Ozs7OztXQWFHO1FBRUgscURBQXFEO1FBQ3JEO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztZQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDYixVQUFVLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsVUFBVSxJQUFJLEdBQUcsQ0FBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckIsVUFBVSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakMsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEIsQ0FBQztJQUVMLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksSUFBc0I7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JDOzs7Ozs7Ozs7Ozs7OzhDQWFzQztJQUMxQyxDQUFDO0lBRUQsZ0NBQVEsR0FBUixVQUFTLEVBQVU7UUFBbkIsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsU0FBUztRQUNULDJDQUEyQztRQUMzQyxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ2pFLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNaLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQy9DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ2pELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ08sMENBQWtCLEdBQTFCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxDQUFVLFVBQTJCLEVBQTNCLEtBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQTNCLGNBQTJCLEVBQTNCLElBQTJCO1lBQXBDLElBQUksQ0FBQyxTQUFBO1lBQ04sU0FBUztZQUNULDhFQUE4RTtZQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzFDLENBQUM7U0FDSjtJQUNMLENBQUM7SUFDRCxrQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQWpCLGlCQWtCQztRQWpCRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RixJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRSxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixtQ0FBbUM7WUFDbkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDdEMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ1QsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxTQUFTO1FBQXZCLGlCQVVDO1FBVEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDVCxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUF0QixpQkFlQztRQWRHLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdEMsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQUM5QixLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNqRCxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQztZQUNyQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBVztZQUNyQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZDQUFxQixHQUE1QixVQUE2QixJQUFJO1FBQzdCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQTNSUSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixzQkFBc0I7WUFDdEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQTJCMkMsd0JBQWlCLEVBQWdCLFdBQUk7T0F6QnJFLGFBQWEsQ0E0UnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTVSRCxJQTRSQztBQTVSWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0NvbW1lbnRcIjtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuXHJcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxyXG4gICAgLy9tb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTEgPSB0cnVlO1xyXG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XHJcblxyXG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcclxuICAgIC8vZm9yIHN0b3JpbmcgZmV0Y2hlZCBwaG90b3NcclxuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcclxuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwaG90b0lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHBob3RvRGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcclxuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFBob3RvOiBQaG90bztcclxuICAgIHB1YmxpYyBjYW5HaXZlTGlrZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwdWJsaWNFdmVudHM6IEFycmF5PEV2ZW50PjsgICAgXHJcbiAgICBwdWJsaWMgcGFydGljaXBFdmVudHM6IEFycmF5PEV2ZW50PjtcclxuICAgIHBFdmVudHM6IGJvb2xlYW47XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gXCJQaG90b3NcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIkV2ZW50c1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW4gaG9tZSBjb25zdHJ1Y3RvclwiKTtcclxuICAgICAgICB0aGlzLmdldFBob3RvcygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBob3RvSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xyXG4gICAgICAgIHRoaXMuZ2V0TXlFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmZldGNoUHVibGljRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEZlZWQoYXJncykge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XHJcbiAgICAgICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFB1YmxpY0V2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnB1YmxpY0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldFB1YmxpY0V2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucHVibGljRXZlbnRzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TXlFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNpcEV2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wYXJ0aWNpcEV2ZW50cy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGpvaW5FdmVudChldmVudElkOiBudW1iZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgXCIgKyBldmVudElkICsgXCJ5b3VyIGlkIFwiICsgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XHJcbiAgICAgICAgdmFyIG9rID0gdGhpcy5zZXJ2ZXIuam9pbkV2ZW50KGV2ZW50SWQsIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIHRoaXMucEV2ZW50cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmV0Y2hQdWJsaWNFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIRVIgTUFOR0xFUiBERVQgS09ERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvcGVuRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCBpZCB0YXBwZWQgXCIgKyBldmVudElkICsgXCIgdXNlciBpZCBcIiArIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIC8vdGhpcy5zZXJ2ZXIub3BlbkV2ZW50KGV2ZW50SWQsIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xyXG4gICAgICAgIC8vYWxlcnQoXCJFdmVudCByZW1vdmVkXCIpO1xyXG4gICAgICAgIC8vdGhpcy5tRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgLy90aGlzLmdldEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZ2V0IHBob3RvcyBmcm9tIGRiLCBwdXQgdGhlbSBpbiBwaG90b3MgYXJyYXlcclxuICAgIGdldFBob3RvcygpIHtcclxuICAgICAgICAvL3ZhciBfc2VydmVyID0gbmV3IFNlcnZlcigpO1xyXG4gICAgICAgIC8vdGhpcy5waG90b3MgPSBfc2VydmVyLmdldFB1YmxpY1Bob3RvcygpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJIYXZlIFwiICsgdGhpcy5waG90b3MubGVuZ3RoICsgXCIgcGhvdG9zXCIpO1xyXG5cclxuICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiSW4gZ2V0UGhvdG9zXCIpO1xyXG4gICAgICAgIHRoaXMucGhvdG9zID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy9nZXQgcHVibGljIHBob3RvcyB0aGF0IGFyZSBub3QgY29ubmVjdGVkIHRvIGEgZXZlbnQsIGFyZSBub3QgaW4gYW4gYWxidW0gYW5kIGFyZSBtYXggMiBkYXlzIG9sZFxyXG4gICAgICAgIHZhciBsaW1pdERhdGU6IHN0cmluZyA9IGdldExpbWl0RGF0ZSgpO1xyXG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJmaWxlcz90cmFuc2Zvcm09MSZmaWx0ZXJbXT1maWxlX1Blcm1pc3Npb24sZXEscHVibGljJmZpbHRlcltdPWV2ZW50X0lkLGlzLG51bGwmZmlsdGVyW109YWxidW1fSWQsbm90LG51bGwmZmlsdGVyW109Y3JlYXRlZF9hdCxndCxcIiArIGxpbWl0RGF0ZSArIFwiJm9yZGVyPWNyZWF0ZWRfYXQsZGVzY1wiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTElNSVQgREFURSBJTiBRVUVSWSBcIiArIHF1ZXJ5KTtcclxuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3RpbmdcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGaWxlcy5sZW5ndGggaXNcIiArIHIuZmlsZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgci5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxidW0gaWQgXCIgKyByLmZpbGVzW2ldLmFsYnVtX0lkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBob3Rvcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGhvdG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJzL1wiICsgci5maWxlc1tpXS51c2VyX0lkICsgci5maWxlc1tpXS5maWxlX1VSTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0udXNlcl9JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyLmZpbGVzW2ldLmNyZWF0ZWRfYXQpLnNsaWNlKDAsIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uYWxidW1fSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coci5maWxlc1tpXS5maWxlX1VSTCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qZnVuY3Rpb24gZ2V0QWxidW1OYW1lKGFsYnVtSWQ6IG51bWJlciwgc2l0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGJ1bU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChhbGJ1bUlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGFsYnVtUXVlcnkgPSBzaXRlICsgXCJhbGJ1bXM/dHJhbnNmb3JtPTEmZmlsdGVyPWFsYnVtX0lkLGVxLFwiICsgYWxidW1JZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRUVFRUVFRUVFcIiArIGFsYnVtUXVlcnkpO1xyXG4gICAgICAgICAgICBodHRwLmdldEpTT04oYWxidW1RdWVyeSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxidW1OYW1lICs9IHJlcy5hbGJ1bXNbMF0uYWxidW1fTmFtZTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSkgeyBjb25zb2xlLmxvZyhlKTt9KTtcclxuICAgICAgICAgICAgdmFyIHJlcGxhY2UgPSAvIC9naTtcclxuICAgICAgICAgICAgYWxidW1OYW1lID0gXCIvXCIgKyBhbGJ1bU5hbWUucmVwbGFjZShyZXBsYWNlLCBcIiUyMFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhbGJ1bU5hbWU7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIC8vZ2V0IHN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGRheSBiZWZvcmUgeWVzdGVyZGF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGltaXREYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAyKTsgLy9BbnRhbGwgZGFnZXIgZ2FtbGUgYmlsZGVyIHNvbSBza2FsIHZpc2VzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBuZXcgZGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZVN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiO1xyXG4gICAgICAgICAgICB2YXIgbW9udGg6IG51bWJlciA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRheSBcIiArIGRhdGUuZ2V0RGF0ZSgpKVxyXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXREYXkoKSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiMFwiICsgZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRhdGUgXCIgKyBkYXRlU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RQaG90byhhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQaG90byhwYXJzZUludChhcmdzLnZpZXcuaWQpKVxyXG4gICAgICAgIC8qdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xyXG4gICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgaWQgaXMgXCIgKyBhcmdzLnZpZXcuaWQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgZXZlbnQgbmFtZSBpcyBcIiArIGFyZ3MuZXZlbnROYW1lKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSB0aGlzLnBob3Rvcy5maW5kKGkgPT4gaS5pZCA9PT0gcGFyc2VJbnQoYXJncy52aWV3LmlkKSk7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmZpcnN0TiArIFwiIFwiICsgdGhpcy5zZWxlY3RlZFBob3RvLnVzZXIubGFzdE47XHJcbiAgICAgICAgdGhpcy5waG90b0lkID0gdGhpcy5zZWxlY3RlZFBob3RvLmlkO1xyXG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXJsO1xyXG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gdGhpcy5zZWxlY3RlZFBob3RvLmNyZWF0ZWQ7XHJcbiAgICAgICAgdGhpcy5waG90b0Rlc2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZFBob3RvLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMucGhvdG9Db21tZW50cyA9IHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cztcclxuICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVVJMIFwiICsgdGhpcy5waG90b1VybCk7Ki9cclxuICAgIH1cclxuXHJcbiAgICBnZXRQaG90byhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xyXG4gICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgaWQgaXMgXCIgKyBhcmdzLnZpZXcuaWQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJUaGUgZXZlbnQgbmFtZSBpcyBcIiArIGFyZ3MuZXZlbnROYW1lKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSB0aGlzLnBob3Rvcy5maW5kKGkgPT4gaS5pZCA9PT0gaWQpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLmdldExpa2VzKHRoaXMuc2VsZWN0ZWRQaG90by5pZCwgdGhpcy51c2VySWQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgdGhpcy5jYW5HaXZlTGlrZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pLmNhdGNoKChyZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBob3RvLmxpa2VzID0gcGFyc2VJbnQoSlNPTi5zdHJpbmdpZnkocmVqZWN0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLnNlbGVjdGVkUGhvdG8udXNlci5maXJzdE4gKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRQaG90by51c2VyLmxhc3ROO1xyXG4gICAgICAgIHRoaXMucGhvdG9JZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5pZDtcclxuICAgICAgICB0aGlzLnBob3RvVXJsID0gdGhpcy5zZWxlY3RlZFBob3RvLnVybDtcclxuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IHRoaXMuc2VsZWN0ZWRQaG90by5jcmVhdGVkO1xyXG4gICAgICAgIHRoaXMucGhvdG9EZXNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0ZWRQaG90by5kZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHM7XHJcbiAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVSTCBcIiArIHRoaXMucGhvdG9VcmwpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjaGVja0NvbW1lbnRSaWdodHMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyByaWdodHMgZm9yIGNvbW1lbnRzXCIpO1xyXG4gICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5zZWxlY3RlZFBob3RvLmNvbW1lbnRzKSB7XHJcbiAgICAgICAgICAgIC8vdGVzdGluZ1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY29tbWVudCB1c2VyIGlkIFwiICsgYy51c2VySWQgKyBcIiBsb2dnZW4gaW4gYXMgXCIgKyB0aGlzLnVzZXJJZCk7XHJcbiAgICAgICAgICAgIGlmIChjLnVzZXJJZCA9PSB0aGlzLnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgYy5yaWdodHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSaWdodHMgY2hhbmdlZCB0byB0cnVlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xvc2VQaG90bygpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5waG90b1VybCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90byA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ29tbWVudChyZXN1bHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbW1lbnQgXCIgKyByZXN1bHQudGV4dCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJDYW5ub3QgaW5zZXJ0IGVtcHR5IGNvbW1lbnRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnRJZCA9IHRoaXMuc2VydmVyLnVwZGF0ZUNvbW1lbnQodGhpcy5waG90b0lkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCByZXN1bHQudGV4dCk7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50ID0gbmV3IENvbW1lbnQoY29tbWVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCByZXN1bHQudGV4dCk7XHJcbiAgICAgICAgICAgIGNvbW1lbnQucmlnaHRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy90aGlzLnBob3RvQ29tbWVudHMucHVzaChjb21tZW50KTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8uZ2V0Q29tbWVudHMoKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29tbWVudFJpZ2h0cygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzdWx0LnRleHQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDb21tZW50KGNvbW1lbnRJZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrIGNvbW1lbnQgaWQgXCIgKyBjb21tZW50SWQpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5yZW1vdmVDb21tZW50KGNvbW1lbnRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5nZXRDb21tZW50cygpO1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0NvbW1lbnRSaWdodHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVMaWtlcyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBhZGRpbmcgPSB0aGlzLmNhbkdpdmVMaWtlO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci51cGRhdGVMaWtlcyhpZCwgdGhpcy51c2VySWQsIGFkZGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuR2l2ZUxpa2UgPSAhdGhpcy5jYW5HaXZlTGlrZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShhZGRpbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb21pc2UudGhlbigoZnJvbVJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGZyb21SZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcy0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHRhcHBlZCBcIiArIGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==