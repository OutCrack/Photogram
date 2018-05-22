"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var Data_1 = require("../../shared/Data");
var Server_1 = require("../../shared/Server/Server");
var firebase = require("nativescript-plugin-firebase");
var http = require("http");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, page, data) {
        this.router = router;
        this.page = page;
        this.data = data;
        this.userCreated = false;
        this.signingUp = false;
        //@ViewChild("container") container: ElementRef;
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
            })
                .catch(function (error) { return alert(error); });
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
            that.findUser();
        }, function (err) {
            alert("Login unsuccessfull " + err);
        });
    };
    LoginComponent.prototype.googleLogin = function () {
        var router = this.router;
        var that = this;
        firebase.login({
            type: firebase.LoginType.GOOGLE
        }).then(function (result) {
            JSON.stringify(result);
            that.findUser();
        }, function (err) {
            console.log(err);
            alert("Login unsuccessfull " + err);
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
                alert("Error signing up " + (error));
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
    };
    LoginComponent.prototype.findUser = function () {
        var _this = this;
        firebase.getCurrentUser()
            .then(function (user) {
            _this.user.email = user.email;
            var query = _this.site + "users?transform=1&filter=email,eq," + user.email;
            http.getJSON(query)
                .then(function (r) {
                if (r.users.length > 0) {
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
                    _this.server.saveAlbum(r.users[0].user_Id, r.users[0].first_Name + "'s album", true, "Album for feed photos");
                    _this.router.navigate(["/tab"]);
                }
                else {
                    _this.userData = {
                        "firstName": "",
                        "lastName": "",
                        "location": "",
                        "profession": ""
                    };
                    _this.userCreated = true;
                    _this.signingUp = false;
                    _this.server = new Server_1.Server();
                }
            }, function (e) {
                //alert("User not found ");
            });
        })
            .catch(function (error) { return console.error(error); });
    };
    LoginComponent.prototype.cancel = function () {
        this.signingUp = false;
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        firebase.getCurrentUser()
            .then(function () {
            _this.findUser();
        })
            .catch(function (error) { return console.log("Not logged in " + error); });
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUVwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUV6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFRM0I7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdEQUFnRDtRQUNoRCxTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFNcEQsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLE9BQU8sRUFBRywwQkFBMEI7WUFDcEMsVUFBVSxFQUFHLFdBQVc7U0FDekIsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQWVDO1FBZEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDakMsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7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LElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7YUFDeEIsSUFBSSxDQUFFO1lBQ0wsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBNUxVLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUU7U0FDL0MsQ0FBQzt5Q0FjNEIsZUFBTSxFQUFnQixXQUFJLEVBQWdCLFdBQUk7T0FaL0QsY0FBYyxDQTZMMUI7SUFBRCxxQkFBQztDQUFBLEFBN0xELElBNkxDO0FBN0xZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICB1c2VyOiBhbnk7XG4gIG5ld1VzZXI6IGFueTtcbiAgdXNlckRhdGE6IGFueTtcbiAgdXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgc2lnbmluZ1VwID0gZmFsc2U7XG4gIC8vQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gIHVzZXJJZDogYW55O1xuICBzZXJ2ZXI6IFNlcnZlcjtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgdGhpcy51c2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJrYXNpYS56dWJvd2ljekBnbWFpbC5jb21cIixcbiAgICAgIFwicGFzc3dvcmRcIiA6IFwicXdlcnR5MTIzXCJcbiAgICB9XG4gICAgdGhpcy51c2VySWQgPSAwO1xuICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICB9IFxuXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIGZhY2VMb2dpbigpIHtcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXG4gICAgICAgIGZhY2Vib29rT3B0aW9uczoge1xuICAgICAgICAgIHNjb3BlOiBbJ3B1YmxpY19wcm9maWxlJywgJ2VtYWlsJ11cbiAgICAgICAgfVxuICAgICAgfSkudGhlbihcbiAgICAgICAgZnVuY3Rpb24oZmJfcmVzdWx0KSB7XG4gICAgICAgICAgdGhhdC5maW5kVXNlcigpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBhbGVydChcIkxvZ2luIHVuc3VjY2Vzc2Z1bGwgXCIgKyBlcnIpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgZ29vZ2xlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRVxuICAgIH0pLnRoZW4oXG4gICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIHRoYXQuZmluZFVzZXIoKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGFsZXJ0KFwiTG9naW4gdW5zdWNjZXNzZnVsbCBcIiArIGVycik7XG4gICAgfVxuICApO1xufVxuXG4gIHNpZ25VcCgpIHtcbiAgICB0aGlzLnNpZ25pbmdVcCA9IHRydWU7XG4gICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJuZXdVc2VyQHVzZXIuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIm5ld1Bhc3N3b3JkXCJcbiAgICB9XG4gIH1cblxuICBzaWduVXBUb0ZpcmViYXNlKCkge1xuICAgIGlmICh0aGlzLm5ld1VzZXIuZW1haWwgJiYgdGhpcy5uZXdVc2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcbiAgICAgICAgICBlbWFpbDogdGhpcy5uZXdVc2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLm5ld1VzZXIucGFzc3dvcmRcbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIChyZXN1bHQpID0+ICB7XG4gICAgICAgICAgYWxlcnQoXCJVc2VyIGNyZWF0ZWRcIik7XG4gICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xuICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcbiAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgIH1cbiAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAge1xuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igc2lnbmluZyB1cCBcIiArIChlcnJvcikpO1xuICAgICAgICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgICAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCIgOiBcIlwiIH1cbiAgICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgc2F2ZURhdGEoKSB7XG4gICAgICBpZiAodGhpcy51c2VyRGF0YS5maXJzdE5hbWUgJiYgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSkge1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpIFxuICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgdmFyIG9rID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlcnZlci5zYXZlVXNlcih0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSwgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSwgdGhpcy51c2VyRGF0YS5sb2NhdGlvbiwgXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9mZXNzaW9uLCB1c2VyLmVtYWlsKVxuICAgICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIG9rLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJGaWVsZHMgZmlyc3QgYW5kIGxhc3QgbmFtZSBjYW4ndCBiZSBlbXB0eSFcIik7XG4gICAgICB9XG4gIH1cblxuICBmaW5kVXNlcigpIHtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIHRoaXMudXNlci5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJ1c2Vycz90cmFuc2Zvcm09MSZmaWx0ZXI9ZW1haWwsZXEsXCIrdXNlci5lbWFpbDtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4geyBcbiAgICAgICAgICAgIGlmIChyLnVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHIudXNlcnNbMF0udXNlcl9JZDtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcbiAgICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiByLnVzZXJzWzBdLmZpcnN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiByLnVzZXJzWzBdLmxhc3RfTmFtZSxcbiAgICAgICAgICAgICAgICAgIFwiZW1haWxcIiA6IHIudXNlcnNbMF0uZW1haWwsXG4gICAgICAgICAgICAgICAgICBcImlkXCIgOiByLnVzZXJzWzBdLnVzZXJfSWQsXG4gICAgICAgICAgICAgICAgICBcImdlbmRlclwiIDogci51c2Vyc1swXS5nZW5kZXIsXG4gICAgICAgICAgICAgICAgICBcImRvYlwiIDogci51c2Vyc1swXS5ET0IsXG4gICAgICAgICAgICAgICAgICBcImF2YXRhclwiIDogci51c2Vyc1swXS5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHIudXNlcnNbMF0ucHJvZmVzc2lvbixcbiAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IHIudXNlcnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICBcImhvYmJ5XCIgOiByLnVzZXJzWzBdLmhvYmJ5XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuc2F2ZUFsYnVtKHIudXNlcnNbMF0udXNlcl9JZCwgci51c2Vyc1swXS5maXJzdF9OYW1lICsgXCIncyBhbGJ1bVwiICxcbiAgICAgICAgICAgICAgICB0cnVlLCBcIkFsYnVtIGZvciBmZWVkIHBob3Rvc1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBcIik7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTsgXG59XG5cbmNhbmNlbCgpIHtcbiAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbn1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4oICgpID0+IHtcbiAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICB9KSBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcbiAgfVxufSJdfQ==