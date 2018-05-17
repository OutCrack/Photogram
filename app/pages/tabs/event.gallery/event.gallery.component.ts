import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";
import { Data } from "../../../shared/Data";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Router, NavigationExtras } from "@angular/router";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "event-tab",
    templateUrl: "./pages/tabs/event.gallery/event.gallery.component.html",
    styleUrls: ["./pages/tabs/event.gallery/event.gallery.component.css"]
})
export class EventGalleryComponent {

    public items: Array<SegmentedBarItem>;
    public selectedIndex = 0;
    public visibility1 = true;
    public visibility2 = false;

    public publicEvents: Array<Event>;
    public participEvents: Array<Event>;
    public myEvents: Array<Event>;
    public invitedToEvents: Array<Event>;
    server: Server;

    constructor(private data: Data, private router: Router) {
        this.server = new Server();
        //this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        //this.myEvents = this.server.getMyEvents(this.data.storage["id"], "Admin");
        //this.participEvents = this.server.getMyEvents(this.data.storage["id"], "User");
        //this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");

        this.items = [];
        for (let i = 1; i < 3; i++) {
            let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            if (i == 1) {
                segmentedBarItem.title = "My Events";
            } else {
                segmentedBarItem.title = "New Events";
            }

            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
    }

    stack1Loaded = function(args) {
        this.participEvents = this.server.getMyEvents(this.data.storage["id"], "User");
        this.myEvents = this.server.getMyEvents(this.data.storage["id"], "Admin");
        this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
    }

    stack2Loaded = function(args) {
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
    }


    fetchPublicEvents() {
        
    }

    joinEvent(eventId: number) {
        var ok = this.server.joinEvent(eventId, this.data.storage["id"], "User");
        this.fetchPublicEvents();
    }

    openEvent(eventId: number) {
        var selectedEvent: Event = this.participEvents.find(i => i.id === eventId);
        if (selectedEvent == null) {
            selectedEvent = this.myEvents.find(i => i.id === eventId);
        }
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "id" : eventId,
                "name" : selectedEvent.name,
                "role" : selectedEvent.role,
                "description" : selectedEvent.description,
                "type" : selectedEvent.type,
                "photo_url" : selectedEvent.photo_url,
                "privacy" : selectedEvent.privacy
            }
        };
        this.router.navigate(["/eventView"], navigationExtras);
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
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
    }

    public acceptInvitation(eventId: number) {
        this.server.leaveEvent(eventId, this.data.storage["id"]);
        this.server.joinEvent(eventId, this.data.storage["id"], "User");
        dialogs.alert("You joined the event").then(()=> {
        this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
        })
    }

    public declineInvitation(eventId: number) {
        console.log("You are declining " + eventId);
        dialogs.confirm({
            title: "Are you sure?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this.server.leaveEvent(eventId, this.data.storage["id"]);
                dialogs.alert("Invitation deleted").then(() => {
                this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");})
            }
        })
    }

}

//part 1 -> my events
//part 2 first events i got invited to, then public events