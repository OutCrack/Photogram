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
    isEventGallery: boolean = false;
    isProfile: boolean = false;
    public tabName: string = "Feed";


    constructor(private routerExtensions: RouterExtensions, private router: Router, private page: Page, protected data: Data) {
        this.tabName = "feed";
    }

    onBackButtonTap() {
        if (this.isHome) {
            //do nothing
        } else {
            this.tabViewIndexChange(0);
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
        this.isEventGallery = false;
        this.isProfile = false;
        this.tabName = "Feed";
    }

    onSearch() {
        this.isHome = false;
        this.isSearch = true;
        this.isGallery = false;
        this.isEventGallery = false;
        this.isProfile = false;
        this.tabName = "Search";
    }

    onGallery() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = true;
        this.isEventGallery  = false;
        this.isProfile = false; 
        this.tabName = "My gallery";          
    }

    onEventGallery() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isEventGallery  = true;
        this.isProfile = false; 
        this.tabName = "Event Gallery";  
    }

    onProfile() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isEventGallery  = false;
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
                this.onEventGallery();
                break;
            case 4:
                this.onProfile();
                break;
        }
    }

    addAlbum() {
        this.router.navigate(["/newAlbum"]);
    }

    onCamera() {
        this.router.navigate(["/image"]);
    }

    logout() {
        var router = this.router;
        this.data.storage = {};
        firebase.logout();
        router.navigate(["/"]);
    }
}