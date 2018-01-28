"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var DataItem = /** @class */ (function () {
    function DataItem(itemDesc) {
        this.itemDesc = itemDesc;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
var TabComponent = /** @class */ (function () {
    function TabComponent(router, page) {
        this.router = router;
        this.page = page;
        this.selectedIndex = 0;
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        /*this.items = new Array<DataItem>();
        for (let i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }*/
    }
    TabComponent.prototype.onCamera = function () {
        console.log("Camera tapped.");
        //Kjører kamera funksjon------
    };
    TabComponent.prototype.onHome = function () {
        console.log("Home-tab tapped.");
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
    };
    TabComponent.prototype.onSearch = function () {
        console.log("Search-tab tapped.");
        this.isHome = false;
        this.isSearch = true;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
    };
    TabComponent.prototype.onGallery = function () {
        console.log("Gallery-tab tapped.");
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = true;
        this.isNotification = false;
        this.isProfile = false;
    };
    TabComponent.prototype.onNotification = function () {
        console.log("Notification-tab tapped.");
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = true;
        this.isProfile = false;
    };
    TabComponent.prototype.onProfile = function () {
        console.log("Profile-tab tapped.");
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = true;
    };
    TabComponent.prototype.tabViewIndexChange = function (index) {
        switch (index) {
            case 0:
                this.onHome();
                break;
            case 1:
                this.onSearch();
                break;
            case 2:
                this.onGallery();
                break;
            case 3:
                this.onNotification();
                break;
            case 4:
                this.onProfile();
                break;
        }
    };
    TabComponent = __decorate([
        core_1.Component({
            selector: "tab",
            moduleId: module.id,
            templateUrl: "./tab.html",
            styleUrls: ["./tab-common.css", "./tab.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QztJQUNJLGtCQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztJQUM1QyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0QkFBUTtBQVVyQjtJQVVJLHNCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVAvQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBR3ZCOzs7V0FHRztJQUNQLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLDhCQUE4QjtJQUNsQyxDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQscUNBQWMsR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQWtCLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFyRlEsWUFBWTtRQU54QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLFlBQVk7WUFDekIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDO1NBQy9DLENBQUM7eUNBVzhCLGVBQU0sRUFBZ0IsV0FBSTtPQVY3QyxZQUFZLENBc0Z4QjtJQUFELG1CQUFDO0NBQUEsQUF0RkQsSUFzRkM7QUF0Rlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUl0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGl0ZW1EZXNjOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInRhYlwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGFiLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi90YWItY29tbW9uLmNzc1wiLCBcIi4vdGFiLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFiQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8RGF0YUl0ZW0+O1xyXG4gICAgcHVibGljIGFjdGl2ZVRhYjogc3RyaW5nO1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBpc0hvbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNOb3RpZmljYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzUHJvZmlsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIC8qdGhpcy5pdGVtcyA9IG5ldyBBcnJheTxEYXRhSXRlbT4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IERhdGFJdGVtKFwiaXRlbSBcIiArIGkpKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICBvbkNhbWVyYSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSB0YXBwZWQuXCIpO1xyXG4gICAgICAgIC8vS2rDuHJlciBrYW1lcmEgZnVua3Nqb24tLS0tLS1cclxuICAgIH1cclxuXHJcbiAgICBvbkhvbWUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIb21lLXRhYiB0YXBwZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuaXNIb21lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlYXJjaCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaC10YWIgdGFwcGVkLlwiKTtcclxuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25HYWxsZXJ5KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FsbGVyeS10YWIgdGFwcGVkLlwiKTtcclxuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7ICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbk5vdGlmaWNhdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbi10YWIgdGFwcGVkLlwiKTtcclxuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Qcm9maWxlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZmlsZS10YWIgdGFwcGVkLlwiKTtcclxuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IHRydWU7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgdGFiVmlld0luZGV4Q2hhbmdlKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25Ib21lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMub25HYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk5vdGlmaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25Qcm9maWxlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=