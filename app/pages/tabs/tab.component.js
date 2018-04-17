"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var Data_1 = require("../../shared/Data");
var firebase = require("nativescript-plugin-firebase");
var DataItem = /** @class */ (function () {
    function DataItem(itemDesc) {
        this.itemDesc = itemDesc;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
var TabComponent = /** @class */ (function () {
    function TabComponent(router, page, data) {
        /*this.items = new Array<DataItem>();
        for (let i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }*/
        this.router = router;
        this.page = page;
        this.data = data;
        this.selectedIndex = 0;
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        console.log("----------------------------");
        console.log("----------------------------");
        console.log("----------------------------");
    }
    TabComponent.prototype.onCamera = function () {
        console.log("Camera tapped.");
        this.router.navigate(["/image"]);
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
        console.log("Users name" + this.firstName);
        //console.log("Last name" + this.lastName);
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
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
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
            styleUrls: ["./tab.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, Data_1.Data])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QywwQ0FBeUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFekQ7SUFDSSxrQkFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUNuQyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksNEJBQVE7QUFZckI7SUFZSSxzQkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBWSxJQUFVO1FBQ3hFOzs7V0FHRztRQUphLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBTTtRQVRyRSxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBVXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELDZCQUFNLEdBQU47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UyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBL0ZRLFlBQVk7UUFQeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFNBQVMsRUFBRSxDQUFFLFdBQVcsQ0FBRTtTQUM3QixDQUFDO3lDQWM4QixlQUFNLEVBQWdCLFdBQUksRUFBa0IsV0FBSTtPQVpuRSxZQUFZLENBZ0d4QjtJQUFELG1CQUFDO0NBQUEsQUFoR0QsSUFnR0M7QUFoR1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9EYXRhXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5leHBvcnQgY2xhc3MgRGF0YUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7IFxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidGFiXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwiLi90YWIuY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxEYXRhSXRlbT47XG4gICAgcHVibGljIGFjdGl2ZVRhYjogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGlzSG9tZTogYm9vbGVhbiA9IHRydWU7XG4gICAgaXNTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0dhbGxlcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc05vdGlmaWNhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzUHJvZmlsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFzdE5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJvdGVjdGVkIGRhdGE6IERhdGEpIHtcbiAgICAgICAgLyp0aGlzLml0ZW1zID0gbmV3IEFycmF5PERhdGFJdGVtPigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShcIml0ZW0gXCIgKyBpKSk7XG4gICAgICAgIH0qL1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICB9XG4gICAgb25DYW1lcmEoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FtZXJhIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9pbWFnZVwiXSk7XG4gICAgICAgIC8vS2rDuHJlciBrYW1lcmEgZnVua3Nqb24tLS0tLS1cbiAgICB9XG5cbiAgICBvbkhvbWUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSG9tZS10YWIgdGFwcGVkLlwiKTtcbiAgICAgICAgdGhpcy5pc0hvbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvblNlYXJjaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2gtdGFiIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSB0cnVlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlcnMgbmFtZVwiICsgdGhpcy5maXJzdE5hbWUpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTGFzdCBuYW1lXCIgKyB0aGlzLmxhc3ROYW1lKTtcbiAgICB9XG5cbiAgICBvbkdhbGxlcnkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FsbGVyeS10YWIgdGFwcGVkLlwiKTtcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTsgICAgICAgICAgIFxuICAgIH1cblxuICAgIG9uTm90aWZpY2F0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbi10YWIgdGFwcGVkLlwiKTtcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTsgICBcbiAgICB9XG5cbiAgICBvblByb2ZpbGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZmlsZS10YWIgdGFwcGVkLlwiKTtcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gdHJ1ZTsgIFxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZmlyc3ROYW1lXCJdO1xuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJsYXN0TmFtZVwiXTtcbiAgICB9XG5cbiAgICB0YWJWaWV3SW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdhbGxlcnkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vblByb2ZpbGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=