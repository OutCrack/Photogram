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
            "email": "",
            "password": ""
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
                firebase.login();
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
            console.log(JSON.stringify(fb_result));
            that.findUser();
        }, function (err) {
            if (err.localeCompare("Logging in the user failed. com.google.firebase.auth.FirebaseAuthUserCollisionException: An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.") == 0) {
                alert("The email address is already associated with another account. Log in and link the accounts");
            }
            else {
                //alert("WOOOW");
            }
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
            console.log(JSON.stringify(result));
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
            "email": "",
            "password": ""
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
                    //this.findUser();
                    //this.router.navigate(["/tab"]);
                    alert("User created. You can now log in to SergPhoto");
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
            //alert("Provider " + user.providers[1].id);
            console.log("Users email is " + _this.user.email);
            var query = _this.site + "users?transform=1&filter=email,eq," + _this.user.email;
            http.getJSON(query)
                .then(function (r) {
                if (r.users.length > 0) {
                    _this.userId = r.users[0].user_Id;
                    _this.data.storage = {
                        "firstName": r.users[0].first_Name,
                        "lastName": r.users[0].last_Name,
                        "email": r.users[0].email,
                        //"provider1" : user.providers[1].id,
                        //"provider2" : user.providers[2] == null ? null : user.providers[2].id,
                        //"provider3" : user.providers[3] == null ? null : user.providers[3].id,
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
                    console.log("IN ELSE");
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
                alert("User not found ");
                console.log("User not found");
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
    LoginComponent.prototype.cancel2 = function () {
        this.signingUp = false;
        this.userCreated = false;
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
            if (_this.router.isActive("/login", false)) {
                data.cancel = true;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0IsMENBQXlDO0FBQ3pDLHFEQUFvRDtBQUNwRCx5Q0FBMkM7QUFDM0MsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsMkNBQXFGO0FBRXJGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQjs7Ozs7O0dBTUc7QUFPSDtJQVdFOzs7Ozs7T0FNRztJQUNILHdCQUFvQixNQUFjLEVBQVUsSUFBVSxFQUFVLElBQVU7UUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBZDFFLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsU0FBSSxHQUFXLHNDQUFzQyxDQUFDO1FBYXBELElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixPQUFPLEVBQUcsRUFBRTtZQUNaLFVBQVUsRUFBRyxFQUFFO1NBQ2hCLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBSyxHQUFMO1FBQUEsaUJBZ0JDO1FBZkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFDakMsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7aUJBQzdCO2FBQ0YsQ0FBQztpQkFDRCxJQUFJLENBQ0g7Z0JBQ0UsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqQixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNILEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBWixDQUFZLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQ0FBUyxHQUFUO1FBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDZCxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUNqQyxlQUFlLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDO2FBQ25DO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FDTCxVQUFTLFNBQVM7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUMsRUFDRCxVQUFTLEdBQUc7WUFDVixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGdQQUFnUCxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzdRLENBQUM7Z0JBQ0MsS0FBSyxDQUFDLDRGQUE0RixDQUFDLENBQUM7WUFFdEcsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLGlCQUFpQjtZQUNuQixDQUFDO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG9DQUFXLEdBQVg7UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTTtTQUM5QixDQUFDLENBQUMsSUFBSSxDQUNMLFVBQVUsTUFBTTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQ0QsVUFBUyxHQUFHO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFLLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsT0FBTyxFQUFHLEVBQUU7WUFDWixVQUFVLEVBQUcsRUFBRTtTQUNoQixDQUFBO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx5Q0FBZ0IsR0FBaEI7UUFBQSxpQkEwQkM7UUF6QkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7YUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FDTCxVQUFDLE1BQU07Z0JBQ0wsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRztvQkFDZCxXQUFXLEVBQUcsRUFBRTtvQkFDaEIsVUFBVSxFQUFHLEVBQUU7b0JBQ2YsVUFBVSxFQUFHLEVBQUU7b0JBQ2YsWUFBWSxFQUFHLEVBQUU7aUJBQ2xCLENBQUE7WUFDTixDQUFDLEVBQ0UsVUFBQyxLQUFLO2dCQUNKLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxPQUFPLEdBQUc7b0JBQ2IsT0FBTyxFQUFHLEVBQUU7b0JBQ1osVUFBVSxFQUFHLEVBQUU7aUJBQUUsQ0FBQTtZQUNuQixDQUFDLENBQ0osQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxjQUFjLEVBQUU7aUJBQ3RCLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ1IsSUFBSSxFQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQzVGLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixPQUFPLEVBQUUsQ0FBQztnQkFDWixDQUFDLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNOLGtCQUFrQjtvQkFDbEIsaUNBQWlDO29CQUNqQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLENBQUM7WUFFTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBRTFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlDQUFRLEdBQVI7UUFBQSxpQkFrREQ7UUFqREcsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUN4QixJQUFJLENBQUMsVUFBQSxJQUFJO1lBQ04sS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM3Qiw0Q0FBNEM7WUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELElBQUksS0FBSyxHQUFXLEtBQUksQ0FBQyxJQUFJLEdBQUcsb0NBQW9DLEdBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDakMsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUc7d0JBQ2xCLFdBQVcsRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ25DLFVBQVUsRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7d0JBQ2pDLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7d0JBQzFCLHFDQUFxQzt3QkFDckMsd0VBQXdFO3dCQUN4RSx3RUFBd0U7d0JBQ3hFLElBQUksRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87d0JBQ3pCLFFBQVEsRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07d0JBQzVCLEtBQUssRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7d0JBQ3RCLFFBQVEsRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07d0JBQzVCLFlBQVksRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BDLFVBQVUsRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7d0JBQ2hDLE9BQU8sRUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7cUJBRTNCLENBQUE7b0JBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxFQUM1RSxJQUFJLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztvQkFDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxRQUFRLEdBQUc7d0JBQ2QsV0FBVyxFQUFHLEVBQUU7d0JBQ2hCLFVBQVUsRUFBRyxFQUFFO3dCQUNmLFVBQVUsRUFBRyxFQUFFO3dCQUNmLFlBQVksRUFBRyxFQUFFO3FCQUNsQixDQUFBO29CQUNDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMvQixDQUFDO1lBQ0wsQ0FBQyxFQUFFLFVBQVMsQ0FBQztnQkFDWCxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQyxDQUFDO2FBRUQsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnQ0FBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxpQ0FBUSxHQUFSO1FBQUEsaUJBWUc7UUFYQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUN4QixJQUFJLENBQUU7WUFDTCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1FBQ3ZELFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdDQUFrQixDQUFDLHdCQUF3QixFQUFFLFVBQUMsSUFBeUM7WUFDNUcsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQTNRVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFFO1NBQy9DLENBQUM7eUNBb0I0QixlQUFNLEVBQWdCLFdBQUksRUFBZ0IsV0FBSTtPQWxCL0QsY0FBYyxDQTRRMUI7SUFBRCxxQkFBQztDQUFBLEFBNVFELElBNFFDO0FBNVFZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IGNvbXBvbmVudEZhY3RvcnlOYW1lIH0gZnJvbSBcIkBhbmd1bGFyL2NvbXBpbGVyXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG4vKipcbiAqIFxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTG9naW5Db21wb25lbnRcbiAqIEBpbXBsZW1lbnRzIHtPbkluaXR9XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICB1c2VyOiBhbnk7XG4gIG5ld1VzZXI6IGFueTtcbiAgdXNlckRhdGE6IGFueTtcbiAgdXNlckNyZWF0ZWQgPSBmYWxzZTtcbiAgc2lnbmluZ1VwID0gZmFsc2U7XG4gIHNpdGU6IHN0cmluZyA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo1NTU1L2FwaS5waHAvXCI7XG4gIHVzZXJJZDogYW55O1xuICBzZXJ2ZXI6IFNlcnZlcjtcblxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExvZ2luQ29tcG9uZW50LlxuICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIFxuICAgKiBAcGFyYW0ge1BhZ2V9IHBhZ2UgXG4gICAqIEBwYXJhbSB7RGF0YX0gZGF0YSBcbiAgICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgIHRoaXMudXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIlwiXG4gICAgfVxuICAgIHRoaXMudXNlcklkID0gMDtcbiAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgfSBcblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGZpcmViYXNlLmxvZ2luKCk7XG4gICAgICAgICAgdGhpcy5maW5kVXNlcigpO1xuICAgICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBcbiAgICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gICAqL1xuICBmYWNlTG9naW4oKSB7XG4gICAgdmFyIHJvdXRlciA9IHRoaXMucm91dGVyO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkZBQ0VCT09LLFxuICAgICAgICBmYWNlYm9va09wdGlvbnM6IHtcbiAgICAgICAgICBzY29wZTogWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKGZiX3Jlc3VsdCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGZiX3Jlc3VsdCkpO1xuICAgICAgICAgIHRoYXQuZmluZFVzZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVyci5sb2NhbGVDb21wYXJlKFwiTG9nZ2luZyBpbiB0aGUgdXNlciBmYWlsZWQuIGNvbS5nb29nbGUuZmlyZWJhc2UuYXV0aC5GaXJlYmFzZUF1dGhVc2VyQ29sbGlzaW9uRXhjZXB0aW9uOiBBbiBhY2NvdW50IGFscmVhZHkgZXhpc3RzIHdpdGggdGhlIHNhbWUgZW1haWwgYWRkcmVzcyBidXQgZGlmZmVyZW50IHNpZ24taW4gY3JlZGVudGlhbHMuIFNpZ24gaW4gdXNpbmcgYSBwcm92aWRlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLlwiKSA9PSAwKSBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhbGVydChcIlRoZSBlbWFpbCBhZGRyZXNzIGlzIGFscmVhZHkgYXNzb2NpYXRlZCB3aXRoIGFub3RoZXIgYWNjb3VudC4gTG9nIGluIGFuZCBsaW5rIHRoZSBhY2NvdW50c1wiKTtcblxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vYWxlcnQoXCJXT09PV1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIGdvb2dsZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZmlyZWJhc2UubG9naW4oe1xuICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5HT09HTEVcbiAgICB9KS50aGVuKFxuICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAgICAgdGhhdC5maW5kVXNlcigpO1xuICAgIH0sXG4gICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgYWxlcnQoXCJMb2dpbiB1bnN1Y2Nlc3NmdWxsIFwiICsgZXJyKTtcbiAgICB9XG4gICk7XG59XG5cbi8qKlxuICogXG4gKiBcbiAqIEBtZW1iZXJvZiBMb2dpbkNvbXBvbmVudFxuICovXG5zaWduVXAoKSB7XG4gICAgdGhpcy5zaWduaW5nVXAgPSB0cnVlO1xuICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIlwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBcbiAgICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gICAqL1xuICBzaWduVXBUb0ZpcmViYXNlKCkge1xuICAgIGlmICh0aGlzLm5ld1VzZXIuZW1haWwgJiYgdGhpcy5uZXdVc2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5jcmVhdGVVc2VyKHtcbiAgICAgICAgICBlbWFpbDogdGhpcy5uZXdVc2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLm5ld1VzZXIucGFzc3dvcmRcbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIChyZXN1bHQpID0+ICB7XG4gICAgICAgICAgYWxlcnQoXCJVc2VyIGNyZWF0ZWRcIik7XG4gICAgICAgICAgdGhpcy51c2VyQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaWduaW5nVXAgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xuICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICBcImxhc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcbiAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogXCJcIlxuICAgICAgICAgIH1cbiAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAge1xuICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igc2lnbmluZyB1cCBcIiArIChlcnJvcikpO1xuICAgICAgICAgIHRoaXMubmV3VXNlciA9IHtcbiAgICAgICAgICAgIFwiZW1haWxcIiA6IFwiXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkXCIgOiBcIlwiIH1cbiAgICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBcbiAgICogQG1lbWJlcm9mIExvZ2luQ29tcG9uZW50XG4gICAqL1xuICBzYXZlRGF0YSgpIHtcbiAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmZpcnN0TmFtZSAmJiB0aGlzLnVzZXJEYXRhLmxhc3ROYW1lKSB7XG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkgXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICB2YXIgb2sgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2VydmVyLnNhdmVVc2VyKHRoaXMudXNlckRhdGEuZmlyc3ROYW1lLCB0aGlzLnVzZXJEYXRhLmxhc3ROYW1lLCB0aGlzLnVzZXJEYXRhLmxvY2F0aW9uLCBcbiAgICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5wcm9mZXNzaW9uLCB1c2VyLmVtYWlsKVxuICAgICAgICAgICAgICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLnVzZXJDcmVhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIG9rLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAvL3RoaXMuZmluZFVzZXIoKTtcbiAgICAgICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICAgICAgYWxlcnQoXCJVc2VyIGNyZWF0ZWQuIFlvdSBjYW4gbm93IGxvZyBpbiB0byBTZXJnUGhvdG9cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoXCJGaWVsZHMgZmlyc3QgYW5kIGxhc3QgbmFtZSBjYW4ndCBiZSBlbXB0eSFcIik7XG4gICAgICB9XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIFxuICAgKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAgICovXG4gIGZpbmRVc2VyKCkge1xuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgdGhpcy51c2VyLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgLy9hbGVydChcIlByb3ZpZGVyIFwiICsgdXNlci5wcm92aWRlcnNbMV0uaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJzIGVtYWlsIGlzIFwiICsgdGhpcy51c2VyLmVtYWlsKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcInVzZXJzP3RyYW5zZm9ybT0xJmZpbHRlcj1lbWFpbCxlcSxcIit0aGlzLnVzZXIuZW1haWw7XG4gICAgICAgIGh0dHAuZ2V0SlNPTihxdWVyeSlcbiAgICAgICAgLnRoZW4oKHIpID0+IHsgXG4gICAgICAgICAgICBpZiAoci51c2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSByLnVzZXJzWzBdLnVzZXJfSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0b3JhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICBcImZpcnN0TmFtZVwiIDogci51c2Vyc1swXS5maXJzdF9OYW1lLFxuICAgICAgICAgICAgICAgICAgXCJsYXN0TmFtZVwiIDogci51c2Vyc1swXS5sYXN0X05hbWUsXG4gICAgICAgICAgICAgICAgICBcImVtYWlsXCIgOiByLnVzZXJzWzBdLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgLy9cInByb3ZpZGVyMVwiIDogdXNlci5wcm92aWRlcnNbMV0uaWQsXG4gICAgICAgICAgICAgICAgICAvL1wicHJvdmlkZXIyXCIgOiB1c2VyLnByb3ZpZGVyc1syXSA9PSBudWxsID8gbnVsbCA6IHVzZXIucHJvdmlkZXJzWzJdLmlkLFxuICAgICAgICAgICAgICAgICAgLy9cInByb3ZpZGVyM1wiIDogdXNlci5wcm92aWRlcnNbM10gPT0gbnVsbCA/IG51bGwgOiB1c2VyLnByb3ZpZGVyc1szXS5pZCxcbiAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IHIudXNlcnNbMF0udXNlcl9JZCxcbiAgICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiByLnVzZXJzWzBdLmdlbmRlcixcbiAgICAgICAgICAgICAgICAgIFwiZG9iXCIgOiByLnVzZXJzWzBdLkRPQixcbiAgICAgICAgICAgICAgICAgIFwiYXZhdGFyXCIgOiByLnVzZXJzWzBdLmF2YXRhcixcbiAgICAgICAgICAgICAgICAgIFwicHJvZmVzc2lvblwiIDogci51c2Vyc1swXS5wcm9mZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogci51c2Vyc1swXS5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgIFwiaG9iYnlcIiA6IHIudXNlcnNbMF0uaG9iYnlcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlci5zYXZlQWxidW0oci51c2Vyc1swXS51c2VyX0lkLCByLnVzZXJzWzBdLmZpcnN0X05hbWUgKyBcIidzIGFsYnVtXCIgLFxuICAgICAgICAgICAgICAgIHRydWUsIFwiQWxidW0gZm9yIGZlZWQgcGhvdG9zXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJTiBFTFNFXCIpO1xuICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogXCJcIixcbiAgICAgICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IFwiXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXNlckNyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmluZ1VwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kIFwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgbm90IGZvdW5kXCIpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9KVxuICAgIFxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7IFxufVxuXG4vKipcbiAqIFxuICogXG4gKiBAbWVtYmVyb2YgTG9naW5Db21wb25lbnRcbiAqL1xuY2FuY2VsKCkge1xuICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xufVxuXG5jYW5jZWwyKCkge1xuICB0aGlzLnNpZ25pbmdVcCA9IGZhbHNlO1xuICB0aGlzLnVzZXJDcmVhdGVkID0gZmFsc2U7XG59XG5cbi8qKlxuICogXG4gKiBcbiAqIEBtZW1iZXJvZiBMb2dpbkNvbXBvbmVudFxuICovXG5uZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgLnRoZW4oICgpID0+IHtcbiAgICAgIHRoaXMuZmluZFVzZXIoKTtcbiAgICB9KSBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluIFwiICsgZXJyb3IpKTtcbiAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSk9PiB7IFxuICAgICAgaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL2xvZ2luXCIgLCBmYWxzZSkpIHtcbiAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlOyBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59Il19