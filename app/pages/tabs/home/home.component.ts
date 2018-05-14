import { Component, ChangeDetectorRef } from "@angular/core";
import { Photo } from "../../../shared/Photo";
import { User } from "../../../shared/User";
import { Server } from "../../../shared/Server/Server";
import { Event } from "../../../shared/Event";
import { Comment } from "../../../shared/Comment";
var http = require("http");
import { registerElement } from "nativescript-angular/element-registry";
import { Data } from "../../../shared/Data";
import { TextField } from "ui/text-field";
import { NavigationExtras, Router } from "@angular/router";

registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@Component({
    selector: "home-tab",
    //moduleId: module.id,
    templateUrl: "./pages/tabs/home/home.tab.html",
    styleUrls: ["./pages/tabs/home/home.tab.css"]
})

export class HomeComponent {

    site: string = "http://188.166.127.207:5555/api.php/";
    public photos: Array<Photo>;
    public server: Server;
    public photoId: number;
    public photoUrl: string;
    public photoCreated: string;
    public username: string;
    public photoDescription: string;
    public photoComments: Array<Comment>;
    public userId: number;
    public selectedPhoto: Photo;
    pEvents: boolean;
    
    public selectedId: number; 

    constructor(private _changeDetectionRef: ChangeDetectorRef, private data: Data, private router: Router) {
        this.getPhotos();
        this.photoId = 0;
        this.server = new Server();
    }

    refreshFeed(args) {
        this.getPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    }

    //get photos from db, put them in photos array
    getPhotos() {
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
                            (r.files[i].created_at).slice(0, 16),
                            r.files[i].file_Description,
                            r.files[i].album_Id,
                            r.files[i].file_Name,
                            r.files[i].event_Id
                        )
                    )
                }
            }, function (e) {
                console.log(e);
            });

        //get string that represents the day before yesterday
        function getLimitDate() {
            var date = new Date();
            console.log("Date is " + date.toDateString());
            date.setDate(date.getDate() - 2); //Antall dager gamle bilder som skal vises
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

    selectPhoto(photoId: number) {
        console.log("You clicked " + photoId);
        var selectedPhoto: Photo = this.photos.find(i => i.id === photoId)
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "photoId" : photoId,
                "url" : selectedPhoto.url,
                "created" : selectedPhoto.created,
                "photoOwner" : selectedPhoto.userId,
                "eventOwner" : null,
                "description" : selectedPhoto.description,
                "ownerName" : selectedPhoto.user.firstN + " " + selectedPhoto.user.lastN
            }
        };
        this.router.navigate(["/photoView"], navigationExtras);
    }

}