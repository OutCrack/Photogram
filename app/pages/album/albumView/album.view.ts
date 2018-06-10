import { Component, OnInit } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { RouterExtensions } from "nativescript-angular";
import { Photo } from "../../../shared/Photo";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Data } from "../../../shared/Data";
import * as dialogs from "ui/dialogs";


/**
 * 
 * 
 * @export
 * @class AlbumViewComponent
 */
@Component({
    templateUrl: "./pages/album/albumView/album.view.html",
    styleUrls: [ "./pages/album/albumView/album.view.css" ]
})
export class AlbumViewComponent {

    public albumPhotos: Array<Photo>;
    public albumId: number;
    public albumName: string;
    public server: Server;

    /**
     * Creates an instance of AlbumViewComponent.
     * @param {RouterExtensions} routerExtensions 
     * @param {ActivatedRoute} route 
     * @param {Router} router 
     * @param {Data} data 
     * @memberof AlbumViewComponent
     */
    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private router: Router, private data: Data) {
        this.server = new Server();
        this.route.params.subscribe((params) => {
            this.albumId = params["albumId"];
        });
    }

    /**
     * 
     * 
     * @memberof AlbumViewComponent
     */
    stackLoaded = function(args) {
        this.albumPhotos = this.server.getAlbumPhotos(this.albumId);
        this.server.getAlbumName(this.albumId).then((r) => {
            this.albumName = r;
        });
    }

    onBackButtonTap() {
        this.routerExtensions.backToPreviousPage();
    }

    /**
     * 
     * 
     * @param {number} photoId 
     * @memberof AlbumViewComponent
     */
    selectPhoto(photoId: number) {
        var selectedPhoto: Photo = this.albumPhotos.find(i => i.id === photoId)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "photoId" : photoId,
                "url" : selectedPhoto.url,
                "created" : selectedPhoto.created,
                "photoOwner" : selectedPhoto.userId,
                "eventOwner" : null,
                "eventId" : null,
                "description" : selectedPhoto.description,
                "ownerName" : selectedPhoto.userName,
                "fileName" : selectedPhoto.fileName,
                "albumPath" : selectedPhoto.albumPath
            }
        };
        this.router.navigate(["/photoView"], navigationExtras);
    }

    /**
     * 
     * 
     * @memberof AlbumViewComponent
     */
    onDeleteAlbum() {
        dialogs.confirm({
            title: "Are you sure you want to delete this album?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this.server.deleteAlbum(this.albumId, this.data.storage["id"], this.albumName);
                dialogs.alert("Album deleted").then(()=> {
                    this.routerExtensions.back();
                })
            }
        });
    }

    /**
     * 
     * 
     * @memberof AlbumViewComponent
     */
    onCamera() {
        var navigationExtras = {
            queryParams: {
                "albumId" : this.albumId
            }
        };
        this.router.navigate(["/image"], navigationExtras);
    }

}