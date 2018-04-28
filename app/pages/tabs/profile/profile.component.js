"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        this.profession = this.data.storage["profession"];
        this.location = this.data.storage["location"];
        this.gender = this.data.storage["gender"];
        this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + this.data.storage["avatar"];
        this.birthDate = this.data.storage["dob"];
        this.hobby = this.data.storage["hobby"];
        this.editing = false;
    }
    ProfileComponent.prototype.editData = function () {
        this.editing = true;
    };
    ProfileComponent.prototype.cancel = function () {
        this.editing = false;
    };
    ProfileComponent.prototype.saveData = function () {
        this.editing = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUUxQywwQ0FBeUQ7QUFHekQsNkNBQTRDO0FBRTVDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUMvQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVF6RDtJQXNCSSwwQkFBb0IsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFQdEQsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBUWxELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyw4Q0FBOEMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBQ0QsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUNELGtEQUFrRDtJQUNsRCxpQ0FBTSxHQUFOO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFwRFEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO1NBQ3RELENBQUM7eUNBd0I4QixlQUFNLEVBQWdCLFdBQUk7T0F0QjdDLGdCQUFnQixDQXNENUI7SUFBRCx1QkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9Vc2VyXCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XHJcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiKTtcclxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwicHJvZmlsZS10YWJcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUudGFiLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYWdlcy90YWJzL3Byb2ZpbGUvcHJvZmlsZS10YWIuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGxhc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZztcclxuICAgIHB1YmxpYyBwcm9mZXNzaW9uOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbG9jYXRpb246IHN0cmluZztcclxuICAgIHB1YmxpYyBob2JieTogc3RyaW5nO1xyXG4gICAgcHVibGljIGF2YXRhcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGJpcnRoRGF0ZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGdlbmRlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGlkOiBhbnk7XHJcbiAgICBwdWJsaWMgcHJvZmlsZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBwaG90b3M6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQaG90bzogc3RyaW5nO1xyXG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcclxuICAgIHB1YmxpYyBteVBob3RvczogQXJyYXk8UGhvdG8+O1xyXG4gICAgcHVibGljIHBob3RvVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcGhvdG9DcmVhdGVkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZWRpdGluZzogYm9vbGVhbjtcclxuICAgIFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YTogRGF0YSkge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJmaXJzdE5hbWVcIl07XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wibGFzdE5hbWVcIl07XHJcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZW1haWxcIl07XHJcbiAgICAgICAgdGhpcy5wcm9mZXNzaW9uID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJwcm9mZXNzaW9uXCJdO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmRhdGEuc3RvcmFnZVtcImxvY2F0aW9uXCJdO1xyXG4gICAgICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJnZW5kZXJcIl07XHJcbiAgICAgICAgdGhpcy5hdmF0YXIgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6ODAwMC91cGxvYWRzL2F2YXRhcnMvXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXTtcclxuICAgICAgICB0aGlzLmJpcnRoRGF0ZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZG9iXCJdO1xyXG4gICAgICAgIHRoaXMuaG9iYnkgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImhvYmJ5XCJdO1xyXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBjYW5jZWwoKSB7IFxyXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzYXZlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vbG9ncyBvdXQgZnJvbSBib3RoIEdvb2dsZSsgYW5kIEZhY2Vib29rIGFjY291bnRzXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge307XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICAgICAgcm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XHJcbiAgICB9XHJcblxyXG59Il19