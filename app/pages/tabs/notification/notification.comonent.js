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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCw2Q0FBNEM7QUFNNUM7SUFNSSwrQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpREFBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLE9BQWU7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsT0FBTyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBRTdCLENBQUM7SUF6QlEscUJBQXFCO1FBSmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxpREFBaUQ7U0FDakUsQ0FBQzt5Q0FPNEIsV0FBSTtPQU5yQixxQkFBcUIsQ0EwQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XHJcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0RhdGFcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibm90aWZpY2F0aW9uLXRhYlwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24udGFiLmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgcHVibGljRXZlbnRzOiBBcnJheTxFdmVudD47XHJcbiAgICBzZXJ2ZXI6IFNlcnZlcjtcclxuICAgIHBFdmVudHM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhOiBEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XHJcbiAgICAgICAgdGhpcy5wRXZlbnRzID0gZmFsc2U7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZldGNoUHVibGljRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMucEV2ZW50cyA9ICF0aGlzLnBFdmVudHM7IFxyXG4gICAgICAgIGlmICh0aGlzLnBFdmVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5wdWJsaWNFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7ICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wdWJsaWNFdmVudHMubGVuZ3RoKTtcclxuICAgICAgICB9ICBcclxuICAgIH1cclxuXHJcbiAgICBqb2luRXZlbnQoZXZlbnRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCBcIiArIGV2ZW50SWQgKyBcInlvdXIgaWQgXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTtcclxuICAgICAgICB2YXIgb2sgPSB0aGlzLnNlcnZlci5qb2luRXZlbnQoZXZlbnRJZCwgdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7XHJcbiAgICAgICAgdGhpcy5wRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mZXRjaFB1YmxpY0V2ZW50cygpO1xyXG5cclxuICAgIH1cclxufSJdfQ==