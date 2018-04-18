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
    TabComponent.prototype.onEvent = function () {
        console.log("New event tapped.");
        //this.router.navigate(["/event"]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUV6QywwQ0FBeUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFekQ7SUFDSSxrQkFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUNuQyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksNEJBQVE7QUFZckI7SUFZSSxzQkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBWSxJQUFVO1FBQ3hFOzs7V0FHRztRQUphLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBTTtRQVRyRSxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBVXZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELDhCQUFPLEdBQVA7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Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQXBHUSxZQUFZO1FBUHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsWUFBWTtZQUN6QixTQUFTLEVBQUUsQ0FBRSxXQUFXLENBQUU7U0FDN0IsQ0FBQzt5Q0FjOEIsZUFBTSxFQUFnQixXQUFJLEVBQWtCLFdBQUk7T0FabkUsWUFBWSxDQXFHeEI7SUFBRCxtQkFBQztDQUFBLEFBckdELElBcUdDO0FBckdZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9EYXRhXCI7XHJcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUl0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGl0ZW1EZXNjOiBzdHJpbmcpIHsgXHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidGFiXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90YWIuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbIFwiLi90YWIuY3NzXCIgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PERhdGFJdGVtPjtcclxuICAgIHB1YmxpYyBhY3RpdmVUYWI6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgaXNIb21lOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlzU2VhcmNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc0dhbGxlcnk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzTm90aWZpY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc1Byb2ZpbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJvdGVjdGVkIGRhdGE6IERhdGEpIHtcclxuICAgICAgICAvKnRoaXMuaXRlbXMgPSBuZXcgQXJyYXk8RGF0YUl0ZW0+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBEYXRhSXRlbShcIml0ZW0gXCIgKyBpKSk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICB9XHJcbiAgICBvbkNhbWVyYSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSB0YXBwZWQuXCIpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9pbWFnZVwiXSk7XHJcbiAgICAgICAgLy9LasO4cmVyIGthbWVyYSBmdW5rc2pvbi0tLS0tLVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXZlbnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgZXZlbnQgdGFwcGVkLlwiKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ldmVudFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ib21lKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSG9tZS10YWIgdGFwcGVkLlwiKTtcclxuICAgICAgICB0aGlzLmlzSG9tZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNHYWxsZXJ5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2goKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2gtdGFiIHRhcHBlZC5cIik7XHJcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlcnMgbmFtZVwiICsgdGhpcy5maXJzdE5hbWUpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJMYXN0IG5hbWVcIiArIHRoaXMubGFzdE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2FsbGVyeSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbGxlcnktdGFiIHRhcHBlZC5cIik7XHJcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNOb3RpZmljYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlOyAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Ob3RpZmljYXRpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24tdGFiIHRhcHBlZC5cIik7XHJcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uUHJvZmlsZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2ZpbGUtdGFiIHRhcHBlZC5cIik7XHJcbiAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzU2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Byb2ZpbGUgPSB0cnVlOyAgXHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImZpcnN0TmFtZVwiXTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJsYXN0TmFtZVwiXTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJWaWV3SW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblByb2ZpbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==