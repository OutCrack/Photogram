import { Component } from "@angular/core";
import { Photo } from "./Photo";
var http = require("http");

@Component({
    selector: "home-tab",
    templateUrl: "./pages/tabs/home/home.tab.html"
})

export class HomeComponent {
    site: string = "http://188.166.127.207:5555/api.php/";
    prefix: string = "http://188.166.127.207:8000/uploads/users/"
    public photos: Array<Photo>;
    public image: string;
    public: string;
    public image1: string;
    public image2: string;
    public numbers = 4;

    constructor() {
        console.log("In home constructor");
        this.getPhotos();
    }

    getPhotos() {
        console.log("In getPhotos");
        this.photos = new Array();
        var query: string = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null";
        http.getJSON(query)
        .then((r) => {
            console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                this.photos.push(
                    new Photo(
                        r.files[i].file_Id,
                        r.files[i].file_URL
                    )
                )
                console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(() => {
            console.log("There are " + this.photos.length + " photos in photos");
        }
        )
        
    }

}