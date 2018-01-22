"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var DataItem = /** @class */ (function () {
    function DataItem(itemDesc) {
        this.itemDesc = itemDesc;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
var TabComponent = /** @class */ (function () {
    function TabComponent(page) {
        this.page = page;
        this.items = new Array();
        for (var i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }
    }
    TabComponent.prototype.toggleDisplay = function () {
    };
    TabComponent = __decorate([
        core_1.Component({
            selector: "tab",
            moduleId: module.id,
            templateUrl: "./tab.html",
            styleUrls: ["./tab-common.css", "./tab.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsZ0NBQStCO0FBRS9CO0lBQ0ksa0JBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0lBQzNDLGVBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDRCQUFRO0FBVXJCO0lBSUksc0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQVksQ0FBQztRQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQWEsR0FBYjtJQUVBLENBQUM7SUFiUSxZQUFZO1FBTnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsWUFBWTtZQUN6QixTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUM7U0FDN0MsQ0FBQzt5Q0FLNEIsV0FBSTtPQUpyQixZQUFZLENBY3hCO0lBQUQsbUJBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhSXRlbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaXRlbURlc2M6IHN0cmluZykge31cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwidGFiXCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL3RhYi5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL3RhYi1jb21tb24uY3NzXCIsIFwiLi90YWIuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJDb21wb25lbnQge1xyXG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxEYXRhSXRlbT47XHJcbiAgICBwdWJsaWMgYWN0aXZlVGFiOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IG5ldyBBcnJheTxEYXRhSXRlbT4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IERhdGFJdGVtKFwiaXRlbSBcIiArIGkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRGlzcGxheSgpIHtcclxuICAgICAgICAgICAgIFxyXG4gICAgfVxyXG59Il19