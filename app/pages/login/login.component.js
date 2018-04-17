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
                //this.router.navigate(["/tab"]);
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    LoginComponent.prototype.faceLogin = function () {
        var router = this.router;
        var that = this;
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ['public_profile', 'email']
            }
        }).then(function (fb_result) {
            console.log("Facebook login");
            that.findUser();
            //router.navigate(["/tab"]);
            //var fb_access_token = fb_result.providers[1].token;
        }, function (err) {
            console.log("Error logging to Facebook" + err);
        });
    };
    LoginComponent.prototype.googleLogin = function () {
        var router = this.router;
        var that = this;
        firebase.login({
            type: firebase.LoginType.GOOGLE
        }).then(function (result) {
            JSON.stringify(result);
            console.log("Google login succeded");
            that.findUser();
            //router.navigate(["/tab"]);
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
            firebase.getCurrentUser()
                .then(function (user) {
                var ok = _this.server.saveUser(_this.userData.firstName, _this.userData.lastName, _this.userData.location, _this.userData.profession, user.email);
                _this.signingUp = false;
                _this.userCreated = false;
                _this.findUser();
            })
                .catch(function (error) { return console.error(error); });
        }
        else {
            alert("Fields first and last name can't be empty!");
        }
        //firebase.getCurrentUser()
        //.then( () => {
        //this.router.navigate(["/tab"])
        //}) 
        //.catch(error => console.log("Not logged in " + error));
    };
    LoginComponent.prototype.findUser = function () {
        var _this = this;
        firebase.getCurrentUser()
            .then(function (user) {
            _this.user.email = user.email;
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
                    _this.router.navigate(["/tab"]);
                }
                else {
                    _this.userData = {
                        "firstName": "",
                        "lastName": "",
                        "location": "",
                        "profession": ""
                    };
                    alert("User not found in db " + user.email);
                    _this.userCreated = true;
                    _this.signingUp = false;
                    _this.server = new Server_1.Server();
                }
            }, function (e) {
                //alert("User not found ");
            });
        })
            .catch(function (error) { return console.error(error); });
        console.log("Users id " + this.userId);
    };
    LoginComponent.prototype.cancel = function () {
        this.signingUp = false;
        this.router.navigate(["/tab"]);
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        firebase.getCurrentUser()
            .then(function () {
            _this.findUser();
            //this.router.navigate(["/tab"])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsZUFBZTtBQUNmLGdFQUFnRTtBQUNoRSx1QkFBdUI7QUFRdkI7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUs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QUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUMsaUNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7YUFDeEIsSUFBSSxDQUFFO1lBQ0wsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLGdDQUFnQztRQUNsQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQWxNdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7cURBQUM7SUFObkMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBRTtTQUMvQyxDQUFDO3lDQWM0QixlQUFNLEVBQWdCLFdBQUksRUFBZ0IsV0FBSTtPQVovRCxjQUFjLENBeU0xQjtJQUFELHFCQUFDO0NBQUEsQUF6TUQsSUF5TUM7QUF6TVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vY29udGludWUgaGVyZVxuLy93aGVuIGEgdXNlciBsb2dzIGluIHdpdGggZmFjZWJvb2sgb3IgZ29vZ2xlIGZvciB0aGUgZmlyc3QgdGltZVxuLy9jcmVhdGUgdGhlIHVzZXIgaW4gZGJcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiBdXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gIHVzZXI6IGFueTtcbiAgbmV3VXNlcjogYW55O1xuICB1c2VyRGF0YTogYW55O1xuICB1c2VyQ3JlYXRlZCA9IGZhbHNlO1xuICBzaWduaW5nVXAgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gIHVzZXJJZDogYW55O1xuICBzZXJ2ZXI6IFNlcnZlcjtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgdGhpcy51c2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJrYXNpYS56dWJvd2ljekBnbWFpbC5jb21cIixcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwicXdlcnR5MTIzXCJcbiAgICB9XG4gICAgdGhpcy51c2VySWQgPSAwO1xuICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICB9IFxuXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBpbm5cIik7XG4gICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIGZhY2VMb2dpbigpIHtcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXG4gICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xuICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cbiAgICAgICAgfVxuICAgICAgfSkudGhlbihcbiAgICAgICAgZnVuY3Rpb24oZmJfcmVzdWx0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJGYWNlYm9vayBsb2dpblwiKTtcbiAgICAgICAgICB0aGF0LmZpbmRVc2VyKCk7XG4gICAgICAgICAgLy9yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy92YXIgZmJfYWNjZXNzX3Rva2VuID0gZmJfcmVzdWx0LnByb3ZpZGVyc1sxXS50b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2dnaW5nIHRvIEZhY2Vib29rXCIgKyBlcnIpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgZ29vZ2xlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRVxuICAgIH0pLnRoZW4oXG4gICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR29vZ2xlIGxvZ2luIHN1Y2NlZGVkXCIpO1xuICAgICAgICB0aGF0LmZpbmRVc2VyKCk7XG4gICAgICAgIC8vcm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgIH0sXG4gICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gICk7XG59XG5cbiAgc2lnblVwKCkge1xuICAgIHRoaXMuc2lnbmluZ1VwID0gdHJ1ZTtcbiAgICB0aGlzLm5ld1VzZXIgPSB7XG4gICAgICBcImVtYWlsXCIgOiBcIm5ld1VzZXJAdXNlci5jb21cIixcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwibmV3UGFzc3dvcmRcIlxuICAgIH1cblxuICB9XG5cbiAgc2lnblVwVG9GaXJlYmFzZSgpIHtcbiAgICBpZiAodGhpcy5uZXdVc2VyLmVtYWlsICYmIHRoaXMubmV3VXNlci5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2UuY3JlYXRlVXNlcih7XG4gICAgICAgICAgZW1haWw6IHRoaXMubmV3VXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5uZXdVc2VyLnBhc3N3b3JkXG4gICAgICB9KS50aGVuKFxuICAgICAgICAocmVzdWx0KSA9PiAge1xuICAgICAgICAgIGFsZXJ0KFwiVXNlciBjcmVhdGVkXCIpO1xuICAgICAgICAgIHRoaXMudXNlckNyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgICAgICAgdGhpcy51c2VyRGF0YSA9IHtcbiAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IFwiXCIsXG4gICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IFwiXCJcbiAgICAgICAgICB9XG4gICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4gIHtcbiAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgICAgICAgXCJlbWFpbFwiIDogXCJcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIiA6IFwiXCIgfVxuICAgICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBzYXZlRGF0YSgpIHtcbiAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSAmJiB0aGlzLnVzZXJEYXRhLmxhc3ROYW1lKSB7XG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkgXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICB2YXIgb2sgPSB0aGlzLnNlcnZlci5zYXZlVXNlcih0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSwgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSwgdGhpcy51c2VyRGF0YS5sb2NhdGlvbiwgdGhpcy51c2VyRGF0YS5wcm9mZXNzaW9uLCB1c2VyLmVtYWlsKVxuICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KFwiRmllbGRzIGZpcnN0IGFuZCBsYXN0IG5hbWUgY2FuJ3QgYmUgZW1wdHkhXCIpO1xuICAgICAgfVxuICAgICAgLy9maXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAvLy50aGVuKCAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pXG4gICAgICAvL30pIFxuICAgICAgLy8uY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcbiAgfVxuXG4gIGZpbmRVc2VyKCkge1xuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgdGhpcy51c2VyLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJUQUJCQkJCQkIgVXNlcnMgZW1haWwgaXMgXCIgKyB1c2VyLmVtYWlsKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcInVzZXJzP3RyYW5zZm9ybT0xJmZpbHRlcj1lbWFpbCxlcSxcIit1c2VyLmVtYWlsO1xuICAgICAgICAvL2FsZXJ0KHF1ZXJ5KTtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4geyBcbiAgICAgICAgICAgIGlmIChyLnVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiVXNlciBmb3VuZCBcIiArIHIudXNlcnNbMF0udXNlcl9JZCArIHIudXNlcnNbMF0uZW1haWwpO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcklkID0gci51c2Vyc1swXS51c2VyX0lkO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge1xuICAgICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IHIudXNlcnNbMF0uZmlyc3RfTmFtZSxcbiAgICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IHIudXNlcnNbMF0ubGFzdF9OYW1lLFxuICAgICAgICAgICAgICAgICAgXCJlbWFpbFwiIDogci51c2Vyc1swXS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IHIudXNlcnNbMF0udXNlcl9JZCxcbiAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiByLnVzZXJzWzBdLmdlbmRlcixcbiAgICAgICAgICAgICAgICAgIFwiZG9iXCIgOiByLnVzZXJzWzBdLkRPQixcbiAgICAgICAgICAgICAgICAgIFwiYXZhdGFyXCIgOiByLnVzZXJzWzBdLmF2YXRhcixcbiAgICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogci51c2Vyc1swXS5wcm9mZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogci51c2Vyc1swXS5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgIFwiaG9iYnlcIiA6IHIudXNlcnNbMF0uaG9iYnlcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBpbiBkYiBcIiArIHVzZXIuZW1haWwpOyBcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgLy9hbGVydChcIlVzZXIgbm90IGZvdW5kIFwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgIGNvbnNvbGUubG9nKFwiVXNlcnMgaWQgXCIgKyB0aGlzLnVzZXJJZCk7ICAgXG59XG5cbmNhbmNlbCgpIHtcbiAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG59XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pXG4gICAgfSkgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbiBcIiArIGVycm9yKSk7XG4gIH1cbn0iXX0=