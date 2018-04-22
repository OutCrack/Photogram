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
    public selectedPhoto: Photo;
    public canGiveLike: boolean;

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
        var query: string = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&filter[]=album_Id,not,null&filter[]=created_at,gt," + limitDate + "&order=created_at,desc";
        console.log("LIMIT DATE IN QUERY " + query);
        http.getJSON(query)
        .then((r) => {
            //testing
            //console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("album id " + r.files[i].album_Id);
                this.photos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + r.files[i].user_Id + r.files[i].file_URL,
                        r.files[i].user_Id,
                        (r.files[i].created_at).slice(0,10),
                        r.files[i].file_Description,
                        r.files[i].album_Id,
                        r.files[i].file_Name
                    )
                )
                //testing
                //console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        });

        /*function getAlbumName(albumId: number, site: string) {
            var albumName = "";
        if (albumId != null) {
            var albumQuery = site + "albums?transform=1&filter=album_Id,eq," + albumId;
            console.log("QQQQQQQQQ" + albumQuery);
            http.getJSON(albumQuery)
            .then((res) => {
                albumName += res.albums[0].album_Name;
            }, function(e) { console.log(e);});
            var replace = / /gi;
            albumName = "/" + albumName.replace(replace, "%20");
        }
            return albumName;
        }*/

        //get string that represents the day before yesterday
        function getLimitDate() {
            var date = new Date();
            console.log("Date is " + date.toDateString());
            date.setDate(date.getDate()-2);
            console.log("Date new date is " + date.toDateString());
            var dateString = date.getFullYear() + "-";
            var month: number = date.getMonth() + 1;
            if (month < 10) {
                dateString += "0" + month;
            } else {
                dateString += date.getMonth();
            }
            dateString += "-";
            console.log("Day " + date.getDate())
            if (date.getDay() < 10) {
                dateString += "0" + date.getDate();
            } else {
                dateString += date.getDate();
            }
            console.log("The date " + dateString);
            return dateString;
        }
       
    }

    selectPhoto(args: GestureEventData) {
        this.getPhoto(parseInt(args.view.id))
        /*this.selected = true;
        this.userId = this.data.storage["id"];
        //testing
        //console.log("The id is " + args.view.id);
        //console.log("The event name is " + args.eventName);
        this.selectedPhoto = this.photos.find(i => i.id === parseInt(args.view.id));
        this.username = this.selectedPhoto.user.firstN + " " + this.selectedPhoto.user.lastN;
        this.photoId = this.selectedPhoto.id;
        this.photoUrl = this.selectedPhoto.url;
        this.photoCreated = this.selectedPhoto.created;
        this.photoDescription = this.selectedPhoto.description;
        this.photoComments = this.selectedPhoto.comments;
        this.checkCommentRights();
        console.log("URL " + this.photoUrl);*/
    }

    getPhoto(id: number) {
        this.selected = true;
        this.userId = this.data.storage["id"];
        //testing
        //console.log("The id is " + args.view.id);
        //console.log("The event name is " + args.eventName);
        this.selectedPhoto = this.photos.find(i => i.id === id);
        this.server.getLikes(this.selectedPhoto.id, this.userId).then((result) => {
            this.selectedPhoto.likes = parseInt(JSON.stringify(result));
            this.canGiveLike = false;
        }).catch((reject) => {
            this.selectedPhoto.likes = parseInt(JSON.stringify(reject));
            this.canGiveLike = true;
        });
        this.username = this.selectedPhoto.user.firstN + " " + this.selectedPhoto.user.lastN;
        this.photoId = this.selectedPhoto.id;
        this.photoUrl = this.selectedPhoto.url;
        this.photoCreated = this.selectedPhoto.created;
        this.photoDescription = this.selectedPhoto.description;
        this.photoComments = this.selectedPhoto.comments;
        this.checkCommentRights();
        console.log("URL " + this.photoUrl);
    }
    private checkCommentRights() {
        console.log("Checking rights for comments");
        for (let c of this.selectedPhoto.comments) {
            //testing
            //console.log("comment user id " + c.userId + " loggen in as " + this.userId);
            if (c.userId == this.userId) {
                c.rights = true;
                console.log("Rights changed to true");
            }
        }
    }
    closePhoto() {
        this.selected = false;
        this.photoUrl = "";
        this.photoCreated = "";
        this.selectedPhoto = null;
    }

    addComment(result) {
        console.log("Comment " + result.text);
        if (result.text.length < 1) {
            alert("Cannot insert empty comment");
        } else {
            var commentId = this.server.updateComment(this.photoId, this.data.storage["id"], result.text);
            var comment = new Comment(commentId, this.data.storage["id"], result.text);
            comment.rights = true;
            //this.photoComments.push(comment);
            var promise = new Promise((resolve, reject) => {
                this.selectedPhoto.getComments();
                resolve();
            });
            promise.then(() => {
                this.checkCommentRights();
            });
            result.text = "";
        }
    }

    removeComment(commentId) {
        console.log("You click comment id " + commentId);
        var promise = new Promise((resolve, reject) => {
            this.server.removeComment(commentId);
            this.selectedPhoto.getComments();
            resolve();
        });
        promise.then(() => {
            this.checkCommentRights();
        });
    }

    updateLikes(id: number) {
        var promise = new Promise((resolve, reject) => {        
            var adding = this.canGiveLike;
            this.server.updateLikes(id, this.userId, adding);
            this.canGiveLike = !this.canGiveLike;
            resolve(adding);
        });
        promise.then((fromResolve) => {
            if (fromResolve) {
                this.selectedPhoto.likes++;
            } else {
                this.selectedPhoto.likes--;
            }
            console.log("You tapped " + id);
        });
    }
}