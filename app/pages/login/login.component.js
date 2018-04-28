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
                var ok = new Promise(function (resolve, reject) {
                    _this.server.saveUser(_this.userData.firstName, _this.userData.lastName, _this.userData.location, _this.userData.profession, user.email);
                    _this.signingUp = false;
                    _this.userCreated = false;
                    resolve();
                });
                ok.then(function () {
                    _this.findUser();
                });
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
                    //alert("User not found in db " + user.email); 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsZUFBZTtBQUNmLGdFQUFnRTtBQUNoRSx1QkFBdUI7QUFRdkI7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUs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QyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVDLGlDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxRQUFRLENBQUMsY0FBYyxFQUFFO2FBQ3hCLElBQUksQ0FBRTtZQUNMLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixnQ0FBZ0M7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUF4TXVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBTm5DLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUU7U0FDL0MsQ0FBQzt5Q0FjNEIsZUFBTSxFQUFnQixXQUFJLEVBQWdCLFdBQUk7T0FaL0QsY0FBYyxDQStNMUI7SUFBRCxxQkFBQztDQUFBLEFBL01ELElBK01DO0FBL01ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcclxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuXHJcblxyXG4vL2NvbnRpbnVlIGhlcmVcclxuLy93aGVuIGEgdXNlciBsb2dzIGluIHdpdGggZmFjZWJvb2sgb3IgZ29vZ2xlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4vL2NyZWF0ZSB0aGUgdXNlciBpbiBkYlxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgdXNlcjogYW55O1xyXG4gIG5ld1VzZXI6IGFueTtcclxuICB1c2VyRGF0YTogYW55O1xyXG4gIHVzZXJDcmVhdGVkID0gZmFsc2U7XHJcbiAgc2lnbmluZ1VwID0gZmFsc2U7XHJcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcclxuICB1c2VySWQ6IGFueTtcclxuICBzZXJ2ZXI6IFNlcnZlcjtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XHJcbiAgICB0aGlzLnVzZXIgPSB7XHJcbiAgICAgIFwiZW1haWxcIiA6IFwia2FzaWEuenVib3dpY3pAZ21haWwuY29tXCIsXHJcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwicXdlcnR5MTIzXCJcclxuICAgIH1cclxuICAgIHRoaXMudXNlcklkID0gMDtcclxuICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xyXG4gIH0gXHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgaWYgKHRoaXMudXNlci5lbWFpbCAmJiB0aGlzLnVzZXIucGFzc3dvcmQpIHtcclxuICAgICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBpbm5cIik7XHJcbiAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmFjZUxvZ2luKCkge1xyXG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkZBQ0VCT09LLFxyXG4gICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xyXG4gICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihcclxuICAgICAgICBmdW5jdGlvbihmYl9yZXN1bHQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFjZWJvb2sgbG9naW5cIik7XHJcbiAgICAgICAgICB0aGF0LmZpbmRVc2VyKCk7XHJcbiAgICAgICAgICAvL3JvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy92YXIgZmJfYWNjZXNzX3Rva2VuID0gZmJfcmVzdWx0LnByb3ZpZGVyc1sxXS50b2tlbjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2dnaW5nIHRvIEZhY2Vib29rXCIgKyBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGdvb2dsZUxvZ2luKCkge1xyXG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgZmlyZWJhc2UubG9naW4oe1xyXG4gICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRVxyXG4gICAgfSkudGhlbihcclxuICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHb29nbGUgbG9naW4gc3VjY2VkZWRcIik7XHJcbiAgICAgICAgdGhhdC5maW5kVXNlcigpO1xyXG4gICAgICAgIC8vcm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxuICApO1xyXG59XHJcblxyXG4gIHNpZ25VcCgpIHtcclxuICAgIHRoaXMuc2lnbmluZ1VwID0gdHJ1ZTtcclxuICAgIHRoaXMubmV3VXNlciA9IHtcclxuICAgICAgXCJlbWFpbFwiIDogXCJuZXdVc2VyQHVzZXIuY29tXCIsXHJcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwibmV3UGFzc3dvcmRcIlxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHNpZ25VcFRvRmlyZWJhc2UoKSB7XHJcbiAgICBpZiAodGhpcy5uZXdVc2VyLmVtYWlsICYmIHRoaXMubmV3VXNlci5wYXNzd29yZCkge1xyXG4gICAgICBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcclxuICAgICAgICAgIGVtYWlsOiB0aGlzLm5ld1VzZXIuZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5uZXdVc2VyLnBhc3N3b3JkXHJcbiAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgKHJlc3VsdCkgPT4gIHtcclxuICAgICAgICAgIGFsZXJ0KFwiVXNlciBjcmVhdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcclxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogXCJcIixcclxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+ICB7XHJcbiAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgICB0aGlzLm5ld1VzZXIgPSB7XHJcbiAgICAgICAgICAgIFwiZW1haWxcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIiA6IFwiXCIgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzYXZlRGF0YSgpIHtcclxuICAgICAgaWYgKHRoaXMudXNlckRhdGEuZmlyc3ROYW1lICYmIHRoaXMudXNlckRhdGEubGFzdE5hbWUpIHtcclxuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpIFxyXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIHZhciBvayA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnNlcnZlci5zYXZlVXNlcih0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSwgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSwgdGhpcy51c2VyRGF0YS5sb2NhdGlvbiwgdGhpcy51c2VyRGF0YS5wcm9mZXNzaW9uLCB1c2VyLmVtYWlsKVxyXG4gICAgICAgICAgICAgIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICBvay50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcIkZpZWxkcyBmaXJzdCBhbmQgbGFzdCBuYW1lIGNhbid0IGJlIGVtcHR5IVwiKTtcclxuICAgICAgfVxyXG4gICAgICAvL2ZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcclxuICAgICAgLy8udGhlbiggKCkgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSlcclxuICAgICAgLy99KSBcclxuICAgICAgLy8uY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGZpbmRVc2VyKCkge1xyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxyXG4gICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgdGhpcy51c2VyLmVtYWlsID0gdXNlci5lbWFpbDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRBQkJCQkJCQiBVc2VycyBlbWFpbCBpcyBcIiArIHVzZXIuZW1haWwpO1xyXG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJ1c2Vycz90cmFuc2Zvcm09MSZmaWx0ZXI9ZW1haWwsZXEsXCIrdXNlci5lbWFpbDtcclxuICAgICAgICAvL2FsZXJ0KHF1ZXJ5KTtcclxuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXHJcbiAgICAgICAgLnRoZW4oKHIpID0+IHsgXHJcbiAgICAgICAgICAgIGlmIChyLnVzZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIGZvdW5kIFwiICsgci51c2Vyc1swXS51c2VyX0lkICsgci51c2Vyc1swXS5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHIudXNlcnNbMF0udXNlcl9JZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogci51c2Vyc1swXS5maXJzdF9OYW1lLFxyXG4gICAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiByLnVzZXJzWzBdLmxhc3RfTmFtZSxcclxuICAgICAgICAgICAgICAgICAgXCJlbWFpbFwiIDogci51c2Vyc1swXS5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgXCJpZFwiIDogci51c2Vyc1swXS51c2VyX0lkLFxyXG4gICAgICAgICAgICAgICAgICBcImdlbmRlclwiIDogci51c2Vyc1swXS5nZW5kZXIsXHJcbiAgICAgICAgICAgICAgICAgIFwiZG9iXCIgOiByLnVzZXJzWzBdLkRPQixcclxuICAgICAgICAgICAgICAgICAgXCJhdmF0YXJcIiA6IHIudXNlcnNbMF0uYXZhdGFyLFxyXG4gICAgICAgICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHIudXNlcnNbMF0ucHJvZmVzc2lvbixcclxuICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogci51c2Vyc1swXS5sb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgXCJob2JieVwiIDogci51c2Vyc1swXS5ob2JieVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9hbGVydChcIlVzZXIgbm90IGZvdW5kIGluIGRiIFwiICsgdXNlci5lbWFpbCk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAvL2FsZXJ0KFwiVXNlciBub3QgZm91bmQgXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgY29uc29sZS5sb2coXCJVc2VycyBpZCBcIiArIHRoaXMudXNlcklkKTsgICBcclxufVxyXG5cclxuY2FuY2VsKCkge1xyXG4gIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XHJcbiAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XHJcbn1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcclxuICAgIC50aGVuKCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZmluZFVzZXIoKTtcclxuICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKVxyXG4gICAgfSkgXHJcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcclxuICB9XHJcbn0iXX0=