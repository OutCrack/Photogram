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
        /*this.items = new Array<DataItem>();
        for (let i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }*/
        this.router = router;
        this.page = page;
        this.selectedIndex = 0;
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        this.homeTabItem = { iconSource: "~/images/ic_home_black_24dp.png" };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QztJQUNJLGtCQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztJQUM1QyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSw0QkFBUTtBQVVyQjtJQWFJLHNCQUFvQixNQUFjLEVBQVUsSUFBVTtRQUNsRDs7O1dBR0c7UUFKYSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVYvQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUlqQyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBUXZCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBQyxVQUFVLEVBQUMsaUNBQWlDLEVBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5Qiw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELDZCQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELHFDQUFjLEdBQWQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELHlDQUFrQixHQUFsQixVQUFtQixLQUFhO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBMUZRLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQztTQUMvQyxDQUFDO3lDQWM4QixlQUFNLEVBQWdCLFdBQUk7T0FiN0MsWUFBWSxDQTJGeEI7SUFBRCxtQkFBQztDQUFBLEFBM0ZELElBMkZDO0FBM0ZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7IH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0YWJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vdGFiLWNvbW1vbi5jc3NcIiwgXCIuL3RhYi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PERhdGFJdGVtPjtcclxuICAgIHB1YmxpYyBhY3RpdmVUYWI6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBob21lVGFiSXRlbTogYW55O1xyXG5cclxuICAgIGlzSG9tZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc1NlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNHYWxsZXJ5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc05vdGlmaWNhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNQcm9maWxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICAgICAgLyp0aGlzLml0ZW1zID0gbmV3IEFycmF5PERhdGFJdGVtPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgRGF0YUl0ZW0oXCJpdGVtIFwiICsgaSkpO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICB0aGlzLmhvbWVUYWJJdGVtID0ge2ljb25Tb3VyY2U6XCJ+L2ltYWdlcy9pY19ob21lX2JsYWNrXzI0ZHAucG5nXCJ9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FtZXJhKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIHRhcHBlZC5cIik7XHJcbiAgICAgICAgLy9LasO4cmVyIGthbWVyYSBmdW5rc2pvbi0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIG9uSG9tZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhvbWUtdGFiIHRhcHBlZC5cIik7XHJcbiAgICAgICAgdGhpcy5pc0hvbWUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoLXRhYiB0YXBwZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkdhbGxlcnkoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHYWxsZXJ5LXRhYiB0YXBwZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTsgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uTm90aWZpY2F0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uLXRhYiB0YXBwZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTsgICBcclxuICAgIH1cclxuXHJcbiAgICBvblByb2ZpbGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9maWxlLXRhYiB0YXBwZWQuXCIpO1xyXG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gdHJ1ZTsgICBcclxuICAgIH1cclxuXHJcbiAgICB0YWJWaWV3SW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblByb2ZpbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==