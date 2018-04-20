import { Event } from "../Event";
import { Photo } from "../Photo";
import { User } from "../User";
import { Comment } from "../Comment";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
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
                        r.files[i].description,
                        r.files[i].album_Id,
                        r.files[i].file_Name
                    )
                )
            }
        }, function(e) {
            console.log(e);
        })
        return new Promise((resolve, reject) => {
            
        });
        //return publicPhotos;
    }

    /*getPublicEvents() {
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
                        r.events[i].event_Id,
                        r.events[i].event_Name,
                        null,
                        r.events[i].event_Description,
                        r.events[i].event_Type
                    )
                )
            }
        }, function (e) {
            console.log(e);
        })
        return publicEvents;
    }*/

    getMyEvents(id: number) {
        var myEvents: Array<Event> = [];
        console.log("In get my events function");
        var query: string = this.db + "participants?transform=1&filter=user_Id,eq," + id;
        console.log("QUERY for events " + query);
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
                    console.log("Descritpion " + res.events[0].event_Description);
                    console.log("Type " + res.events[0].event_Type);
                    myEvents.push(
                        new Event(
                            res.events[0].event_Id,
                            res.events[0].event_Name,
                            r.participants[i].participant_Role,
                            res.events[0].event_Description,
                            res.events[0].event_Type
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
                        r.comments[i].comment_Id,
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
            var promise = new Promise((resolve, reject) => {
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
            resolve(result);
            });
        promise.then((result) => {
            return result;
        });
        return null;
    }

    getEventParticipants(id: number) {
        var participants: Array<User> = [];
        var query = this.db + "participants?transform=1&filter=event_Id,eq," + id;
        console.log(query);
        http.getJSON(query)
        .then((r) => {
            for (let i = 0; i < r.participants.length; i++) {
                var userQuery = this.db + "users?transform=1&filter=user_Id,eq," + r.participants[i].user_Id;
                console.log("userQuery " + userQuery);
                http.getJSON(userQuery)
                .then((res) => {
                    var user: User = new User(r.participants[i].user_Id, res.users[0].first_Name, res.users[0].last_Name);
                    user.role = r.participants[i].participant_Role;
                    console.log(JSON.stringify(user));
                    participants.push(user);
                }, function(e) {
                    console.log(e);
                })
            }
        }, function(e) {
            console.log(e);
        })
        return participants;
    }

    getPublicEvents(userId: number) {
        var publicEvents: Array<Event> = [];
        var query: string = this.db + "events?transform=1&filter=event_Privacy,eq,public"; 
        console.log("QUERY for events " + query);
        publicEvents = [];
        http.getJSON(query)
        .then((r) => {
            //testing
            console.log("Got " + r.events.length + " events");
            for (let i = 0; i < r.events.length; i++) {
                console.log("Event id" + r.events[i].event_Id);
                var query2: string = this.db + "participants?transform=1&filter[]=event_Id,eq," + r.events[i].event_Id + "&filter[]=user_Id,eq," + userId;
                console.log("query " + query2);
                http.getJSON(query2)
                .then((res) => {
                    console.log(JSON.stringify(res));
                    //show only events that the user hasn't joined yet
                    if (res.participants.length == 0) {
                        publicEvents.push(
                            new Event(
                                r.events[i].event_Id,
                                r.events[i].event_Name,
                                null,
                                r.events[i].event_Description,
                                r.events[i].event_Type
                            )
                        )  
                    }   
                })
            }
        }, function (e) {
            console.log(e);
        })
        return publicEvents;
    }

    saveUser(firstName: string, lastName: string, location: string, profession: string, email: string) {
        var result;
        http.request({
            url: this.db + "users",
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            //put file url instead of just name
            content: JSON.stringify({ first_Name : firstName, last_Name : lastName, email: email, 
            location: location, profession: profession})
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
        }, function(e) {
            console.log("Error occured " + e);
        }
    );
    return result;
    }

    newEvent(eventName: string, eventLocation: string, eventDescription: string, eventType: string, eventPrivacy: string){
        var created = this.getTimeStamp();
        var result;
        http.request({
            url: this.db + "events",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ 
                event_Name : eventName, 
                event_Location : eventLocation,  
                event_Description : eventDescription,
                event_Type : eventType,
                event_Privacy : eventPrivacy,
                created_at : created})
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
        }, function(e) {
            console.log("Error occured " + e);
        }
    );
    return result;    
    }

    joinEvent(eventId: number, userId: number) {
        var result;
        http.request({
            url: this.db + "participants",
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            content: JSON.stringify({ event_Id : eventId, user_Id : userId, participant_Role: "User" })
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
        }, function(e) {
            console.log(e);
        });
        return result;
    }

    leaveEvent(eventId: number, userId: number) {
        var participId: number;
        var query = this.db + "participants?transform=1&filter[]=event_Id,eq," + eventId + "&filter[]=user_Id,eq," + userId;
        http.getJSON(query)
        .then((r) => {
            if (r.participants == 0) {
                return null;
            }
            var result;
            http.request({
            url: this.db + "participants/" + r.participants[0].participant_Id,
            method : "DELETE",
            headers : { "Content-Type" : "application/json" },
            //where : JSON.stringify({ event_Id : eventId, user_Id : userId, participant_Role : "User" })
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(JSON.stringify(response));
        }, function(e) {
            console.log(e);
        });
        return result;
        }, function(e) {
            console.log(e);
            return null;
        });
    }

    removeComment(commentId: number) {
        var result;
        http.request({
        url: this.db + "comments/" + commentId,
        method : "DELETE",
        headers : { "Content-Type" : "application/json" },
    }).then(function(response) {
        result = response.content.toJSON();
        console.log(JSON.stringify(response));
    }, function(e) {
        console.log(e);
        return null;
    });
    return result;
    } 

    getEventPhotos(id: number) {

    }

    uploadPhoto(fileUrl: string, id: number) {
        var fileName = this.getTimeStamp();
        var that = this;
        var request = {
            url: "http://188.166.127.207:8888/Server.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": fileName,
                "User-id": id
            },
            description: "{ 'uploading': fileUrl }"
        };

        var task = session.uploadFile(fileUrl, request);

        task.on("progress", logEvent);
        task.on("error", logEvent);
        //only when uploading is complete, update the database
        task.on("complete", logEvent); 
 
        function logEvent(e) {
            if (e.eventName == "complete") {
                that.updateDb(fileName, id);
                alert("Upload complete");
            }
            console.log(e.eventName);       
        }  
    }

    private updateDb(fileName: string, id: number) {
        var result;
        var name = "img" + fileName + ".jpg";
        console.log("The id " + id);
        http.request({
            url: "http://188.166.127.207:5555/api.php/files/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //put file url instead of just name
            content: JSON.stringify({ user_Id : id, file_Name : name, file_URL : name, 
            file_Permission : "Public"})
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
        }, function(e) {
            console.log("Error occured " + e);
        });
    }

    private getTimeStamp() {
        var date = new Date(); 
        var string = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString()
            + date.getHours().toString() + date.getMinutes().toString() +
            + date.getSeconds().toString() + date.getMilliseconds().toString();
        return string;
    }

    public removePhoto(photoId: number) {
        return new Promise((resolve, reject) => {
        var result;
        http.request({
        url: this.db + "files/" + photoId,
        method : "DELETE",
        headers : { "Content-Type" : "application/json" },
    }).then(function(response) {
        result = response.content.toJSON();
        console.log(JSON.stringify(response));
    }, function(e) {
        console.log(e);
        reject();
    });
    resolve(result);
    })};
}