import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Router } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { Data } from "../../shared/Data";
const firebase = require("nativescript-plugin-firebase");

export class DataItem {
    constructor(public itemDesc: string) { 
    }
}

@Component({
    selector: "tab",
    moduleId: module.id,
    templateUrl: "./tab.html",
    styleUrls: [ "./tab.css" ]
})

export class TabComponent {
    public items: Array<DataItem>;
    public activeTab: string;
    public selectedIndex: number = 0;
    isHome: boolean = true;
    isSearch: boolean = false;
    isGallery: boolean = false;
    isNotification: boolean = false;
    isProfile: boolean = false;
    //public firstName: string;
    //public lastName: string;
    public tabName: string = "feed";

    constructor(private router: Router, private page: Page, protected data: Data) {
        this.tabName = "feed";
    }
    onCamera() {
        console.log("Camera tapped.");
        this.router.navigate(["/image"]);
        //Kjører kamera funksjon------
    }

    onNewEvent() {
        console.log("New event tapped.");
        this.tabName = "new event";
        this.router.navigate(["/newEvent"]);
    }

    onInvitation() {
        console.log("New invitation tapped");
        this.router.navigate(["/invitation"]);
    }

    onHome() {
        console.log("Home-tab tapped.");
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        this.tabName = "feed";
    }

    onSearch() {
        console.log("Search-tab tapped.");
        this.isHome = false;
        this.isSearch = true;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = false;
        this.tabName = "search";
        //console.log("Users name" + this.firstName);
        //console.log("Last name" + this.lastName);
    }

    onGallery() {
        console.log("Gallery-tab tapped.");
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = true;
        this.isNotification = false;
        this.isProfile = false; 
        this.tabName = "gallery";          
    }

    onNotification() {
        console.log("Notification-tab tapped.");
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = true;
        this.isProfile = false; 
        this.tabName = "notifications";  
    }

    onProfile() {
        console.log("Profile-tab tapped.");
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isNotification = false;
        this.isProfile = true;  
        //this.firstName = this.data.storage["firstName"];
        //this.lastName = this.data.storage["lastName"];
        this.tabName = "profile";
        console.log("Tabname " + this.tabName);
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