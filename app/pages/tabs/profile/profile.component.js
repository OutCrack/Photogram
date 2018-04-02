"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../../../shared/Photo");
var router_1 = require("@angular/router");
var Data_1 = require("../../../shared/Data");
var http = require("http");
var layout = require("ui/layouts/grid-layout");
var firebase = require("nativescript-plugin-firebase");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(router, data) {
        this.router = router;
        this.data = data;
        this.site = "http://188.166.127.207:5555/api.php/";
        console.log(JSON.stringify("OooooooooooOooooooooOOOOOOOOOOOOOOOOOOOO" + this.data.storage));
        this.profile = false;
        this.photos = false;
    }
    ProfileComponent.prototype.showInfo = function () {
        if (this.profile) {
            this.profile = false;
        }
        else {
            this.profile = true;
        }
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        console.log("Users name" + this.firstName + " " + this.lastName + " " + this.id);
    };
    ProfileComponent.prototype.showPhotos = function () {
        this.showInfo();
        this.profile = false;
        if (this.photos) {
            this.photos = false;
        }
        else {
            this.photos = true;
            this.getPhotos();
        }
    };
    ProfileComponent.prototype.getPhotos = function () {
        var _this = this;
        //get all photos uploaded by current user
        this.myPhotos = new Array();
        var query = this.site + "files?transform=1&filter=user_Id,eq," + this.id;
        http.getJSON(query)
            .then(function (r) {
            //testing
            console.log("Files length is " + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                _this.myPhotos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].file_URL, //need to adjust when photo is in event catalog
                _this.id, r.files[i].created_at));
            }
        }, function (e) {
            console.log(e);
        }).then(function () {
            //testing
            console.log("There are " + _this.myPhotos.length + " photos in my photos");
            /*for (var i = 0; i < this.myPhotos.length; i++) {
                let image = new Image();
                image.src = this.myPhotos.pop().url;
                this.gridLayout.addChild(image);
            }*/
        });
    };
    ProfileComponent.prototype.selectPhoto = function (args) {
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
    };
    //logs out from both Google+ and Facebook accounts
    ProfileComponent.prototype.logout = function () {
        var router = this.router;
        this.data.storage = {};
        firebase.logout();
        router.navigate([""]);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "profile-tab",
            templateUrl: "./pages/tabs/profile/profile.tab.html",
            styleUrls: ["./pages/tabs/profile/profile-tab.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, Data_1.Data])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMsMENBQXlEO0FBR3pELDZDQUE0QztBQUU1QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFHL0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFRekQ7SUFXSSwwQkFBb0IsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFIdEQsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBSWxELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxP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Q2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUF0RlksZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO1NBQ3RELENBQUM7eUNBYThCLGVBQU0sRUFBZ0IsV0FBSTtPQVg3QyxnQkFBZ0IsQ0F3RjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhGRCxJQXdGQztBQXhGWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1Bob3RvXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSBcIi4uL3RhYi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1VzZXJcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlcy9nZXN0dXJlc1wiO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiKTtcblxuXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9maWxlLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUtdGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQge1xuXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIHB1YmxpYyBwcm9maWxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBwaG90b3M6IGJvb2xlYW47XG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcbiAgICBwdWJsaWMgbXlQaG90b3M6IEFycmF5PFBob3RvPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShcIk9vb29vb29vb29vT29vb29vb29vT09PT09PT09PT09PT09PT09PT09cIiArIHRoaXMuZGF0YS5zdG9yYWdlKSk7XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBob3RvcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3dJbmZvKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9maWxlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJmaXJzdE5hbWVcIl07XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImxhc3ROYW1lXCJdO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZW1haWxcIl07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlcnMgbmFtZVwiICsgdGhpcy5maXJzdE5hbWUgKyBcIiBcIiArIHRoaXMubGFzdE5hbWUgKyBcIiBcIiArIHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHNob3dQaG90b3MoKSB7XG4gICAgICAgIHRoaXMuc2hvd0luZm8oKTtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnBob3Rvcykge1xuICAgICAgICAgICAgdGhpcy5waG90b3MgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGhvdG9zID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBob3RvcygpIHtcbiAgICAgICAgLy9nZXQgYWxsIHBob3RvcyB1cGxvYWRlZCBieSBjdXJyZW50IHVzZXJcbiAgICAgICAgdGhpcy5teVBob3RvcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwiZmlsZXM/dHJhbnNmb3JtPTEmZmlsdGVyPXVzZXJfSWQsZXEsXCIgKyB0aGlzLmlkO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZXMgbGVuZ3RoIGlzIFwiICsgci5maWxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5teVBob3Rvcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUGhvdG8oXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJzL1wiICsgci5maWxlc1tpXS5maWxlX1VSTCwgLy9uZWVkIHRvIGFkanVzdCB3aGVuIHBob3RvIGlzIGluIGV2ZW50IGNhdGFsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmNyZWF0ZWRfYXRcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBhcmUgXCIgKyB0aGlzLm15UGhvdG9zLmxlbmd0aCArIFwiIHBob3RvcyBpbiBteSBwaG90b3NcIik7XG4gICAgICAgICAgICAvKmZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5teVBob3Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMubXlQaG90b3MucG9wKCkudXJsO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZExheW91dC5hZGRDaGlsZChpbWFnZSk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWxlY3RQaG90byhhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBpZCBpcyBcIiArIGFyZ3Mudmlldy5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGV2ZW50IG5hbWUgaXMgXCIgKyBhcmdzLmV2ZW50TmFtZSk7XG4gICAgfVxuXG5cbiAgICAvL2xvZ3Mgb3V0IGZyb20gYm90aCBHb29nbGUrIGFuZCBGYWNlYm9vayBhY2NvdW50c1xuICBsb2dvdXQoKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge307XG4gICAgZmlyZWJhc2UubG9nb3V0KCk7XG4gICAgcm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XG59XG5cbn0iXX0=