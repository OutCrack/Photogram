"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
        this.server = new Server_1.Server;
        this.pEvents = true;
    }
    NotificationComponent.prototype.fetchParticipEvents = function () {
        if (this.pEvents) {
            this.participEvents = this.server.getMyEvents(13);
            this.pEvents = true;
            console.log("Events " + this.participEvents.length);
        }
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: "notification-tab",
            templateUrl: "./pages/tabs/notification/notification.tab.html"
        }),
        __metadata("design:paramtypes", [])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQU92RDtJQU9JO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUV4QixDQUFDO0lBRUQsbURBQW1CLEdBQW5CO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUVMLENBQUM7SUFwQlEscUJBQXFCO1FBSmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxpREFBaUQ7U0FDakUsQ0FBQzs7T0FDVyxxQkFBcUIsQ0FxQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQXJCRCxJQXFCQztBQXJCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRXZlbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibm90aWZpY2F0aW9uLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnRhYi5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBteUV2ZW50czogQXJyYXk8RXZlbnQ+O1xuICAgIHB1YmxpYyBwYXJ0aWNpcEV2ZW50czogQXJyYXk8RXZlbnQ+O1xuICAgIHNlcnZlcjogU2VydmVyO1xuICAgIHBFdmVudHM6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyO1xuICAgICAgICB0aGlzLnBFdmVudHMgPSB0cnVlO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBmZXRjaFBhcnRpY2lwRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5wRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2lwRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0TXlFdmVudHMoMTMpOyAgICBcbiAgICAgICAgICAgIHRoaXMucEV2ZW50cyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBcIiArIHRoaXMucGFydGljaXBFdmVudHMubGVuZ3RoKTtcbiAgICAgICAgfSAgICAgIFxuICAgICAgICBcbiAgICB9XG59Il19