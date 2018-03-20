import { User } from "./User";
var http = require("http");

export class Photo {
    id: number;
    userId: number;
    user: User;
    created: string;
    url: string;

    constructor(id: number, url:string, userId: number, created: string) {
        this.id = id;
        this.url = "http://188.166.127.207:8000/uploads/" + url;
        this.userId = userId;
        this.created = created;
        this.getUser();
    }

    public getUser() {
        var userQuery = "http://188.166.127.207:5555/api.php/users?transform=1&filter=user_Id,eq," + this.userId;
        http.getJSON(userQuery)
        .then((result) => {
            console.log("Getting user from db");
            this.user = new User(
                result.users[0].user_Id,
                result.users[0].first_Name,
                result.users[0].last_Name  
            )
            console.log("Created user " + this.user.firstN + " " + this.user.lastN);
        }, function(error) {
            console.log("Couldn't find the user");
        })
    }
} 