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
    public profession: string;
    public location: string;
    public hobby: string;
    public avatar: string;
    public birthDate: string;
    public gender: string;
    public id: any;
    public profile: boolean;
    public photos: boolean;
    public selectedPhoto: string;
    site: string = "http://188.166.127.207:5555/api.php/";
    public myPhotos: Array<Photo>;
    public photoUrl: string;
    public photoCreated: string;
    

    constructor(private router: Router, private data: Data) {
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        this.profession = this.data.storage["profession"];
        this.location = this.data.storage["location"];
        this.gender = this.data.storage["gender"];
        this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + this.data.storage["avatar"];
        this.birthDate = this.data.storage["dob"];
        this.hobby = this.data.storage["hobby"];
    }

    //logs out from both Google+ and Facebook accounts
  logout() {
    var router = this.router;
    this.data.storage = {};
    firebase.logout();
    router.navigate([""]);
}

}