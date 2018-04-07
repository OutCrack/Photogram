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
    }

    showInfo() {
        if (this.profile) {
            this.profile = false;
        } else {
            this.profile = true;
        }
        console.log()
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        console.log("Users name" + this.firstName + " " + this.lastName + " " + this.id);
    }

    //logs out from both Google+ and Facebook accounts
  logout() {
    var router = this.router;
    this.data.storage = {};
    firebase.logout();
    router.navigate([""]);
}

}