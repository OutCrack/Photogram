"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var element_registry_1 = require("nativescript-angular/element-registry");
var Data_1 = require("../../../shared/Data");
var router_1 = require("@angular/router");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_changeDetectionRef, data, router) {
        this._changeDetectionRef = _changeDetectionRef;
        this.data = data;
        this.router = router;
        this.stackLoaded = function (args) {
            this.photos = this.server.getPublicPhotos();
        };
        this.photoId = 0;
        this.server = new Server_1.Server();
    }
    HomeComponent.prototype.refreshFeed = function (args) {
        this.photos = this.server.getPublicPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    HomeComponent.prototype.selectPhoto = function (photoId) {
        var selectedPhoto = this.photos.find(function (i) { return i.id === photoId; });
        var navigationExtras = {
            queryParams: {
                "photoId": photoId,
                "url": selectedPhoto.url,
                "created": selectedPhoto.created,
                "photoOwner": selectedPhoto.userId,
                "eventOwner": null,
                "eventId": selectedPhoto.eventId,
                "description": selectedPhoto.description,
                "ownerName": selectedPhoto.user.firstN + " " + selectedPhoto.user.lastN
            }
        };
        this.router.navigate(["/photoView"], navigationExtras);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home-tab",
            templateUrl: "./pages/tabs/home/home.tab.html",
            styleUrls: ["./pages/tabs/home/home.tab.css"]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, Data_1.Data, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUU3RCx3REFBdUQ7QUFDdkQsMEVBQXdFO0FBQ3hFLDZDQUE0QztBQUM1QywwQ0FBMkQ7QUFFM0Qsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUTVGO0lBV0ksdUJBQW9CLG1CQUFzQyxFQUFVLElBQVUsRUFBVSxNQUFjO1FBQWxGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWN0RyxnQkFBVyxHQUFHLFVBQVMsSUFBSTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFBO1FBZEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLFVBQVUsQ0FBQztZQUNQLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFPRCxtQ0FBVyxHQUFYLFVBQVksT0FBZTtRQUN2QixJQUFJLGFBQWEsR0FBVSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxFQUFoQixDQUFnQixDQUFDLENBQUE7UUFDbEUsSUFBSSxnQkFBZ0IsR0FBcUI7WUFDckMsV0FBVyxFQUFFO2dCQUNULFNBQVMsRUFBRyxPQUFPO2dCQUNuQixLQUFLLEVBQUcsYUFBYSxDQUFDLEdBQUc7Z0JBQ3pCLFNBQVMsRUFBRyxhQUFhLENBQUMsT0FBTztnQkFDakMsWUFBWSxFQUFHLGFBQWEsQ0FBQyxNQUFNO2dCQUNuQyxZQUFZLEVBQUcsSUFBSTtnQkFDbkIsU0FBUyxFQUFHLGFBQWEsQ0FBQyxPQUFPO2dCQUNqQyxhQUFhLEVBQUcsYUFBYSxDQUFDLFdBQVc7Z0JBQ3pDLFdBQVcsRUFBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLO2FBQzNFO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBN0NRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0FhMkMsd0JBQWlCLEVBQWdCLFdBQUksRUFBa0IsZUFBTTtPQVg3RixhQUFhLENBK0N6QjtJQUFELG9CQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcywgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaG9tZS10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIHBob3RvSWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgcGhvdG9Vcmw6IHN0cmluZztcbiAgICBwdWJsaWMgcGhvdG9DcmVhdGVkOiBzdHJpbmc7XG4gICAgcHVibGljIHNlbGVjdGVkUGhvdG86IFBob3RvO1xuICAgIFxuICAgIHB1YmxpYyBzZWxlY3RlZElkOiBudW1iZXI7IFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBkYXRhOiBEYXRhLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBob3RvSWQgPSAwO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICB9XG5cbiAgICByZWZyZXNoRmVlZChhcmdzKSB7XG4gICAgICAgIHRoaXMucGhvdG9zID0gdGhpcy5zZXJ2ZXIuZ2V0UHVibGljUGhvdG9zKCk7XG4gICAgICAgIHZhciBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgc3RhY2tMb2FkZWQgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgIHRoaXMucGhvdG9zID0gdGhpcy5zZXJ2ZXIuZ2V0UHVibGljUGhvdG9zKCk7XG4gICAgfVxuXG5cbiAgICBzZWxlY3RQaG90byhwaG90b0lkOiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkUGhvdG86IFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IHBob3RvSWQpXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBcInBob3RvSWRcIiA6IHBob3RvSWQsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIiA6IHNlbGVjdGVkUGhvdG8udXJsLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZFwiIDogc2VsZWN0ZWRQaG90by5jcmVhdGVkLFxuICAgICAgICAgICAgICAgIFwicGhvdG9Pd25lclwiIDogc2VsZWN0ZWRQaG90by51c2VySWQsXG4gICAgICAgICAgICAgICAgXCJldmVudE93bmVyXCIgOiBudWxsLFxuICAgICAgICAgICAgICAgIFwiZXZlbnRJZFwiIDogc2VsZWN0ZWRQaG90by5ldmVudElkLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IHNlbGVjdGVkUGhvdG8uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgXCJvd25lck5hbWVcIiA6IHNlbGVjdGVkUGhvdG8udXNlci5maXJzdE4gKyBcIiBcIiArIHNlbGVjdGVkUGhvdG8udXNlci5sYXN0TlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGhvdG9WaWV3XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbn0iXX0=