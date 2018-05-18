import { Component, ChangeDetectorRef  } from "@angular/core";
import { Server } from "../../shared/Server/Server"
import { Image } from "ui/image";
import * as imagepicker from "nativescript-imagepicker";
import { Data } from "../../shared/Data";
import * as camera from "nativescript-camera";
import observable = require("data/observable");
import pages = require("ui/page");
import * as fs from "file-system";
import * as app from "tns-core-modules/application";
import { ImageSource } from "tns-core-modules/image-source/image-source";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
const imageSourceModule = require("tns-core-modules/image-source");
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");

@Component({
    selector: "imageview",
    templateUrl: "./pages/new-image/image.xml",
    styleUrls: ["./pages/new-image/image.css" ]
})



export class ImageComponent {

    public picture: any;
    public server: Server;
    public source: any;
    public id: number;
    public items: any;
    public albumId;
    public albumName;
    public pictureSelected: boolean;
    public details: any;
    public eventId;
    public eventPrivacy;

    public constructor(private routerExtensions: RouterExtensions, private data: Data, private _changeDetectionRef: ChangeDetectorRef, private route: ActivatedRoute) {
        this.server = new Server();
        this.pictureSelected = false;
        this.route.queryParams.subscribe(params => {
            alert("IM IPIcture view " + JSON.stringify(params));
            this.eventId = params["eventId"];
            this.albumId = params["albumId"];
            this.eventPrivacy = params["eventPrivacy"];
        })
        console.log("The album id is " + this.albumId);
        if (this.albumId == null) {
            console.log("ISSSS NUUUUUL");
        } 
        this.picture = "https://placehold.it/";
        this.items = [];
        this.details = [];
    }

    //fix uploading for ios
    public takePicture() {
        camera.requestPermissions();
        camera.takePicture().then(picture => {
            this.pictureSelected = true;
            this.picture = picture;
            if (app.android) {
                this.source = picture["_android"]; 
            }
            else {
                this.source = picture["_ios"];
                /*var imageSource = new ImageSource.fromAsset(picture);
                var folder = fs.knownFolders.documents().path;
                var path = fs.path.join(folder, "Photo.png");
                var saved = imageSource.saveToFile(path, "png");
                console.log("Saved? " + saved);
                this.source = folder + "/Photo.png"
                var path: string = (picture["_ios"]).toString();
                console.log(path);
                this.source = picture
                console.log("SOURCE" + JSON.stringify(this.source));*/
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
                this.pictureSelected = true;
            }).catch(function(e) {
                console.log(e);
            })
    }
    
    public uploadPicture() {
        var promise = new Promise((resolve, reject) => {
            if (this.albumId != null) {
                this.server.getAlbumName(this.albumId).then((res) => {
                    var name = JSON.stringify(res);
                    var albumName = name.slice(1, name.length - 1);
                    console.log("Album " + albumName);
                    console.log("Uploading " + this.source + " user id " + this.data.storage["id"]);
                    this.server.getAlbumRights(this.albumId).then(() => {
                        this.server.uploadPhoto(this.source, this.data.storage["id"], this.albumId, albumName, "Public", this.details.description, this.details.location);
                    }).catch(() => {
                        this.server.uploadPhoto(this.source, this.data.storage["id"], this.albumId, albumName, "Private", this.details.description, this.details.location);
                    })
                }).catch(() => {
                    var albumName = this.data.storage["firstName"] + "'s album";
                    this.server.getFeedId(this.data.storage["id"]).then((r) => {
                        console.log("Album name to upload " + albumName);
                        console.log("The album id is " + JSON.stringify(r));
                        this.server.uploadPhoto(this.source, this.data.storage["id"], parseInt(JSON.stringify(r)), albumName, "Public", this.details.description, this.details.location);
                    })
                    
                })}
                else {
                    this.server.uploadEventPhoto(this.source, this.data.storage["id"], this.eventId, this.eventPrivacy, this.details.description, this.details.location);
                }
                resolve();
        })
        promise.then(()=> {
            this.pictureSelected = false;
            this.routerExtensions.back();
        })
        
    }
}