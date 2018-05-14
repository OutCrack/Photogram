import { Component, ChangeDetectorRef } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
var http = require("http");
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { Data } from "../../../shared/Data";
import { Photo } from "../../../shared/Photo";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";
import { Comment } from "../../../shared/Comment";
import { User } from "../../../shared/User";
import { Router } from '@angular/router';
import { Album } from"../../../shared/Album";

@Component({
    selector: "gallery-tab",
    templateUrl: "./pages/tabs/gallery/gallery.tab.html",
    styleUrls: [ "./pages/tabs/gallery/gallery.tab.css" ]
})
export class GalleryComponent {

    public picture: any;
    items = [];
    public id: any;
    public selected: boolean;
    site: string = "http://188.166.127.207:5555/api.php/";
    public photos: boolean;
    public myPhotos: Array<Photo>;
    public photoUrl: string;
    public photoCreated: string;
    public myEvents: Array<Event>;
    public participEvents: Array<Event>;
    public photoId: number;
    public username: string;
    public photoDescription: string;
    public photoComments: Array<Comment>;
    public server: Server;
    public mEvents: boolean;
    public participants: Array<User>
    public eventSelected: boolean;
    public selectedPhoto: Photo;
    public selectedId: number;
    public myAlbums: Array<Album>;

    stackLoaded = function(args) {
        console.log("Stack Loaded");
        this.myAlbums = this.server.getAlbums(this.data.storage["id"]);
    }

    constructor(private router: Router, private _changeDetectionRef: ChangeDetectorRef, private data: Data) {
        //this.getPhotos();
        this.selected = false;
        console.log("In gallery constructor"); 
        this.server = new Server();
        this.mEvents = false;
        this.photos = false;
        this.eventSelected = false;
        this.participants = [];
    }

    public selectAlbum(albumId: number) {
        console.log("You tapped " + albumId);
        this.router.navigate(["/albumView", albumId]);
    }

    public getPhotos() {
        if (this.photos) {
            this.photos = false;
        }
        else {
            this.photos = true;
            this.id = this.data.storage["id"];
        this.myPhotos = new Array();
        var query: string = this.site + "files?transform=1&filter=user_Id,eq," + this.id + "&order=created_at,desc";
        http.getJSON(query)
        .then((r) => {
            //testing
            console.log("Files length is " + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                this.myPhotos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + this.id + "/" + r.files[i].file_URL, //need to adjust when photo is in event catalog
                        this.id,
                        r.files[i].created_at,
                        r.files[i].file_Description,
                        r.files[i].album_Id,
                        r.files[i].file_Name,
                        r.files[i].event_Id
                    )
                )
                console.log("There are " + this.myPhotos.length + " photos in my photos");
            }
        }, function (e) {
            console.log(e);
        }).then(() => {
            //testing
            console.log("There are " + this.myPhotos.length + " photos in my photos");
        })
        }
    }

    public removePhoto(photoId: number, fileName: string) {
        console.log(photoId);
        console.log(fileName);
        this.server.removePhoto(photoId).then(()=> {
            this.server.deletePhoto(this.data.storage["id"], fileName, "photo", photoId);
            this.photos = false;
            this.getPhotos();
        }).catch(() => {
            alert("Error deleting photo. Please try again later");
        });
    }

    selectPhoto(args: GestureEventData) {
        this.selected = true;
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
        this.selectedId = parseInt(args.view.id);
        this.getPhoto(this.selectedId);
    }

    getPhoto(id: number) {
        this.selectedPhoto = this.myPhotos.find(i => i.id === id);
        this.username = this.selectedPhoto .user.firstN + " " + this.selectedPhoto .user.lastN;
        this.photoId = this.selectedPhoto .id;
        this.photoUrl = this.selectedPhoto .url;
        this.photoCreated = this.selectedPhoto .created;
        this.photoDescription = this.selectedPhoto .description;
        this.photoComments = this.selectedPhoto .comments;
        this.server.getLikes(this.photoId, this.data.storage["id"]).then((result) => {
            this.selectedPhoto.likes = this.selectedPhoto.likes = parseInt(JSON.stringify(result));
        }).catch((reject) => {
            this.selectedPhoto.likes = this.selectedPhoto.likes = parseInt(JSON.stringify(reject));
        });
    }

    closePhoto() {
        this.selected = false;
        this.selectedPhoto = null;
        this.photoUrl = "";
        this.photoCreated = "";
        this.selectedId = 0;
    }

    /*addComment(result) {
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        } else {
            var commentId = this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            //var comment = new Comment(commentId, this.data.storage["id"], result.text);
            //comment.rights = true;
            //this.photoComments.push(comment);
            this.getPhoto(this.selectedId);
            this.selectedPhoto.getComments().then(() => {
                this.photoComments = this.selectedPhoto.comments;
            }); }
        result.text = "";
    }*/

    removeComment(commentId) {
        console.log("You click comment id " + commentId);
        var promise = new Promise((resolve, reject) => {
            this.server.removeComment(commentId);
            this.getPhoto(this.selectedId);
            resolve();
        });
        promise.then(() => {
            this.selectedPhoto.getComments().then(() => {
                this.photoComments = this.selectedPhoto.comments;
            }); 
        });
    }

    getEvents() {
        this.mEvents = !this.mEvents;
        if (this.mEvents) {
            this.participEvents = this.server.getMyEvents(this.data.storage["id"], "User");
            console.log("Events " + this.participEvents.length);
        }
    }

    newEvent(){
        console.log("New Event tapped");
        //this.router.navigate(["/e svent"]);
    }

    openGallery() {
        this.id = this.data.storage["id"];
        console.log(this.getTimeStamp());
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
                "Path" : "users/",
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
        console.log("The id " + this.id);
        http.request({
            url: "http://188.166.127.207:5555/api.php/files/",
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
        var string = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString()
            + date.getHours().toString() + date.getMinutes().toString() +
            + date.getSeconds().toString() + date.getMilliseconds().toString();
        return string;
    }

    selectEvent(args: GestureEventData) {
        var eventId = parseInt(args.view.id);
        this.participants = this.server.getEventParticipants(eventId);
        console.log("Event id " + eventId);
        console.log("Participants " + this.participants.length);
        this.eventSelected = !this.eventSelected;
    }

    leaveEvent(eventId: number) {
        console.log("Evnet id tapped " + eventId + " user id " + this.data.storage["id"]);
        this.server.leaveEvent(eventId, this.data.storage["id"]);
        alert("Event removed");
        this.mEvents = false;
        this.getEvents();
    }
}