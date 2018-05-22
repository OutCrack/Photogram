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
var plugin = require("nativescript-screenshot");
var image = require("ui/image");
var stackLayout, photo;

/**
 * 
 * 
 * @export
 * @class ImageComponent
 */
@Component({
    selector: "imageview",
    templateUrl: "./pages/new-image/image.html",
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

    /**
     * Creates an instance of ImageComponent.
     * @param {RouterExtensions} routerExtensions 
     * @param {Data} data 
     * @param {ChangeDetectorRef} _changeDetectionRef 
     * @param {ActivatedRoute} route 
     * @memberof ImageComponent
     */
    public constructor(private routerExtensions: RouterExtensions, private data: Data, 
        private _changeDetectionRef: ChangeDetectorRef, private route: ActivatedRoute) {

        this.server = new Server();
        this.pictureSelected = false;
        this.route.queryParams.subscribe(params => {
            this.eventId = params["eventId"];
            this.albumId = params["albumId"];
            this.eventPrivacy = params["eventPrivacy"];
        })
        this.picture = "https://placehold.it";
        this.items = [];
        this.details = [];
    }

    /**
     * 
     * 
     * @memberof ImageComponent
     */
    stackLoaded = function(args) {
        stackLayout = args.object;
        photo = stackLayout.getElementById("picture");
     }

    /**
     * 
     * 
     * @memberof ImageComponent
     */
    public takePicture() {
        camera.requestPermissions();
        camera.takePicture().then(picture => {
            this.pictureSelected = true;
            this.picture = picture;
            if (app.android) {
                this.source = picture["_android"]; 
            }
            else {
                var promise = new Promise((resolve, reject)=> {
                    var img = new image.Image();
                    var imageSource = plugin.getImage(photo);
                    img.imageSource = imageSource;
                    var folder = fs.knownFolders.documents().path;
                    var path = fs.path.join(folder, "Photo.png");
                    var saved = imageSource.saveToFile(path, "png");
                    console.log("Saved?" + saved);
                    resolve(folder + "/Photo.png");
                    });
                    promise.then((file) => {
                        var path: string = JSON.stringify(file);
                        this.source = path.slice(1, path.length - 1);
                    });  
            }   
        });  
    }

    /**
     * 
     * 
     * @memberof ImageComponent
     */
    chooseFromFile() {
        this.id = this.data.storage["id"];
        let context = imagepicker.create({
            mode: "single" //"multiple"
        });
        this.startSelecting(context);
    }

    /**
     * 
     * 
     * @private
     * @param {any} context 
     * @memberof ImageComponent
     */
    private startSelecting(context) {
        let _that = this;
        context
            .authorize() 
            .then(function() {
                _that.items = [];
                return context.present();
            })
            .then((selection) => {
                selection.forEach(function(selected) {
                    _that.picture = selected
                    _that.source = selected.fileUri;
                }
            ); 
                _that.items = selection;
                _that._changeDetectionRef.detectChanges(); 
                this.pictureSelected = true;
            }).catch(function(e) {
                console.log(e);
            })
    }
    
    /**
     * 
     * 
     * @memberof ImageComponent
     */
    public uploadPicture() {
        var promise = new Promise((resolve, reject) => {
            if (this.albumId != null) {
                this.server.getAlbumName(this.albumId).then((res) => {
                    var name = JSON.stringify(res);
                    var albumName = name.slice(1, name.length - 1);
                    this.server.getAlbumRights(this.albumId).then(() => {
                        this.server.uploadPhoto(this.source, this.data.storage["id"], this.albumId, 
                        albumName, "Public", this.details.description, this.details.location);
                    }).catch(() => {
                        this.server.uploadPhoto(this.source, this.data.storage["id"], this.albumId, 
                        albumName, "Private", this.details.description, this.details.location);
                    })
                }).catch(() => {
                    var albumName = this.data.storage["firstName"] + "'s album";
                    this.server.getFeedId(this.data.storage["id"]).then((r) => {
                        this.server.uploadPhoto(this.source, this.data.storage["id"], 
                        parseInt(JSON.stringify(r)), albumName, "Public", this.details.description, this.details.location);
                    })
                    
                })}
                else {
                    this.server.uploadEventPhoto(this.source, this.data.storage["id"], this.eventId, 
                    this.eventPrivacy, this.details.description, this.details.location);
                }
                resolve();
        })
        promise.then(()=> {
            this.pictureSelected = false;
            this.routerExtensions.back();
        })
        
    }
}