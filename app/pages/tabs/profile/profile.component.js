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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUUxQywwQ0FBeUQ7QUFHekQsNkNBQTRDO0FBRTVDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUMvQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVF6RDtJQXNCSSwwQkFBb0IsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFQdEQsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBUWxELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyw4Q0FBOEMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBQ0QsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUNELGtEQUFrRDtJQUNsRCxpQ0FBTSxHQUFOO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFwRFEsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO1NBQ3RELENBQUM7eUNBd0I4QixlQUFNLEVBQWdCLFdBQUk7T0F0QjdDLGdCQUFnQixDQXNENUI7SUFBRCx1QkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xudmFyIGxheW91dCA9IHJlcXVpcmUoXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCIpO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicHJvZmlsZS10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3RhYnMvcHJvZmlsZS9wcm9maWxlLnRhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL3RhYnMvcHJvZmlsZS9wcm9maWxlLXRhYi5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBQcm9maWxlQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFzdE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgICBwdWJsaWMgcHJvZmVzc2lvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBsb2NhdGlvbjogc3RyaW5nO1xuICAgIHB1YmxpYyBob2JieTogc3RyaW5nO1xuICAgIHB1YmxpYyBhdmF0YXI6IHN0cmluZztcbiAgICBwdWJsaWMgYmlydGhEYXRlOiBzdHJpbmc7XG4gICAgcHVibGljIGdlbmRlcjogc3RyaW5nO1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIHB1YmxpYyBwcm9maWxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBwaG90b3M6IGJvb2xlYW47XG4gICAgcHVibGljIHNlbGVjdGVkUGhvdG86IHN0cmluZztcbiAgICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICAgIHB1YmxpYyBteVBob3RvczogQXJyYXk8UGhvdG8+O1xuICAgIHB1YmxpYyBwaG90b1VybDogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcbiAgICBwdWJsaWMgZWRpdGluZzogYm9vbGVhbjtcbiAgICBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZmlyc3ROYW1lXCJdO1xuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJsYXN0TmFtZVwiXTtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl07XG4gICAgICAgIHRoaXMuZW1haWwgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImVtYWlsXCJdO1xuICAgICAgICB0aGlzLnByb2Zlc3Npb24gPSB0aGlzLmRhdGEuc3RvcmFnZVtcInByb2Zlc3Npb25cIl07XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLmRhdGEuc3RvcmFnZVtcImxvY2F0aW9uXCJdO1xuICAgICAgICB0aGlzLmdlbmRlciA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZ2VuZGVyXCJdO1xuICAgICAgICB0aGlzLmF2YXRhciA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo4MDAwL3VwbG9hZHMvYXZhdGFycy9cIiArIHRoaXMuZGF0YS5zdG9yYWdlW1wiYXZhdGFyXCJdO1xuICAgICAgICB0aGlzLmJpcnRoRGF0ZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZG9iXCJdO1xuICAgICAgICB0aGlzLmhvYmJ5ID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJob2JieVwiXTtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZWRpdERhdGEoKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgfVxuICAgIGNhbmNlbCgpIHsgXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBzYXZlRGF0YSgpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIC8vbG9ncyBvdXQgZnJvbSBib3RoIEdvb2dsZSsgYW5kIEZhY2Vib29rIGFjY291bnRzXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge307XG4gICAgICAgIGZpcmViYXNlLmxvZ291dCgpO1xuICAgICAgICByb3V0ZXIubmF2aWdhdGUoW1wiXCJdKTtcbiAgICB9XG5cbn0iXX0=