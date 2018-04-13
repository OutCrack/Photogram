"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../../../shared/Photo");
var Server_1 = require("../../../shared/Server/Server");
var Comment_1 = require("../../../shared/Comment");
var http = require("http");
var element_registry_1 = require("nativescript-angular/element-registry");
var Data_1 = require("../../../shared/Data");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_changeDetectionRef, data) {
        this._changeDetectionRef = _changeDetectionRef;
        this.data = data;
        this.site = "http://188.166.127.207:5555/api.php/";
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
        var query = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&filter[]=created_at,gt," + limitDate + "&filter[]=album_Id,is,null&order=created_at,desc";
        console.log("LIMIT DATE IN QUERY " + query);
        http.getJSON(query)
            .then(function (r) {
            //testing
            //console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                var albumName = getAlbumName(r.files[i].album_Id, _this.site);
                console.log("Album name " + albumName);
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].user_Id + albumName + "/" + r.files[i].file_URL, r.files[i].user_Id, (r.files[i].created_at).slice(0, 10), r.files[i].file_Description, r.files[i].album_id, r.files[i].file_Name));
                //testing
                //console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        });
        function getAlbumName(albumId, site) {
            var albumName = "";
            if (albumId != null) {
                var albumQuery = site + "albums?transform=1&filter=album_Id,eq," + albumId;
                console.log("QQQQQQQQQ" + albumQuery);
                http.getJSON(albumQuery)
                    .then(function (res) {
                    albumName += res.albums[0].album_Name;
                }, function (e) { console.log(e); });
                var replace = / /gi;
                albumName = "/" + albumName.replace(replace, "%20");
            }
            return albumName;
        }
        //get string that represents the day before yesterday
        function getLimitDate() {
            var date = new Date();
            console.log("Date is " + date.toDateString());
            date.setDate(date.getDate() - 2);
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
        this.selected = true;
        this.userId = this.data.storage["id"];
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
        var photo = this.photos.find(function (i) { return i.id === parseInt(args.view.id); });
        this.username = photo.user.firstN + " " + photo.user.lastN;
        this.photoId = photo.id;
        this.photoUrl = photo.url;
        this.photoCreated = photo.created;
        this.photoDescription = photo.description;
        this.photoComments = photo.comments;
        for (var _i = 0, _a = this.photoComments; _i < _a.length; _i++) {
            var c = _a[_i];
            console.log("Checking rights for comments");
            console.log("comment user id " + c.userId + " loggen in as " + this.userId);
            if (c.userId == this.userId) {
                c.rights = true;
                console.log("Rights changed to true");
            }
        }
        console.log("URL " + this.photoUrl);
    };
    HomeComponent.prototype.closePhoto = function () {
        this.selected = false;
        this.photoUrl = "";
        this.photoCreated = "";
    };
    HomeComponent.prototype.addComment = function (result) {
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        }
        else {
            this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            var comment = new Comment_1.Comment(this.data.storage["id"], result.text);
            comment.rights = true;
            this.photoComments.push(comment);
            result.text = "";
        }
    };
    HomeComponent.prototype.removeComment = function (result) {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home-tab",
            templateUrl: "./pages/tabs/home/home.tab.html",
            styleUrls: ["./pages/tabs/home/home.tab.css"]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, Data_1.Data])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBQ3ZELG1EQUFrRDtBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsMEVBQXdFO0FBRXhFLDZDQUE0QztBQUc1QyxrQ0FBZSxDQUFDLGVBQWUsRUFBRyxjQUFLLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFRNUY7SUFjSSx1QkFBb0IsbUJBQXNDLEVBQVUsSUFBVTtRQUExRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWI5RSxTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFjbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ1osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsVUFBVSxDQUFDO1lBQ1AsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELDhDQUE4QztJQUM5QyxpQ0FBUyxHQUFUO1FBQ0ksNkJBQTZCO1FBQzdCLDBDQUEwQztRQUMxQyx3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QUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRSxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxNQUFNO0lBRXBCLENBQUM7SUExSlEsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBRSxnQ0FBZ0MsQ0FBRTtTQUNsRCxDQUFDO3lDQWdCMkMsd0JBQWlCLEVBQWdCLFdBQUk7T0FkckUsYUFBYSxDQTRKekI7SUFBRCxvQkFBQztDQUFBLEFBNUpELElBNEpDO0FBNUpZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1VzZXJcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvQ29tbWVudFwiO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5cbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiAsICgpPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xuIFxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaG9tZS10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuICAgIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gICAgLy9mb3Igc3RvcmluZyBmZXRjaGVkIHBob3Rvc1xuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBwaG90b0lkOiBudW1iZXI7XG4gICAgcHVibGljIHBob3RvVXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHBob3RvQ3JlYXRlZDogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0Rlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHVibGljIHBob3RvQ29tbWVudHM6IEFycmF5PENvbW1lbnQ+O1xuICAgIHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluIGhvbWUgY29uc3RydWN0b3JcIik7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5waG90b0lkID0gMDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaEZlZWQoYXJncykge1xuICAgICAgICB0aGlzLmdldFBob3RvcygpO1xuICAgICAgICB2YXIgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLy9nZXQgcGhvdG9zIGZyb20gZGIsIHB1dCB0aGVtIGluIHBob3RvcyBhcnJheVxuICAgIGdldFBob3RvcygpIHtcbiAgICAgICAgLy92YXIgX3NlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgLy90aGlzLnBob3RvcyA9IF9zZXJ2ZXIuZ2V0UHVibGljUGhvdG9zKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJIYXZlIFwiICsgdGhpcy5waG90b3MubGVuZ3RoICsgXCIgcGhvdG9zXCIpO1xuICAgICAgICBcbiAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJJbiBnZXRQaG90b3NcIik7XG4gICAgICAgIHRoaXMucGhvdG9zID0gbmV3IEFycmF5KCk7XG4gICAgICAgIC8vZ2V0IHB1YmxpYyBwaG90b3MgdGhhdCBhcmUgbm90IGNvbm5lY3RlZCB0byBhIGV2ZW50LCBhcmUgbm90IGluIGFuIGFsYnVtIGFuZCBhcmUgbWF4IDIgZGF5cyBvbGRcbiAgICAgICAgdmFyIGxpbWl0RGF0ZTogc3RyaW5nID0gZ2V0TGltaXREYXRlKCk7XG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJmaWxlcz90cmFuc2Zvcm09MSZmaWx0ZXJbXT1maWxlX1Blcm1pc3Npb24sZXEscHVibGljJmZpbHRlcltdPWV2ZW50X0lkLGlzLG51bGwmZmlsdGVyW109Y3JlYXRlZF9hdCxndCxcIiArIGxpbWl0RGF0ZSArIFwiJmZpbHRlcltdPWFsYnVtX0lkLGlzLG51bGwmb3JkZXI9Y3JlYXRlZF9hdCxkZXNjXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTElNSVQgREFURSBJTiBRVUVSWSBcIiArIHF1ZXJ5KTtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRmlsZXMubGVuZ3RoIGlzXCIgKyByLmZpbGVzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYWxidW1OYW1lID0gZ2V0QWxidW1OYW1lKHIuZmlsZXNbaV0uYWxidW1fSWQsIHRoaXMuc2l0ZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbGJ1bSBuYW1lIFwiICsgYWxidW1OYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBob3Rvcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUGhvdG8oXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJzL1wiICsgci5maWxlc1tpXS51c2VyX0lkICsgYWxidW1OYW1lICsgXCIvXCIgKyByLmZpbGVzW2ldLmZpbGVfVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS51c2VyX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHIuZmlsZXNbaV0uY3JlYXRlZF9hdCkuc2xpY2UoMCwxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmFsYnVtX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX05hbWVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHIuZmlsZXNbaV0uZmlsZV9VUkwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsYnVtTmFtZShhbGJ1bUlkOiBudW1iZXIsIHNpdGU6IHN0cmluZykge1xuICAgICAgICAgICAgdmFyIGFsYnVtTmFtZSA9IFwiXCI7XG4gICAgICAgIGlmIChhbGJ1bUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBhbGJ1bVF1ZXJ5ID0gc2l0ZSArIFwiYWxidW1zP3RyYW5zZm9ybT0xJmZpbHRlcj1hbGJ1bV9JZCxlcSxcIiArIGFsYnVtSWQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlFRUVFRUVFRUVwiICsgYWxidW1RdWVyeSk7XG4gICAgICAgICAgICBodHRwLmdldEpTT04oYWxidW1RdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBhbGJ1bU5hbWUgKz0gcmVzLmFsYnVtc1swXS5hbGJ1bV9OYW1lO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSkgeyBjb25zb2xlLmxvZyhlKTt9KTtcbiAgICAgICAgICAgIHZhciByZXBsYWNlID0gLyAvZ2k7XG4gICAgICAgICAgICBhbGJ1bU5hbWUgPSBcIi9cIiArIGFsYnVtTmFtZS5yZXBsYWNlKHJlcGxhY2UsIFwiJTIwXCIpO1xuICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWxidW1OYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9nZXQgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUgZGF5IGJlZm9yZSB5ZXN0ZXJkYXlcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGltaXREYXRlKCkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRlIGlzIFwiICsgZGF0ZS50b0RhdGVTdHJpbmcoKSk7XG4gICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCktMik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRhdGUgbmV3IGRhdGUgaXMgXCIgKyBkYXRlLnRvRGF0ZVN0cmluZygpKTtcbiAgICAgICAgICAgIHZhciBkYXRlU3RyaW5nID0gZGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCI7XG4gICAgICAgICAgICB2YXIgbW9udGg6IG51bWJlciA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICBpZiAobW9udGggPCAxMCkge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCIwXCIgKyBtb250aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiLVwiO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXkgXCIgKyBkYXRlLmdldERhdGUoKSlcbiAgICAgICAgICAgIGlmIChkYXRlLmdldERheSgpIDwgMTApIHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiMFwiICsgZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkYXRlIFwiICsgZGF0ZVN0cmluZyk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICAgICAgfVxuICAgICAgIFxuICAgIH1cblxuICAgIHNlbGVjdFBob3RvKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgaWQgaXMgXCIgKyBhcmdzLnZpZXcuaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBldmVudCBuYW1lIGlzIFwiICsgYXJncy5ldmVudE5hbWUpO1xuICAgICAgICB2YXIgcGhvdG86IFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IHBhcnNlSW50KGFyZ3Mudmlldy5pZCkpO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gcGhvdG8udXNlci5maXJzdE4gKyBcIiBcIiArIHBob3RvLnVzZXIubGFzdE47XG4gICAgICAgIHRoaXMucGhvdG9JZCA9IHBob3RvLmlkO1xuICAgICAgICB0aGlzLnBob3RvVXJsID0gcGhvdG8udXJsO1xuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IHBob3RvLmNyZWF0ZWQ7XG4gICAgICAgIHRoaXMucGhvdG9EZXNjcmlwdGlvbiA9IHBob3RvLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMgPSBwaG90by5jb21tZW50cztcbiAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLnBob3RvQ29tbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgcmlnaHRzIGZvciBjb21tZW50c1wiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tbWVudCB1c2VyIGlkIFwiICsgYy51c2VySWQgKyBcIiBsb2dnZW4gaW4gYXMgXCIgKyB0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBpZiAoYy51c2VySWQgPT0gdGhpcy51c2VySWQpIHtcbiAgICAgICAgICAgICAgICBjLnJpZ2h0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSaWdodHMgY2hhbmdlZCB0byB0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVVJMIFwiICsgdGhpcy5waG90b1VybCk7XG4gICAgfVxuXG4gICAgY2xvc2VQaG90bygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBob3RvVXJsID0gXCJcIjtcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSBcIlwiO1xuICAgIH1cblxuICAgIGFkZENvbW1lbnQocmVzdWx0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29tbWVudCBcIiArIHJlc3VsdC50ZXh0KTtcbiAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IGluc2VydCBlbXB0eSBjb21tZW50XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIudXBkYXRlQ29tbWVudCh0aGlzLnBob3RvSWQsIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIHJlc3VsdC50ZXh0KTtcbiAgICAgICAgICAgIHZhciBjb21tZW50ID0gbmV3IENvbW1lbnQodGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgcmVzdWx0LnRleHQpO1xuICAgICAgICAgICAgY29tbWVudC5yaWdodHMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVDb21tZW50KHJlc3VsdCkge1xuXG4gICAgfVxuXG59Il19