"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var color_1 = require("color");
var Data_1 = require("../../shared/Data");
var firebase = require("nativescript-plugin-firebase");
var http = require("http");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, page, data) {
        this.router = router;
        this.page = page;
        this.data = data;
        this.isLoggingIn = true;
        this.site = "http://188.166.127.207:5555/api.php/";
        this.user = {
            "email": "kasia.zubowicz@gmail.com",
            "password": "qwerty123"
        };
        this.userId = 0;
    }
    LoginComponent.prototype.submit = function () {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
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
        if (this.user.email && this.user.password) {
            firebase.createUser({
                email: this.user.email,
                password: this.user.password
            }).then(function (result) { return alert("User created"); }, function (error) { return alert(error); });
        }
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
        var container = this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new color_1.Color("white") : new color_1.Color("#301217"),
            duration: 200
        });
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
                        "id": r.users[0].user_Id
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBRzlCLDBDQUF5QztBQUN6QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFTM0I7SUFRRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFVO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQU4xRSxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFLcEQsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLE9BQU8sRUFBRywwQkFBMEI7WUFDcEMsVUFBVSxFQUFHLFdBQVc7U0FDekIsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQWlCQztRQWhCQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFD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IFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvRGF0YVwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiBdXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gIHVzZXI6IGFueTtcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xuICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcbiAgdXNlcklkOiBhbnk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgIHRoaXMudXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwia2FzaWEuenVib3dpY3pAZ21haWwuY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcInF3ZXJ0eTEyM1wiXG4gICAgfVxuICAgIHRoaXMudXNlcklkID0gMDtcbiAgfSBcblxuICBzdWJtaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNMb2dnaW5nSW4pIHtcbiAgICAgIHRoaXMubG9naW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaWduVXAoKTtcbiAgICB9XG4gIH1cblxuICBsb2dpbigpIHtcbiAgICBpZiAodGhpcy51c2VyLmVtYWlsICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xuICAgICAgZmlyZWJhc2UubG9naW4oe1xuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuUEFTU1dPUkQsXG4gICAgICAgIHBhc3N3b3JkT3B0aW9uczoge1xuICAgICAgICAgIGVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlci5wYXNzd29yZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgaW5uXCIpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgZmFjZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICAgIGZpcmViYXNlLmxvZ2luKHtcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkZBQ0VCT09LLFxuICAgICAgICBmYWNlYm9va09wdGlvbnM6IHtcbiAgICAgICAgICBzY29wZTogWydwdWJsaWNfcHJvZmlsZScsICdlbWFpbCddXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKGZiX3Jlc3VsdCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFjZWJvb2sgbG9naW5cIik7XG4gICAgICAgICAgcm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vdmFyIGZiX2FjY2Vzc190b2tlbiA9IGZiX3Jlc3VsdC5wcm92aWRlcnNbMV0udG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9nZ2luZyB0byBGYWNlYm9va1wiICsgZXJyKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGdvb2dsZUxvZ2luKCkge1xuICAgIHZhciByb3V0ZXIgPSB0aGlzLnJvdXRlcjtcbiAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRVxuICAgIH0pLnRoZW4oXG4gICAgICBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR29vZ2xlIGxvZ2luIHN1Y2NlZGVkXCIpO1xuICAgICAgICByb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgKTtcbn1cblxuICBzaWduVXAoKSB7XG4gICAgaWYgKHRoaXMudXNlci5lbWFpbCAmJiB0aGlzLnVzZXIucGFzc3dvcmQpIHtcbiAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICBlbWFpbDogdGhpcy51c2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnVzZXIucGFzc3dvcmRcbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIChyZXN1bHQpID0+IGFsZXJ0KFwiVXNlciBjcmVhdGVkXCIpLFxuICAgICAgICAoZXJyb3IpID0+IGFsZXJ0KGVycm9yKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIGxldCBjb250YWluZXIgPSA8Vmlldz50aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnRhaW5lci5hbmltYXRlKHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5pc0xvZ2dpbmdJbiA/IG5ldyBDb2xvcihcIndoaXRlXCIpIDogbmV3IENvbG9yKFwiIzMwMTIxN1wiKSxcbiAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRVc2VyKCkge1xuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUQUJCQkJCQkIgVXNlcnMgZW1haWwgaXMgXCIgKyB1c2VyLmVtYWlsKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcInVzZXJzP3RyYW5zZm9ybT0xJmZpbHRlcj1lbWFpbCxlcSxcIit1c2VyLmVtYWlsO1xuICAgICAgICAvL2FsZXJ0KHF1ZXJ5KTtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4geyBcbiAgICAgICAgICAgIGlmIChyLnVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiVXNlciBmb3VuZCBcIiArIHIudXNlcnNbMF0udXNlcl9JZCArIHIudXNlcnNbMF0uZW1haWwpO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcklkID0gci51c2Vyc1swXS51c2VyX0lkO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlID0ge1xuICAgICAgICAgICAgICAgICAgXCJmaXJzdE5hbWVcIiA6IHIudXNlcnNbMF0uZmlyc3RfTmFtZSxcbiAgICAgICAgICAgICAgICAgIFwibGFzdE5hbWVcIiA6IHIudXNlcnNbMF0ubGFzdF9OYW1lLFxuICAgICAgICAgICAgICAgICAgXCJlbWFpbFwiIDogci51c2Vyc1swXS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IHIudXNlcnNbMF0udXNlcl9JZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VyIG5vdCBmb3VuZCBcIiArIHVzZXIuZW1haWwpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICBcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgIGNvbnNvbGUubG9nKFwiVXNlcnMgaWQgXCIgKyB0aGlzLnVzZXJJZCk7XG4gICAgXG59XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmRVc2VyKCk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKX0pIFxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4gXCIgKyBlcnJvcikpO1xuICB9XG59Il19