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
        console.log(JSON.stringify("OooooooooooOooooooooOOOOOOOOOOOOOOOOOOOO" + this.data.storage));
        this.profile = false;
    }
    ProfileComponent.prototype.showInfo = function () {
        if (this.profile) {
            this.profile = false;
        }
        else {
            this.profile = true;
        }
        console.log();
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        console.log("Users name" + this.firstName + " " + this.lastName + " " + this.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUUxQywwQ0FBeUQ7QUFHekQsNkNBQTRDO0FBRTVDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUMvQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVF6RDtJQWdCSSwwQkFBb0IsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFOdEQsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBT2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsa0RBQWtEO0lBQ3BELGlDQUFNLEdBQU47UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQXpDWSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7U0FDdEQsQ0FBQzt5Q0FrQjhCLGVBQU0sRUFBZ0IsV0FBSTtPQWhCN0MsZ0JBQWdCLENBMkM1QjtJQUFELHVCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gXCIuLi90YWIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9Vc2VyXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXNcIjtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG52YXIgbGF5b3V0ID0gcmVxdWlyZShcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIik7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9maWxlLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUtdGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQge1xuXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIHB1YmxpYyBwcm9maWxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBwaG90b3M6IGJvb2xlYW47XG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuICAgIHB1YmxpYyBzZWxlY3RlZFBob3RvOiBzdHJpbmc7XG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcbiAgICBwdWJsaWMgbXlQaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9DcmVhdGVkOiBzdHJpbmc7XG4gICAgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoXCJPb29vb29vb29vb09vb29vb29vb09PT09PT09PT09PT09PT09PT09PXCIgKyB0aGlzLmRhdGEuc3RvcmFnZSkpO1xuICAgICAgICB0aGlzLnByb2ZpbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzaG93SW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZmlsZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKClcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImZpcnN0TmFtZVwiXTtcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wibGFzdE5hbWVcIl07XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICB0aGlzLmVtYWlsID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJlbWFpbFwiXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VycyBuYW1lXCIgKyB0aGlzLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5sYXN0TmFtZSArIFwiIFwiICsgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgLy9sb2dzIG91dCBmcm9tIGJvdGggR29vZ2xlKyBhbmQgRmFjZWJvb2sgYWNjb3VudHNcbiAgbG9nb3V0KCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHt9O1xuICAgIGZpcmViYXNlLmxvZ291dCgpO1xuICAgIHJvdXRlci5uYXZpZ2F0ZShbXCJcIl0pO1xufVxuXG59Il19