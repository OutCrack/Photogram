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
        this.items = new Array();
        for (var i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }
    }
    TabComponent.prototype.toggleDisplay = function () {
    };
    TabComponent.prototype.navigateToHomeRoot = function () {
        this.router.navigate([
            '/home',
            { outlets: { homeoutlet: ['homeoutlet'] } }
        ]);
    };
    TabComponent.prototype.navigateToSearchRoot = function () {
        this.router.navigate([
            '/search',
            { outlets: { searchoutlet: ['search'] } }
        ]);
    };
    TabComponent.prototype.navigateToGalleryRoot = function () {
        this.router.navigate([
            '/gallery',
            { outlets: { galleryoutlet: ['gallery'] } }
        ]);
    };
    TabComponent.prototype.navigateToNotificationRoot = function () {
        this.router.navigate([
            '/notification',
            { outlets: { notificationoutlet: ['notification'] } }
        ]);
    };
    TabComponent.prototype.navigateToProfileRoot = function () {
        this.router.navigate([
            '/profile',
            { outlets: { profileoutlet: ['profile'] } }
        ]);
    };
    TabComponent.prototype.tabViewIndexChange = function (index) {
        switch (index) {
            case 0:
                this.navigateToProfileRoot();
                break;
            case 1:
                this.navigateToSearchRoot();
                break;
            case 2:
                this.navigateToGalleryRoot();
                break;
            case 3:
                this.navigateToNotificationRoot();
                break;
            case 4:
                this.navigateToProfileRoot();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QztJQUNJLGtCQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztJQUM1QyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0QkFBUTtBQVVyQjtJQUtJLHNCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUYvQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUc3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7UUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFhLEdBQWI7SUFFQSxDQUFDO0lBRUQseUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsT0FBTztZQUNQLEVBQUUsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRTtTQUM5QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkNBQW9CLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsU0FBUztZQUNULEVBQUUsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtTQUM1QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNENBQXFCLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsVUFBVTtZQUNWLEVBQUUsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtTQUM5QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaURBQTBCLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsZUFBZTtZQUNmLEVBQUUsT0FBTyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFO1NBQ3hELENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0Q0FBcUIsR0FBckI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNqQixVQUFVO1lBQ1YsRUFBRSxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1NBQzlDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsS0FBYTtRQUM1QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3QixLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQzVCLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dCQUNsQyxLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBckVRLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQztTQUMvQyxDQUFDO3lDQU04QixlQUFNLEVBQWdCLFdBQUk7T0FMN0MsWUFBWSxDQXNFeEI7SUFBRCxtQkFBQztDQUFBLEFBdEVELElBc0VDO0FBdEVZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0YWJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vdGFiLWNvbW1vbi5jc3NcIiwgXCIuL3RhYi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PERhdGFJdGVtPjtcclxuICAgIHB1YmxpYyBhY3RpdmVUYWI6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgQXJyYXk8RGF0YUl0ZW0+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShcIml0ZW0gXCIgKyBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZURpc3BsYXkoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9Ib21lUm9vdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXHJcbiAgICAgICAgICAgICcvaG9tZScsXHJcbiAgICAgICAgICAgIHsgb3V0bGV0czogeyBob21lb3V0bGV0OiBbJ2hvbWVvdXRsZXQnXSB9IH1cclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvU2VhcmNoUm9vdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXHJcbiAgICAgICAgICAgICcvc2VhcmNoJyxcclxuICAgICAgICAgICAgeyBvdXRsZXRzOiB7IHNlYXJjaG91dGxldDogWydzZWFyY2gnXSB9IH1cclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvR2FsbGVyeVJvb3QoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xyXG4gICAgICAgICAgICAnL2dhbGxlcnknLFxyXG4gICAgICAgICAgICB7IG91dGxldHM6IHsgZ2FsbGVyeW91dGxldDogWydnYWxsZXJ5J10gfSB9XHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUb05vdGlmaWNhdGlvblJvb3QoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xyXG4gICAgICAgICAgICAnL25vdGlmaWNhdGlvbicsXHJcbiAgICAgICAgICAgIHsgb3V0bGV0czogeyBub3RpZmljYXRpb25vdXRsZXQ6IFsnbm90aWZpY2F0aW9uJ10gfSB9XHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUb1Byb2ZpbGVSb290KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcclxuICAgICAgICAgICAgJy9wcm9maWxlJyxcclxuICAgICAgICAgICAgeyBvdXRsZXRzOiB7IHByb2ZpbGVvdXRsZXQ6IFsncHJvZmlsZSddIH0gfVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYlZpZXdJbmRleENoYW5nZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Qcm9maWxlUm9vdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb1NlYXJjaFJvb3QoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9HYWxsZXJ5Um9vdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb05vdGlmaWNhdGlvblJvb3QoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Qcm9maWxlUm9vdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19