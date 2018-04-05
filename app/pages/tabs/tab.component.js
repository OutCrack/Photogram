"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var firebase = require("nativescript-plugin-firebase");
var DataItem = /** @class */ (function () {
    function DataItem(itemDesc) {
        this.itemDesc = itemDesc;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
var TabComponent = /** @class */ (function () {
    //public lastName: string;
    function TabComponent(router, page, route) {
        var _this = this;
        this.router = router;
        this.page = page;
        this.route = route;
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
        this.route.params.subscribe(function (params) {
            _this.firstName = params["name"];
        });
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/n!!!!!!!!" + this.firstName);
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
        __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_1.ActivatedRoute])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBQy9CLDBDQUF5RDtBQUV6RCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUV6RDtJQUNJLGtCQUFtQixRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQ25DLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw0QkFBUTtBQVlyQjtJQVVJLDBCQUEwQjtJQUUxQixzQkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxLQUFxQjtRQUFyRixpQkFTQztRQVRtQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBVDlFLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQ2pDLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLdkI7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUMvQixLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLDhCQUE4QjtJQUNsQyxDQUFDO0lB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QUNuQixXQUFXLEVBQUUsWUFBWTtZQUN6QixTQUFTLEVBQUUsQ0FBRSxXQUFXLENBQUU7U0FDN0IsQ0FBQzt5Q0FjOEIsZUFBTSxFQUFnQixXQUFJLEVBQWlCLHVCQUFjO09BWjVFLFlBQVksQ0E4RnhCO0lBQUQsbUJBQUM7Q0FBQSxBQTlGRCxJQThGQztBQTlGWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5leHBvcnQgY2xhc3MgRGF0YUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7IFxuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidGFiXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbIFwiLi90YWIuY3NzXCIgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxEYXRhSXRlbT47XG4gICAgcHVibGljIGFjdGl2ZVRhYjogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGlzSG9tZTogYm9vbGVhbiA9IHRydWU7XG4gICAgaXNTZWFyY2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0dhbGxlcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc05vdGlmaWNhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzUHJvZmlsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcbiAgICAvL3B1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgICAvKnRoaXMuaXRlbXMgPSBuZXcgQXJyYXk8RGF0YUl0ZW0+KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IERhdGFJdGVtKFwiaXRlbSBcIiArIGkpKTtcbiAgICAgICAgfSovXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHBhcmFtc1tcIm5hbWVcIl07XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIS9uISEhISEhISFcIiArIHRoaXMuZmlyc3ROYW1lKTtcbiAgICB9XG5uIFxuICAgIG9uQ2FtZXJhKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNhbWVyYSB0YXBwZWQuXCIpO1xuICAgICAgICAvL0tqw7hyZXIga2FtZXJhIGZ1bmtzam9uLS0tLS0tXG4gICAgfVxuXG4gICAgb25Ib21lKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhvbWUtdGFiIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMuaXNIb21lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzR2FsbGVyeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25TZWFyY2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoLXRhYiB0YXBwZWQuXCIpO1xuICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJzIG5hbWVcIiArIHRoaXMuZmlyc3ROYW1lKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkxhc3QgbmFtZVwiICsgdGhpcy5sYXN0TmFtZSk7XG4gICAgfVxuXG4gICAgb25HYWxsZXJ5KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbGxlcnktdGFiIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTm90aWZpY2F0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7ICAgICAgICAgICBcbiAgICB9XG5cbiAgICBvbk5vdGlmaWNhdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24tdGFiIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNQcm9maWxlID0gZmFsc2U7ICAgXG4gICAgfVxuXG4gICAgb25Qcm9maWxlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2ZpbGUtdGFiIHRhcHBlZC5cIik7XG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0dhbGxlcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05vdGlmaWNhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUHJvZmlsZSA9IHRydWU7ICBcbiAgICB9XG5cbiAgICB0YWJWaWV3SW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdhbGxlcnkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vblByb2ZpbGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=