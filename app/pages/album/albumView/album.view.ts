import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { RouterExtensions } from "nativescript-angular";
import { Photo } from "../../../shared/Photo";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Data } from "../../../shared/Data";


@Component({
    templateUrl: "./pages/album/albumView/album.view.html",
    styleUrls: [ "./pages/album/albumView/album.view.css" ]
})
export class AlbumViewComponent {

    public albumPhotos: Array<Photo>;
    public albumId: string;
    public albumName: string;
    public server: Server;

    constructor(private route: ActivatedRoute, private router: Router, private data: Data) {
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
        console.log("You clickes " + photoId);
        var selectedPhoto: Photo = this.albumPhotos.find(i => i.id === photoId)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "photoId" : photoId,
                "url" : selectedPhoto.url,
                "created" : selectedPhoto.created,
                "photoOwner" : selectedPhoto.userId,
                "eventOwner" : null
            }
        };
        this.router.navigate(["/photoView"], navigationExtras);
    }

}