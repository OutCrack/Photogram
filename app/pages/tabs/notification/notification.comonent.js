"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var Data_1 = require("../../../shared/Data");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(data) {
        this.data = data;
        this.server = new Server_1.Server();
        this.pEvents = false;
    }
    NotificationComponent.prototype.fetchPublicEvents = function () {
        this.pEvents = !this.pEvents;
        if (this.pEvents) {
            this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
            console.log("Events " + this.publicEvents.length);
        }
    };
    NotificationComponent.prototype.joinEvent = function (eventId) {
        console.log("You clicked " + eventId + "your id " + this.data.storage["id"]);
        var ok = this.server.joinEvent(eventId, this.data.storage["id"]);
        this.pEvents = false;
        this.fetchPublicEvents();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCw2Q0FBNEM7QUFNNUM7SUFNSSwrQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpREFBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLE9BQWU7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsT0FBTyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBRTdCLENBQUM7SUF6QlEscUJBQXFCO1FBSmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxpREFBaUQ7U0FDakUsQ0FBQzt5Q0FPNEIsV0FBSTtPQU5yQixxQkFBcUIsQ0EwQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRXZlbnRcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibm90aWZpY2F0aW9uLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnRhYi5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBwdWJsaWNFdmVudHM6IEFycmF5PEV2ZW50PjtcbiAgICBzZXJ2ZXI6IFNlcnZlcjtcbiAgICBwRXZlbnRzOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICB0aGlzLnBFdmVudHMgPSBmYWxzZTsgICAgXG4gICAgfVxuXG4gICAgZmV0Y2hQdWJsaWNFdmVudHMoKSB7XG4gICAgICAgIHRoaXMucEV2ZW50cyA9ICF0aGlzLnBFdmVudHM7IFxuICAgICAgICBpZiAodGhpcy5wRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnB1YmxpY0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldFB1YmxpY0V2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTsgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wdWJsaWNFdmVudHMubGVuZ3RoKTtcbiAgICAgICAgfSAgXG4gICAgfVxuXG4gICAgam9pbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIFwiICsgZXZlbnRJZCArIFwieW91ciBpZCBcIiArIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuICAgICAgICB2YXIgb2sgPSB0aGlzLnNlcnZlci5qb2luRXZlbnQoZXZlbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIHRoaXMucEV2ZW50cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZldGNoUHVibGljRXZlbnRzKCk7XG5cbiAgICB9XG59Il19