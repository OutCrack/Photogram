"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var Data_1 = require("../../../shared/Data");
var segmented_bar_1 = require("ui/segmented-bar");
var router_1 = require("@angular/router");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(data, router) {
        this.data = data;
        this.router = router;
        this.selectedIndex = 0;
        this.visibility1 = true;
        this.visibility2 = false;
        this.stack1Loaded = function (args) {
            this.participEvents = this.server.getMyEvents(this.data.storage["id"], "User");
            this.myEvents = this.server.getMyEvents(this.data.storage["id"], "Admin");
            this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
        };
        this.stack2Loaded = function (args) {
            this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
            this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
        };
        this.server = new Server_1.Server();
        //this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        //this.myEvents = this.server.getMyEvents(this.data.storage["id"], "Admin");
        //this.participEvents = this.server.getMyEvents(this.data.storage["id"], "User");
        //this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
        this.items = [];
        for (var i = 1; i < 3; i++) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            if (i == 1) {
                segmentedBarItem.title = "My Events";
            }
            else {
                segmentedBarItem.title = "New Events";
            }
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
    }
    NotificationComponent.prototype.fetchPublicEvents = function () {
    };
    NotificationComponent.prototype.joinEvent = function (eventId) {
        var ok = this.server.joinEvent(eventId, this.data.storage["id"], "User");
        this.fetchPublicEvents();
    };
    NotificationComponent.prototype.openEvent = function (eventId) {
        var selectedEvent = this.participEvents.find(function (i) { return i.id === eventId; });
        if (selectedEvent == null) {
            selectedEvent = this.myEvents.find(function (i) { return i.id === eventId; });
        }
        var navigationExtras = {
            queryParams: {
                "id": eventId,
                "name": selectedEvent.name,
                "role": selectedEvent.role,
                "description": selectedEvent.description,
                "type": selectedEvent.type,
                "photo_url": selectedEvent.photo_url,
                "privacy": selectedEvent.privacy
            }
        };
        this.router.navigate(["/eventView"], navigationExtras);
    };
    NotificationComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        switch (this.selectedIndex) {
            case 0:
                this.visibility1 = true;
                this.visibility2 = false;
                break;
            case 1:
                this.visibility1 = false;
                this.visibility2 = true;
                break;
            default:
                break;
        }
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: "notification-tab",
            templateUrl: "./pages/tabs/notification/notification.tab.html"
        }),
        __metadata("design:paramtypes", [Data_1.Data, router_1.Router])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//part 1 -> my events
//part 2 first events i got invited to, then public events 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCw2Q0FBNEM7QUFDNUMsa0RBQWtFO0FBQ2xFLDBDQUEyRDtBQU0zRDtJQWFJLCtCQUFvQixJQUFVLEVBQVUsTUFBYztRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVYvQyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQTZCM0IsaUJBQVksR0FBRyxVQUFTLElBQUk7WUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFBO1FBRUQsaUJBQVksR0FBRyxVQUFTLElBQUk7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxlQUFl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O2dCQUN6QixLQUFLLENBQUM7WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQXpGUSxxQkFBcUI7UUFKakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGlEQUFpRDtTQUNqRSxDQUFDO3lDQWM0QixXQUFJLEVBQWtCLGVBQU07T0FiN0MscUJBQXFCLENBMEZqQztJQUFELDRCQUFDO0NBQUEsQUExRkQsSUEwRkM7QUExRlksc0RBQXFCO0FBNEZsQyxxQkFBcUI7QUFDckIsMERBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJub3RpZmljYXRpb24tdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24udGFiLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db21wb25lbnQge1xuXG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgcHVibGljIHZpc2liaWxpdHkxID0gdHJ1ZTtcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTIgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBwdWJsaWNFdmVudHM6IEFycmF5PEV2ZW50PjtcbiAgICBwdWJsaWMgcGFydGljaXBFdmVudHM6IEFycmF5PEV2ZW50PjtcbiAgICBwdWJsaWMgbXlFdmVudHM6IEFycmF5PEV2ZW50PjtcbiAgICBwdWJsaWMgaW52aXRlZFRvRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgc2VydmVyOiBTZXJ2ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGE6IERhdGEsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgICAgIC8vdGhpcy5wdWJsaWNFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIC8vdGhpcy5teUV2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIFwiQWRtaW5cIik7XG4gICAgICAgIC8vdGhpcy5wYXJ0aWNpcEV2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIFwiVXNlclwiKTtcbiAgICAgICAgLy90aGlzLmludml0ZWRUb0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIFwiSW52aXRlZFwiKTtcblxuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IFwiTXkgRXZlbnRzXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSBcIk5ldyBFdmVudHNcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgc3RhY2sxTG9hZGVkID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICB0aGlzLnBhcnRpY2lwRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0TXlFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgXCJVc2VyXCIpO1xuICAgICAgICB0aGlzLm15RXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0TXlFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgXCJBZG1pblwiKTtcbiAgICAgICAgdGhpcy5pbnZpdGVkVG9FdmVudHMgPSB0aGlzLnNlcnZlci5nZXRNeUV2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCBcIkludml0ZWRcIik7XG4gICAgfVxuXG4gICAgc3RhY2syTG9hZGVkID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICB0aGlzLnB1YmxpY0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldFB1YmxpY0V2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgdGhpcy5pbnZpdGVkVG9FdmVudHMgPSB0aGlzLnNlcnZlci5nZXRNeUV2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCBcIkludml0ZWRcIik7XG4gICAgfVxuXG5cbiAgICBmZXRjaFB1YmxpY0V2ZW50cygpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgam9pbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICB2YXIgb2sgPSB0aGlzLnNlcnZlci5qb2luRXZlbnQoZXZlbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgXCJVc2VyXCIpO1xuICAgICAgICB0aGlzLmZldGNoUHVibGljRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgb3BlbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICB2YXIgc2VsZWN0ZWRFdmVudDogRXZlbnQgPSB0aGlzLnBhcnRpY2lwRXZlbnRzLmZpbmQoaSA9PiBpLmlkID09PSBldmVudElkKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkRXZlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRFdmVudCA9IHRoaXMubXlFdmVudHMuZmluZChpID0+IGkuaWQgPT09IGV2ZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBcImlkXCIgOiBldmVudElkLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiIDogc2VsZWN0ZWRFdmVudC5uYW1lLFxuICAgICAgICAgICAgICAgIFwicm9sZVwiIDogc2VsZWN0ZWRFdmVudC5yb2xlLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IHNlbGVjdGVkRXZlbnQuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCIgOiBzZWxlY3RlZEV2ZW50LnR5cGUsXG4gICAgICAgICAgICAgICAgXCJwaG90b191cmxcIiA6IHNlbGVjdGVkRXZlbnQucGhvdG9fdXJsLFxuICAgICAgICAgICAgICAgIFwicHJpdmFjeVwiIDogc2VsZWN0ZWRFdmVudC5wcml2YWN5XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ldmVudFZpZXdcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vL3BhcnQgMSAtPiBteSBldmVudHNcbi8vcGFydCAyIGZpcnN0IGV2ZW50cyBpIGdvdCBpbnZpdGVkIHRvLCB0aGVuIHB1YmxpYyBldmVudHMiXX0=