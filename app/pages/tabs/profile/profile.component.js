"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Data_1 = require("../../../shared/Data");
var firebase = require("nativescript-plugin-firebase");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(router, data) {
        this.router = router;
        this.data = data;
        console.log(JSON.stringify("OooooooooooOooooooooOOOOOOOOOOOOOOOOOOOO" + this.data.storage));
        this.show = false;
    }
    ProfileComponent.prototype.showInfo = function () {
        if (this.show) {
            this.show = false;
        }
        else {
            this.show = true;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywwQ0FBeUQ7QUFHekQsNkNBQTRDO0FBRzVDLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBUXpEO0lBUUksMEJBQW9CLE1BQWMsRUFBVSxJQUFVO1FBQWxDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBR0Qsa0RBQWtEO0lBQ3BELGlDQUFNLEdBQU47UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQWxDWSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7U0FDdEQsQ0FBQzt5Q0FVOEIsZUFBTSxFQUFnQixXQUFJO09BUjdDLGdCQUFnQixDQW9DNUI7SUFBRCx1QkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSBcIi4uL3RhYi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1VzZXJcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcblxuXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9maWxlLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUtdGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQge1xuXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIHB1YmxpYyBzaG93OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFwiT29vb29vb29vb29Pb29vb29vb29PT09PT09PT09PT09PT09PT09PT1wiICsgdGhpcy5kYXRhLnN0b3JhZ2UpKTtcbiAgICAgICAgdGhpcy5zaG93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2hvd0luZm8oKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImZpcnN0TmFtZVwiXTtcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wibGFzdE5hbWVcIl07XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICB0aGlzLmVtYWlsID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJlbWFpbFwiXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VycyBuYW1lXCIgKyB0aGlzLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5sYXN0TmFtZSArIFwiIFwiICsgdGhpcy5pZCk7XG4gICAgfVxuXG5cbiAgICAvL2xvZ3Mgb3V0IGZyb20gYm90aCBHb29nbGUrIGFuZCBGYWNlYm9vayBhY2NvdW50c1xuICBsb2dvdXQoKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge307XG4gICAgZmlyZWJhc2UubG9nb3V0KCk7XG4gICAgcm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XG59XG5cbn0iXX0=