import { Component } from "@angular/core";
import { Photo } from "../../../shared/Photo";
import { Router, ActivatedRoute } from "@angular/router";
import { TabComponent } from "../tab.component";
import { User } from "../../../shared/User";
import { Data } from "../../../shared/Data";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
var http = require("http");
var layout = require("ui/layouts/grid-layout");
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "profile-tab",
    templateUrl: "./pages/tabs/profile/profile.tab.html",
    styleUrls: ["./pages/tabs/profile/profile-tab.css"]
})

export class ProfileComponent {

    public firstName: string;
    public lastName: string;
    public email: string;
    public id: any;
    public profile: boolean;
    public photos: boolean;
    public selected: boolean;
    public selectedPhoto: string;
    site: string = "http://188.166.127.207:5555/api.php/";
    public myPhotos: Array<Photo>;
    public photoUrl: string;
    public photoCreated: string;
    

    constructor(private router: Router, private data: Data) {
        console.log(JSON.stringify("OooooooooooOooooooooOOOOOOOOOOOOOOOOOOOO" + this.data.storage));
        this.profile = false;
        this.photos = false;
        this.selected = false;
    }

    showInfo() {
        if (this.profile) {
            this.profile = false;
        } else {
            this.profile = true;
        }
        
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        console.log("Users name" + this.firstName + " " + this.lastName + " " + this.id);
    }

    showPhotos() {
        this.showInfo();
        this.profile = false;
        if (this.photos) {
            this.photos = false;
        } else {
            this.photos = true;
            if (this.myPhotos == null) {
                this.getPhotos();
            }
        }
    }

    private getPhotos() {
        //get all photos uploaded by current user
        this.myPhotos = new Array();
        var query: string = this.site + "files?transform=1&filter=user_Id,eq," + this.id;
        http.getJSON(query)
        .then((r) => {
            //testing
            console.log("Files length is " + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                this.myPhotos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + r.files[i].file_URL, //need to adjust when photo is in event catalog
                        this.id,
                        r.files[i].created_at
                    )
                )
            }
        }, function (e) {
            console.log(e);
        }).then(() => {
            //testing
            console.log("There are " + this.myPhotos.length + " photos in my photos");
        })
    }

    selectPhoto(args: GestureEventData) {
        this.selected = true;
        this.photos = false;
        this.profile = false;
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
        var photo: Photo = this.myPhotos.find(i => i.id === parseInt(args.view.id));
        this.photoUrl = photo.url;
        this.photoCreated = photo.created;
    }

    closePhoto() {
        this.selected = false;
        this.photos = true;
    }


    //logs out from both Google+ and Facebook accounts
  logout() {
    var router = this.router;
    this.data.storage = {};
    firebase.logout();
    router.navigate([""]);
}

}