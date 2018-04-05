import { Component, ChangeDetectorRef } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");
import { Data } from "../../../shared/Data";

@Component({
    selector: "gallery-tab",
    templateUrl: "./pages/tabs/gallery/gallery.tab.html"
})
export class GalleryComponent {

    items = [];
    public id: any;

    constructor(private _changeDetectionRef: ChangeDetectorRef, private data: Data) {
    }

    openGallery() {
        this.id = this.data.storage["id"];
        console.log(this.getTimeStamp());
        console.log("Id" + this.id);
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
        var that = this;
        var request = {
            url: "http://188.166.127.207:8888/Server.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": fileName,
                "User-id": this.id
            },
            description: "{ 'uploading': fileUrl }"
        };

        var task = session.uploadFile(fileUrl, request);

        task.on("progress", logEvent);
        task.on("error", logEvent);
        //only when uploading is complete, update the database
        task.on("complete", logEvent); 
 
        function logEvent(e) {
            if (e.eventName == "complete") {
                that.updateDb(fileName);
                alert("Upload complete");
            }
            console.log(e.eventName);       
        }  

    }

    private updateDb(fileName: string) {
        var result;
        var name = "img" + fileName + ".jpg";
        http.request({
            //testing on wrong port nr, checking if it will update db
            url: "http://188.166.127.207:5555/api.php/files/13",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //put file url instead of just name
            content: JSON.stringify({ user_Id : this.id, file_Name : name, file_URL : name, 
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