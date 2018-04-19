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
        this.router = router;
        this.page = page;
        this.data = data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QywwQ0FBeUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFekQ7SUFDSSxrQkFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUNuQyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksNEJBQVE7QUFZckI7SUFZSSxzQkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBWSxJQUFVO1FBQXhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBTTtRQVRyRSxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBS3ZCOzs7V0FHRztJQUNQLENBQUM7SUFDRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELDZCQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFD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Q25CLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLFNBQVMsRUFBRSxDQUFFLFdBQVcsQ0FBRTtTQUM3QixDQUFDO3lDQWM4QixlQUFNLEVBQWdCLFdBQUksRUFBa0IsV0FBSTtPQVpuRSxZQUFZLENBNEZ4QjtJQUFELG1CQUFDO0NBQUEsQUE1RkQsSUE0RkM7QUE1Rlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9EYXRhXCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5leHBvcnQgY2xhc3MgRGF0YUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7IFxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidGFiXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwiLi90YWIuY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxEYXRhSXRlbT47XG4gICAgcHVibGljIGFjdGl2ZVRhYjogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGlzSG9tZTogYm9vbGVhbiA9IHRydWU7XG4gICAgaXNTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0dhbGxlcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc05vdGlmaWNhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzUHJvZmlsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbGFzdE5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJvdGVjdGVkIGRhdGE6IERhdGEpIHtcbiAgICAgICAgLyp0aGlzLml0ZW1zID0gbmV3IEFycmF5PERhdGFJdGVtPigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShcIml0ZW0gXCIgKyBpKSk7XG4gICAgICAgIH0qL1xuICAgIH1cbiAgICBvbkNhbWVyYSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW1lcmEgdGFwcGVkLlwiKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2ltYWdlXCJdKTtcbiAgICAgICAgLy9LasO4cmVyIGthbWVyYSBmdW5rc2pvbi0tLS0tLVxuICAgIH1cblxuICAgIG9uSG9tZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIb21lLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uU2VhcmNoKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaC10YWIgdGFwcGVkLlwiKTtcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VycyBuYW1lXCIgKyB0aGlzLmZpcnN0TmFtZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJMYXN0IG5hbWVcIiArIHRoaXMubGFzdE5hbWUpO1xuICAgIH1cblxuICAgIG9uR2FsbGVyeSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHYWxsZXJ5LXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlOyAgICAgICAgICAgXG4gICAgfVxuXG4gICAgb25Ob3RpZmljYXRpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlOyAgIFxuICAgIH1cblxuICAgIG9uUHJvZmlsZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9maWxlLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSB0cnVlOyAgXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJmaXJzdE5hbWVcIl07XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImxhc3ROYW1lXCJdO1xuICAgIH1cblxuICAgIHRhYlZpZXdJbmRleENoYW5nZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2FsbGVyeSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ob3RpZmljYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUHJvZmlsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==