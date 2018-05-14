import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Router } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { Data } from "../../shared/Data";
import { RouterExtensions } from "nativescript-angular";
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "tab",
    moduleId: module.id,
    templateUrl: "./tab.html",
    styleUrls: [ "./tab.css" ]
})

export class TabComponent {
    isHome: boolean = true;
    isSearch: boolean = false;
    isGallery: boolean = false;
    isNotification: boolean = false;
    isProfile: boolean = false;
    public tabName: string = "Feed";


    constructor(private routerExtensions: RouterExtensions, private router: Router, private page: Page, protected data: Data) {
        this.tabName = "feed";
    }

    onCamera() {
        console.log("Camera tapped.");
        this.router.navigate(["/image"]);
    }

    onBackButtonTap() {
        if (this.isHome) {
            //do nothing
        } else {
            this.onHome();
        }
    }

    onNewEvent() {

        this.tabName = "New event";
        this.router.navigate(["/newEvent"]);
    }

    onInvitation() {
        this.router.navigate(["/invitation"]);
        this.tabName="Invitation";
    }

    onHome() {
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        this.tabName = "Feed";
    }

    onSearch() {
        console.log("Search-tab tapped.");
        this.isHome = false;
        this.isSearch = true;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        this.tabName = "Search";
    }

    onGallery() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = true;
        this.isNotification = false;
        this.isProfile = false; 
        this.tabName = "My gallery";          
    }

    onNotification() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = true;
        this.isProfile = false; 
        this.tabName = "Events";  
    }

    onProfile() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = true;  
        this.tabName = "Profile";
    }

    tabViewIndexChange(index: number) {
        switch (index) {
            case 0:
                this.onHome();
                break;
            case 1:
                this.onSearch();
                break;
            case 2:
                this.onGallery();
                break;
            case 3:
                this.onNotification();
                break;
            case 4:
                this.onProfile();
                break;
        }
    }

    addAlbum() {
        console.log("New album adding");
        this.router.navigate(["/newAlbum"]);
    }

    logout() {
        var router = this.router;
        this.data.storage = {};
        firebase.logout();
        router.navigate(["/"]);
    }
}