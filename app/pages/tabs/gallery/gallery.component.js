"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var router_1 = require("@angular/router");
var Data_1 = require("../../../shared/Data");
/**
 *
 *
 * @export
 * @class GalleryComponent
 */
var GalleryComponent = /** @class */ (function () {
    /**
     * Creates an instance of GalleryComponent.
     * @param {Router} router
     * @param {Data} data
     * @memberof GalleryComponent
     */
    function GalleryComponent(router, data) {
        this.router = router;
        this.data = data;
        /**
         *
         *
         * @memberof GalleryComponent
         */
        this.stackLoaded = function (args) {
            this.myAlbums = this.server.getAlbums(this.data.storage["id"]);
        };
        this.server = new Server_1.Server();
        this.myAlbums = this.server.getAlbums(this.data.storage["id"]);
    }
    /**
     *
     *
     * @param {number} albumId
     * @memberof GalleryComponent
     */
    GalleryComponent.prototype.selectAlbum = function (albumId) {
        this.router.navigate(["/albumView", albumId]);
    };
    GalleryComponent = __decorate([
        core_1.Component({
            selector: "gallery-tab",
            templateUrl: "./pages/tabs/gallery/gallery.tab.html",
            styleUrls: ["./pages/tabs/gallery/gallery.tab.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, Data_1.Data])
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx3REFBdUQ7QUFDdkQsMENBQXlDO0FBRXpDLDZDQUE0QztBQUU1Qzs7Ozs7R0FLRztBQU1IO0lBZUk7Ozs7O09BS0c7SUFDSCwwQkFBb0IsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFoQnREOzs7O1dBSUc7UUFDSCxnQkFBVyxHQUFHLFVBQVMsSUFBSTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFBO1FBVUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxzQ0FBVyxHQUFsQixVQUFtQixPQUFlO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQWxDUSxnQkFBZ0I7UUFMNUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUUsc0NBQXNDLENBQUU7U0FDeEQsQ0FBQzt5Q0FzQjhCLGVBQU0sRUFBZ0IsV0FBSTtPQXJCN0MsZ0JBQWdCLENBb0M1QjtJQUFELHVCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWxidW0gfSBmcm9tXCIuLi8uLi8uLi9zaGFyZWQvQWxidW1cIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcblxuLyoqXG4gKiBcbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIEdhbGxlcnlDb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FsbGVyeS10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3RhYnMvZ2FsbGVyeS9nYWxsZXJ5LnRhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwiLi9wYWdlcy90YWJzL2dhbGxlcnkvZ2FsbGVyeS50YWIuY3NzXCIgXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5Q29tcG9uZW50e1xuXG4gICAgcHVibGljIHNlcnZlcjogU2VydmVyO1xuICAgIHB1YmxpYyBteUFsYnVtczogQXJyYXk8QWxidW0+O1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIEdhbGxlcnlDb21wb25lbnRcbiAgICAgKi9cbiAgICBzdGFja0xvYWRlZCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5teUFsYnVtcyA9IHRoaXMuc2VydmVyLmdldEFsYnVtcyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR2FsbGVyeUNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIFxuICAgICAqIEBwYXJhbSB7RGF0YX0gZGF0YSBcbiAgICAgKiBAbWVtYmVyb2YgR2FsbGVyeUNvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5teUFsYnVtcyA9IHRoaXMuc2VydmVyLmdldEFsYnVtcyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYWxidW1JZCBcbiAgICAgKiBAbWVtYmVyb2YgR2FsbGVyeUNvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RBbGJ1bShhbGJ1bUlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FsYnVtVmlld1wiLCBhbGJ1bUlkXSk7XG4gICAgfVxuXG59Il19