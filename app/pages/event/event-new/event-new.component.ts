import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server"
import { Data } from "../../../shared/Data";
import { Router, NavigationExtras } from "@angular/router";
/**
 * 
 * 
 * @export
 * @class NewEventComponent
 */
@Component({
    selector: "NewEvent",
    templateUrl: "./pages/event/event-new/event-new.html",
    styleUrls: ["./pages/event/event-new/event-new.css" ]
})


export class NewEventComponent {
    event: any;
    public server: Server;
    public wedding: boolean;
    public privacy: boolean;

    /**
     * Creates an instance of NewEventComponent.
     * @param {Data} data 
     * @param {Router} router 
     * @memberof NewEventComponent
     */
    public constructor(private data: Data, private router: Router){
        this.server = new Server();
        this.wedding = true;
        this.privacy = false;
        this.event = {
            name : "",
            description: "",
            location: ""
        }
    }

    /**
     * 
     * 
     * @memberof NewEventComponent
     */
    public saveEvent(){
        if (this.event.name.length < 1 || this.event.description < 1) {
            alert("Fields event name and description can't be empty");
        } else {
            var type, privacy;
        if (this.wedding) {
            type = "Wedding";
        }
        else {
            type = "Party";
        }
        if (this.privacy) {
            privacy = "Private";
        }
        else {
            privacy = "Public";
        }
        var result;
        this.server.newEvent(this.data.storage["id"], this.event.name, this.event.location, 
        this.event.description, type, privacy).then((fromResolve) => {
            result = fromResolve;
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "id" : result,
                    "name" : this.event.name,
                    "role" : "Admin",
                    "description" : this.event.description,
                    "type" : type,
                    "photo_url" : this.wedding ?  'http://sergphoto.com:8000/uploads/events/wedding.jpeg' 
                    : 'http://sergphoto.com:8000/uploads/events/party.jped',
                    "privacy" : privacy
                }
            }; 
            this.router.navigate(["/eventView"], navigationExtras);
        }).catch(() => {
            alert("Something went wrong. Please try again later");
        })
        }
        
    }

    /**
     * 
     * 
     * @memberof NewEventComponent
     */
    public changeEventType() {
        this.wedding = !this.wedding;
    }

    /**
     * 
     * 
     * @memberof NewEventComponent
     */
    public changeEventPrivacy() {
        this.privacy = !this.privacy;
    }
}