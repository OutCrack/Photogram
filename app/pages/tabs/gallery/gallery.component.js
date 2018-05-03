"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var imagepicker = require("nativescript-imagepicker");
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");
var Data_1 = require("../../../shared/Data");
var Photo_1 = require("../../../shared/Photo");
var Server_1 = require("../../../shared/Server/Server");
var router_1 = require("@angular/router");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(router, _changeDetectionRef, data) {
        this.router = router;
        this._changeDetectionRef = _changeDetectionRef;
        this.data = data;
        this.items = [];
        this.site = "http://188.166.127.207:5555/api.php/";
        //this.getPhotos();
        this.selected = false;
        console.log("In gallery constructor");
        this.server = new Server_1.Server;
        this.mEvents = false;
        this.photos = false;
        this.eventSelected = false;
        this.participants = [];
    }
    GalleryComponent.prototype.getPhotos = function () {
        var _this = this;
        if (this.photos) {
            this.photos = false;
        }
        else {
            this.photos = true;
            this.id = this.data.storage["id"];
            this.myPhotos = new Array();
            var query = this.site + "files?transform=1&filter=user_Id,eq," + this.id + "&order=created_at,desc";
            http.getJSON(query)
                .then(function (r) {
                //testing
                console.log("Files length is " + r.files.length);
                for (var i = 0; i < r.files.length; i++) {
                    _this.myPhotos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + _this.id + "/" + r.files[i].file_URL, //need to adjust when photo is in event catalog
                    _this.id, r.files[i].created_at, r.files[i].file_Description, r.files[i].album_Id, r.files[i].file_Name));
                    console.log("There are " + _this.myPhotos.length + " photos in my photos");
                }
            }, function (e) {
                console.log(e);
            }).then(function () {
                //testing
                console.log("There are " + _this.myPhotos.length + " photos in my photos");
            });
        }
    };
    GalleryComponent.prototype.removePhoto = function (photoId, fileName) {
        var _this = this;
        console.log(photoId);
        console.log(fileName);
        this.server.removePhoto(photoId).then(function () {
            _this.server.deletePhoto(_this.data.storage["id"], fileName, "photo", photoId);
            _this.photos = false;
            _this.getPhotos();
        }).catch(function () {
            alert("Error deleting photo. Please try again later");
        });
    };
    GalleryComponent.prototype.selectPhoto = function (args) {
        this.selected = true;
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
        this.selectedId = parseInt(args.view.id);
        this.getPhoto(this.selectedId);
    };
    GalleryComponent.prototype.getPhoto = function (id) {
        var _this = this;
        this.selectedPhoto = this.myPhotos.find(function (i) { return i.id === id; });
        this.username = this.selectedPhoto.user.firstN + " " + this.selectedPhoto.user.lastN;
        this.photoId = this.selectedPhoto.id;
        this.photoUrl = this.selectedPhoto.url;
        this.photoCreated = this.selectedPhoto.created;
        this.photoDescription = this.selectedPhoto.description;
        this.photoComments = this.selectedPhoto.comments;
        this.server.getLikes(this.photoId, this.data.storage["id"]).then(function (result) {
            _this.selectedPhoto.likes = _this.selectedPhoto.likes = parseInt(JSON.stringify(result));
        }).catch(function (reject) {
            _this.selectedPhoto.likes = _this.selectedPhoto.likes = parseInt(JSON.stringify(reject));
        });
    };
    GalleryComponent.prototype.closePhoto = function () {
        this.selected = false;
        this.selectedPhoto = null;
        this.photoUrl = "";
        this.photoCreated = "";
        this.selectedId = 0;
    };
    GalleryComponent.prototype.addComment = function (result) {
        var _this = this;
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        }
        else {
            var commentId = this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            //var comment = new Comment(commentId, this.data.storage["id"], result.text);
            //comment.rights = true;
            //this.photoComments.push(comment);
            this.getPhoto(this.selectedId);
            this.selectedPhoto.getComments().then(function () {
                _this.photoComments = _this.selectedPhoto.comments;
            });
        }
        result.text = "";
    };
    GalleryComponent.prototype.removeComment = function (commentId) {
        var _this = this;
        console.log("You click comment id " + commentId);
        var promise = new Promise(function (resolve, reject) {
            _this.server.removeComment(commentId);
            _this.getPhoto(_this.selectedId);
            resolve();
        });
        promise.then(function () {
            _this.selectedPhoto.getComments().then(function () {
                _this.photoComments = _this.selectedPhoto.comments;
            });
        });
    };
    GalleryComponent.prototype.getEvents = function () {
        this.mEvents = !this.mEvents;
        if (this.mEvents) {
            this.participEvents = this.server.getMyEvents(this.data.storage["id"]);
            console.log("Events " + this.participEvents.length);
        }
    };
    GalleryComponent.prototype.newEvent = function () {
        console.log("New Event tapped");
        //this.router.navigate(["/e svent"]);
    };
    GalleryComponent.prototype.openGallery = function () {
        this.id = this.data.storage["id"];
        console.log(this.getTimeStamp());
        console.log("Id " + this.id);
        var context = imagepicker.create({
            mode: "single" //"multiple"
        });
        this.startSelecting(context);
    };
    GalleryComponent.prototype.startSelecting = function (context) {
        var _that = this;
        console.log("in Gallery constructor");
        context
            .authorize()
            .then(function () {
            _that.items = [];
            return context.present();
        })
            .then(function (selection) {
            selection.forEach(function (selected) {
                console.log("----------------");
                console.log("uri: " + selected.uri);
                console.log("fileUri: " + selected.fileUri);
                _that.uploadPhoto(selected.fileUri);
            });
            _that.items = selection;
            _that._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    };
    GalleryComponent.prototype.uploadPhoto = function (fileUrl) {
        var fileName = this.getTimeStamp();
        var that = this;
        var request = {
            url: "http://188.166.127.207:8888/Server.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Path": "users/",
                "File-Name": fileName,
                "User-id": this.id
            },
            description: "{ 'uploading': fileUrl }"
        };
        var task = session.uploadFile(fileUrl, request);
        task.on("progress", logEvent);
        task.on("error", logEvent);
        //only when uploading is complete, update the database
        task.on("complete", logEvent);
        function logEvent(e) {
            if (e.eventName == "complete") {
                that.updateDb(fileName);
                alert("Upload complete");
            }
            console.log(e.eventName);
        }
    };
    GalleryComponent.prototype.updateDb = function (fileName) {
        var result;
        var name = "img" + fileName + ".jpg";
        console.log("The id " + this.id);
        http.request({
            url: "http://188.166.127.207:5555/api.php/files/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //put file url instead of just name
            content: JSON.stringify({ user_Id: this.id, file_Name: name, file_URL: name,
                file_Permission: "Public" })
        }).then(function (response) {
            result = response.content.toJSON();
            console.log(result);
        }, function (e) {
            console.log("Error occured " + e);
        });
    };
    GalleryComponent.prototype.getTimeStamp = function () {
        var date = new Date();
        var string = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString()
            + date.getHours().toString() + date.getMinutes().toString() +
            +date.getSeconds().toString() + date.getMilliseconds().toString();
        return string;
    };
    GalleryComponent.prototype.selectEvent = function (args) {
        var eventId = parseInt(args.view.id);
        this.participants = this.server.getEventParticipants(eventId);
        console.log("Event id " + eventId);
        console.log("Participants " + this.participants.length);
        this.eventSelected = !this.eventSelected;
    };
    GalleryComponent.prototype.leaveEvent = function (eventId) {
        console.log("Evnet id tapped " + eventId + " user id " + this.data.storage["id"]);
        this.server.leaveEvent(eventId, this.data.storage["id"]);
        alert("Event removed");
        this.mEvents = false;
        this.getEvents();
    };
    GalleryComponent = __decorate([
        core_1.Component({
            selector: "gallery-tab",
            templateUrl: "./pages/tabs/gallery/gallery.tab.html",
            styleUrls: ["./pages/tabs/gallery/gallery.tab.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, core_1.ChangeDetectorRef, Data_1.Data])
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBd0Q7QUFFeEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDckQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0IsNkNBQTRDO0FBQzVDLCtDQUE4QztBQUM5Qyx3REFBdUQ7QUFJdkQsMENBQXlDO0FBT3pDO0lBd0JJLDBCQUFvQixNQUFjLEVBQVUsbUJBQXNDLEVBQVUsSUFBVTtRQUFsRixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFyQnRHLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHWCxTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFtQmxELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sb0NBQVMsR0FBaEI7UUFBQSxpQkFrQ0M7UUFqQ0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFD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QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUF2UVEsZ0JBQWdCO1FBTDVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFFLHNDQUFzQyxDQUFFO1NBQ3hELENBQUM7eUNBeUI4QixlQUFNLEVBQStCLHdCQUFpQixFQUFnQixXQUFJO09BeEI3RixnQkFBZ0IsQ0F3UTVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhRRCxJQXdRQztBQXhRWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGltYWdlcGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldFwiO1xudmFyIGJnaHR0cCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYmFja2dyb3VuZC1odHRwXCIpO1xudmFyIHNlc3Npb24gPSBiZ2h0dHAuc2Vzc2lvbihcImltYWdlLXVwbG9hZFwiKTtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRXZlbnRcIjtcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0NvbW1lbnRcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1VzZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImdhbGxlcnktdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2dhbGxlcnkvZ2FsbGVyeS50YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcIi4vcGFnZXMvdGFicy9nYWxsZXJ5L2dhbGxlcnkudGFiLmNzc1wiIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgcGljdHVyZTogYW55O1xuICAgIGl0ZW1zID0gW107XG4gICAgcHVibGljIGlkOiBhbnk7XG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gICAgcHVibGljIHBob3RvczogYm9vbGVhbjtcbiAgICBwdWJsaWMgbXlQaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9DcmVhdGVkOiBzdHJpbmc7XG4gICAgcHVibGljIG15RXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcHVibGljIHBhcnRpY2lwRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcHVibGljIHBob3RvSWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9EZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIG1FdmVudHM6IGJvb2xlYW47XG4gICAgcHVibGljIHBhcnRpY2lwYW50czogQXJyYXk8VXNlcj5cbiAgICBwdWJsaWMgZXZlbnRTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRQaG90bzogUGhvdG87XG4gICAgcHVibGljIHNlbGVjdGVkSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICAvL3RoaXMuZ2V0UGhvdG9zKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBnYWxsZXJ5IGNvbnN0cnVjdG9yXCIpOyBcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyO1xuICAgICAgICB0aGlzLm1FdmVudHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5waG90b3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFydGljaXBhbnRzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBob3RvcygpIHtcbiAgICAgICAgaWYgKHRoaXMucGhvdG9zKSB7XG4gICAgICAgICAgICB0aGlzLnBob3RvcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5waG90b3MgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XG4gICAgICAgIHRoaXMubXlQaG90b3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcj11c2VyX0lkLGVxLFwiICsgdGhpcy5pZCArIFwiJm9yZGVyPWNyZWF0ZWRfYXQsZGVzY1wiO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZXMgbGVuZ3RoIGlzIFwiICsgci5maWxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5teVBob3Rvcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUGhvdG8oXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJzL1wiICsgdGhpcy5pZCArIFwiL1wiICsgci5maWxlc1tpXS5maWxlX1VSTCwgLy9uZWVkIHRvIGFkanVzdCB3aGVuIHBob3RvIGlzIGluIGV2ZW50IGNhdGFsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmNyZWF0ZWRfYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmFsYnVtX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX05hbWVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIGFyZSBcIiArIHRoaXMubXlQaG90b3MubGVuZ3RoICsgXCIgcGhvdG9zIGluIG15IHBob3Rvc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBhcmUgXCIgKyB0aGlzLm15UGhvdG9zLmxlbmd0aCArIFwiIHBob3RvcyBpbiBteSBwaG90b3NcIik7XG4gICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlUGhvdG8ocGhvdG9JZDogbnVtYmVyLCBmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBob3RvSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhmaWxlTmFtZSk7XG4gICAgICAgIHRoaXMuc2VydmVyLnJlbW92ZVBob3RvKHBob3RvSWQpLnRoZW4oKCk9PiB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci5kZWxldGVQaG90byh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCBmaWxlTmFtZSwgXCJwaG90b1wiLCBwaG90b0lkKTtcbiAgICAgICAgICAgIHRoaXMucGhvdG9zID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdldFBob3RvcygpO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yIGRlbGV0aW5nIHBob3RvLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RQaG90byhhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBpZCBpcyBcIiArIGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZCA9IHBhcnNlSW50KGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG8odGhpcy5zZWxlY3RlZElkKTtcbiAgICB9XG5cbiAgICBnZXRQaG90byhpZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90byA9IHRoaXMubXlQaG90b3MuZmluZChpID0+IGkuaWQgPT09IGlkKTtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRoaXMuc2VsZWN0ZWRQaG90byAudXNlci5maXJzdE4gKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRQaG90byAudXNlci5sYXN0TjtcbiAgICAgICAgdGhpcy5waG90b0lkID0gdGhpcy5zZWxlY3RlZFBob3RvIC5pZDtcbiAgICAgICAgdGhpcy5waG90b1VybCA9IHRoaXMuc2VsZWN0ZWRQaG90byAudXJsO1xuICAgICAgICB0aGlzLnBob3RvQ3JlYXRlZCA9IHRoaXMuc2VsZWN0ZWRQaG90byAuY3JlYXRlZDtcbiAgICAgICAgdGhpcy5waG90b0Rlc2NyaXB0aW9uID0gdGhpcy5zZWxlY3RlZFBob3RvIC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5waG90b0NvbW1lbnRzID0gdGhpcy5zZWxlY3RlZFBob3RvIC5jb21tZW50cztcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZ2V0TGlrZXModGhpcy5waG90b0lkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcyA9IHRoaXMuc2VsZWN0ZWRQaG90by5saWtlcyA9IHBhcnNlSW50KEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgICB9KS5jYXRjaCgocmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMgPSB0aGlzLnNlbGVjdGVkUGhvdG8ubGlrZXMgPSBwYXJzZUludChKU09OLnN0cmluZ2lmeShyZWplY3QpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xvc2VQaG90bygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8gPSBudWxsO1xuICAgICAgICB0aGlzLnBob3RvVXJsID0gXCJcIjtcbiAgICAgICAgdGhpcy5waG90b0NyZWF0ZWQgPSBcIlwiO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWQgPSAwO1xuICAgIH1cblxuICAgIGFkZENvbW1lbnQocmVzdWx0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29tbWVudCBcIiArIHJlc3VsdC50ZXh0KTtcbiAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IGluc2VydCBlbXB0eSBjb21tZW50XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnRJZCA9IHRoaXMuc2VydmVyLnVwZGF0ZUNvbW1lbnQodGhpcy5waG90b0lkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCByZXN1bHQudGV4dCk7XG4gICAgICAgICAgICAvL3ZhciBjb21tZW50ID0gbmV3IENvbW1lbnQoY29tbWVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCByZXN1bHQudGV4dCk7XG4gICAgICAgICAgICAvL2NvbW1lbnQucmlnaHRzID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vdGhpcy5waG90b0NvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgICAgICAgICB0aGlzLmdldFBob3RvKHRoaXMuc2VsZWN0ZWRJZCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGhvdG8uZ2V0Q29tbWVudHMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMgPSB0aGlzLnNlbGVjdGVkUGhvdG8uY29tbWVudHM7XG4gICAgICAgICAgICB9KTsgfVxuICAgICAgICByZXN1bHQudGV4dCA9IFwiXCI7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ29tbWVudChjb21tZW50SWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJZb3UgY2xpY2sgY29tbWVudCBpZCBcIiArIGNvbW1lbnRJZCk7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIucmVtb3ZlQ29tbWVudChjb21tZW50SWQpO1xuICAgICAgICAgICAgdGhpcy5nZXRQaG90byh0aGlzLnNlbGVjdGVkSWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaG90by5nZXRDb21tZW50cygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9Db21tZW50cyA9IHRoaXMuc2VsZWN0ZWRQaG90by5jb21tZW50cztcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RXZlbnRzKCkge1xuICAgICAgICB0aGlzLm1FdmVudHMgPSAhdGhpcy5tRXZlbnRzO1xuICAgICAgICBpZiAodGhpcy5tRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2lwRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0TXlFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucGFydGljaXBFdmVudHMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld0V2ZW50KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IEV2ZW50IHRhcHBlZFwiKTtcbiAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZSBzdmVudFwiXSk7XG4gICAgfVxuXG4gICAgb3BlbkdhbGxlcnkoKSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldFRpbWVTdGFtcCgpKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJJZCBcIiArIHRoaXMuaWQpO1xuICAgICAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiIC8vXCJtdWx0aXBsZVwiXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0aW5nKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRTZWxlY3RpbmcoY29udGV4dCkge1xuICAgICAgICBsZXQgX3RoYXQgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLmxvZyhcImluIEdhbGxlcnkgY29uc3RydWN0b3JcIik7XG4gICAgICAgIGNvbnRleHRcbiAgICAgICAgICAgIC5hdXRob3JpemUoKSBcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF90aGF0Lml0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXJpOiBcIiArIHNlbGVjdGVkLnVyaSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZVVyaTogXCIgKyBzZWxlY3RlZC5maWxlVXJpKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoYXQudXBsb2FkUGhvdG8oc2VsZWN0ZWQuZmlsZVVyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTsgXG4gICAgICAgICAgICAgICAgX3RoYXQuaXRlbXMgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgX3RoYXQuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7IFxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwbG9hZFBob3RvKGZpbGVVcmw6IHN0cmluZykge1xuICAgICAgICB2YXIgZmlsZU5hbWUgPSB0aGlzLmdldFRpbWVTdGFtcCgpO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6ODg4OC9TZXJ2ZXIuanNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIixcbiAgICAgICAgICAgICAgICBcIlBhdGhcIiA6IFwidXNlcnMvXCIsXG4gICAgICAgICAgICAgICAgXCJGaWxlLU5hbWVcIjogZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgXCJVc2VyLWlkXCI6IHRoaXMuaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ7ICd1cGxvYWRpbmcnOiBmaWxlVXJsIH1cIlxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0YXNrID0gc2Vzc2lvbi51cGxvYWRGaWxlKGZpbGVVcmwsIHJlcXVlc3QpO1xuXG4gICAgICAgIHRhc2sub24oXCJwcm9ncmVzc1wiLCBsb2dFdmVudCk7XG4gICAgICAgIHRhc2sub24oXCJlcnJvclwiLCBsb2dFdmVudCk7XG4gICAgICAgIC8vb25seSB3aGVuIHVwbG9hZGluZyBpcyBjb21wbGV0ZSwgdXBkYXRlIHRoZSBkYXRhYmFzZVxuICAgICAgICB0YXNrLm9uKFwiY29tcGxldGVcIiwgbG9nRXZlbnQpOyBcbiBcbiAgICAgICAgZnVuY3Rpb24gbG9nRXZlbnQoZSkge1xuICAgICAgICAgICAgaWYgKGUuZXZlbnROYW1lID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRGIoZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBsb2FkIGNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5ldmVudE5hbWUpOyAgICAgICBcbiAgICAgICAgfSAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVEYihmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHZhciBuYW1lID0gXCJpbWdcIiArIGZpbGVOYW1lICsgXCIuanBnXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGlkIFwiICsgdGhpcy5pZCk7XG4gICAgICAgIGh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvZmlsZXMvXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgLy9wdXQgZmlsZSB1cmwgaW5zdGVhZCBvZiBqdXN0IG5hbWVcbiAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9JZCA6IHRoaXMuaWQsIGZpbGVfTmFtZSA6IG5hbWUsIGZpbGVfVVJMIDogbmFtZSwgXG4gICAgICAgICAgICBmaWxlX1Blcm1pc3Npb24gOiBcIlB1YmxpY1wifSlcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJlZCBcIiArIGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVTdGFtcCgpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpOyBcbiAgICAgICAgdmFyIHN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpICsgZGF0ZS5nZXRNb250aCgpLnRvU3RyaW5nKCkgKyBkYXRlLmdldERhdGUoKS50b1N0cmluZygpXG4gICAgICAgICAgICArIGRhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpICsgZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKSArXG4gICAgICAgICAgICArIGRhdGUuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkgKyBkYXRlLmdldE1pbGxpc2Vjb25kcygpLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgc2VsZWN0RXZlbnQoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgICAgICB2YXIgZXZlbnRJZCA9IHBhcnNlSW50KGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIHRoaXMucGFydGljaXBhbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0RXZlbnRQYXJ0aWNpcGFudHMoZXZlbnRJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgaWQgXCIgKyBldmVudElkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQYXJ0aWNpcGFudHMgXCIgKyB0aGlzLnBhcnRpY2lwYW50cy5sZW5ndGgpO1xuICAgICAgICB0aGlzLmV2ZW50U2VsZWN0ZWQgPSAhdGhpcy5ldmVudFNlbGVjdGVkO1xuICAgIH1cblxuICAgIGxlYXZlRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZuZXQgaWQgdGFwcGVkIFwiICsgZXZlbnRJZCArIFwiIHVzZXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGVhdmVFdmVudChldmVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgYWxlcnQoXCJFdmVudCByZW1vdmVkXCIpO1xuICAgICAgICB0aGlzLm1FdmVudHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRFdmVudHMoKTtcbiAgICB9XG59Il19