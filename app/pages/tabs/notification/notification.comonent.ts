import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";
import { Data } from "../../../shared/Data";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Router, NavigationExtras } from "@angular/router";

@Component({
    selector: "notification-tab",
    templateUrl: "./pages/tabs/notification/notification.tab.html"
})
export class NotificationComponent {

    public items: Array<SegmentedBarItem>;
    public selectedIndex = 0;
    public visibility1 = true;
    public visibility2 = false;

    public publicEvents: Array<Event>;
    public participEvents: Array<Event>;
    public invitedToEvents: Array<Event>;
    server: Server;

    constructor(private data: Data, private router: Router) {
        this.server = new Server();
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        this.participEvents = this.server.getMyEvents(this.data.storage["id"]);

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
        console.log("Stack Loaded");
        this.participEvents = this.server.getMyEvents(this.data.storage["id"]);
    }


    fetchPublicEvents() {
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
    }

    joinEvent(eventId: number) {
        //console.log("You clicked " + eventId + "your id " + this.data.storage["id"]);
        var ok = this.server.joinEvent(eventId, this.data.storage["id"], "User");
        this.fetchPublicEvents();
    }

    openEvent(eventId: number) {
        console.log("You tapped " + eventId);
        var selectedEvent: Event = this.participEvents.find(i => i.id === eventId)
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
        console.log(JSON.stringify(navigationExtras));
        this.router.navigate(["/eventView"], navigationExtras);
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
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
    }
}

//part 1 -> my events
//part 2 first events i got invited to, then public events