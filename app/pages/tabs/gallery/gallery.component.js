"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var router_1 = require("@angular/router");
var Data_1 = require("../../../shared/Data");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(router, data) {
        this.router = router;
        this.data = data;
        this.stackLoaded = function (args) {
            this.myAlbums = this.server.getAlbums(this.data.storage["id"]);
        };
        this.server = new Server_1.Server();
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyx3REFBdUQ7QUFDdkQsMENBQXlDO0FBRXpDLDZDQUE0QztBQU81QztJQVNJLDBCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUp0RCxnQkFBVyxHQUFHLFVBQVMsSUFBSTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFBO1FBR0csSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTSxzQ0FBVyxHQUFsQixVQUFtQixPQUFlO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQWZRLGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBRSxzQ0FBc0MsQ0FBRTtTQUN4RCxDQUFDO3lDQVU4QixlQUFNLEVBQWdCLFdBQUk7T0FUN0MsZ0JBQWdCLENBaUI1QjtJQUFELHVCQUFDO0NBQUEsQUFqQkQsSUFpQkM7QUFqQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFsYnVtIH0gZnJvbVwiLi4vLi4vLi4vc2hhcmVkL0FsYnVtXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImdhbGxlcnktdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2dhbGxlcnkvZ2FsbGVyeS50YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcIi4vcGFnZXMvdGFicy9nYWxsZXJ5L2dhbGxlcnkudGFiLmNzc1wiIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcHVibGljIG15QWxidW1zOiBBcnJheTxBbGJ1bT47XG5cbiAgICBzdGFja0xvYWRlZCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5teUFsYnVtcyA9IHRoaXMuc2VydmVyLmdldEFsYnVtcyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGE6IERhdGEpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdEFsYnVtKGFsYnVtSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWxidW1WaWV3XCIsIGFsYnVtSWRdKTtcbiAgICB9XG5cbn0iXX0=