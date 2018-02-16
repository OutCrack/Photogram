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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QztJQUNJLGtCQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztJQUM1QyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0QkFBUTtBQVVyQjtJQVVJLHNCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVAvQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBR3ZCOzs7V0FHRztJQUNQLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLDhCQUE4QjtJQUNsQyxDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQscUNBQWMsR0FBZDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQWtCLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFyRlEsWUFBWTtRQU54QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLFlBQVk7WUFDekIsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFFO1NBQ2hELENBQUM7eUNBVzhCLGVBQU0sRUFBZ0IsV0FBSTtPQVY3QyxZQUFZLENBc0Z4QjtJQUFELG1CQUFDO0NBQUEsQUF0RkQsSUFzRkM7QUF0Rlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaXRlbURlc2M6IHN0cmluZykgeyB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRhYlwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi90YWItY29tbW9uLmNzc1wiLCBcIi4vdGFiLmNzc1wiIF1cbn0pXG5leHBvcnQgY2xhc3MgVGFiQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PERhdGFJdGVtPjtcbiAgICBwdWJsaWMgYWN0aXZlVGFiOiBzdHJpbmc7XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG4gICAgaXNIb21lOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpc1NlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzR2FsbGVyeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTm90aWZpY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNQcm9maWxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcbiAgICAgICAgLyp0aGlzLml0ZW1zID0gbmV3IEFycmF5PERhdGFJdGVtPigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShcIml0ZW0gXCIgKyBpKSk7XG4gICAgICAgIH0qL1xuICAgIH1cblxuICAgIG9uQ2FtZXJhKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSB0YXBwZWQuXCIpO1xuICAgICAgICAvL0tqw7hyZXIga2FtZXJhIGZ1bmtzam9uLS0tLS0tXG4gICAgfVxuXG4gICAgb25Ib21lKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhvbWUtdGFiIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMuaXNIb21lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25TZWFyY2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uR2FsbGVyeSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHYWxsZXJ5LXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlOyAgICAgICAgICAgXG4gICAgfVxuXG4gICAgb25Ob3RpZmljYXRpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlOyAgIFxuICAgIH1cblxuICAgIG9uUHJvZmlsZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9maWxlLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSB0cnVlOyAgIFxuICAgIH1cblxuICAgIHRhYlZpZXdJbmRleENoYW5nZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2FsbGVyeSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ob3RpZmljYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUHJvZmlsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==