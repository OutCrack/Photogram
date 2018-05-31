import { Component, OnInit } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";
import { Data } from "../../../shared/Data";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Router, NavigationExtras } from "@angular/router";
import * as dialogs from "ui/dialogs";

/**
 * 
 * 
 * @export
 * @class EventGalleryComponent
 */
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

    /**
     * Creates an instance of EventGalleryComponent.
     * @param {Data} data 
     * @param {Router} router 
     * @memberof EventGalleryComponent
     */
    constructor(private data: Data, private router: Router) {
        this.server = new Server();

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

    /**
     * 
     * 
     * @memberof EventGalleryComponent
     */
    stack1Loaded = function(args) {
        this.participEvents = this.server.getMyEvents(this.data.storage["id"], "User");
        this.myEvents = this.server.getMyEvents(this.data.storage["id"], "Admin");
        this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
    }

    /**
     * 
     * 
     * @memberof EventGalleryComponent
     */
    stack2Loaded = function(args) {
        this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
    }


    /**
     * 
     * 
     * @param {number} eventId 
     * @memberof EventGalleryComponent
     */
    joinEvent(eventId: number) {
        this.server.joinEvent(eventId, this.data.storage["id"], "User");
        dialogs.alert("You successfully joined the event").then(() => {
            this.publicEvents = this.server.getPublicEvents(this.data.storage["id"]);
        })
    }

    /**
     * 
     * 
     * @param {number} eventId 
     * @memberof EventGalleryComponent
     */
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

    /**
     * 
     * 
     * @param {any} args 
     * @memberof EventGalleryComponent
     */
    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        switch (this.selectedIndex) {
            case 0:
                this.visibility1 = true;
                this.visibility2 = false;
                this.stack1Loaded(null);
                break;
            case 1:
                this.visibility1 = false;
                this.visibility2 = true;
                this.stack2Loaded(null);
                break;
            default:
                break;
        }
    }

    /**
     * 
     * 
     * @param {number} eventId 
     * @memberof EventGalleryComponent
     */
    public acceptInvitation(eventId: number) {
        this.server.leaveEvent(eventId, this.data.storage["id"]);
        this.server.joinEvent(eventId, this.data.storage["id"], "User");
        dialogs.alert("You joined the event").then(()=> {
        this.invitedToEvents = this.server.getMyEvents(this.data.storage["id"], "Invited");
        })
    }

    /**
     * 
     * 
     * @param {number} eventId 
     * @memberof EventGalleryComponent
     */
    public declineInvitation(eventId: number) {
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
