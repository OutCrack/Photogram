import { Component, OnInit } from "@angular/core";
import { SearchBar } from "ui/search-bar";
import { Event } from "../../../shared/Event";
import { RouterExtensions } from "nativescript-angular";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Data } from "../../../shared/Data";
import { Server } from "../../../shared/Server/Server";
import * as dialogs from "ui/dialogs";
import { User } from "../../../shared/User";
import { Photo } from "../../../shared/Photo";

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
    public firstSearch: boolean;
    public pictures: boolean;
    public photoList: Array<Photo>;
    public eventOwner: number;

    stackLoaded = function(args) {
        this.photoList = this.server.getEventPhotos(this.eventId);
        this.pictures = true;
        this.server.getEventOwner(this.eventId).then((res) => {
            this.eventOwner = res;
            alert("Event owner is " + this.eventOwner);
        }).catch(() => {
            this.eventOwner = 0;
            alert("Event owner is " + this.eventOwner);
        })
        }

    constructor(private routerExtensions: RouterExtensions, private router: Router, private route: ActivatedRoute, private data: Data) {
        this.server = new Server();
        this.inviting = false;
        this.firstSearch = false;
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

    public deleteEvent() {
        dialogs.confirm({
            title: "Are you sure you want to delete this event",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this.server.deleteEvent(this.eventId).then(() => {
                    dialogs.alert("Event deleted").then(()=> {
                        var promise = new Promise((resolve, reject) => {
                            this.participants = this.server.getEventParticipants(this.eventId);
                            resolve();
                        })
                        promise.then(() => {
                            for (let u of this.participants) {
                                this.server.leaveEvent(this.eventId, u.id);
                            }
                        })

                        this.routerExtensions.back();
                    })
                }).catch(() => {
                    dialogs.alert("Something went wrong. Please try again later");
                })

            }
        });
        //delete all users from db
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
            this.pictures = false;
            this.photoList = [];
        } else {
            this.showingParticipants = false;
            this.inviting = false;
            this.searchList = [];
            this.firstSearch = false;
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

    invite() {
        this.inviting = true;
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        this.firstSearch = true;
        this.searchList = this.server.getUsersByHint(searchBar.text, this.data.storage["id"]);
    }

    public onTextSubmit(args) {
        this.onTextChanged(args);
    }

    public doneInviting() {
        this.inviting = false;
        this.searchList = [];
        this.firstSearch = false;
    }

    inviteUser(userId: number) {
        console.log("You are inviting " + userId);
        if (this.participants.find(i => i.id === userId) == null) {
            this.server.joinEvent(this.eventId, userId, "Invited");
            alert("Invitation sent");
            this.participants = this.server.getEventParticipants(this.eventId);
        } else  {
            alert("The user is already invited or is a guest");
        }
    }

    showPictures() {
        if (this.pictures) {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "eventId" : this.eventId,
                    "eventPrivacy" : this.privacy
                }
            };
            this.router.navigate(["/image"], navigationExtras)
        } else {
            this.pictures = true;
            this.inviting = false;
            this.showingParticipants = false;
            this.photoList = this.server.getEventPhotos(this.eventId);
        }
    }

    selectPhoto(photoId: number) {
        var selectedPhoto: Photo = this.photoList.find(i => i.id === photoId)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "photoId" : photoId,
                "url" : selectedPhoto.url,
                "created" : selectedPhoto.created,
                "photoOwner" : selectedPhoto.userId,
                "eventOwner" : this.eventOwner,
                "eventId" : this.eventId,
                "description" : selectedPhoto.description,
                "ownerName" : selectedPhoto.user.firstN + " " + selectedPhoto.user.lastN,
                "fileName" : selectedPhoto.fileName,
                "albumPath" : selectedPhoto.albumPath
            }
        };
        this.router.navigate(["/photoView"], navigationExtras);
    }

}