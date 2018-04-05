"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var imagepicker = require("nativescript-imagepicker");
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");
var Data_1 = require("../../../shared/Data");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(_changeDetectionRef, data) {
        this._changeDetectionRef = _changeDetectionRef;
        this.data = data;
        this.items = [];
    }
    GalleryComponent.prototype.openGallery = function () {
        this.id = this.data.storage["id"];
        console.log(this.getTimeStamp());
        console.log("Id" + this.id);
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
        http.request({
            //testing on wrong port nr, checking if it will update db
            url: "http://188.166.127.207:5555/api.php/files/13",
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
        var string = date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString()
            + date.getHours().toString() + date.getMinutes().toString() +
            +date.getSeconds().toString() + date.getMilliseconds().toString();
        return string;
    };
    GalleryComponent = __decorate([
        core_1.Component({
            selector: "gallery-tab",
            templateUrl: "./pages/tabs/gallery/gallery.tab.html"
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, Data_1.Data])
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBd0Q7QUFFeEQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDckQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsNkNBQTRDO0FBTTVDO0lBS0ksMEJBQW9CLG1CQUFzQyxFQUFVLElBQVU7UUFBMUQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFIOUUsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUlYLENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUksRUFBRSxRQUFRLENBQUMsWUFBWTtTQUM5QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyx5Q0FBYyxHQUF0QixVQUF1QixPQUFPO1FBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEMsT0FBTzthQUNGLFNBQVMs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USxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBRSxVQUFTLENBQUM7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVPLHVDQUFZLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Y0FDNUYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDM0QsQ0FBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQW5HUSxnQkFBZ0I7UUFKNUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx1Q0FBdUM7U0FDdkQsQ0FBQzt5Q0FNMkMsd0JBQWlCLEVBQWdCLFdBQUk7T0FMckUsZ0JBQWdCLENBc0c1QjtJQUFELHVCQUFDO0NBQUEsQUF0R0QsSUFzR0M7QUF0R1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBpbWFnZXBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXQvaW1hZ2UtYXNzZXRcIjtcbnZhciBiZ2h0dHAgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtaHR0cFwiKTtcbnZhciBzZXNzaW9uID0gYmdodHRwLnNlc3Npb24oXCJpbWFnZS11cGxvYWRcIik7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYWxsZXJ5LXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9nYWxsZXJ5L2dhbGxlcnkudGFiLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5Q29tcG9uZW50IHtcblxuICAgIGl0ZW1zID0gW107XG4gICAgcHVibGljIGlkOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcbiAgICB9XG5cbiAgICBvcGVuR2FsbGVyeSgpIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0VGltZVN0YW1wKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIklkXCIgKyB0aGlzLmlkKTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIiAvL1wibXVsdGlwbGVcIlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGluZyhjb250ZXh0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0U2VsZWN0aW5nKGNvbnRleHQpIHtcbiAgICAgICAgbGV0IF90aGF0ID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coXCJpbiBHYWxsZXJ5IGNvbnN0cnVjdG9yXCIpO1xuICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAuYXV0aG9yaXplKCkgXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfdGhhdC5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVyaTogXCIgKyBzZWxlY3RlZC51cmkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVVcmk6IFwiICsgc2VsZWN0ZWQuZmlsZVVyaSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGF0LnVwbG9hZFBob3RvKHNlbGVjdGVkLmZpbGVVcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7IFxuICAgICAgICAgICAgICAgIF90aGF0Lml0ZW1zID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIF90aGF0Ll9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpOyBcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGxvYWRQaG90byhmaWxlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gdGhpcy5nZXRUaW1lU3RhbXAoKTtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3Ojg4ODgvU2VydmVyLmpzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICAgICAgICAgICAgXCJGaWxlLU5hbWVcIjogZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgXCJVc2VyLWlkXCI6IHRoaXMuaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ7ICd1cGxvYWRpbmcnOiBmaWxlVXJsIH1cIlxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0YXNrID0gc2Vzc2lvbi51cGxvYWRGaWxlKGZpbGVVcmwsIHJlcXVlc3QpO1xuXG4gICAgICAgIHRhc2sub24oXCJwcm9ncmVzc1wiLCBsb2dFdmVudCk7XG4gICAgICAgIHRhc2sub24oXCJlcnJvclwiLCBsb2dFdmVudCk7XG4gICAgICAgIC8vb25seSB3aGVuIHVwbG9hZGluZyBpcyBjb21wbGV0ZSwgdXBkYXRlIHRoZSBkYXRhYmFzZVxuICAgICAgICB0YXNrLm9uKFwiY29tcGxldGVcIiwgbG9nRXZlbnQpOyBcbiBcbiAgICAgICAgZnVuY3Rpb24gbG9nRXZlbnQoZSkge1xuICAgICAgICAgICAgaWYgKGUuZXZlbnROYW1lID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRGIoZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBsb2FkIGNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZS5ldmVudE5hbWUpOyAgICAgICBcbiAgICAgICAgfSAgXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZURiKGZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdmFyIG5hbWUgPSBcImltZ1wiICsgZmlsZU5hbWUgKyBcIi5qcGdcIjtcbiAgICAgICAgaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgIC8vdGVzdGluZyBvbiB3cm9uZyBwb3J0IG5yLCBjaGVja2luZyBpZiBpdCB3aWxsIHVwZGF0ZSBkYlxuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL2ZpbGVzLzEzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgLy9wdXQgZmlsZSB1cmwgaW5zdGVhZCBvZiBqdXN0IG5hbWVcbiAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9JZCA6IHRoaXMuaWQsIGZpbGVfTmFtZSA6IG5hbWUsIGZpbGVfVVJMIDogbmFtZSwgXG4gICAgICAgICAgICBmaWxlX1Blcm1pc3Npb24gOiBcIlB1YmxpY1wifSlcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2UuY29udGVudC50b0pTT04oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJlZCBcIiArIGUpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGltZVN0YW1wKCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7IFxuICAgICAgICB2YXIgc3RyaW5nID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkgKyBkYXRlLmdldE1vbnRoKCkudG9TdHJpbmcoKSArIGRhdGUuZ2V0RGF5KCkudG9TdHJpbmcoKVxuICAgICAgICAgICAgKyBkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKSArIGRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgKyBkYXRlLmdldFNlY29uZHMoKS50b1N0cmluZygpICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKS50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cblxuXG59Il19