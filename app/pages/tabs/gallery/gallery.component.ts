import { Component, ChangeDetectorRef } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { Params } from "@angular/router/src/shared";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");

@Component({
    selector: "gallery-tab",
    templateUrl: "./pages/tabs/gallery/gallery.tab.html"
})
export class GalleryComponent {

    items = [];

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    openGallery() {
        console.log(this.getTimeStamp());
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
                    _that.uploadPhoto(selected.fileUri);
                }
            ); 
                _that.items = selection;
                _that._changeDetectionRef.detectChanges(); 
            }).catch(function(e) {
                console.log(e);
            })
    }

    private uploadPhoto(fileUrl: string) {
        var fileName = this.getTimeStamp();
        var request = {
            url: "http://188.166.127.207:8888/Server.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": fileName
            },
            description: "{ 'uploading': 'bigpig.jpg' }"
        };

        var task = session.uploadFile(fileUrl, request);

        task.on("progress", logEvent);
        task.on("error", logEvent);
        task.on("complete", logEvent);

        this.updateDb(fileName);
 
        function logEvent(e) {
            console.log(e.eventName);       
        }       

    }

    private updateDb(fileName: string) {
        var result;
        var name = "img" + fileName + ".jpg";
        http.request({
            url: "http://188.166.127.207:5555/api.php/files",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ user_Id : "13", file_Name : name, file_URL : name, 
            file_Permission : "Public"})
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
        }, function(e) {
            console.log("Error occured " + e);
        });

    }

    private getTimeStamp() {
        var date = new Date(); 
        var string = date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString()
            + date.getHours().toString() + date.getMinutes().toString() +
            + date.getSeconds().toString() + date.getMilliseconds().toString();
        return string;
    }


}