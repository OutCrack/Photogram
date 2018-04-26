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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsZUFBZTtBQUNmLGdFQUFnRTtBQUNoRSx1QkFBdUI7QUFRdkI7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUs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QyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVDLGlDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxRQUFRLENBQUMsY0FBYyxFQUFFO2FBQ3hCLElBQUksQ0FBRTtZQUNMLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixnQ0FBZ0M7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUF4TXVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBTm5DLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUU7U0FDL0MsQ0FBQzt5Q0FjNEIsZUFBTSxFQUFnQixXQUFJLEVBQWdCLFdBQUk7T0FaL0QsY0FBYyxDQStNMUI7SUFBRCxxQkFBQztDQUFBLEFBL01ELElBK01DO0FBL01ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vL2NvbnRpbnVlIGhlcmVcbi8vd2hlbiBhIHVzZXIgbG9ncyBpbiB3aXRoIGZhY2Vib29rIG9yIGdvb2dsZSBmb3IgdGhlIGZpcnN0IHRpbWVcbi8vY3JlYXRlIHRoZSB1c2VyIGluIGRiXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICB1c2VyOiBhbnk7XG4gIG5ld1VzZXI6IGFueTtcbiAgdXNlckRhdGE6IGFueTtcbiAgdXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgc2lnbmluZ1VwID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICB1c2VySWQ6IGFueTtcbiAgc2VydmVyOiBTZXJ2ZXI7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgIHRoaXMudXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwia2FzaWEuenVib3dpY3pAZ21haWwuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcInF3ZXJ0eTEyM1wiXG4gICAgfVxuICAgIHRoaXMudXNlcklkID0gMDtcbiAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgfSBcblxuICBsb2dpbigpIHtcbiAgICBpZiAodGhpcy51c2VyLmVtYWlsICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xuICAgICAgICAgIGVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlci5wYXNzd29yZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgaW5uXCIpO1xuICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuICBmYWNlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkZBQ0VCT09LLFxuICAgICAgICBmYWNlYm9va09wdGlvbnM6IHtcbiAgICAgICAgICBzY29wZTogWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKGZiX3Jlc3VsdCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFjZWJvb2sgbG9naW5cIik7XG4gICAgICAgICAgdGhhdC5maW5kVXNlcigpO1xuICAgICAgICAgIC8vcm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vdmFyIGZiX2FjY2Vzc190b2tlbiA9IGZiX3Jlc3VsdC5wcm92aWRlcnNbMV0udG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9nZ2luZyB0byBGYWNlYm9va1wiICsgZXJyKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGdvb2dsZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZmlyZWJhc2UubG9naW4oe1xuICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5HT09HTEVcbiAgICB9KS50aGVuKFxuICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdvb2dsZSBsb2dpbiBzdWNjZWRlZFwiKTtcbiAgICAgICAgdGhhdC5maW5kVXNlcigpO1xuICAgICAgICAvL3JvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICApO1xufVxuXG4gIHNpZ25VcCgpIHtcbiAgICB0aGlzLnNpZ25pbmdVcCA9IHRydWU7XG4gICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJuZXdVc2VyQHVzZXIuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIm5ld1Bhc3N3b3JkXCJcbiAgICB9XG5cbiAgfVxuXG4gIHNpZ25VcFRvRmlyZWJhc2UoKSB7XG4gICAgaWYgKHRoaXMubmV3VXNlci5lbWFpbCAmJiB0aGlzLm5ld1VzZXIucGFzc3dvcmQpIHtcbiAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgIGVtYWlsOiB0aGlzLm5ld1VzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMubmV3VXNlci5wYXNzd29yZFxuICAgICAgfSkudGhlbihcbiAgICAgICAgKHJlc3VsdCkgPT4gIHtcbiAgICAgICAgICBhbGVydChcIlVzZXIgY3JlYXRlZFwiKTtcbiAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXG4gICAgICAgICAgfVxuICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+ICB7XG4gICAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgICAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCIgOiBcIlwiIH1cbiAgICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgc2F2ZURhdGEoKSB7XG4gICAgICBpZiAodGhpcy51c2VyRGF0YS5maXJzdE5hbWUgJiYgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSkge1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpIFxuICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgdmFyIG9rID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlcnZlci5zYXZlVXNlcih0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSwgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSwgdGhpcy51c2VyRGF0YS5sb2NhdGlvbiwgdGhpcy51c2VyRGF0YS5wcm9mZXNzaW9uLCB1c2VyLmVtYWlsKVxuICAgICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIG9rLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJGaWVsZHMgZmlyc3QgYW5kIGxhc3QgbmFtZSBjYW4ndCBiZSBlbXB0eSFcIik7XG4gICAgICB9XG4gICAgICAvL2ZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgIC8vLnRoZW4oICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSlcbiAgICAgIC8vfSkgXG4gICAgICAvLy5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4gXCIgKyBlcnJvcikpO1xuICB9XG5cbiAgZmluZFVzZXIoKSB7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICB0aGlzLnVzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRBQkJCQkJCQiBVc2VycyBlbWFpbCBpcyBcIiArIHVzZXIuZW1haWwpO1xuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwidXNlcnM/dHJhbnNmb3JtPTEmZmlsdGVyPWVtYWlsLGVxLFwiK3VzZXIuZW1haWw7XG4gICAgICAgIC8vYWxlcnQocXVlcnkpO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7IFxuICAgICAgICAgICAgaWYgKHIudXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIGZvdW5kIFwiICsgci51c2Vyc1swXS51c2VyX0lkICsgci51c2Vyc1swXS5lbWFpbCk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSByLnVzZXJzWzBdLnVzZXJfSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0b3JhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogci51c2Vyc1swXS5maXJzdF9OYW1lLFxuICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogci51c2Vyc1swXS5sYXN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiByLnVzZXJzWzBdLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgXCJpZFwiIDogci51c2Vyc1swXS51c2VyX0lkLFxuICAgICAgICAgICAgICAgICAgXCJnZW5kZXJcIiA6IHIudXNlcnNbMF0uZ2VuZGVyLFxuICAgICAgICAgICAgICAgICAgXCJkb2JcIiA6IHIudXNlcnNbMF0uRE9CLFxuICAgICAgICAgICAgICAgICAgXCJhdmF0YXJcIiA6IHIudXNlcnNbMF0uYXZhdGFyLFxuICAgICAgICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiByLnVzZXJzWzBdLnByb2Zlc3Npb24sXG4gICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiByLnVzZXJzWzBdLmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgXCJob2JieVwiIDogci51c2Vyc1swXS5ob2JieVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiVXNlciBub3QgZm91bmQgaW4gZGIgXCIgKyB1c2VyLmVtYWlsKTsgXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBcIik7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICBjb25zb2xlLmxvZyhcIlVzZXJzIGlkIFwiICsgdGhpcy51c2VySWQpOyAgIFxufVxuXG5jYW5jZWwoKSB7XG4gIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XG4gIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xufVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbiggKCkgPT4ge1xuICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKVxuICAgIH0pIFxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4gXCIgKyBlcnJvcikpO1xuICB9XG59Il19