import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TabComponent } from "../tab.component";
import { User } from "../../../shared/User";
import { Data } from "../../../shared/Data";


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
    public show: boolean;

    constructor(private router: Router, private data: Data) {
        console.log(JSON.stringify("OooooooooooOooooooooOOOOOOOOOOOOOOOOOOOO" + this.data.storage));
        this.show = false;
    }

    showInfo() {
        if (this.show) {
            this.show = false;
        } else {
            this.show = true;
        }
        
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