"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var element_registry_1 = require("nativescript-angular/element-registry");
var Data_1 = require("../../../shared/Data");
var router_1 = require("@angular/router");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
/**
 *
 *
 * @export
 * @class HomeComponent
 */
var HomeComponent = /** @class */ (function () {
    /**
     * Creates an instance of HomeComponent.
     * @param {ChangeDetectorRef} _changeDetectionRef
     * @param {Data} data
     * @param {Router} router
     * @memberof HomeComponent
     */
    function HomeComponent(_changeDetectionRef, data, router) {
        this._changeDetectionRef = _changeDetectionRef;
        this.data = data;
        this.router = router;
        /**
         *
         *
         * @memberof HomeComponent
         */
        this.stackLoaded = function (args) {
            this.refreshFeed(null);
        };
        this.photoId = 0;
        this.server = new Server_1.Server();
    }
    /**
     *
     *
     * @param {any} args
     * @memberof HomeComponent
     */
    HomeComponent.prototype.refreshFeed = function (args) {
        this.photos = this.server.getPublicPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    /**
     *
     *
     * @param {number} photoId
     * @memberof HomeComponent
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxRTtBQUVyRSx3REFBdUQ7QUFDdkQsMEVBQXdFO0FBQ3hFLDZDQUE0QztBQUM1QywwQ0FBMkQ7QUFDM0Qsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRTVGOzs7OztHQUtHO0FBT0g7SUFVSTs7Ozs7O09BTUc7SUFDSCx1QkFBb0IsbUJBQXNDLEVBQVUsSUFBVSxFQUFVLE1BQWM7UUFBbEYsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBb0J0Rzs7OztXQUlHO1FBQ0gsZ0JBQVcsR0FBRyxVQUFTLElBQUk7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7UUF6QkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1DQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsVUFBVSxDQUFDO1lBQ1AsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQVlEOzs7OztPQUtHO0lBQ0gsbUNBQVcsR0FBWCxVQUFZLE9BQWU7UUFBM0IsaUJBNkNDO1FBNUNHLElBQUksYUFBYSxDQUFDO1FBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdEMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLEVBQWhCLENBQWdCLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNMLE1BQU0sRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO1lBQ2YsSUFBSSxnQkFBZ0IsR0FBcUI7Z0JBQ3JDLFdBQVcsRUFBRTtvQkFDVCxTQUFTLEVBQUcsT0FBTztvQkFDbkIsS0FBSyxFQUFHLGFBQWEsQ0FBQyxHQUFHO29CQUN6QixTQUFTLEVBQUcsYUFBYSxDQUFDLE9BQU87b0JBQ2pDLFlBQVksRUFBRyxhQUFhLENBQUMsTUFBTTtvQkFDbkMsWUFBWSxFQUFHLEtBQUs7b0JBQ3BCLFNBQVMsRUFBRyxhQUFhLENBQUMsT0FBTztvQkFDakMsYUFBYSxFQUFHLGFBQWEsQ0FBQyxXQUFXO29CQUN6QyxXQUFXLEVBQUcsYUFBYSxDQUFDLFFBQVE7b0JBQ3BDLFVBQVUsRUFBRyxhQUFhLENBQUMsUUFBUTtvQkFDbkMsV0FBVyxFQUFHLGFBQWEsQ0FBQyxTQUFTO2lCQUN4QzthQUNKLENBQUM7WUFDRixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ0wsSUFBSSxnQkFBZ0IsR0FBcUI7Z0JBQ3JDLFdBQVcsRUFBRTtvQkFDVCxTQUFTLEVBQUcsT0FBTztvQkFDbkIsS0FBSyxFQUFHLGFBQWEsQ0FBQyxHQUFHO29CQUN6QixTQUFTLEVBQUcsYUFBYSxDQUFDLE9BQU87b0JBQ2pDLFlBQVksRUFBRyxhQUFhLENBQUMsTUFBTTtvQkFDbkMsWUFBWSxFQUFHLElBQUk7b0JBQ25CLFNBQVMsRUFBRyxhQUFhLENBQUMsT0FBTztvQkFDakMsYUFBYSxFQUFHLGFBQWEsQ0FBQyxXQUFXO29CQUN6QyxXQUFXLEVBQUcsYUFBYSxDQUFDLFFBQVE7b0JBQ3BDLFVBQVUsRUFBRyxhQUFhLENBQUMsUUFBUTtvQkFDbkMsV0FBVyxFQUFHLGFBQWEsQ0FBQyxTQUFTO2lCQUN4QzthQUNKLENBQUM7WUFDRixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBbEdRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0FtQjJDLHdCQUFpQixFQUFnQixXQUFJLEVBQWtCLGVBQU07T0FqQjdGLGFBQWEsQ0FvR3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXBHRCxJQW9HQztBQXBHWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcbmltcG9ydCB7IE5hdmlnYXRpb25FeHRyYXMsIFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xuXG4vKipcbiAqIFxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgSG9tZUNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQge1xuXG4gICAgcHVibGljIHBob3RvczogQXJyYXk8UGhvdG8+O1xuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcbiAgICBwdWJsaWMgcGhvdG9JZDogbnVtYmVyO1xuICAgIHB1YmxpYyBwaG90b1VybDogc3RyaW5nO1xuICAgIHB1YmxpYyBwaG90b0NyZWF0ZWQ6IHN0cmluZztcbiAgICBwdWJsaWMgc2VsZWN0ZWRQaG90bzogUGhvdG87XG4gICAgcHVibGljIHNlbGVjdGVkSWQ6IG51bWJlcjsgXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEhvbWVDb21wb25lbnQuXG4gICAgICogQHBhcmFtIHtDaGFuZ2VEZXRlY3RvclJlZn0gX2NoYW5nZURldGVjdGlvblJlZiBcbiAgICAgKiBAcGFyYW0ge0RhdGF9IGRhdGEgXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciBcbiAgICAgKiBAbWVtYmVyb2YgSG9tZUNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YTogRGF0YSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5waG90b0lkID0gMDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGFyZ3MgXG4gICAgICogQG1lbWJlcm9mIEhvbWVDb21wb25lbnRcbiAgICAgKi9cbiAgICByZWZyZXNoRmVlZChhcmdzKSB7XG4gICAgICAgIHRoaXMucGhvdG9zID0gdGhpcy5zZXJ2ZXIuZ2V0UHVibGljUGhvdG9zKCk7XG4gICAgICAgIHZhciBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIEhvbWVDb21wb25lbnRcbiAgICAgKi9cbiAgICBzdGFja0xvYWRlZCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoRmVlZChudWxsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaG90b0lkIFxuICAgICAqIEBtZW1iZXJvZiBIb21lQ29tcG9uZW50XG4gICAgICovXG4gICAgc2VsZWN0UGhvdG8ocGhvdG9JZDogbnVtYmVyKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZFBob3RvO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNlbGVjdGVkUGhvdG8gPSB0aGlzLnBob3Rvcy5maW5kKGkgPT4gaS5pZCA9PT0gcGhvdG9JZCk7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci5nZXRFdmVudE93bmVyKHNlbGVjdGVkUGhvdG8uZXZlbnRJZCkudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlLnRoZW4oKG93bmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBcInBob3RvSWRcIiA6IHBob3RvSWQsXG4gICAgICAgICAgICAgICAgICAgIFwidXJsXCIgOiBzZWxlY3RlZFBob3RvLnVybCxcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkXCIgOiBzZWxlY3RlZFBob3RvLmNyZWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIFwicGhvdG9Pd25lclwiIDogc2VsZWN0ZWRQaG90by51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRPd25lclwiIDogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRJZFwiIDogc2VsZWN0ZWRQaG90by5ldmVudElkLFxuICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBzZWxlY3RlZFBob3RvLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBcIm93bmVyTmFtZVwiIDogc2VsZWN0ZWRQaG90by51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxlTmFtZVwiIDogc2VsZWN0ZWRQaG90by5maWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJhbGJ1bVBhdGhcIiA6IHNlbGVjdGVkUGhvdG8uYWxidW1QYXRoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9waG90b1ZpZXdcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBcInBob3RvSWRcIiA6IHBob3RvSWQsXG4gICAgICAgICAgICAgICAgICAgIFwidXJsXCIgOiBzZWxlY3RlZFBob3RvLnVybCxcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkXCIgOiBzZWxlY3RlZFBob3RvLmNyZWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIFwicGhvdG9Pd25lclwiIDogc2VsZWN0ZWRQaG90by51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRPd25lclwiIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgXCJldmVudElkXCIgOiBzZWxlY3RlZFBob3RvLmV2ZW50SWQsXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IHNlbGVjdGVkUGhvdG8uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIFwib3duZXJOYW1lXCIgOiBzZWxlY3RlZFBob3RvLnVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImZpbGVOYW1lXCIgOiBzZWxlY3RlZFBob3RvLmZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImFsYnVtUGF0aFwiIDogc2VsZWN0ZWRQaG90by5hbGJ1bVBhdGhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3Bob3RvVmlld1wiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn0iXX0=