import { User } from "./User";
import { Comment } from "./Comment";
import { Server } from "./Server/Server";
var http = require("http");

export class Photo {
    id: number;
    userId: number;
    user: User;
    albumId: number;
    eventId: number;
    fileName: string;
    created: string;
    url: string;
    description: string;
    likes: number;
    comments: Array<Comment>;
    server: Server = new Server();
    albumPath: string;
    userName: string;

    constructor(id: number, url:string, userId: number, created: string, description: string, albumId: number, fileName: string, eventId: number) {
        this.id = id;
        this.userId = userId;
        this.created = created;
        this.description = description;
        this.fileName = fileName;
        this.albumId = albumId;
        this.getUser();
        this.eventId = eventId;
        if (eventId == null) {
            var promise = new Promise((resolve, reject) => {        
                if (albumId == null) {
                    resolve();
                } else {
                    reject(albumId);
                }
                resolve(albumId);
                })
                
                promise.then((fromResolve) => {
                    this.url = "http://188.166.127.207:8000/uploads/users/" + this.userId + "/" + this.fileName;
                }).catch((fromReject) => {
                    console.log("GETTING URL WITH ALBUM NAME + fromReject " + fromReject);
                    this.getUrl(fromReject).then((fromResolve) => {
                        this.url = "http://188.166.127.207:8000/uploads/users/" + this.userId + "/" + fromResolve.toString() + "/" + this.fileName;
                    });
                });  
                this.getComments();
        } else {
            this.url = "http://188.166.127.207:8000/uploads/events/" + eventId + "/" + fileName;
        }
    }

    public getUser() {
        var userQuery = "http://188.166.127.207:5555/api.php/users?transform=1&filter=user_Id,eq," + this.userId;
        //console.log("Query" + userQuery);
        http.getJSON(userQuery)
        .then((result) => {
            //if user is found
            if (result.users.length > 0) {
                this.user = new User(
                    result.users[0].user_Id,
                    result.users[0].first_Name,
                    result.users[0].last_Name  
                )
                this.userName = result.users[0].first_Name + " " + result.users[0].last_Name 
            } 
            //if user is not found - OBS should never happen -> inconsistency in database 
            else {
                this.user = new User(
                    0,
                    "User deleted",
                    ""
                )
                this.userName = "User deleted";
            }
            //console.log("Created user " + this.user.firstN + " " + this.user.lastN);
        }, function(error) {
            console.log("Couldn't find the user");
        })
        //return JSON.stringify(this.user);
    }

    private getUrl(albumId) {
        console.log("Getting url " + albumId);
        return new Promise((resolve, reject) => {
            http.getJSON("http://188.166.127.207:5555/api.php/albums?transform=1&filter=album_Id,eq," + this.albumId)
            .then((r) => {
                var albumName = r.albums[0].album_Name;
                this.albumPath = r.albums[0].album_Name;;
                var replace = / /gi;
                albumName = albumName.replace(replace, "%20");
                //var url = "http://188.166.127.207:8000/uploads/" + this.userId + "/" + albumName + "/" + this.fileName;
                resolve(albumName);
                })  
        });
    }


    public getComments() {
        return new Promise((resolve, reject) => {
            console.log("Getting comments");
            this.comments = [];
            this.comments = this.server.getComments(this.id, null, null, null);
            resolve(this.id);
        });
    }
} 