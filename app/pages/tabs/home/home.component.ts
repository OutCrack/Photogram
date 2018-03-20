import { Component } from "@angular/core";
import { Photo } from "../model/Photo";
import { User } from "../model/User";
var http = require("http");

@Component({
    selector: "home-tab",
    templateUrl: "./pages/tabs/home/home.tab.html",
    styleUrls: [ "./pages/tabs/home/home.tab.css" ]
})

export class HomeComponent {
    site: string = "http://188.166.127.207:5555/api.php/";
    //for storing fetched photos
    public photos: Array<Photo>;

    constructor() {
        console.log("In home constructor");
        this.getPhotos();
    }

    //get photos from db, put them in photos array
    getPhotos() {
        //testing
        console.log("In getPhotos");
        this.photos = new Array();
        //get public photos that are not connected to a event
        var query: string = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&order=created_at,desc";
        http.getJSON(query)
        .then((r) => {
            //testing
            console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                this.photos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + r.files[i].file_URL,
                        r.files[i].user_Id,
                        r.files[i].created_at
                    )
                )
                //testing
                console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(() => {
            //testing
            console.log("There are " + this.photos.length + " photos in photos");
        })
        
    }

}