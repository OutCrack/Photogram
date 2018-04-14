"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Server_1 = require("../../../shared/Server/Server");
var Data_1 = require("../../../shared/Data");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(data) {
        this.data = data;
        this.server = new Server_1.Server;
        this.pEvents = false;
        //this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);   
    }
    NotificationComponent.prototype.fetchPublicEvents = function () {
        this.pEvents = !this.pEvents;
        if (this.pEvents) {
            this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
            console.log("Events " + this.publicEvents.length);
        }
    };
    NotificationComponent.prototype.joinEvent = function (eventId) {
        console.log("You clicked " + eventId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbW9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLmNvbW9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHdEQUF1RDtBQUV2RCw2Q0FBNEM7QUFNNUM7SUFNSSwrQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQiw4RUFBOEU7SUFDbEYsQ0FBQztJQUVELGlEQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBUyxHQUFULFVBQVUsT0FBZTtRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBdEJRLHFCQUFxQjtRQUpqQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsaURBQWlEO1NBQ2pFLENBQUM7eUNBTzRCLFdBQUk7T0FOckIscUJBQXFCLENBdUJqQztJQUFELDRCQUFDO0NBQUEsQUF2QkQsSUF1QkM7QUF2Qlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL0V2ZW50XCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5vdGlmaWNhdGlvbi10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3RhYnMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi50YWIuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgcHVibGljRXZlbnRzOiBBcnJheTxFdmVudD47XG4gICAgc2VydmVyOiBTZXJ2ZXI7XG4gICAgcEV2ZW50czogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXI7XG4gICAgICAgIHRoaXMucEV2ZW50cyA9IGZhbHNlOyAgXG4gICAgICAgIC8vdGhpcy5wdWJsaWNFdmVudHMgPSB0aGlzLnNlcnZlci5nZXRQdWJsaWNFdmVudHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSk7ICAgXG4gICAgfVxuXG4gICAgZmV0Y2hQdWJsaWNFdmVudHMoKSB7XG4gICAgICAgIHRoaXMucEV2ZW50cyA9ICF0aGlzLnBFdmVudHM7IFxuICAgICAgICBpZiAodGhpcy5wRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnB1YmxpY0V2ZW50cyA9IHRoaXMuc2VydmVyLmdldFB1YmxpY0V2ZW50cyh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdKTsgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIFwiICsgdGhpcy5wdWJsaWNFdmVudHMubGVuZ3RoKTtcbiAgICAgICAgfSAgXG4gICAgfVxuXG4gICAgam9pbkV2ZW50KGV2ZW50SWQ6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIFwiICsgZXZlbnRJZCk7XG4gICAgfVxufSJdfQ==