import { Component } from "@angular/core";
import { Data } from "../../../shared/Data";
import { Server } from "../../../shared/Server/Server";
import { RouterExtensions } from "nativescript-angular";


@Component({
    templateUrl: "./pages/album/newAlbum/album.html",
    styleUrls: [ "./pages/album/newAlbum/album.component.css" ]
})
export class AlbumComponent {

    public album: any;
    public public: boolean;
    public server: Server;

    constructor(private data: Data, private routerExtensions: RouterExtensions) {
        this.server = new Server();
        this.album = {
            name : "",
            description: ""
        };
        this.public = true;
    }

    changePrivacy() {
        this.public = !this.public;
    }

    saveAlbum() {
        if (this.album.name.length > 0) {
            this.server.saveAlbum(this.data.storage["id"] , this.album.name, this.public, this.album.description).then(() => {
                this.routerExtensions.back();})
        } else {
            alert("Album name can't be empty");
        }
        
    }
}