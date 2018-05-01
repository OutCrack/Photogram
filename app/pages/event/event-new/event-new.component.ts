import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server"
import { Data } from "../../../shared/Data";

@Component({
    selector: "NewEvent",
    templateUrl: "./pages/event/event-new/event-new.html"
})

export class NewEventComponent {
    event: any;
    public server: Server;
    public source: any;

    public constructor(private data: Data){
        this.server = new Server();
        this.event = { }
    }

    public saveEvent(){        
        this.event = {
            "name" : this.event.name,
            "location" : this.event.location,
            "description" : this.event.description,
            "type" : this.event.type,
            "privacy" : this.event.privacy
        }

        this.server.newEvent(this.event.name, this.event.location, this.event.description, this.event.type, this.event.privacy);
        console.log(this.event.name);
    }
}