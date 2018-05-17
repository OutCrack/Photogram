import { Component,} from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Router } from '@angular/router';
import { Album } from"../../../shared/Album";
import { Data } from "../../../shared/Data";

@Component({
    selector: "gallery-tab",
    templateUrl: "./pages/tabs/gallery/gallery.tab.html",
    styleUrls: [ "./pages/tabs/gallery/gallery.tab.css" ]
})
export class GalleryComponent {

    public server: Server;
    public myAlbums: Array<Album>;

    stackLoaded = function(args) {
        this.myAlbums = this.server.getAlbums(this.data.storage["id"]);
    }

    constructor(private router: Router, private data: Data) {
        this.server = new Server();
    }

    public selectAlbum(albumId: number) {
        this.router.navigate(["/albumView", albumId]);
    }

}