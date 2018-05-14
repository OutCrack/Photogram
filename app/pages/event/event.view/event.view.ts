import { Component, OnInit } from "@angular/core";
import { SearchBar } from "ui/search-bar";
import { Event } from "../../../shared/Event";
import { RouterExtensions } from "nativescript-angular";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute } from "@angular/router";
import { Data } from "../../../shared/Data";
import { Server } from "../../../shared/Server/Server";
import * as dialogs from "ui/dialogs";
import { User } from "../../../shared/User";

@Component({
    templateUrl: "./pages/event/event.view/event.view.html",
    styleUrls: [ "./pages/event/event.view/event.view.css" ]

})
export class EventViewComponent {
    
    public server: Server;
    public eventId;
    public eventName;
    public role;
    public description;
    public type;
    public photo_url;
    public privacy;
    public admin: boolean;
    public showingParticipants: boolean;
    public participants: Array<User>;
    public inviting: boolean;
    public searchList: Array<User>;

    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private data: Data) {
        this.server = new Server();
        this.inviting = false;
        this.showingParticipants = false;
        this.participants = [];
        this.searchList = [];
        this.route.queryParams.subscribe(params => {
            console.log("IM IN EVENTVIEW " + JSON.stringify(params));
            this.eventId = params["id"];
            this.eventName = params["name"];
            this.role = params["role"];
            this.description = params["description"];
            this.type = params["type"];
            this.photo_url = params["photo_url"];
            this.privacy = params["privacy"];
            if (this.role.toLowerCase() == "admin") {
                this.admin = true;
            } else {
                this.admin = false;
            }
        });

    }

    onBackButtonTap() {
        this.routerExtensions.back();
    }

    leaveEvent() {
        dialogs.confirm({
            title: "Are you sure?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this.server.leaveEvent(this.eventId, this.data.storage["id"]);
                dialogs.alert("You left " + this.eventName + " successfully").then(() => {
                    this.onBackButtonTap();
                });
            }
        })
        
    }

    showGuests() {
        if (!this.showingParticipants) {
            this.participants = this.server.getEventParticipants(this.eventId);
            this.showingParticipants = true;
        } else {
            this.showingParticipants = false;
            this.inviting = false;
        }
        
    }

    removeParticipant(userId: number) {
        if (this.data.storage["id"] == userId) {
            alert("You can't remove yourself from this event");
        } else {
            dialogs.confirm({
                title: "Are you sure?",
                okButtonText: "Yes",
                cancelButtonText: "Cancel"
            }).then(result => {
                if (result) {
                    this.server.leaveEvent(this.eventId, userId);
                    dialogs.alert("Guest successfully removed").then(() => {
                        this.participants = this.server.getEventParticipants(this.eventId);
                    });
                }
                
            })
        }
    }

    invite(text: string) {
        //invite new users -> seach by email address or sth
        this.inviting = true;
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        alert("You are searching for " + searchBar.text);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("You are searching for " + searchBar.text);
        this.searchList = this.server.getUsersByHint(searchBar.text, this.data.storage["id"]);
    }

    public onTextSubmit(args) {
        console.log("Submitted");
        for (let user of this.searchList) {
            console.log("Checking user " + user.id);
            if (this.participants.find(i => i.id === user.id)) {
                console.log("Found");
                this.searchList[user.id].role = this.participants[user.id].role;
            }
        }
    }

    inviteUser(userId: number) {
        alert("You are inviting " + userId);
        //in server check if the user already is invited -> use participants list
    }


}