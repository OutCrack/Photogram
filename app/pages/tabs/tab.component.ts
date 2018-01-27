import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Router } from '@angular/router';

export class DataItem {
    constructor(public itemDesc: string) { }
}

@Component({
    selector: "tab",
    moduleId: module.id,
    templateUrl: "./tab.html",
    styleUrls: ["./tab-common.css", "./tab.css"]
})
export class TabComponent {
    public items: Array<DataItem>;
    public activeTab: string;
    public selectedIndex: number = 0;

    constructor(private router: Router, private page: Page) {
        this.items = new Array<DataItem>();
        for (let i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }
    }

    toggleDisplay() {

    }

    /*navigateToHomeRoot() {
        this.router.navigate([
            '/home',
            { outlets: { homeoutlet: ['home'] } }
        ]);
    }

    navigateToSearchRoot() {
        this.router.navigate([
            '/search',
            { outlets: { searchoutlet: ['search'] } }
        ]);
    }

    navigateToGalleryRoot() {
        this.router.navigate([
            '/gallery',
            { outlets: { galleryoutlet: ['gallery'] } }
        ]);
    }

    navigateToNotificationRoot() {
        this.router.navigate([
            '/notification',
            { outlets: { notificationoutlet: ['notification'] } }
        ]);
    }

    navigateToProfileRoot() {
        this.router.navigate([
            '/profile',
            { outlets: { profileoutlet: ['profile'] } }
        ]);
    }

    tabViewIndexChange(index: number) {
        switch (index) {
            case 0:
                this.navigateToProfileRoot();
                break;
            case 1:
                this.navigateToSearchRoot();
                break;
            case 2:
                this.navigateToGalleryRoot();
                break;
            case 3:
                this.navigateToNotificationRoot();
                break;
            case 4:
                this.navigateToProfileRoot();
                break;
        }
    }*/
}