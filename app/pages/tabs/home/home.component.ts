import { Component, ChangeDetectorRef } from "@angular/core";
import { Photo } from "../../../shared/Photo";
import { User } from "../../../shared/User";
import { Server } from "../../../shared/Server/Server";
import { Comment } from "../../../shared/Comment";
var http = require("http");
import { registerElement } from "nativescript-angular/element-registry";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { Data } from "../../../shared/Data";
import { TextField } from "ui/text-field";

registerElement("PullToRefresh" , ()=> require("nativescript-pulltorefresh").PullToRefresh);
 
@Component({
    selector: "home-tab",
    templateUrl: "./pages/tabs/home/home.tab.html",
    styleUrls: [ "./pages/tabs/home/home.tab.css" ]
})

export class HomeComponent {
    site: string = "http://188.166.127.207:5555/api.php/";
    //for storing fetched photos
    public photos: Array<Photo>;
    public server: Server;
    public selected: boolean;
    public photoId: number;
    public photoUrl: string;
    public photoCreated: string;
    public username: string;
    public photoDescription: string;
    public photoComments: Array<Comment>;
    public userId: number;

    constructor(private _changeDetectionRef: ChangeDetectorRef, private data: Data) {
        console.log("In home constructor");
        this.getPhotos();
        this.selected = false;
        this.photoId = 0;
        this.server = new Server();
    }

    refreshFeed(args) {
        this.getPhotos();
        var pullRefresh = args.object;
        setTimeout(function() {
            pullRefresh.refreshing = false;
        }, 1000);
        
    }
    //get photos from db, put them in photos array
    getPhotos() {
        //var _server = new Server();
        //this.photos = _server.getPublicPhotos();
        //console.log("Have " + this.photos.length + " photos");
        
        //testing
        //console.log("In getPhotos");
        this.photos = new Array();
        //get public photos that are not connected to a event, are not in an album and are max 2 days old
        var limitDate: string = getLimitDate();
        var query: string = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&filter[]=created_at,gt," + limitDate +"&filter[]=album_Name,is,null&order=created_at,desc";
        console.log("LIMIT DATE IN QUERY " + query);
        http.getJSON(query)
        .then((r) => {
            //testing
            //console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                this.photos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + r.files[i].user_Id +"/" + r.files[i].file_URL,
                        r.files[i].user_Id,
                        (r.files[i].created_at).slice(0,10),
                        r.files[i].file_Description
                    )
                )
                //testing
                //console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(() => {
            //testing
            //console.log("There are " + this.photos.length + " photos in photos");
        })

        //get string that represents the day before yesterday
        function getLimitDate() {
            var date = new Date();
            console.log("Date is " + date.toDateString());
            date.setDate(date.getDate()-1);
            var dateString = date.getFullYear() + "-";
            var month: number = date.getMonth() + 1;
            if (month < 10) {
                dateString += "0" + month;
            } else {
                dateString += date.getMonth();
            }
            dateString += "-";
            if (date.getDay() < 10) {
                dateString += "0" + date.getDay();
            } else {
                dateString += date.getDay();
            }
            console.log("The date " + dateString);
            return dateString;
        }
       
    }

    selectPhoto(args: GestureEventData) {
        this.selected = true;
        console.log("The id is " + args.view.id);
        console.log("The event name is " + args.eventName);
        var photo: Photo = this.photos.find(i => i.id === parseInt(args.view.id));
        this.username = photo.user.firstN + " " + photo.user.lastN;
        this.photoId = photo.id;
        this.photoUrl = photo.url;
        this.photoCreated = photo.created;
        this.photoDescription = photo.description;
        this.photoComments = photo.comments;
    }

    closePhoto() {
        this.selected = false;
        this.photoUrl = "";
        this.photoCreated = "";
    }

    addComment(result) {
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        } else {
            this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            this.photoComments.push(
                new Comment(this.data.storage["id"], result.text)
            );
            result.text = "";
        }
    }

}