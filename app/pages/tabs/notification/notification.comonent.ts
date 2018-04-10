import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";

@Component({
    selector: "notification-tab",
    templateUrl: "./pages/tabs/notification/notification.tab.html"
})
export class NotificationComponent {

    public myEvents: Array<Event>;
    public participEvents: Array<Event>;
    server: Server;
    pEvents: boolean;

    constructor() {
        this.server = new Server;
        this.pEvents = true;
        
    }

    fetchParticipEvents() {
        if (this.pEvents) {
            this.participEvents = this.server.getMyEvents(13);    
            this.pEvents = true;
            console.log("Events " + this.participEvents.length);
        }      
        
    }
}