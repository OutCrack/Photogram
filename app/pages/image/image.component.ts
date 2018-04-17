import { Component } from "@angular/core";
import { Server } from "../../shared/Server/Server"
import { Image } from "ui/image";
import { Data } from "../../shared/Data";
import * as camera from "nativescript-camera";
import observable = require("data/observable");
import pages = require("ui/page");
import * as app from "tns-core-modules/application";
import { ImageSource } from "tns-core-modules/image-source/image-source";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");

@Component({
    selector: "imageview",
    templateUrl: "./pages/image/image.xml"
})



export class ImageComponent {

    public picture: any;
    public server: Server;
    public source: any;

    public constructor(private data: Data) {
        this.server = new Server();
        this.picture = "https://placehold.it/200x200";
    }

    public takePicture() {
        camera.requestPermissions();
        camera.takePicture().then(picture => {
            this.picture = picture;
            if (app.android) {
                this.source = picture["_android"]; 
            }
            else {
                this.source = picture["_ios"];
            }   
        });
    }
    
    public uploadPicture() {
        console.log("Uploading " + this.source + " user id " + this.data.storage["id"]);
        this.server.uploadPhoto(this.source, this.data.storage["id"])
    }
}