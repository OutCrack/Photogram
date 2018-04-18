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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsZUFBZTtBQUNmLGdFQUFnRTtBQUNoRSx1QkFBdUI7QUFRdkI7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUs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QUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUMsaUNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7YUFDeEIsSUFBSSxDQUFFO1lBQ0wsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLGdDQUFnQztRQUNsQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQWxNdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7cURBQUM7SUFObkMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBRTtTQUMvQyxDQUFDO3lDQWM0QixlQUFNLEVBQWdCLFdBQUksRUFBZ0IsV0FBSTtPQVovRCxjQUFjLENBeU0xQjtJQUFELHFCQUFDO0NBQUEsQUF6TUQsSUF5TUM7QUF6TVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9EYXRhXCI7XHJcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xyXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuXHJcbi8vY29udGludWUgaGVyZVxyXG4vL3doZW4gYSB1c2VyIGxvZ3MgaW4gd2l0aCBmYWNlYm9vayBvciBnb29nbGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbi8vY3JlYXRlIHRoZSB1c2VyIGluIGRiXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJteS1hcHBcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiIF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICB1c2VyOiBhbnk7XHJcbiAgbmV3VXNlcjogYW55O1xyXG4gIHVzZXJEYXRhOiBhbnk7XHJcbiAgdXNlckNyZWF0ZWQgPSBmYWxzZTtcclxuICBzaWduaW5nVXAgPSBmYWxzZTtcclxuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xyXG4gIHVzZXJJZDogYW55O1xyXG4gIHNlcnZlcjogU2VydmVyO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcclxuICAgIHRoaXMudXNlciA9IHtcclxuICAgICAgXCJlbWFpbFwiIDogXCJrYXNpYS56dWJvd2ljekBnbWFpbC5jb21cIixcclxuICAgICAgXCJwYXNzd29yZFwiIDogXCJxd2VydHkxMjNcIlxyXG4gICAgfVxyXG4gICAgdGhpcy51c2VySWQgPSAwO1xyXG4gICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgfSBcclxuXHJcbiAgbG9naW4oKSB7XHJcbiAgICBpZiAodGhpcy51c2VyLmVtYWlsICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xyXG4gICAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxyXG4gICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xyXG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnVzZXIucGFzc3dvcmRcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIGlublwiKTtcclxuICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmYWNlTG9naW4oKSB7XHJcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuRkFDRUJPT0ssXHJcbiAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XHJcbiAgICAgICAgICBzY29wZTogWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uKGZiX3Jlc3VsdCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJGYWNlYm9vayBsb2dpblwiKTtcclxuICAgICAgICAgIHRoYXQuZmluZFVzZXIoKTtcclxuICAgICAgICAgIC8vcm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL3ZhciBmYl9hY2Nlc3NfdG9rZW4gPSBmYl9yZXN1bHQucHJvdmlkZXJzWzFdLnRva2VuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGxvZ2dpbmcgdG8gRmFjZWJvb2tcIiArIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29vZ2xlTG9naW4oKSB7XHJcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvb2dsZSBsb2dpbiBzdWNjZWRlZFwiKTtcclxuICAgICAgICB0aGF0LmZpbmRVc2VyKCk7XHJcbiAgICAgICAgLy9yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XHJcbiAgICB9LFxyXG4gICAgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfVxyXG4gICk7XHJcbn1cclxuXHJcbiAgc2lnblVwKCkge1xyXG4gICAgdGhpcy5zaWduaW5nVXAgPSB0cnVlO1xyXG4gICAgdGhpcy5uZXdVc2VyID0ge1xyXG4gICAgICBcImVtYWlsXCIgOiBcIm5ld1VzZXJAdXNlci5jb21cIixcclxuICAgICAgXCJwYXNzd29yZFwiIDogXCJuZXdQYXNzd29yZFwiXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc2lnblVwVG9GaXJlYmFzZSgpIHtcclxuICAgIGlmICh0aGlzLm5ld1VzZXIuZW1haWwgJiYgdGhpcy5uZXdVc2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgZW1haWw6IHRoaXMubmV3VXNlci5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLm5ld1VzZXIucGFzc3dvcmRcclxuICAgICAgfSkudGhlbihcclxuICAgICAgICAocmVzdWx0KSA9PiAge1xyXG4gICAgICAgICAgYWxlcnQoXCJVc2VyIGNyZWF0ZWRcIik7XHJcbiAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcclxuICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XHJcbiAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IFwiXCJcclxuICAgICAgICAgIH1cclxuICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4gIHtcclxuICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICAgIHRoaXMubmV3VXNlciA9IHtcclxuICAgICAgICAgICAgXCJlbWFpbFwiIDogXCJcIixcclxuICAgICAgICAgICAgXCJwYXNzd29yZFwiIDogXCJcIiB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVEYXRhKCkge1xyXG4gICAgICBpZiAodGhpcy51c2VyRGF0YS5maXJzdE5hbWUgJiYgdGhpcy51c2VyRGF0YS5sYXN0TmFtZSkge1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkgXHJcbiAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgdmFyIG9rID0gdGhpcy5zZXJ2ZXIuc2F2ZVVzZXIodGhpcy51c2VyRGF0YS5maXJzdE5hbWUsIHRoaXMudXNlckRhdGEubGFzdE5hbWUsIHRoaXMudXNlckRhdGEubG9jYXRpb24sIHRoaXMudXNlckRhdGEucHJvZmVzc2lvbiwgdXNlci5lbWFpbClcclxuICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCJGaWVsZHMgZmlyc3QgYW5kIGxhc3QgbmFtZSBjYW4ndCBiZSBlbXB0eSFcIik7XHJcbiAgICAgIH1cclxuICAgICAgLy9maXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXHJcbiAgICAgIC8vLnRoZW4oICgpID0+IHtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pXHJcbiAgICAgIC8vfSkgXHJcbiAgICAgIC8vLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBmaW5kVXNlcigpIHtcclxuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcclxuICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlci5lbWFpbCA9IHVzZXIuZW1haWw7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUQUJCQkJCQkIgVXNlcnMgZW1haWwgaXMgXCIgKyB1c2VyLmVtYWlsKTtcclxuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwidXNlcnM/dHJhbnNmb3JtPTEmZmlsdGVyPWVtYWlsLGVxLFwiK3VzZXIuZW1haWw7XHJcbiAgICAgICAgLy9hbGVydChxdWVyeSk7XHJcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxyXG4gICAgICAgIC50aGVuKChyKSA9PiB7IFxyXG4gICAgICAgICAgICBpZiAoci51c2Vycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiVXNlciBmb3VuZCBcIiArIHIudXNlcnNbMF0udXNlcl9JZCArIHIudXNlcnNbMF0uZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSByLnVzZXJzWzBdLnVzZXJfSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcclxuICAgICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IHIudXNlcnNbMF0uZmlyc3RfTmFtZSxcclxuICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogci51c2Vyc1swXS5sYXN0X05hbWUsXHJcbiAgICAgICAgICAgICAgICAgIFwiZW1haWxcIiA6IHIudXNlcnNbMF0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IHIudXNlcnNbMF0udXNlcl9JZCxcclxuICAgICAgICAgICAgICAgICAgXCJnZW5kZXJcIiA6IHIudXNlcnNbMF0uZ2VuZGVyLFxyXG4gICAgICAgICAgICAgICAgICBcImRvYlwiIDogci51c2Vyc1swXS5ET0IsXHJcbiAgICAgICAgICAgICAgICAgIFwiYXZhdGFyXCIgOiByLnVzZXJzWzBdLmF2YXRhcixcclxuICAgICAgICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiByLnVzZXJzWzBdLnByb2Zlc3Npb24sXHJcbiAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IHIudXNlcnNbMF0ubG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgIFwiaG9iYnlcIiA6IHIudXNlcnNbMF0uaG9iYnlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlciBub3QgZm91bmQgaW4gZGIgXCIgKyB1c2VyLmVtYWlsKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pXHJcbiAgICBcclxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVzZXJzIGlkIFwiICsgdGhpcy51c2VySWQpOyAgIFxyXG59XHJcblxyXG5jYW5jZWwoKSB7XHJcbiAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcclxuICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcclxufVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxyXG4gICAgLnRoZW4oICgpID0+IHtcclxuICAgICAgdGhpcy5maW5kVXNlcigpO1xyXG4gICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pXHJcbiAgICB9KSBcclxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4gXCIgKyBlcnJvcikpO1xyXG4gIH1cclxufSJdfQ==