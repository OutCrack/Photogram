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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx3REFBdUQ7QUFDdkQsMENBQXlDO0FBRXpDLDZDQUE0QztBQUU1Qzs7Ozs7R0FLRztBQU1IO0lBZUk7Ozs7O09BS0c7SUFDSCwwQkFBb0IsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFoQnREOzs7O1dBSUc7UUFDSCxnQkFBVyxHQUFHLFVBQVMsSUFBSTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFBO1FBVUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHNDQUFXLEdBQWxCLFVBQW1CLE9BQWU7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBakNRLGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBRSxzQ0FBc0MsQ0FBRTtTQUN4RCxDQUFDO3lDQXNCOEIsZUFBTSxFQUFnQixXQUFJO09BckI3QyxnQkFBZ0IsQ0FtQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztBQW5DWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCx9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbGJ1bSB9IGZyb21cIi4uLy4uLy4uL3NoYXJlZC9BbGJ1bVwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuXG4vKipcbiAqIFxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgR2FsbGVyeUNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYWxsZXJ5LXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9nYWxsZXJ5L2dhbGxlcnkudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsgXCIuL3BhZ2VzL3RhYnMvZ2FsbGVyeS9nYWxsZXJ5LnRhYi5jc3NcIiBdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlDb21wb25lbnR7XG5cbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIG15QWxidW1zOiBBcnJheTxBbGJ1bT47XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyb2YgR2FsbGVyeUNvbXBvbmVudFxuICAgICAqL1xuICAgIHN0YWNrTG9hZGVkID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICB0aGlzLm15QWxidW1zID0gdGhpcy5zZXJ2ZXIuZ2V0QWxidW1zKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHYWxsZXJ5Q29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXIgXG4gICAgICogQHBhcmFtIHtEYXRhfSBkYXRhIFxuICAgICAqIEBtZW1iZXJvZiBHYWxsZXJ5Q29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbGJ1bUlkIFxuICAgICAqIEBtZW1iZXJvZiBHYWxsZXJ5Q29tcG9uZW50XG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdEFsYnVtKGFsYnVtSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWxidW1WaWV3XCIsIGFsYnVtSWRdKTtcbiAgICB9XG5cbn0iXX0=