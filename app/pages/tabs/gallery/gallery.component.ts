import { Component,} from "@angular/core";
import { Server } from "../../../shared/Server/Server";
import { Router } from '@angular/router';
import { Album } from"../../../shared/Album";
import { Data } from "../../../shared/Data";

/**
 * 
 * 
 * @export
 * @class GalleryComponent
 */
@Component({
    selector: "gallery-tab",
    templateUrl: "./pages/tabs/gallery/gallery.tab.html",
    styleUrls: [ "./pages/tabs/gallery/gallery.tab.css" ]
})
export class GalleryComponent {

    public server: Server;
    public myAlbums: Array<Album>;

    /**
     * 
     * 
     * @memberof GalleryComponent
     */
    stackLoaded = function(args) {
        this.myAlbums = this.server.getAlbums(this.data.storage["id"]);
    }

    /**
     * Creates an instance of GalleryComponent.
     * @param {Router} router 
     * @param {Data} data 
     * @memberof GalleryComponent
     */
    constructor(private router: Router, private data: Data) {
        this.server = new Server();
    }

    /**
     * 
     * 
     * @param {number} albumId 
     * @memberof GalleryComponent
     */
    public selectAlbum(albumId: number) {
        this.router.navigate(["/albumView", albumId]);
    }

}