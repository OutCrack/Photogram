"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var Data_1 = require("../../shared/Data");
var Server_1 = require("../../shared/Server/Server");
var firebase = require("nativescript-plugin-firebase");
var http = require("http");
//continue here
//when a user logs in with facebook or google for the first time
//create the user in db
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, page, data) {
        this.router = router;
        this.page = page;
        this.data = data;
        this.userCreated = false;
        this.signingUp = false;
        this.site = "http://188.166.127.207:5555/api.php/";
        this.user = {
            "email": "kasia.zubowicz@gmail.com",
            "password": "qwerty123"
        };
        this.userId = 0;
        this.server = new Server_1.Server();
    }
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
        this.signingUp = true;
        this.newUser = {
            "email": "newUser@user.com",
            "password": "newPassword"
        };
    };
    LoginComponent.prototype.signUpToFirebase = function () {
        var _this = this;
        if (this.newUser.email && this.newUser.password) {
            firebase.createUser({
                email: this.newUser.email,
                password: this.newUser.password
            }).then(function (result) {
                alert("User created");
                _this.userCreated = true;
                _this.signingUp = false;
                _this.server = new Server_1.Server();
                _this.userData = {
                    "firstName": "",
                    "lastName": "",
                    "location": "",
                    "profession": ""
                };
            }, function (error) {
                alert(error);
                _this.newUser = {
                    "email": "",
                    "password": ""
                };
            });
        }
    };
    LoginComponent.prototype.saveData = function () {
        var _this = this;
        if (this.userData.firstName && this.userData.lastName) {
            var ok = this.server.saveUser(this.userData.firstName, this.userData.lastName, this.userData.location, this.userData.profession, this.newUser.email);
            this.signingUp = false;
            this.userCreated = false;
        }
        else {
            alert("Fields first and last name can't be empty!");
        }
        firebase.getCurrentUser()
            .then(function () {
            _this.findUser();
            _this.router.navigate(["/tab"]);
        })
            .catch(function (error) { return console.log("Not logged in " + error); });
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
                        "id": r.users[0].user_Id,
                        "gender": r.users[0].gender,
                        "dob": r.users[0].DOB,
                        "avatar": r.users[0].avatar,
                        "profession": r.users[0].profession,
                        "location": r.users[0].location,
                        "hobby": r.users[0].hobby
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
            styleUrls: ["./pages/login/login-common.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, Data_1.Data])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsZUFBZTtBQUNmLGdFQUFnRTtBQUNoRSx1QkFBdUI7QUFRdkI7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUs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aUJBQVU7cURBQUM7SUFObkMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBRTtTQUMvQyxDQUFDO3lDQWM0QixlQUFNLEVBQWdCLFdBQUksRUFBZ0IsV0FBSTtPQVovRCxjQUFjLENBNEsxQjtJQUFELHFCQUFDO0NBQUEsQUE1S0QsSUE0S0M7QUE1S1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vY29udGludWUgaGVyZVxuLy93aGVuIGEgdXNlciBsb2dzIGluIHdpdGggZmFjZWJvb2sgb3IgZ29vZ2xlIGZvciB0aGUgZmlyc3QgdGltZVxuLy9jcmVhdGUgdGhlIHVzZXIgaW4gZGJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiBdXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gIHVzZXI6IGFueTtcbiAgbmV3VXNlcjogYW55O1xuICB1c2VyRGF0YTogYW55O1xuICB1c2VyQ3JlYXRlZCA9IGZhbHNlO1xuICBzaWduaW5nVXAgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gIHVzZXJJZDogYW55O1xuICBzZXJ2ZXI6IFNlcnZlcjtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgdGhpcy51c2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJrYXNpYS56dWJvd2ljekBnbWFpbC5jb21cIixcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwicXdlcnR5MTIzXCJcbiAgICB9XG4gICAgdGhpcy51c2VySWQgPSAwO1xuICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICB9IFxuXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBpbm5cIik7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuICBmYWNlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXG4gICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xuICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cbiAgICAgICAgfVxuICAgICAgfSkudGhlbihcbiAgICAgICAgZnVuY3Rpb24oZmJfcmVzdWx0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJGYWNlYm9vayBsb2dpblwiKTtcbiAgICAgICAgICByb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy92YXIgZmJfYWNjZXNzX3Rva2VuID0gZmJfcmVzdWx0LnByb3ZpZGVyc1sxXS50b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2dnaW5nIHRvIEZhY2Vib29rXCIgKyBlcnIpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgZ29vZ2xlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFXG4gICAgfSkudGhlbihcbiAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJHb29nbGUgbG9naW4gc3VjY2VkZWRcIik7XG4gICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICApO1xufVxuXG4gIHNpZ25VcCgpIHtcbiAgICB0aGlzLnNpZ25pbmdVcCA9IHRydWU7XG4gICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJuZXdVc2VyQHVzZXIuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIm5ld1Bhc3N3b3JkXCJcbiAgICB9XG5cbiAgfVxuXG4gIHNpZ25VcFRvRmlyZWJhc2UoKSB7XG4gICAgaWYgKHRoaXMubmV3VXNlci5lbWFpbCAmJiB0aGlzLm5ld1VzZXIucGFzc3dvcmQpIHtcbiAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgIGVtYWlsOiB0aGlzLm5ld1VzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMubmV3VXNlci5wYXNzd29yZFxuICAgICAgfSkudGhlbihcbiAgICAgICAgKHJlc3VsdCkgPT4gIHtcbiAgICAgICAgICBhbGVydChcIlVzZXIgY3JlYXRlZFwiKTtcbiAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXG4gICAgICAgICAgfVxuICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+ICB7XG4gICAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgICAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCIgOiBcIlwiIH1cbiAgICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgc2F2ZURhdGEoKSB7XG4gICAgICBpZiAodGhpcy51c2VyRGF0YS5maXJzdE5hbWUgJiYgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSkge1xuICAgICAgICAgIHZhciBvayA9IHRoaXMuc2VydmVyLnNhdmVVc2VyKHRoaXMudXNlckRhdGEuZmlyc3ROYW1lLCB0aGlzLnVzZXJEYXRhLmxhc3ROYW1lLCB0aGlzLnVzZXJEYXRhLmxvY2F0aW9uLCB0aGlzLnVzZXJEYXRhLnByb2Zlc3Npb24sIHRoaXMubmV3VXNlci5lbWFpbClcbiAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMudXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KFwiRmllbGRzIGZpcnN0IGFuZCBsYXN0IG5hbWUgY2FuJ3QgYmUgZW1wdHkhXCIpO1xuICAgICAgfVxuICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKX0pIFxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbiBcIiArIGVycm9yKSk7XG4gIH1cblxuICBmaW5kVXNlcigpIHtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVEFCQkJCQkJCIFVzZXJzIGVtYWlsIGlzIFwiICsgdXNlci5lbWFpbCk7XG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJ1c2Vycz90cmFuc2Zvcm09MSZmaWx0ZXI9ZW1haWwsZXEsXCIrdXNlci5lbWFpbDtcbiAgICAgICAgLy9hbGVydChxdWVyeSk7XG4gICAgICAgIGh0dHAuZ2V0SlNPTihxdWVyeSlcbiAgICAgICAgLnRoZW4oKHIpID0+IHsgXG4gICAgICAgICAgICBpZiAoci51c2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy9hbGVydChcIlVzZXIgZm91bmQgXCIgKyByLnVzZXJzWzBdLnVzZXJfSWQgKyByLnVzZXJzWzBdLmVtYWlsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHIudXNlcnNbMF0udXNlcl9JZDtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcbiAgICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiByLnVzZXJzWzBdLmZpcnN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiByLnVzZXJzWzBdLmxhc3RfTmFtZSxcbiAgICAgICAgICAgICAgICAgIFwiZW1haWxcIiA6IHIudXNlcnNbMF0uZW1haWwsXG4gICAgICAgICAgICAgICAgICBcImlkXCIgOiByLnVzZXJzWzBdLnVzZXJfSWQsXG4gICAgICAgICAgICAgICAgICBcImdlbmRlclwiIDogci51c2Vyc1swXS5nZW5kZXIsXG4gICAgICAgICAgICAgICAgICBcImRvYlwiIDogci51c2Vyc1swXS5ET0IsXG4gICAgICAgICAgICAgICAgICBcImF2YXRhclwiIDogci51c2Vyc1swXS5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHIudXNlcnNbMF0ucHJvZmVzc2lvbixcbiAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IHIudXNlcnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICBcImhvYmJ5XCIgOiByLnVzZXJzWzBdLmhvYmJ5XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlciBub3QgZm91bmQgXCIgKyB1c2VyLmVtYWlsKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICBjb25zb2xlLmxvZyhcIlVzZXJzIGlkIFwiICsgdGhpcy51c2VySWQpO1xuICAgIFxufVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbiggKCkgPT4ge1xuICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSl9KSBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcbiAgfVxufSJdfQ==