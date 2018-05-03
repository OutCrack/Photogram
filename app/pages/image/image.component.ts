import { Component, ChangeDetectorRef  } from "@angular/core";
import { Server } from "../../shared/Server/Server"
import { Image } from "ui/image";
import * as imagepicker from "nativescript-imagepicker";
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
    public id: number;
    public items: any;

    public constructor(private data: Data, private _changeDetectionRef: ChangeDetectorRef) {
        this.server = new Server();
        this.picture = "https://placehold.it/";
        this.items = [];
    }

    public takePicture() {
        camera.requestPermissions();
        camera.takePicture().then(picture => {
            this.picture = picture;
            if (app.android) {
                this.source = picture["_android"]; 
            }
            else {
                var path: string = (picture["_ios"]).toString();
                console.log(path);
                this.source = path.slice(25,69);
            }   
        });
    }

    chooseFromFile() {
        this.id = this.data.storage["id"];
        console.log("Id " + this.id);
        let context = imagepicker.create({
            mode: "single" //"multiple"
        });
        this.startSelecting(context);
    }

    private startSelecting(context) {
        let _that = this;
        console.log("in Gallery constructor");
        context
            .authorize() 
            .then(function() {
                _that.items = [];
                return context.present();
            })
            .then((selection) => {
                selection.forEach(function(selected) {
                    console.log("----------------");
                    console.log("uri: " + selected.uri);
                    console.log("fileUri: " + selected.fileUri);
                    _that.picture = selected
                    _that.source = selected.fileUri;
                    //_that.server.uploadPhoto(selected.fileUri, this.id);
                }
            ); 
                _that.items = selection;
                _that._changeDetectionRef.detectChanges(); 
            }).catch(function(e) {
                console.log(e);
            })
    }
    
    public uploadPicture() {
        console.log("Uploading " + this.source + " user id " + this.data.storage["id"]);
        this.server.uploadPhoto(this.source, this.id)
    }
}