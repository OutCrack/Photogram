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
                alert("User not found ");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0IsZUFBZTtBQUNmLGdFQUFnRTtBQUNoRSx1QkFBdUI7QUFRdkI7SUFZRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVIxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU1wRCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsT0FBTyxFQUFHLDBCQUEwQjtZQUNwQyxVQUFVLEVBQUcsV0FBVztTQUN6QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBaUJDO1FBaEJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUs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QUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFFQyxpQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUN4QixJQUFJLENBQUU7WUFDTCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsZ0NBQWdDO1FBQ2xDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBOUx1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTtxREFBQztJQU5uQyxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFFO1NBQy9DLENBQUM7eUNBYzRCLGVBQU0sRUFBZ0IsV0FBSSxFQUFnQixXQUFJO09BWi9ELGNBQWMsQ0FxTTFCO0lBQUQscUJBQUM7Q0FBQSxBQXJNRCxJQXFNQztBQXJNWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy9jb250aW51ZSBoZXJlXG4vL3doZW4gYSB1c2VyIGxvZ3MgaW4gd2l0aCBmYWNlYm9vayBvciBnb29nbGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4vL2NyZWF0ZSB0aGUgdXNlciBpbiBkYlxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgdXNlcjogYW55O1xuICBuZXdVc2VyOiBhbnk7XG4gIHVzZXJEYXRhOiBhbnk7XG4gIHVzZXJDcmVhdGVkID0gZmFsc2U7XG4gIHNpZ25pbmdVcCA9IGZhbHNlO1xuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcbiAgdXNlcklkOiBhbnk7XG4gIHNlcnZlcjogU2VydmVyO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcbiAgICB0aGlzLnVzZXIgPSB7XG4gICAgICBcImVtYWlsXCIgOiBcImthc2lhLnp1Ym93aWN6QGdtYWlsLmNvbVwiLFxuICAgICAgXCJwYXNzd29yZFwiIDogXCJxd2VydHkxMjNcIlxuICAgIH1cbiAgICB0aGlzLnVzZXJJZCA9IDA7XG4gICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gIH0gXG5cbiAgbG9naW4oKSB7XG4gICAgaWYgKHRoaXMudXNlci5lbWFpbCAmJiB0aGlzLnVzZXIucGFzc3dvcmQpIHtcbiAgICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLlBBU1NXT1JELFxuICAgICAgICBwYXNzd29yZE9wdGlvbnM6IHtcbiAgICAgICAgICBlbWFpbDogdGhpcy51c2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnVzZXIucGFzc3dvcmRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIGlublwiKTtcbiAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgZmFjZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcbiAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XG4gICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxuICAgICAgICB9XG4gICAgICB9KS50aGVuKFxuICAgICAgICBmdW5jdGlvbihmYl9yZXN1bHQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhY2Vib29rIGxvZ2luXCIpO1xuICAgICAgICAgIHRoYXQuZmluZFVzZXIoKTtcbiAgICAgICAgICAvL3JvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvL3ZhciBmYl9hY2Nlc3NfdG9rZW4gPSBmYl9yZXN1bHQucHJvdmlkZXJzWzFdLnRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGxvZ2dpbmcgdG8gRmFjZWJvb2tcIiArIGVycik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBnb29nbGVMb2dpbigpIHtcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFXG4gICAgfSkudGhlbihcbiAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJHb29nbGUgbG9naW4gc3VjY2VkZWRcIik7XG4gICAgICAgIHRoYXQuZmluZFVzZXIoKTtcbiAgICAgICAgLy9yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgKTtcbn1cblxuICBzaWduVXAoKSB7XG4gICAgdGhpcy5zaWduaW5nVXAgPSB0cnVlO1xuICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwibmV3VXNlckB1c2VyLmNvbVwiLFxuICAgICAgXCJwYXNzd29yZFwiIDogXCJuZXdQYXNzd29yZFwiXG4gICAgfVxuXG4gIH1cblxuICBzaWduVXBUb0ZpcmViYXNlKCkge1xuICAgIGlmICh0aGlzLm5ld1VzZXIuZW1haWwgJiYgdGhpcy5uZXdVc2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcbiAgICAgICAgICBlbWFpbDogdGhpcy5uZXdVc2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLm5ld1VzZXIucGFzc3dvcmRcbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIChyZXN1bHQpID0+ICB7XG4gICAgICAgICAgYWxlcnQoXCJVc2VyIGNyZWF0ZWRcIik7XG4gICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xuICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcbiAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgIH1cbiAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAge1xuICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICB0aGlzLm5ld1VzZXIgPSB7XG4gICAgICAgICAgICBcImVtYWlsXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZFwiIDogXCJcIiB9XG4gICAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHNhdmVEYXRhKCkge1xuICAgICAgaWYgKHRoaXMudXNlckRhdGEuZmlyc3ROYW1lICYmIHRoaXMudXNlckRhdGEubGFzdE5hbWUpIHtcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKSBcbiAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIHZhciBvayA9IHRoaXMuc2VydmVyLnNhdmVVc2VyKHRoaXMudXNlckRhdGEuZmlyc3ROYW1lLCB0aGlzLnVzZXJEYXRhLmxhc3ROYW1lLCB0aGlzLnVzZXJEYXRhLmxvY2F0aW9uLCB0aGlzLnVzZXJEYXRhLnByb2Zlc3Npb24sIHVzZXIuZW1haWwpXG4gICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJGaWVsZHMgZmlyc3QgYW5kIGxhc3QgbmFtZSBjYW4ndCBiZSBlbXB0eSFcIik7XG4gICAgICB9XG4gICAgICAvL2ZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgIC8vLnRoZW4oICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSlcbiAgICAgIC8vfSkgXG4gICAgICAvLy5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4gXCIgKyBlcnJvcikpO1xuICB9XG5cbiAgZmluZFVzZXIoKSB7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICB0aGlzLnVzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRBQkJCQkJCQiBVc2VycyBlbWFpbCBpcyBcIiArIHVzZXIuZW1haWwpO1xuICAgICAgICB2YXIgcXVlcnk6IHN0cmluZyA9IHRoaXMuc2l0ZSArIFwidXNlcnM/dHJhbnNmb3JtPTEmZmlsdGVyPWVtYWlsLGVxLFwiK3VzZXIuZW1haWw7XG4gICAgICAgIC8vYWxlcnQocXVlcnkpO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7IFxuICAgICAgICAgICAgaWYgKHIudXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIGZvdW5kIFwiICsgci51c2Vyc1swXS51c2VyX0lkICsgci51c2Vyc1swXS5lbWFpbCk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSByLnVzZXJzWzBdLnVzZXJfSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0b3JhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogci51c2Vyc1swXS5maXJzdF9OYW1lLFxuICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogci51c2Vyc1swXS5sYXN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiByLnVzZXJzWzBdLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgXCJpZFwiIDogci51c2Vyc1swXS51c2VyX0lkLFxuICAgICAgICAgICAgICAgICAgXCJnZW5kZXJcIiA6IHIudXNlcnNbMF0uZ2VuZGVyLFxuICAgICAgICAgICAgICAgICAgXCJkb2JcIiA6IHIudXNlcnNbMF0uRE9CLFxuICAgICAgICAgICAgICAgICAgXCJhdmF0YXJcIiA6IHIudXNlcnNbMF0uYXZhdGFyLFxuICAgICAgICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiByLnVzZXJzWzBdLnByb2Zlc3Npb24sXG4gICAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiByLnVzZXJzWzBdLmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgXCJob2JieVwiIDogci51c2Vyc1swXS5ob2JieVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kIGluIGRiIFwiICsgdXNlci5lbWFpbCk7IFxuICAgICAgICAgICAgICAgIHRoaXMudXNlckNyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kIFwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgIGNvbnNvbGUubG9nKFwiVXNlcnMgaWQgXCIgKyB0aGlzLnVzZXJJZCk7XG4gICAgXG59XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pXG4gICAgfSkgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbiBcIiArIGVycm9yKSk7XG4gIH1cbn0iXX0=