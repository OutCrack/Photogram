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
            console.log("Stack Loaded");
            this.participEvents = this.server.getMyEvents(this.data.storage["id"]);
        };
        this.server = new Server_1.Server();
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        this.participEvents = this.server.getMyEvents(this.data.storage["id"]);
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
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
    };
    NotificationComponent.prototype.joinEvent = function (eventId) {
        //console.log("You clicked " + eventId + "your id " + this.data.storage["id"]);
        var ok = this.server.joinEvent(eventId, this.data.storage["id"], "User");
        this.fetchPublicEvents();
    };
    NotificationComponent.prototype.openEvent = function (eventId) {
        console.log("You tapped " + eventId);
        var selectedEvent = this.participEvents.find(function (i) { return i.id === eventId; });
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
        console.log(JSON.stringify(navigationExtras));
        this.router.navigate(["/eventView"], navigationExtras);
    };
    NotificationComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        switch (this.selectedIndex) {
            case 0:
                this.visibility1 = true;
                this.visibility2 = false;
                console.log("Visibility 1" + this.visibility1);
                console.log("Visibility 2" + this.visibility2);
                break;
            case 1:
                this.visibility1 = false;
                this.visibility2 = true;
                console.log("Visibility 1" + this.visibility1);
                console.log("Visibility 2" + this.visibility2);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCw2Q0FBNEM7QUFDNUMsa0RBQWtFO0FBQ2xFLDBDQUEyRDtBQU0zRDtJQVlJLCtCQUFvQixJQUFVLEVBQVUsTUFBYztRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVQvQyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQTBCM0IsaUJBQVksR0FBRyxVQUFTLElBQUk7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFBO1FBckJHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FB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LENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFwRlEscUJBQXFCO1FBSmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxpREFBaUQ7U0FDakUsQ0FBQzt5Q0FhNEIsV0FBSSxFQUFrQixlQUFNO09BWjdDLHFCQUFxQixDQXFGakM7SUFBRCw0QkFBQztDQUFBLEFBckZELElBcUZDO0FBckZZLHNEQUFxQjtBQXVGbEMscUJBQXFCO0FBQ3JCLDBEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9FdmVudFwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibm90aWZpY2F0aW9uLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnRhYi5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgIHB1YmxpYyB2aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgcHVibGljRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcHVibGljIHBhcnRpY2lwRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgcHVibGljIGludml0ZWRUb0V2ZW50czogQXJyYXk8RXZlbnQ+O1xuICAgIHNlcnZlcjogU2VydmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhOiBEYXRhLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICB0aGlzLnB1YmxpY0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldFB1YmxpY0V2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNpcEV2ZW50cyA9IHRoaXMuc2VydmVyLmdldE15RXZlbnRzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gXCJNeSBFdmVudHNcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IFwiTmV3IEV2ZW50c1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBzdGFjazFMb2FkZWQgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhY2sgTG9hZGVkXCIpO1xuICAgICAgICB0aGlzLnBhcnRpY2lwRXZlbnRzID0gdGhpcy5zZXJ2ZXIuZ2V0TXlFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgfVxuXG5cbiAgICBmZXRjaFB1YmxpY0V2ZW50cygpIHtcbiAgICAgICAgdGhpcy5wdWJsaWNFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgfVxuXG4gICAgam9pbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgXCIgKyBldmVudElkICsgXCJ5b3VyIGlkIFwiICsgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XG4gICAgICAgIHZhciBvayA9IHRoaXMuc2VydmVyLmpvaW5FdmVudChldmVudElkLCB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCBcIlVzZXJcIik7XG4gICAgICAgIHRoaXMuZmV0Y2hQdWJsaWNFdmVudHMoKTtcbiAgICB9XG5cbiAgICBvcGVuRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHRhcHBlZCBcIiArIGV2ZW50SWQpO1xuICAgICAgICB2YXIgc2VsZWN0ZWRFdmVudDogRXZlbnQgPSB0aGlzLnBhcnRpY2lwRXZlbnRzLmZpbmQoaSA9PiBpLmlkID09PSBldmVudElkKVxuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiIDogZXZlbnRJZCxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIiA6IHNlbGVjdGVkRXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICBcInJvbGVcIiA6IHNlbGVjdGVkRXZlbnQucm9sZSxcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBzZWxlY3RlZEV2ZW50LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiIDogc2VsZWN0ZWRFdmVudC50eXBlLFxuICAgICAgICAgICAgICAgIFwicGhvdG9fdXJsXCIgOiBzZWxlY3RlZEV2ZW50LnBob3RvX3VybCxcbiAgICAgICAgICAgICAgICBcInByaXZhY3lcIiA6IHNlbGVjdGVkRXZlbnQucHJpdmFjeVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShuYXZpZ2F0aW9uRXh0cmFzKSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ldmVudFZpZXdcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZpc2liaWxpdHkgMVwiICsgdGhpcy52aXNpYmlsaXR5MSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWaXNpYmlsaXR5IDJcIiArIHRoaXMudmlzaWJpbGl0eTIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZpc2liaWxpdHkgMVwiICsgdGhpcy52aXNpYmlsaXR5MSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWaXNpYmlsaXR5IDJcIiArIHRoaXMudmlzaWJpbGl0eTIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy9wYXJ0IDEgLT4gbXkgZXZlbnRzXG4vL3BhcnQgMiBmaXJzdCBldmVudHMgaSBnb3QgaW52aXRlZCB0bywgdGhlbiBwdWJsaWMgZXZlbnRzIl19