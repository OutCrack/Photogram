import { Component } from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { RouterExtensions } from "nativescript-angular";
import { Photo } from "../../../shared/Photo";
import { ActivatedRoute, Router } from "@angular/router";
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
    }

    onCamera() {
        console.log("Camera tapped.");
        this.router.navigate(["/image", this.albumId]);
        //Kjører kamera funksjon------
    }

}