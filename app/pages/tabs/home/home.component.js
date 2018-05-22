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
        var _this = this;
        var selectedPhoto;
        var promise = new Promise(function (resolve, reject) {
            selectedPhoto = _this.photos.find(function (i) { return i.id === photoId; });
            _this.server.getEventOwner(selectedPhoto.eventId).then(function (r) {
                resolve(r);
            }).catch(function () {
                reject();
            });
        });
        promise.then(function (owner) {
            var navigationExtras = {
                queryParams: {
                    "photoId": photoId,
                    "url": selectedPhoto.url,
                    "created": selectedPhoto.created,
                    "photoOwner": selectedPhoto.userId,
                    "eventOwner": owner,
                    "eventId": selectedPhoto.eventId,
                    "description": selectedPhoto.description,
                    "ownerName": selectedPhoto.userName,
                    "fileName": selectedPhoto.fileName,
                    "albumPath": selectedPhoto.albumPath
                }
            };
            _this.router.navigate(["/photoView"], navigationExtras);
        }).catch(function () {
            var navigationExtras = {
                queryParams: {
                    "photoId": photoId,
                    "url": selectedPhoto.url,
                    "created": selectedPhoto.created,
                    "photoOwner": selectedPhoto.userId,
                    "eventOwner": null,
                    "eventId": selectedPhoto.eventId,
                    "description": selectedPhoto.description,
                    "ownerName": selectedPhoto.userName,
                    "fileName": selectedPhoto.fileName,
                    "albumPath": selectedPhoto.albumPath
                }
            };
            _this.router.navigate(["/photoView"], navigationExtras);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUU3RCx3REFBdUQ7QUFDdkQsMEVBQXdFO0FBQ3hFLDZDQUE0QztBQUM1QywwQ0FBMkQ7QUFFM0Qsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUTVGO0lBV0ksdUJBQW9CLG1CQUFzQyxFQUFVLElBQVUsRUFBVSxNQUFjO1FBQWxGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWN0RyxnQkFBVyxHQUFHLFVBQVMsSUFBSTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFBO1FBZEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLFVBQVUsQ0FBQztZQUNQLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFPRCxtQ0FBVyxHQUFYLFVBQVksT0FBZTtRQUEzQixpQkE2Q0M7UUE1Q0csSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN0QyxhQUFhLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1lBQ3hELEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNwRCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ0wsTUFBTSxFQUFFLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUs7WUFDZixJQUFJLGdCQUFnQixHQUFxQjtnQkFDckMsV0FBVyxFQUFFO29CQUNULFNBQVMsRUFBRyxPQUFPO29CQUNuQixLQUFLLEVBQUcsYUFBYSxDQUFDLEdBQUc7b0JBQ3pCLFNBQVMsRUFBRyxhQUFhLENBQUMsT0FBTztvQkFDakMsWUFBWSxFQUFHLGFBQWEsQ0FBQyxNQUFNO29CQUNuQyxZQUFZLEVBQUcsS0FBSztvQkFDcEIsU0FBUyxFQUFHLGFBQWEsQ0FBQyxPQUFPO29CQUNqQyxhQUFhLEVBQUcsYUFBYSxDQUFDLFdBQVc7b0JBQ3pDLFdBQVcsRUFBRyxhQUFhLENBQUMsUUFBUTtvQkFDcEMsVUFBVSxFQUFHLGFBQWEsQ0FBQyxRQUFRO29CQUNuQyxXQUFXLEVBQUcsYUFBYSxDQUFDLFNBQVM7aUJBQ3hDO2FBQ0osQ0FBQztZQUNGLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTCxJQUFJLGdCQUFnQixHQUFxQjtnQkFDckMsV0FBVyxFQUFFO29CQUNULFNBQVMsRUFBRyxPQUFPO29CQUNuQixLQUFLLEVBQUcsYUFBYSxDQUFDLEdBQUc7b0JBQ3pCLFNBQVMsRUFBRyxhQUFhLENBQUMsT0FBTztvQkFDakMsWUFBWSxFQUFHLGFBQWEsQ0FBQyxNQUFNO29CQUNuQyxZQUFZLEVBQUcsSUFBSTtvQkFDbkIsU0FBUyxFQUFHLGFBQWEsQ0FBQyxPQUFPO29CQUNqQyxhQUFhLEVBQUcsYUFBYSxDQUFDLFdBQVc7b0JBQ3pDLFdBQVcsRUFBRyxhQUFhLENBQUMsUUFBUTtvQkFDcEMsVUFBVSxFQUFHLGFBQWEsQ0FBQyxRQUFRO29CQUNuQyxXQUFXLEVBQUcsYUFBYSxDQUFDLFNBQVM7aUJBQ3hDO2FBQ0osQ0FBQztZQUNGLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUEzRVEsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQWEyQyx3QkFBaUIsRUFBZ0IsV0FBSSxFQUFrQixlQUFNO09BWDdGLGFBQWEsQ0E2RXpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdFRCxJQTZFQztBQTdFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1Bob3RvXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRXh0cmFzLCBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuXG4gICAgcHVibGljIHBob3RvczogQXJyYXk8UGhvdG8+O1xuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcbiAgICBwdWJsaWMgcGhvdG9JZDogbnVtYmVyO1xuICAgIHB1YmxpYyBwaG90b1VybDogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcbiAgICBwdWJsaWMgc2VsZWN0ZWRQaG90bzogUGhvdG87XG4gICAgXG4gICAgcHVibGljIHNlbGVjdGVkSWQ6IG51bWJlcjsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGE6IERhdGEsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGhvdG9JZCA9IDA7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgIH1cblxuICAgIHJlZnJlc2hGZWVkKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5waG90b3MgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNQaG90b3MoKTtcbiAgICAgICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBzdGFja0xvYWRlZCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5waG90b3MgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNQaG90b3MoKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdFBob3RvKHBob3RvSWQ6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZWN0ZWRQaG90bztcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZWxlY3RlZFBob3RvID0gdGhpcy5waG90b3MuZmluZChpID0+IGkuaWQgPT09IHBob3RvSWQpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuZ2V0RXZlbnRPd25lcihzZWxlY3RlZFBob3RvLmV2ZW50SWQpLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZS50aGVuKChvd25lcikgPT4ge1xuICAgICAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJwaG90b0lkXCIgOiBwaG90b0lkLFxuICAgICAgICAgICAgICAgICAgICBcInVybFwiIDogc2VsZWN0ZWRQaG90by51cmwsXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZFwiIDogc2VsZWN0ZWRQaG90by5jcmVhdGVkLFxuICAgICAgICAgICAgICAgICAgICBcInBob3RvT3duZXJcIiA6IHNlbGVjdGVkUGhvdG8udXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBcImV2ZW50T3duZXJcIiA6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICBcImV2ZW50SWRcIiA6IHNlbGVjdGVkUGhvdG8uZXZlbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogc2VsZWN0ZWRQaG90by5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgXCJvd25lck5hbWVcIiA6IHNlbGVjdGVkUGhvdG8udXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsZU5hbWVcIiA6IHNlbGVjdGVkUGhvdG8uZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiYWxidW1QYXRoXCIgOiBzZWxlY3RlZFBob3RvLmFsYnVtUGF0aFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGhvdG9WaWV3XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJwaG90b0lkXCIgOiBwaG90b0lkLFxuICAgICAgICAgICAgICAgICAgICBcInVybFwiIDogc2VsZWN0ZWRQaG90by51cmwsXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZFwiIDogc2VsZWN0ZWRQaG90by5jcmVhdGVkLFxuICAgICAgICAgICAgICAgICAgICBcInBob3RvT3duZXJcIiA6IHNlbGVjdGVkUGhvdG8udXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBcImV2ZW50T3duZXJcIiA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRJZFwiIDogc2VsZWN0ZWRQaG90by5ldmVudElkLFxuICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBzZWxlY3RlZFBob3RvLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBcIm93bmVyTmFtZVwiIDogc2VsZWN0ZWRQaG90by51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxlTmFtZVwiIDogc2VsZWN0ZWRQaG90by5maWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJhbGJ1bVBhdGhcIiA6IHNlbGVjdGVkUGhvdG8uYWxidW1QYXRoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9waG90b1ZpZXdcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG59Il19