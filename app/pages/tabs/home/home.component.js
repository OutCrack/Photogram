"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.eventList = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.eventList.push({ name: "Wedding" });
        this.eventList.push({ name: "Party" });
        this.eventList.push({ name: "Birthday" });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home-tab",
            moduleId: module.id,
            templateUrl: "./pages/tabs/home/home.tab.html",
            styleUrls: ["./home-tab-common.css", "./home-tab.css"]
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQVF6RTtJQU5BO1FBT0ksY0FBUyxHQUFrQixFQUFFLENBQUM7SUFRbEMsQ0FBQztJQU5HLGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBUFEsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUM7U0FDekQsQ0FBQztPQUNXLGFBQWEsQ0FTekI7SUFBRCxvQkFBQztDQUFBLEFBVEQsSUFTQztBQVRZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImhvbWUtdGFiXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2hvbWUtdGFiLWNvbW1vbi5jc3NcIiwgXCIuL2hvbWUtdGFiLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIGV2ZW50TGlzdDogQXJyYXk8T2JqZWN0PiA9IFtdO1xyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5ldmVudExpc3QucHVzaCh7IG5hbWU6IFwiV2VkZGluZ1wiIH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0LnB1c2goeyBuYW1lOiBcIlBhcnR5XCIgfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudExpc3QucHVzaCh7IG5hbWU6IFwiQmlydGhkYXlcIiB9KTtcclxuICAgIH1cclxuXHJcbn0iXX0=