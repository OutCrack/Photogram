import { User } from "./User";
import { Comment } from "./Comment";
import { Server } from "./Server/Server";
var http = require("http");
var server = new Server();

export class Photo {
    id: number;
    userId: number;
    user: User;
    albumId: number;
    fileName: string;
    created: string;
    url: string;
    description: string;
    comments: Array<Comment>;

    constructor(id: number, url:string, userId: number, created: string, description: string, albumId: number, fileName: string) {
        this.id = id;
        this.url = "http://188.166.127.207:8000/uploads/" + url;
        this.userId = userId;
        this.created = created;
        this.description = description;
        this.fileName = fileName;
        this.albumId = albumId;
        this.getUser();
        this.getUrl();
        this.getComments();
    }

    public getUser() {
        var userQuery = "http://188.166.127.207:5555/api.php/users?transform=1&filter=user_Id,eq," + this.userId;
        console.log("Query" + userQuery);
        http.getJSON(userQuery)
        .then((result) => {
            //if user is found
            if (result.users.length > 0) {
                this.user = new User(
                    result.users[0].user_Id,
                    result.users[0].first_Name,
                    result.users[0].last_Name  
                )
            } 
            //if user is not found - OBS should never happen -> inconsistency in database 
            else {
                this.user = new User(
                    0,
                    "User deleted",
                    ""
                )
            }
            console.log("Created user " + this.user.firstN + " " + this.user.lastN);
        }, function(error) {
            console.log("Couldn't find the user");
        })
        //return JSON.stringify(this.user);
    }

    private getUrl() {
        if (this.albumId != null) {
            http.getJSON("http://188.166.127.207:5555/api.php/albums?transform=1&filter=album_Id,eq," + this.albumId)
            .then((r) => {
                var albumName = r.albums[0].album_Name;
                var replace = / /gi;
                albumName = albumName.replace(replace, "%20");
                this.url = "http://188.166.127.207:8000/uploads/" + this.userId + "/" + albumName + "/" + this.fileName;
            })
            
        }
    }

    public getComments() {
        this.comments = [];
        this.comments = server.getComments(this.id);
    
    }
} 