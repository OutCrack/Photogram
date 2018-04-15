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
var Comment_1 = require("../../../shared/Comment");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(_changeDetectionRef, data) {
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
    GalleryComponent.prototype.selectPhoto = function (args) {
        this.selected = true;
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
        var photo = this.myPhotos.find(function (i) { return i.id === parseInt(args.view.id); });
        this.username = photo.user.firstN + " " + photo.user.lastN;
        this.photoId = photo.id;
        this.photoUrl = photo.url;
        this.photoCreated = photo.created;
        this.photoDescription = photo.description;
        this.photoComments = photo.comments;
    };
    GalleryComponent.prototype.closePhoto = function () {
        this.selected = false;
        this.photoUrl = "";
        this.photoCreated = "";
    };
    GalleryComponent.prototype.addComment = function (result) {
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        }
        else {
            this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            this.photoComments.push(new Comment_1.Comment(this.data.storage["id"], result.text));
            result.text = "";
        }
    };
    GalleryComponent.prototype.getEvents = function () {
        this.mEvents = !this.mEvents;
        if (this.mEvents) {
            this.participEvents = this.server.getMyEvents(this.data.storage["id"]);
            console.log("Events " + this.participEvents.length);
        }
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
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, Data_1.Data])
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBd0Q7QUFFeEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDckQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0IsNkNBQTRDO0FBQzVDLCtDQUE4QztBQUM5Qyx3REFBdUQ7QUFFdkQsbURBQWtEO0FBUWxEO0lBc0JJLDBCQUFvQixtQkFBc0MsRUFBVSxJQUFVO1FBQTFELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBcEI5RSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBSVgsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBaUJsRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG9DQUFTLEdBQWhCO1FBQUEsaUJBbUNDO1FBbENHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFD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QUMsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUExTlEsZ0JBQWdCO1FBTDVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFFLHNDQUFzQyxDQUFFO1NBQ3hELENBQUM7eUNBdUIyQyx3QkFBaUIsRUFBZ0IsV0FBSTtPQXRCckUsZ0JBQWdCLENBMk41QjtJQUFELHVCQUFDO0NBQUEsQUEzTkQsSUEyTkM7QUEzTlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBpbWFnZXBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXQvaW1hZ2UtYXNzZXRcIjtcbnZhciBiZ2h0dHAgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtaHR0cFwiKTtcbnZhciBzZXNzaW9uID0gYmdodHRwLnNlc3Npb24oXCJpbWFnZS11cGxvYWRcIik7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9Db21tZW50XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9Vc2VyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImdhbGxlcnktdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2dhbGxlcnkvZ2FsbGVyeS50YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcIi4vcGFnZXMvdGFicy9nYWxsZXJ5L2dhbGxlcnkudGFiLmNzc1wiIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgICBpdGVtcyA9IFtdO1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRQaG90bzogc3RyaW5nO1xuICAgIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gICAgcHVibGljIHBob3RvczogYm9vbGVhbjtcbiAgICBwdWJsaWMgbXlQaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9DcmVhdGVkOiBzdHJpbmc7XG4gICAgcHVibGljIG15RXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcHVibGljIHBhcnRpY2lwRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcHVibGljIHBob3RvSWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9EZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NvbW1lbnRzOiBBcnJheTxDb21tZW50PjtcbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIG1FdmVudHM6IGJvb2xlYW47XG4gICAgcHVibGljIHBhcnRpY2lwYW50czogQXJyYXk8VXNlcj5cbiAgICBwdWJsaWMgZXZlbnRTZWxlY3RlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICAvL3RoaXMuZ2V0UGhvdG9zKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBnYWxsZXJ5IGNvbnN0cnVjdG9yXCIpOyBcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyO1xuICAgICAgICB0aGlzLm1FdmVudHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5waG90b3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFydGljaXBhbnRzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBob3RvcygpIHtcbiAgICAgICAgaWYgKHRoaXMucGhvdG9zKSB7XG4gICAgICAgICAgICB0aGlzLnBob3RvcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5waG90b3MgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XG4gICAgICAgIHRoaXMubXlQaG90b3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcj11c2VyX0lkLGVxLFwiICsgdGhpcy5pZCArIFwiJm9yZGVyPWNyZWF0ZWRfYXQsZGVzY1wiO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZXMgbGVuZ3RoIGlzIFwiICsgci5maWxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5teVBob3Rvcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUGhvdG8oXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJzL1wiICsgdGhpcy5pZCArIFwiL1wiICsgci5maWxlc1tpXS5maWxlX1VSTCwgLy9uZWVkIHRvIGFkanVzdCB3aGVuIHBob3RvIGlzIGluIGV2ZW50IGNhdGFsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmNyZWF0ZWRfYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmFsYnVtX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX05hbWVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIGFyZSBcIiArIHRoaXMubXlQaG90b3MubGVuZ3RoICsgXCIgcGhvdG9zIGluIG15IHBob3Rvc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBhcmUgXCIgKyB0aGlzLm15UGhvdG9zLmxlbmd0aCArIFwiIHBob3RvcyBpbiBteSBwaG90b3NcIik7XG4gICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2VsZWN0UGhvdG8oYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgaWQgaXMgXCIgKyBhcmdzLnZpZXcuaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBldmVudCBuYW1lIGlzIFwiICsgYXJncy5ldmVudE5hbWUpO1xuICAgICAgICB2YXIgcGhvdG86IFBob3RvID0gdGhpcy5teVBob3Rvcy5maW5kKGkgPT4gaS5pZCA9PT0gcGFyc2VJbnQoYXJncy52aWV3LmlkKSk7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBwaG90by51c2VyLmZpcnN0TiArIFwiIFwiICsgcGhvdG8udXNlci5sYXN0TjtcbiAgICAgICAgdGhpcy5waG90b0lkID0gcGhvdG8uaWQ7XG4gICAgICAgIHRoaXMucGhvdG9VcmwgPSBwaG90by51cmw7XG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gcGhvdG8uY3JlYXRlZDtcbiAgICAgICAgdGhpcy5waG90b0Rlc2NyaXB0aW9uID0gcGhvdG8uZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucGhvdG9Db21tZW50cyA9IHBob3RvLmNvbW1lbnRzO1xuICAgIH1cblxuICAgIGNsb3NlUGhvdG8oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5waG90b1VybCA9IFwiXCI7XG4gICAgICAgIHRoaXMucGhvdG9DcmVhdGVkID0gXCJcIjtcbiAgICB9XG5cbiAgICBhZGRDb21tZW50KHJlc3VsdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbW1lbnQgXCIgKyByZXN1bHQudGV4dCk7XG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBhbGVydChcIkNhbm5vdCBpbnNlcnQgZW1wdHkgY29tbWVudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnVwZGF0ZUNvbW1lbnQodGhpcy5waG90b0lkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCByZXN1bHQudGV4dCk7XG4gICAgICAgICAgICB0aGlzLnBob3RvQ29tbWVudHMucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgQ29tbWVudCh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCByZXN1bHQudGV4dClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMubUV2ZW50cyA9ICF0aGlzLm1FdmVudHM7XG4gICAgICAgIGlmICh0aGlzLm1FdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMucGFydGljaXBFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRNeUV2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wYXJ0aWNpcEV2ZW50cy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICBcblxuICAgIH1cblxuICAgIG9wZW5HYWxsZXJ5KCkge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRUaW1lU3RhbXAoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSWQgXCIgKyB0aGlzLmlkKTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIiAvL1wibXVsdGlwbGVcIlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGluZyhjb250ZXh0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0U2VsZWN0aW5nKGNvbnRleHQpIHtcbiAgICAgICAgbGV0IF90aGF0ID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coXCJpbiBHYWxsZXJ5IGNvbnN0cnVjdG9yXCIpO1xuICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAuYXV0aG9yaXplKCkgXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfdGhhdC5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVyaTogXCIgKyBzZWxlY3RlZC51cmkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVVcmk6IFwiICsgc2VsZWN0ZWQuZmlsZVVyaSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGF0LnVwbG9hZFBob3RvKHNlbGVjdGVkLmZpbGVVcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7IFxuICAgICAgICAgICAgICAgIF90aGF0Lml0ZW1zID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIF90aGF0Ll9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpOyBcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGxvYWRQaG90byhmaWxlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gdGhpcy5nZXRUaW1lU3RhbXAoKTtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3Ojg4ODgvU2VydmVyLmpzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICAgICAgICAgICAgXCJGaWxlLU5hbWVcIjogZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgXCJVc2VyLWlkXCI6IHRoaXMuaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ7ICd1cGxvYWRpbmcnOiBmaWxlVXJsIH1cIlxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0YXNrID0gc2Vzc2lvbi51cGxvYWRGaWxlKGZpbGVVcmwsIHJlcXVlc3QpO1xuXG4gICAgICAgIHRhc2sub24oXCJwcm9ncmVzc1wiLCBsb2dFdmVudCk7XG4gICAgICAgIHRhc2sub24oXCJlcnJvclwiLCBsb2dFdmVudCk7XG4gICAgICAgIC8vb25seSB3aGVuIHVwbG9hZGluZyBpcyBjb21wbGV0ZSwgdXBkYXRlIHRoZSBkYXRhYmFzZVxuICAgICAgICB0YXNrLm9uKFwiY29tcGxldGVcIiwgbG9nRXZlbnQpOyBcbiBcbiAgICAgICAgZnVuY3Rpb24gbG9nRXZlbnQoZSkge1xuICAgICAgICAgICAgaWYgKGUuZXZlbnROYW1lID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRGIoZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBsb2FkIGNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5ldmVudE5hbWUpOyAgICAgICBcbiAgICAgICAgfSAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVEYihmaWxlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHZhciBuYW1lID0gXCJpbWdcIiArIGZpbGVOYW1lICsgXCIuanBnXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGlkIFwiICsgdGhpcy5pZCk7XG4gICAgICAgIGh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvZmlsZXMvXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgLy9wdXQgZmlsZSB1cmwgaW5zdGVhZCBvZiBqdXN0IG5hbWVcbiAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9JZCA6IHRoaXMuaWQsIGZpbGVfTmFtZSA6IG5hbWUsIGZpbGVfVVJMIDogbmFtZSwgXG4gICAgICAgICAgICBmaWxlX1Blcm1pc3Npb24gOiBcIlB1YmxpY1wifSlcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJlZCBcIiArIGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVTdGFtcCgpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpOyBcbiAgICAgICAgdmFyIHN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpICsgZGF0ZS5nZXRNb250aCgpLnRvU3RyaW5nKCkgKyBkYXRlLmdldERhdGUoKS50b1N0cmluZygpXG4gICAgICAgICAgICArIGRhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpICsgZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKSArXG4gICAgICAgICAgICArIGRhdGUuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkgKyBkYXRlLmdldE1pbGxpc2Vjb25kcygpLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgc2VsZWN0RXZlbnQoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgICAgICB2YXIgZXZlbnRJZCA9IHBhcnNlSW50KGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIHRoaXMucGFydGljaXBhbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0RXZlbnRQYXJ0aWNpcGFudHMoZXZlbnRJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnQgaWQgXCIgKyBldmVudElkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQYXJ0aWNpcGFudHMgXCIgKyB0aGlzLnBhcnRpY2lwYW50cy5sZW5ndGgpO1xuICAgICAgICB0aGlzLmV2ZW50U2VsZWN0ZWQgPSAhdGhpcy5ldmVudFNlbGVjdGVkO1xuICAgIH1cblxuICAgIGxlYXZlRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZuZXQgaWQgdGFwcGVkIFwiICsgZXZlbnRJZCArIFwiIHVzZXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGVhdmVFdmVudChldmVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgYWxlcnQoXCJFdmVudCByZW1vdmVkXCIpO1xuICAgICAgICB0aGlzLm1FdmVudHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRFdmVudHMoKTtcbiAgICB9XG59Il19