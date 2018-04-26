import { User } from "./User";
var http = require("http");

export class Comment {
    id: number;
    userId: number;
    text: string;
    user: User;
    rights: boolean;

    constructor(id: number, userId: number, text: string) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.getUser();
        this.rights = false;
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
            } 
            //if user is not found - OBS should never happen -> inconsistency in database 
            else {
                this.user = new User(
                    0,
                    "User deleted",
                    ""
                )
            }
            //console.log("Created user " + this.user.firstN + " " + this.user.lastN);
        }, function(error) {
            console.log("Couldn't find the user");
        })
        //return JSON.stringify(this.user);
    }
}