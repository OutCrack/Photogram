import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { Photo } from "../../../shared/Photo";
import { Server } from "../../../shared/Server/Server";
import { registerElement } from "nativescript-angular/element-registry";
import { Data } from "../../../shared/Data";
import { NavigationExtras, Router } from "@angular/router";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

/**
 * 
 * 
 * @export
 * @class HomeComponent
 */
@Component({
    selector: "home-tab",
    templateUrl: "./pages/tabs/home/home.tab.html",
    styleUrls: ["./pages/tabs/home/home.tab.css"]
})

export class HomeComponent {

    public photos: Array<Photo>;
    public server: Server;
    public photoId: number;
    public photoUrl: string;
    public photoCreated: string;
    public selectedPhoto: Photo;
    public selectedId: number; 

    /**
     * Creates an instance of HomeComponent.
     * @param {ChangeDetectorRef} _changeDetectionRef 
     * @param {Data} data 
     * @param {Router} router 
     * @memberof HomeComponent
     */
    constructor(private _changeDetectionRef: ChangeDetectorRef, private data: Data, private router: Router) {
        
        this.photoId = 0;
        this.server = new Server();
    }

    /**
     * 
     * 
     * @param {any} args 
     * @memberof HomeComponent
     */
    refreshFeed(args) {
        this.photos = this.server.getPublicPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    }

    /**
     * 
     * 
     * @memberof HomeComponent
     */
    stackLoaded = function(args) {
        this.refreshFeed(null);
    }


    /**
     * 
     * 
     * @param {number} photoId 
     * @memberof HomeComponent
     */
    selectPhoto(photoId: number) {
        var selectedPhoto;
        var promise = new Promise((resolve, reject) => {
            selectedPhoto = this.photos.find(i => i.id === photoId);
            this.server.getEventOwner(selectedPhoto.eventId).then((r) => {
                resolve(r);
            }).catch(() => {
                reject();
            })

        });
        promise.then((owner) => {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "photoId" : photoId,
                    "url" : selectedPhoto.url,
                    "created" : selectedPhoto.created,
                    "photoOwner" : selectedPhoto.userId,
                    "eventOwner" : owner,
                    "eventId" : selectedPhoto.eventId,
                    "description" : selectedPhoto.description,
                    "ownerName" : selectedPhoto.userName,
                    "fileName" : selectedPhoto.fileName,
                    "albumPath" : selectedPhoto.albumPath
                }
            };
            this.router.navigate(["/photoView"], navigationExtras);
        }).catch(() => {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "photoId" : photoId,
                    "url" : selectedPhoto.url,
                    "created" : selectedPhoto.created,
                    "photoOwner" : selectedPhoto.userId,
                    "eventOwner" : null,
                    "eventId" : selectedPhoto.eventId,
                    "description" : selectedPhoto.description,
                    "ownerName" : selectedPhoto.userName,
                    "fileName" : selectedPhoto.fileName,
                    "albumPath" : selectedPhoto.albumPath
                }
            };
            this.router.navigate(["/photoView"], navigationExtras);
        })

    }

}