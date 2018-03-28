"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var color_1 = require("color");
var Data_1 = require("../../shared/Data");
var firebase = require("nativescript-plugin-firebase");
var http = require("http");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, page, data) {
        this.router = router;
        this.page = page;
        this.data = data;
        this.isLoggingIn = true;
        this.site = "http://188.166.127.207:5555/api.php/";
        this.user = {
            "email": "kasia.zubowicz@gmail.com",
            "password": "qwerty123"
        };
        this.userId = 0;
    }
    LoginComponent.prototype.submit = function () {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.user.email && this.user.password) {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(function () {
                _this.findUser();
                console.log("Logged inn");
                _this.router.navigate(["/tab"]);
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    LoginComponent.prototype.faceLogin = function () {
        var router = this.router;
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ['public_profile', 'email']
            }
        }).then(function (fb_result) {
            console.log("Facebook login");
            router.navigate(["/tab"]);
            //var fb_access_token = fb_result.providers[1].token;
        }, function (err) {
            console.log("Error logging to Facebook" + err);
        });
    };
    LoginComponent.prototype.googleLogin = function () {
        var router = this.router;
        firebase.login({
            type: firebase.LoginType.GOOGLE
        }).then(function (result) {
            JSON.stringify(result);
            console.log("Google login succeded");
            router.navigate(["/tab"]);
        }, function (error) {
            console.log(error);
        });
    };
    LoginComponent.prototype.signUp = function () {
        if (this.user.email && this.user.password) {
            firebase.createUser({
                email: this.user.email,
                password: this.user.password
            }).then(function (result) { return alert("User created"); }, function (error) { return alert(error); });
        }
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
        var container = this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new color_1.Color("white") : new color_1.Color("#301217"),
            duration: 200
        });
    };
    LoginComponent.prototype.findUser = function () {
        var _this = this;
        firebase.getCurrentUser()
            .then(function (user) {
            console.log("TABBBBBBB Users email is " + user.email);
            var query = _this.site + "users?transform=1&filter=email,eq," + user.email;
            //alert(query);
            http.getJSON(query)
                .then(function (r) {
                if (r.users.length > 0) {
                    //alert("User found " + r.users[0].user_Id + r.users[0].email);
                    _this.userId = r.users[0].user_Id;
                    _this.data.storage = {
                        "firstName": r.users[0].first_Name,
                        "lastName": r.users[0].last_Name,
                        "email": r.users[0].email,
                        "id": r.users[0].user_Id
                    };
                }
                else {
                    alert("User not found " + user.email);
                }
            });
        })
            .catch(function (error) { return console.error(error); });
        console.log("Users id " + this.userId);
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        firebase.getCurrentUser()
            .then(function () {
            _this.findUser();
            _this.router.navigate(["/tab"]);
        })
            .catch(function (error) { return console.log("Not logged in " + error); });
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "container", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "./pages/login/login.html",
            styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, Data_1.Data])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBRzlCLDBDQUF5QztBQUN6QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFTM0I7SUFRRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQU4xRSxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFLcEQsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLE9BQU8sRUFBRywwQkFBMEI7WUFDcEMsVUFBVSxFQUFHLFdBQVc7U0FDekIsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQWlCQztRQWhCQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFD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UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmNzc1wiIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgdXNlcjogYW55O1xuICBpc0xvZ2dpbmdJbiA9IHRydWU7XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICB1c2VySWQ6IGFueTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgdGhpcy51c2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJrYXNpYS56dWJvd2ljekBnbWFpbC5jb21cIixcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwicXdlcnR5MTIzXCJcbiAgICB9XG4gICAgdGhpcy51c2VySWQgPSAwO1xuICB9IFxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgdGhpcy5sb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpZ25VcCgpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBpbm5cIik7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuICBmYWNlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXG4gICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xuICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cbiAgICAgICAgfVxuICAgICAgfSkudGhlbihcbiAgICAgICAgZnVuY3Rpb24oZmJfcmVzdWx0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJGYWNlYm9vayBsb2dpblwiKTtcbiAgICAgICAgICByb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy92YXIgZmJfYWNjZXNzX3Rva2VuID0gZmJfcmVzdWx0LnByb3ZpZGVyc1sxXS50b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2dnaW5nIHRvIEZhY2Vib29rXCIgKyBlcnIpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgZ29vZ2xlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFXG4gICAgfSkudGhlbihcbiAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJHb29nbGUgbG9naW4gc3VjY2VkZWRcIik7XG4gICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICApO1xufVxuXG4gIHNpZ25VcCgpIHtcbiAgICBpZiAodGhpcy51c2VyLmVtYWlsICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2UuY3JlYXRlVXNlcih7XG4gICAgICAgIGVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlci5wYXNzd29yZFxuICAgICAgfSkudGhlbihcbiAgICAgICAgKHJlc3VsdCkgPT4gYWxlcnQoXCJVc2VyIGNyZWF0ZWRcIiksXG4gICAgICAgIChlcnJvcikgPT4gYWxlcnQoZXJyb3IpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRGlzcGxheSgpIHtcbiAgICB0aGlzLmlzTG9nZ2luZ0luID0gIXRoaXMuaXNMb2dnaW5nSW47XG4gICAgbGV0IGNvbnRhaW5lciA9IDxWaWV3PnRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29udGFpbmVyLmFuaW1hdGUoe1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmlzTG9nZ2luZ0luID8gbmV3IENvbG9yKFwid2hpdGVcIikgOiBuZXcgQ29sb3IoXCIjMzAxMjE3XCIpLFxuICAgICAgZHVyYXRpb246IDIwMFxuICAgIH0pO1xuICB9XG5cbiAgZmluZFVzZXIoKSB7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRBQkJCQkJCQiBVc2VycyBlbWFpbCBpcyBcIiArIHVzZXIuZW1haWwpO1xuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwidXNlcnM/dHJhbnNmb3JtPTEmZmlsdGVyPWVtYWlsLGVxLFwiK3VzZXIuZW1haWw7XG4gICAgICAgIC8vYWxlcnQocXVlcnkpO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7IFxuICAgICAgICAgICAgaWYgKHIudXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIGZvdW5kIFwiICsgci51c2Vyc1swXS51c2VyX0lkICsgci51c2Vyc1swXS5lbWFpbCk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSByLnVzZXJzWzBdLnVzZXJfSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0b3JhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogci51c2Vyc1swXS5maXJzdF9OYW1lLFxuICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogci51c2Vyc1swXS5sYXN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiByLnVzZXJzWzBdLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgXCJpZFwiIDogci51c2Vyc1swXS51c2VyX0lkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kIFwiICsgdXNlci5lbWFpbCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9KVxuICAgIFxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgY29uc29sZS5sb2coXCJVc2VycyBpZCBcIiArIHRoaXMudXNlcklkKTtcbiAgICBcbn1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4oICgpID0+IHtcbiAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pfSkgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbiBcIiArIGVycm9yKSk7XG4gIH1cbn0iXX0=