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
    /*navigateToHomeRoot() {
        this.router.navigate([
            '/home',
            { outlets: { homeoutlet: ['home'] } }
        ]);
    }

    navigateToSearchRoot() {
        this.router.navigate([
            '/search',
            { outlets: { searchoutlet: ['search'] } }
        ]);
    }

    navigateToGalleryRoot() {
        this.router.navigate([
            '/gallery',
            { outlets: { galleryoutlet: ['gallery'] } }
        ]);
    }

    navigateToNotificationRoot() {
        this.router.navigate([
            '/notification',
            { outlets: { notificationoutlet: ['notification'] } }
        ]);
    }

    navigateToProfileRoot() {
        this.router.navigate([
            '/profile',
            { outlets: { profileoutlet: ['profile'] } }
        ]);
    }

    tabViewIndexChange(index: number) {
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
    }*/
    TabComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QztJQUNJLGtCQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztJQUM1QyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0QkFBUTtBQVVyQjtJQUtJLHNCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUYvQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUc3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7UUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFhLEdBQWI7SUFFQSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcURHO0lBRUgsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBekVNLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQztTQUMvQyxDQUFDO3lDQU04QixlQUFNLEVBQWdCLFdBQUk7T0FMN0MsWUFBWSxDQTBFeEI7SUFBRCxtQkFBQztDQUFBLEFBMUVELElBMEVDO0FBMUVZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0YWJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vdGFiLWNvbW1vbi5jc3NcIiwgXCIuL3RhYi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PERhdGFJdGVtPjtcclxuICAgIHB1YmxpYyBhY3RpdmVUYWI6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgQXJyYXk8RGF0YUl0ZW0+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShcIml0ZW0gXCIgKyBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZURpc3BsYXkoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qbmF2aWdhdGVUb0hvbWVSb290KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcclxuICAgICAgICAgICAgJy9ob21lJyxcclxuICAgICAgICAgICAgeyBvdXRsZXRzOiB7IGhvbWVvdXRsZXQ6IFsnaG9tZSddIH0gfVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9TZWFyY2hSb290KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcclxuICAgICAgICAgICAgJy9zZWFyY2gnLFxyXG4gICAgICAgICAgICB7IG91dGxldHM6IHsgc2VhcmNob3V0bGV0OiBbJ3NlYXJjaCddIH0gfVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9HYWxsZXJ5Um9vdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXHJcbiAgICAgICAgICAgICcvZ2FsbGVyeScsXHJcbiAgICAgICAgICAgIHsgb3V0bGV0czogeyBnYWxsZXJ5b3V0bGV0OiBbJ2dhbGxlcnknXSB9IH1cclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvTm90aWZpY2F0aW9uUm9vdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXHJcbiAgICAgICAgICAgICcvbm90aWZpY2F0aW9uJyxcclxuICAgICAgICAgICAgeyBvdXRsZXRzOiB7IG5vdGlmaWNhdGlvbm91dGxldDogWydub3RpZmljYXRpb24nXSB9IH1cclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvUHJvZmlsZVJvb3QoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1xyXG4gICAgICAgICAgICAnL3Byb2ZpbGUnLFxyXG4gICAgICAgICAgICB7IG91dGxldHM6IHsgcHJvZmlsZW91dGxldDogWydwcm9maWxlJ10gfSB9XHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFiVmlld0luZGV4Q2hhbmdlKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb1Byb2ZpbGVSb290KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvU2VhcmNoUm9vdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0dhbGxlcnlSb290KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTm90aWZpY2F0aW9uUm9vdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb1Byb2ZpbGVSb290KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgfVxyXG59Il19