import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { Data } from "../../shared/Data";
import { RouterExtensions } from "nativescript-angular";
import { Server } from "../../shared/Server/Server";
const firebase = require("nativescript-plugin-firebase");


/**
 * 
 * 
 * @export
 * @class TabComponent
 */
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
    server: Server;

    /**
     * Creates an instance of TabComponent.
     * @param {RouterExtensions} routerExtensions 
     * @param {Router} router 
     * @param {Data} data 
     * @memberof TabComponent
     */
    constructor(private routerExtensions: RouterExtensions, private router: Router, protected data: Data,) {
        this.tabName = "feed";
        this.server = new Server();
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onBackButtonTap() {
        if (this.isHome) {
            this.logout();
        } else {
            this.tabViewIndexChange(0);
        }
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onNewEvent() {
        this.tabName = "New event";
        this.router.navigate(["/newEvent"]);
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onInvitation() {
        this.router.navigate(["/invitation"]);
        this.tabName="Invitation";
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onHome() {
        this.isHome = true;
        this.isSearch = false;
        this.isGallery = false;
        this.isEventGallery = false;
        this.isProfile = false;
        this.tabName = "Feed";
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onSearch() {
        this.isHome = false;
        this.isSearch = true;
        this.isGallery = false;
        this.isEventGallery = false;
        this.isProfile = false;
        this.tabName = "Search";
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onGallery() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = true;
        this.isEventGallery  = false;
        this.isProfile = false; 
        this.tabName = "My gallery";          
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onEventGallery() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isEventGallery  = true;
        this.isProfile = false; 
        this.tabName = "Event Gallery";  
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onProfile() {
        this.isHome = false;
        this.isSearch = false;
        this.isGallery = false;
        this.isEventGallery  = false;
        this.isProfile = true;  
        this.tabName = "Profile";
    }

    /**
     * 
     * 
     * @param {number} index 
     * @memberof TabComponent
     */
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

    /**
     * 
     * 
     * @memberof TabComponent
     */
    addAlbum() {
        this.router.navigate(["/newAlbum"]);
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    onCamera() {
        var albumId;
        this.server.getAlbumForFeedPhotos(this.data.storage["id"]).then((r) => {
            albumId = r;
            var navigationExtras = {
                queryParams: {
                    "albumId" : albumId
                }
            };
            this.router.navigate(["/image"], navigationExtras);
        }).catch(() => {
            alert("Error occurred. Please log out and in again");
        })
    }

    /**
     * 
     * 
     * @memberof TabComponent
     */
    logout() {
        var router = this.router;
        this.data.storage = {};
        firebase.logout();
        router.navigate(["/login"]);
    }
}