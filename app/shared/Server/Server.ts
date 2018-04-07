import { Event } from "../Event";
import { Photo } from "../Photo";
import { User } from "../User";
import { Comment } from "../Comment";
var http = require("http");

export class Server {

    db: string = "http://188.166.127.207:5555/api.php/";

    constructor() {
        console.log("In server constructor!!!!!!!!!!!!!!!!!!!!!!/n")
    }

    public getPublicPhotos() {
        var query: string = this.db + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&order=created_at,desc";
        var publicPhotos: Array<Photo> = [];
        http.getJSON(query)
        .then((r) => {
            for (var i = 0; i < r.files.lenght; i++) {
                publicPhotos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + r.files[i].file_URL,
                        r.files[i].user_Id,
                        r.files[i].created_at,
                        r.files[i].description

                    )
                )
            }
        }, function(e) {
            console.log(e);
        })
        return publicPhotos;
    }

    getPublicEvents() {
        //files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&order=created_at,desc
        var query: string =  this.db + "events?transform=1&filter=event_Privacy,eq,public"; 
        var publicEvents: Array<Event> = [];
        http.getJSON(query)
        .then((r) => {
            //testing
            console.log("Got " + r.events.lenght + " public events");
            for (var i = 0; i < r.events.length; i++) {
                publicEvents.push(
                    new Event(
                        r.event[i].event_Id,
                        r.event[i].event_Name,
                        null
                    )
                )
            }
        }, function (e) {
            console.log(e);
        })
        return publicEvents;
    }

    getMyEvents(id: number) {
        var myEvents: Array<Event> = [];
        console.log("In get my events function");
        var query: string = this.db + "participants?transform=1&filter=user_Id,eq," + id;
        myEvents = [];
        http.getJSON(query)
        .then((r) => {
            //testing
            console.log("Got " + r.participants.length + " events");
            for (let i = 0; i < r.participants.length; i++) {
                console.log("Event id" + r.participants[i].event_Id);
                var queryEvents: string = this.db + "events?transform=1&filter=event_Id,eq," + r.participants[i].event_Id;
                console.log("query " + queryEvents);
                http.getJSON(queryEvents)
                .then((res) => {
                    console.log(JSON.stringify(res));
                    myEvents.push(
                        new Event(
                            res.events[0].event_Id,
                            res.events[0].event_Name,
                            r.participants[i].participant_Role
                        )
                    )     
                })
            }
        }, function (e) {
            console.log(e);
        })
        return myEvents;
    }

    /*getUser(id: number) {
        var users: Array<User> = [];
        console.log("In server get user " + id);
        var query = this.db + "users?transform=1&filter=user_Id,eq," + id;
        console.log(query);
        http.getJSON(query)
        .then((r) => {
            for (let i = 0; i < r.users.length; i++)  {
                users.push(new User(
                r.users[0].user_Id,
                r.users[0].first_Name,
                r.users[0].last_Name
                ));
            }
            console.log(r.users[0].user_Id);
            console.log(r.users[0].first_Name);
            console.log(r.users[0].last_Name);
            users.push(new User(0, "", ""));      
        }, function (e) {
            console.log(e);
        }).then(() => {
            console.log("Got " + users.length);
        })
        return users;
    }*/

    getComments(id: number) {
        console.log("Getting comments for id " + id);
        var comments: Array<Comment> = [];
        var query: string = this.db + "comments?transform=1&filter=file_Id,eq," + id;
        console.log("The query " + query);
        http.getJSON(query).
        then((r) => {
            for (let i = 0; i < r.comments.length; i++) {
                comments.push(
                    new Comment(
                        r.comments[i].user_Id,
                        r.comments[i].comment_Text
                    )
                );
            }
        }, function(e) {
            console.log(e);
        })
        return comments;
    }

    getUsername(id: number) {
        var username: string;
        var query = this.db + "users?transform=1&filter=user_Id,eq," + id;
        console.log("QUERY GETTING USERNAMR " + query);
        http.getJSON(query)
        .then((r) => {
            username = r.users[0].firstName + " " + r.users[0].lastName;
        }, function(e) {
            console.log(e);
        })
        return username;
    }

    updateComment(photoId: number, userId: number, text: string) {
            var result;
            http.request({
                url: "http://188.166.127.207:5555/api.php/comments",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //put file url instead of just name
                content: JSON.stringify({ file_Id : photoId, user_Id : userId,  
                comment_Text : text})
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
            }, function(e) {
                console.log("Error occured " + e);
            });
    
        }
}