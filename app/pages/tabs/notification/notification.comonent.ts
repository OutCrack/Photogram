import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";
import { Data } from "../../../shared/Data";

@Component({
    selector: "notification-tab",
    templateUrl: "./pages/tabs/notification/notification.tab.html"
})
export class NotificationComponent {

    public publicEvents: Array<Event>;
    server: Server;
    pEvents: boolean;

    constructor(private data: Data) {
        this.server = new Server();
        this.pEvents = false;    
    }

    fetchPublicEvents() {
        this.pEvents = !this.pEvents; 
        if (this.pEvents) {
            this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);   
            console.log("Events " + this.publicEvents.length);
        }  
    }

    joinEvent(eventId: number) {
        //console.log("You clicked " + eventId + "your id " + this.data.storage["id"]);
        var ok = this.server.joinEvent(eventId, this.data.storage["id"]);
        this.pEvents = false;
        this.fetchPublicEvents();

    }
}