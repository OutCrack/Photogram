import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { RouterExtensions } from "nativescript-angular";
import { Photo } from "../../../shared/Photo";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Data } from "../../../shared/Data";
import * as dialogs from "ui/dialogs";


@Component({
    templateUrl: "./pages/album/albumView/album.view.html",
    styleUrls: [ "./pages/album/albumView/album.view.css" ]
})
export class AlbumViewComponent {

    public albumPhotos: Array<Photo>;
    public albumId: number;
    public albumName: string;
    public server: Server;

    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private router: Router, private data: Data) {
        this.server = new Server();
        this.route.params.subscribe((params) => {
            this.albumId = params["albumId"];
        });
    }

    stackLoaded = function(args) {
        console.log("Stack Loaded");
        this.albumPhotos = this.server.getAlbumPhotos(this.albumId);
        this.server.getAlbumName(this.albumId).then((r) => {
            var name = JSON.stringify(r);
            this.albumName = name.slice(1, name.length - 1);
        });
    }

    onCamera() {
        console.log("Camera tapped.");
        this.router.navigate(["/image", this.albumId]);
        //Kjører kamera funksjon------
    }

    selectPhoto(photoId: number) {
        console.log("You clicked " + photoId);
        var selectedPhoto: Photo = this.albumPhotos.find(i => i.id === photoId)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "photoId" : photoId,
                "url" : selectedPhoto.url,
                "created" : selectedPhoto.created,
                "photoOwner" : selectedPhoto.userId,
                "eventOwner" : null,
                "description" : selectedPhoto.description,
                "ownerName" : selectedPhoto.user.firstN + " " + selectedPhoto.user.lastN,
                "fileName" : selectedPhoto.fileName,
                "albumPath" : selectedPhoto.albumPath
            }
        };
        this.router.navigate(["/photoView"], navigationExtras);
    }

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

}