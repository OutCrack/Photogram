"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../shared/user/user.service");
var page_1 = require("ui/page");
var color_1 = require("color");
var firebase = require("nativescript-plugin-firebase");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, page) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.isLoggingIn = true;
        this.user = {
            "email": "test@photogram.com",
            "password": "123456"
        };
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
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        firebase.getCurrentUser()
            .then(function (user) { return _this.router.navigate(["/tab"]); })
            .catch(function (error) { return console.log("Not logged in " + error); });
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "container", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            providers: [user_service_1.UserService],
            templateUrl: "./pages/login/login.html",
            styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUV6QywrREFBNkQ7QUFDN0QsZ0NBQStCO0FBQy9CLCtCQUE4QjtBQUc5QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVV6RDtJQUtFLHdCQUFvQixNQUFjLEVBQVUsV0FBd0IsRUFBVSxJQUFVO1FBQXBFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFIeEYsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFJakIsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLE9BQU8sRUFBRyxvQkFBb0I7WUFDOUIsVUFBVSxFQUFHLFFBQVE7U0FDdEIsQ0FBQTtJQUNILENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQWdCQztRQWZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2pDLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUN0QixRQUFRLEVB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RCxpQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUN4QixJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUM7YUFDNUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFqR3VCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBSG5DLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx5QkFBeUIsQ0FBRTtTQUMxRSxDQUFDO3lDQU80QixlQUFNLEVBQXVCLDBCQUFXLEVBQWdCLFdBQUk7T0FMN0UsY0FBYyxDQXFHMUI7SUFBRCxxQkFBQztDQUFBLEFBckdELElBcUdDO0FBckdZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC91c2VyL3VzZXJcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcIi4vcGFnZXMvbG9naW4vbG9naW4uY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICB1c2VyOiBhbnk7XG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSkge1xuICAgIHRoaXMudXNlciA9IHtcbiAgICAgIFwiZW1haWxcIiA6IFwidGVzdEBwaG90b2dyYW0uY29tXCIsXG4gICAgICBcInBhc3N3b3JkXCIgOiBcIjEyMzQ1NlwiXG4gICAgfVxuICB9IFxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgdGhpcy5sb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpZ25VcCgpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXIuZW1haWwgJiYgdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcbiAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XG4gICAgICAgICAgZW1haWw6IHRoaXMudXNlci5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy51c2VyLnBhc3N3b3JkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIGlublwiKTtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIGZhY2VMb2dpbigpIHtcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgICBmaXJlYmFzZS5sb2dpbih7XG4gICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5GQUNFQk9PSyxcbiAgICAgICAgZmFjZWJvb2tPcHRpb25zOiB7XG4gICAgICAgICAgc2NvcGU6IFsncHVibGljX3Byb2ZpbGUnLCAnZW1haWwnXVxuICAgICAgICB9XG4gICAgICB9KS50aGVuKFxuICAgICAgICBmdW5jdGlvbihmYl9yZXN1bHQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhY2Vib29rIGxvZ2luXCIpO1xuICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbXCIvdGFiXCJdKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvL3ZhciBmYl9hY2Nlc3NfdG9rZW4gPSBmYl9yZXN1bHQucHJvdmlkZXJzWzFdLnRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGxvZ2dpbmcgdG8gRmFjZWJvb2tcIiArIGVycik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBnb29nbGVMb2dpbigpIHtcbiAgICB2YXIgcm91dGVyID0gdGhpcy5yb3V0ZXI7XG4gICAgZmlyZWJhc2UubG9naW4oe1xuICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5HT09HTEVcbiAgICB9KS50aGVuKFxuICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdvb2dsZSBsb2dpbiBzdWNjZWRlZFwiKVxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoW1wiL3RhYlwiXSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgKTtcbn1cblxuICBzaWduVXAoKSB7XG4gICAgaWYgKHRoaXMudXNlci5lbWFpbCAmJiB0aGlzLnVzZXIucGFzc3dvcmQpIHtcbiAgICAgIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xuICAgICAgICBlbWFpbDogdGhpcy51c2VyLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnVzZXIucGFzc3dvcmRcbiAgICAgIH0pLnRoZW4oXG4gICAgICAgIChyZXN1bHQpID0+IGFsZXJ0KFwiVXNlciBjcmVhdGVkXCIpLFxuICAgICAgICAoZXJyb3IpID0+IGFsZXJ0KGVycm9yKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIGxldCBjb250YWluZXIgPSA8Vmlldz50aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnRhaW5lci5hbmltYXRlKHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5pc0xvZ2dpbmdJbiA/IG5ldyBDb2xvcihcIndoaXRlXCIpIDogbmV3IENvbG9yKFwiIzMwMTIxN1wiKSxcbiAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAudGhlbih1c2VyID0+IHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJcIl0pKVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4gXCIgKyBlcnJvcikpO1xuICB9XG59Il19