"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var Data_1 = require("../../../shared/Data");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(data) {
        this.data = data;
        this.server = new Server_1.Server;
        this.pEvents = true;
        this.publicEvents = [];
    }
    NotificationComponent.prototype.fetchPublicEvents = function () {
        if (this.pEvents) {
            this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
            console.log("Events " + this.publicEvents.length);
        }
        this.pEvents = !this.pEvents;
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: "notification-tab",
            templateUrl: "./pages/tabs/notification/notification.tab.html"
        }),
        __metadata("design:paramtypes", [Data_1.Data])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCw2Q0FBNEM7QUFNNUM7SUFNSSwrQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFFakMsQ0FBQztJQW5CUSxxQkFBcUI7UUFKakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGlEQUFpRDtTQUNqRSxDQUFDO3lDQU80QixXQUFJO09BTnJCLHFCQUFxQixDQW9CakM7SUFBRCw0QkFBQztDQUFBLEFBcEJELElBb0JDO0FBcEJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9FdmVudFwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJub3RpZmljYXRpb24tdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24udGFiLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db21wb25lbnQge1xuXG4gICAgcHVibGljIHB1YmxpY0V2ZW50czogQXJyYXk8RXZlbnQ+O1xuICAgIHNlcnZlcjogU2VydmVyO1xuICAgIHBFdmVudHM6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGE6IERhdGEpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyO1xuICAgICAgICB0aGlzLnBFdmVudHMgPSB0cnVlOyAgXG4gICAgICAgIHRoaXMucHVibGljRXZlbnRzID0gW107ICBcbiAgICB9XG5cbiAgICBmZXRjaFB1YmxpY0V2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMucEV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5wdWJsaWNFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7ICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucHVibGljRXZlbnRzLmxlbmd0aCk7XG4gICAgICAgIH0gIFxuICAgICAgICB0aGlzLnBFdmVudHMgPSAhdGhpcy5wRXZlbnRzOyBcbiAgICAgICAgXG4gICAgfVxufSJdfQ==