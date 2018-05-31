import { Component, OnInit } from "@angular/core";
import { Data } from "../../../shared/Data";
import { Server } from "../../../shared/Server/Server";
import { RouterExtensions } from "nativescript-angular";
import { Router } from "@angular/router";

/**
 * 
 * 
 * @export
 * @class AlbumComponent
 */
@Component({
    templateUrl: "./pages/album/newAlbum/album.html",
    styleUrls: [ "./pages/album/newAlbum/album.component.css" ]
})
export class AlbumComponent {

    public album: any;
    public public: boolean;
    public server: Server;

    /**
     * Creates an instance of AlbumComponent.
     * @param {Data} data 
     * @param {RouterExtensions} routerExtensions 
     * @memberof AlbumComponent
     */
    constructor(private data: Data, private routerExtensions: RouterExtensions, private router: Router) {
        this.server = new Server();
        this.album = {
            name : "",
            description: ""
        };
        this.public = true;
    }

    onBackButtonTap() {
        this.routerExtensions.backToPreviousPage();
    }

    /**
     * 
     * 
     * @memberof AlbumComponent
     */
    changePrivacy() {
        this.public = !this.public;
    }

    /**
     * 
     * 
     * @memberof AlbumComponent
     */
    saveAlbum() {
        if (this.album.name.length > 0) {
            this.server.saveAlbum(this.data.storage["id"] , this.album.name, this.public, this.album.description).then(() => {
                this.routerExtensions.back();})
        } else {
            alert("Album name can't be empty");
        }
        
    }
}