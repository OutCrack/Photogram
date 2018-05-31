"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var Data_1 = require("../../shared/Data");
var Server_1 = require("../../shared/Server/Server");
var application = require("application");
var firebase = require("nativescript-plugin-firebase");
var application_1 = require("application");
var http = require("http");
/**
 *
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
var LoginComponent = /** @class */ (function () {
    /**
     * Creates an instance of LoginComponent.
     * @param {Router} router
     * @param {Page} page
     * @param {Data} data
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
    LoginComponent.prototype.signUp = function () {
        this.signingUp = true;
        this.newUser = {
            "email": "newUser@user.com",
            "password": "newPassword"
        };
    };
    /**
     *
     *
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
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
    /**
     *
     *
     * @memberof LoginComponent
     */
    LoginComponent.prototype.cancel = function () {
        this.signingUp = false;
    };
    /**
     *
     *
     * @memberof LoginComponent
     */
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        firebase.getCurrentUser()
            .then(function () {
            _this.findUser();
        })
            .catch(function (error) { return console.log("Not logged in " + error); });
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            data.cancel = true;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCx5Q0FBMkM7QUFDM0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsMkNBQXFGO0FBQ3JGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQjs7Ozs7O0dBTUc7QUFPSDtJQVdFOzs7Ozs7T0FNRztJQUNILHdCQUFvQixNQUFjLEVBQVUsSUFBVSxFQUFVLElBQVU7UUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBZDFFLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBYXBELElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixPQUFPLEVBQUcsMEJBQTBCO1lBQ3BDLFVBQVUsRUFBRyxXQUFXO1NBQ3pCLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBSyxHQUFMO1FBQUEsaUJBZUM7UUFkQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDYixJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRO2dC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QXBCLENBQW9CLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlDQUFRLEdBQVI7UUFBQSxpQkFVRztRQVRDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxRQUFRLENBQUMsY0FBYyxFQUFFO2FBQ3hCLElBQUksQ0FBRTtZQUNMLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7UUFDdkQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztZQUM5RyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFsUFUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBRTtTQUMvQyxDQUFDO3lDQW9CNEIsZUFBTSxFQUFnQixXQUFJLEVBQWdCLFdBQUk7T0FsQi9ELGNBQWMsQ0FtUDFCO0lBQUQscUJBQUM7Q0FBQSxBQW5QRCxJQW1QQztBQW5QWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YX0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG4vKipcbiAqIFxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTG9naW5Db21wb25lbnRcbiAqIEBpbXBsZW1lbnRzIHtPbkluaXR9XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICB1c2VyOiBhbnk7XG4gIG5ld1VzZXI6IGFueTtcbiAgdXNlckRhdGE6IGFueTtcbiAgdXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgc2lnbmluZ1VwID0gZmFsc2U7XG4gIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gIHVzZXJJZDogYW55O1xuICBzZXJ2ZXI6IFNlcnZlcjtcblxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luQ29tcG9uZW50LlxuICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIFxuICAgKiBAcGFyYW0ge1BhZ2V9IHBhZ2UgXG4gICAqIEBwYXJhbSB7RGF0YX0gZGF0YSBcbiAgICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgIHRoaXMudXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwia2FzaWEuenVib3dpY3pAZ21haWwuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcInF3ZXJ0eTEyM1wiXG4gICAgfVxuICAgIHRoaXMudXNlcklkID0gMDtcbiAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgfSBcblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogXG4gICAqIEBtZW1iZXJvZiBMb2dpbkNvbXBvbmVudFxuICAgKi9cbiAgZmFjZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcbiAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XG4gICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxuICAgICAgICB9XG4gICAgICB9KS50aGVuKFxuICAgICAgICBmdW5jdGlvbihmYl9yZXN1bHQpIHtcbiAgICAgICAgICB0aGF0LmZpbmRVc2VyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGFsZXJ0KFwiTG9naW4gdW5zdWNjZXNzZnVsbCBcIiArIGVycik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIGdvb2dsZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZmlyZWJhc2UubG9naW4oe1xuICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5HT09HTEVcbiAgICB9KS50aGVuKFxuICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICB0aGF0LmZpbmRVc2VyKCk7XG4gICAgfSxcbiAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBhbGVydChcIkxvZ2luIHVuc3VjY2Vzc2Z1bGwgXCIgKyBlcnIpO1xuICAgIH1cbiAgKTtcbn1cblxuLyoqXG4gKiBcbiAqIFxuICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gKi9cbnNpZ25VcCgpIHtcbiAgICB0aGlzLnNpZ25pbmdVcCA9IHRydWU7XG4gICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgXCJlbWFpbFwiIDogXCJuZXdVc2VyQHVzZXIuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIm5ld1Bhc3N3b3JkXCJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIHNpZ25VcFRvRmlyZWJhc2UoKSB7XG4gICAgaWYgKHRoaXMubmV3VXNlci5lbWFpbCAmJiB0aGlzLm5ld1VzZXIucGFzc3dvcmQpIHtcbiAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgIGVtYWlsOiB0aGlzLm5ld1VzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMubmV3VXNlci5wYXNzd29yZFxuICAgICAgfSkudGhlbihcbiAgICAgICAgKHJlc3VsdCkgPT4gIHtcbiAgICAgICAgICBhbGVydChcIlVzZXIgY3JlYXRlZFwiKTtcbiAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJwcm9mZXNzaW9uXCIgOiBcIlwiXG4gICAgICAgICAgfVxuICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+ICB7XG4gICAgICAgICAgYWxlcnQoXCJFcnJvciBzaWduaW5nIHVwIFwiICsgKGVycm9yKSk7XG4gICAgICAgICAgdGhpcy5uZXdVc2VyID0ge1xuICAgICAgICAgICAgXCJlbWFpbFwiIDogXCJcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIiA6IFwiXCIgfVxuICAgICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIHNhdmVEYXRhKCkge1xuICAgICAgaWYgKHRoaXMudXNlckRhdGEuZmlyc3ROYW1lICYmIHRoaXMudXNlckRhdGEubGFzdE5hbWUpIHtcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKSBcbiAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIHZhciBvayA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuc2F2ZVVzZXIodGhpcy51c2VyRGF0YS5maXJzdE5hbWUsIHRoaXMudXNlckRhdGEubGFzdE5hbWUsIHRoaXMudXNlckRhdGEubG9jYXRpb24sIFxuICAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEucHJvZmVzc2lvbiwgdXNlci5lbWFpbClcbiAgICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICBvay50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KFwiRmllbGRzIGZpcnN0IGFuZCBsYXN0IG5hbWUgY2FuJ3QgYmUgZW1wdHkhXCIpO1xuICAgICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBcbiAgICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gICAqL1xuICBmaW5kVXNlcigpIHtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIHRoaXMudXNlci5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJ1c2Vycz90cmFuc2Zvcm09MSZmaWx0ZXI9ZW1haWwsZXEsXCIrdXNlci5lbWFpbDtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4geyBcbiAgICAgICAgICAgIGlmIChyLnVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHIudXNlcnNbMF0udXNlcl9JZDtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZSA9IHtcbiAgICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiByLnVzZXJzWzBdLmZpcnN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCIgOiByLnVzZXJzWzBdLmxhc3RfTmFtZSxcbiAgICAgICAgICAgICAgICAgIFwiZW1haWxcIiA6IHIudXNlcnNbMF0uZW1haWwsXG4gICAgICAgICAgICAgICAgICBcImlkXCIgOiByLnVzZXJzWzBdLnVzZXJfSWQsXG4gICAgICAgICAgICAgICAgICBcImdlbmRlclwiIDogci51c2Vyc1swXS5nZW5kZXIsXG4gICAgICAgICAgICAgICAgICBcImRvYlwiIDogci51c2Vyc1swXS5ET0IsXG4gICAgICAgICAgICAgICAgICBcImF2YXRhclwiIDogci51c2Vyc1swXS5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHIudXNlcnNbMF0ucHJvZmVzc2lvbixcbiAgICAgICAgICAgICAgICAgIFwibG9jYXRpb25cIiA6IHIudXNlcnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICBcImhvYmJ5XCIgOiByLnVzZXJzWzBdLmhvYmJ5XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuc2F2ZUFsYnVtKHIudXNlcnNbMF0udXNlcl9JZCwgci51c2Vyc1swXS5maXJzdF9OYW1lICsgXCIncyBhbGJ1bVwiICxcbiAgICAgICAgICAgICAgICB0cnVlLCBcIkFsYnVtIGZvciBmZWVkIHBob3Rvc1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB7XG4gICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIC8vYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBcIik7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTsgXG59XG5cbi8qKlxuICogXG4gKiBcbiAqIEBtZW1iZXJvZiBMb2dpbkNvbXBvbmVudFxuICovXG5jYW5jZWwoKSB7XG4gIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XG59XG5cbi8qKlxuICogXG4gKiBcbiAqIEBtZW1iZXJvZiBMb2dpbkNvbXBvbmVudFxuICovXG5uZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4oICgpID0+IHtcbiAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICB9KSBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcbiAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSk9PiB7IFxuICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgXG4gICAgfSlcbiAgfVxufSJdfQ==