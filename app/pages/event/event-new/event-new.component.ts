import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server"
import { Data } from "../../../shared/Data";
import { Router, NavigationExtras } from "@angular/router";

@Component({
    selector: "NewEvent",
    templateUrl: "./pages/event/event-new/event-new.html"
})

export class NewEventComponent {
    event: any;
    public server: Server;
    public source: any;
    public wedding: boolean;
    public privacy: boolean;

    public constructor(private data: Data, private router: Router){
        this.server = new Server();
        this.wedding = true;
        this.privacy = false;
        this.event = {

        }
    }

    public saveEvent(){
        console.log(this.event.name);
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
        this.server.newEvent(this.data.storage["id"], this.event.name, this.event.location, this.event.description, type, privacy).then((fromResolve) => {
            result = fromResolve;
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "id" : result,
                    "name" : this.event.name,
                    "role" : "Admin",
                    "description" : this.event.description,
                    "type" : type,
                    "photo_url" : this.wedding ?  'http://sergphoto.com:8000/uploads/events/wedding-default.png' : 'http://sergphoto.com:8000/uploads/events/party-default.png',
                    "privacy" : privacy
                }
            };
            console.log(JSON.stringify(navigationExtras));
            this.router.navigate(["/eventView"], navigationExtras);
        }).catch(() => {
            alert("Something went wrong. Please try again later");
        })
    }

    public changeEventType() {
        this.wedding = !this.wedding;
    }

    public changeEventPrivacy() {
        this.privacy = !this.privacy;
    }
}