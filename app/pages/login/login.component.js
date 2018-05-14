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
            console.log("Facebook login succeded");
            that.findUser();
        }, function (err) {
            console.log("Error logging to Facebook" + err);
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
            console.log("Google login succeded");
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
        console.log("Users id " + this.userId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUVwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUV6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFRM0I7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBZ0JDO1FBZkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDakMsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQ3RCLFFBQVEs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QUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFQyxpQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUN4QixJQUFJLENBQUU7WUFDTCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUEzTHVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBTm5DLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUU7U0FDL0MsQ0FBQzt5Q0FjNEIsZUFBTSxFQUFnQixXQUFJLEVBQWdCLFdBQUk7T0FaL0QsY0FBYyxDQWtNMUI7SUFBRCxxQkFBQztDQUFBLEFBbE1ELElBa01DO0FBbE1ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICB1c2VyOiBhbnk7XG4gIG5ld1VzZXI6IGFueTtcbiAgdXNlckRhdGE6IGFueTtcbiAgdXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgc2lnbmluZ1VwID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICB1c2VySWQ6IGFueTtcbiAgc2VydmVyOiBTZXJ2ZXI7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgIHRoaXMudXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwia2FzaWEuenVib3dpY3pAZ21haWwuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcInF3ZXJ0eTEyM1wiXG4gICAgfVxuICAgIHRoaXMudXNlcklkID0gMDtcbiAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgfSBcblxuICBsb2dpbigpIHtcbiAgICBpZiAodGhpcy51c2VyLmVtYWlsICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xuICAgICAgICAgIGVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlci5wYXNzd29yZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgaW5uXCIpO1xuICAgICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgZmFjZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcbiAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XG4gICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxuICAgICAgICB9XG4gICAgICB9KS50aGVuKFxuICAgICAgICBmdW5jdGlvbihmYl9yZXN1bHQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhY2Vib29rIGxvZ2luIHN1Y2NlZGVkXCIpO1xuICAgICAgICAgIHRoYXQuZmluZFVzZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2dnaW5nIHRvIEZhY2Vib29rXCIgKyBlcnIpO1xuICAgICAgICAgIGFsZXJ0KFwiTG9naW4gdW5zdWNjZXNzZnVsbCBcIiArIGVycik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBnb29nbGVMb2dpbigpIHtcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFXG4gICAgfSkudGhlbihcbiAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJHb29nbGUgbG9naW4gc3VjY2VkZWRcIik7XG4gICAgICAgIHRoYXQuZmluZFVzZXIoKTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGFsZXJ0KFwiTG9naW4gdW5zdWNjZXNzZnVsbCBcIiArIGVycik7XG4gICAgfVxuICApO1xufVxuXG4gIHNpZ25VcCgpIHtcbiAgICB0aGlzLnNpZ25pbmdVcCA9IHRydWU7XG4gICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJuZXdVc2VyQHVzZXIuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIm5ld1Bhc3N3b3JkXCJcbiAgICB9XG4gIH1cblxuICBzaWduVXBUb0ZpcmViYXNlKCkge1xuICAgIGlmICh0aGlzLm5ld1VzZXIuZW1haWwgJiYgdGhpcy5uZXdVc2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcbiAgICAgICAgICBlbWFpbDogdGhpcy5uZXdVc2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLm5ld1VzZXIucGFzc3dvcmRcbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIChyZXN1bHQpID0+ICB7XG4gICAgICAgICAgYWxlcnQoXCJVc2VyIGNyZWF0ZWRcIik7XG4gICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xuICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcbiAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgIH1cbiAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAge1xuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igc2lnbmluZyB1cCBcIiArIChlcnJvcikpO1xuICAgICAgICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgICAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCIgOiBcIlwiIH1cbiAgICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgc2F2ZURhdGEoKSB7XG4gICAgICBpZiAodGhpcy51c2VyRGF0YS5maXJzdE5hbWUgJiYgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSkge1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpIFxuICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgdmFyIG9rID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlcnZlci5zYXZlVXNlcih0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSwgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSwgdGhpcy51c2VyRGF0YS5sb2NhdGlvbiwgXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9mZXNzaW9uLCB1c2VyLmVtYWlsKVxuICAgICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIG9rLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJGaWVsZHMgZmlyc3QgYW5kIGxhc3QgbmFtZSBjYW4ndCBiZSBlbXB0eSFcIik7XG4gICAgICB9XG4gIH1cblxuICBmaW5kVXNlcigpIHtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIHRoaXMudXNlci5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJ1c2Vycz90cmFuc2Zvcm09MSZmaWx0ZXI9ZW1haWwsZXEsXCIrdXNlci5lbWFpbDtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4geyBcbiAgICAgICAgICAgIGlmIChyLnVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHIudXNlcnNbMF0udXNlcl9JZDtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcbiAgICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiByLnVzZXJzWzBdLmZpcnN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiByLnVzZXJzWzBdLmxhc3RfTmFtZSxcbiAgICAgICAgICAgICAgICAgIFwiZW1haWxcIiA6IHIudXNlcnNbMF0uZW1haWwsXG4gICAgICAgICAgICAgICAgICBcImlkXCIgOiByLnVzZXJzWzBdLnVzZXJfSWQsXG4gICAgICAgICAgICAgICAgICBcImdlbmRlclwiIDogci51c2Vyc1swXS5nZW5kZXIsXG4gICAgICAgICAgICAgICAgICBcImRvYlwiIDogci51c2Vyc1swXS5ET0IsXG4gICAgICAgICAgICAgICAgICBcImF2YXRhclwiIDogci51c2Vyc1swXS5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHIudXNlcnNbMF0ucHJvZmVzc2lvbixcbiAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IHIudXNlcnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICBcImhvYmJ5XCIgOiByLnVzZXJzWzBdLmhvYmJ5XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuc2F2ZUFsYnVtKHIudXNlcnNbMF0udXNlcl9JZCwgci51c2Vyc1swXS5maXJzdF9OYW1lICsgXCIncyBhbGJ1bVwiICxcbiAgICAgICAgICAgICAgICB0cnVlLCBcIkFsYnVtIGZvciBmZWVkIHBob3Rvc1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBcIik7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICBjb25zb2xlLmxvZyhcIlVzZXJzIGlkIFwiICsgdGhpcy51c2VySWQpOyAgIFxufVxuXG5jYW5jZWwoKSB7XG4gIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XG59XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgfSkgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbiBcIiArIGVycm9yKSk7XG4gIH1cbn0iXX0=