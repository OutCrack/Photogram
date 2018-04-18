import { Component } from "@angular/core";
import { Server } from "../../shared/Server/Server"
import { Data } from "../../shared/Data";

@Component({
    selector: "NewEvent",
    templateUrl: "./pages/event/event-new.html"
})

export class EventComponent {
    event: any;
    public server: Server;
    public source: any;

    public constructor(private data: Data){
        this.server = new Server();
    }

    public saveEvent(){
        console.log(this.event.name);
        this.server.newEvent(this.event.name, this.event.location, this.event.description, this.event.type, this.event.privacy);
    }
}