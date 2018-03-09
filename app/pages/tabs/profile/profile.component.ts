import { Component } from "@angular/core";
import { Router } from "@angular/router";

const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "profile-tab",
    templateUrl: "./pages/tabs/profile/profile.tab.html",
    styleUrls: ["./pages/tabs/profile/profile-tab.css"]
})

export class ProfileComponent {

    constructor(private router: Router) {}

    //logs out from both Google+ and Facebook accounts
  logout() {
      var router = this.router;
    firebase.logout();
    router.navigate([""]);
}

}