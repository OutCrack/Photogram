import { Event } from "../Event";
import { Photo } from "../Photo";
import { User } from "../User";
import { Comment } from "../Comment";
import { Album } from "../Album";
import { Data } from "../../shared/Data";
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
                        r.files[i].file_Name,
                        r.files[i].event_Id
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

    getMyEvents(id: number, role: string) {
        console.log("+++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++");
        console.log("+++++++++++++++++++++++++++++");
        console.log("Searching for events " + id + " " + role);
        var myEvents: Array<Event> = [];
        var query: string = this.db + "participants?transform=1&filter[]=user_Id,eq," + id + "&filter[]=participant_Role,eq," + role;
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
                            res.events[0].event_Type,
                            res.events[0].event_Privacy,
                            res.events[0].event_Header
                        )
                    )     
                })
            }
        }, function (e) {
            console.log(e);
        })
        return myEvents;
    }

    getInvitedEvents(userId: number) {

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

    getComments(photoId: number, userId: number, photoOwner: number, eventOwner: number) {
        console.log("Getting comments for id " + photoId);
        console.log("my id " + userId);
        console.log("owner id " + photoOwner);
        console.log("event owner " + eventOwner);

        var comments: Array<Comment> = [];
        var query: string = this.db + "comments?transform=1&filter=file_Id,eq," + photoId;
        console.log("The query " + query);
        http.getJSON(query).
        then((r) => {
            for (let i = 0; i < r.comments.length; i++) {
                var rights;
                if (r.comments[i].user_Id == userId || userId == photoOwner || userId == eventOwner) {
                    rights = true;
                }
                else {
                    rights = false;
                }
                comments.push(
                    new Comment(
                        r.comments[i].comment_Id,
                        r.comments[i].user_Id,
                        r.comments[i].comment_Text,
                        rights
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
        http.getJSON(query)
        .then((r) => {
            username = r.users[0].first_Name + " " + r.users[0].last_Name;
        }, function(e) {
            console.log(e);
        })
        return username;
    }

    updateComment(photoId: number, userId: number, text: string) {
            return new Promise((resolve, reject) => {
            var result;
            http.request({
                url: this.db + "comments",
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                                r.events[i].event_Type,
                                r.events[i].event_Privacy,
                                r.events[i].event_Header
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

    newEvent(userId: number, eventName: string, eventLocation: string, eventDescription: string, eventType: string, eventPrivacy: string){
        return new Promise((resolve, reject) => {
            var result;
            var default_Header;
            if (eventType.toLowerCase() == "party") {
                default_Header = "party-default.png";
            } else {
                default_Header = "wedding-default.png";
            }
            var that = this;
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
                    event_Header : default_Header
                    })
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
                that.joinEvent(result, userId, "Admin");
                resolve(result);
            }, function(e) {
                console.log("Error occured " + e);
                reject();
            }
    );
        })  
    }

    joinEvent(eventId: number, userId: number, role: string) {
            var result;
            http.request({
                url: this.db + "participants",
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                content: JSON.stringify({ event_Id : eventId, user_Id : userId, participant_Role: role })
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
            }, function(e) {
                console.log(e);
            })
    }

    leaveEvent(eventId: number, userId: number) {
        var participId: number;
        var query = this.db + "participants?transform=1&filter[]=event_Id,eq," + eventId + "&filter[]=user_Id,eq," + userId;
        console.log("DELETE " + userId + " FROM EVENT " + eventId);
        console.log(query);
        http.getJSON(query)
        .then((r) => {
            if (r.participants == 0) {
                return null;
            }
            console.log("Will be deleting entry nr " + r.participants[0].participant_Id);
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
        return new Promise((resolve, reject) => {
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
            reject();
        });
        resolve();
        })

    } 

    getEventPhotos(id: number) {

    }

    getAlbumName(albumId: number) {
        return new Promise((resolve, reject) => {
            if (albumId == null) {
                reject();
            } else {
                var query = this.db + "albums?transform=1&filter=album_Id,eq," + albumId;
                console.log("QUERY " + query);
                http.getJSON(query).then((r) => {
                    resolve(r.albums[0].album_Name);
                });
            }
        });
        
    }

    uploadPhoto(fileUrl: string, id: number, albumId: number, albumName: string, permission: string, description: string, location: string) {
        var fileName = this.getTimeStamp();
        var that = this;
        var request = {
            url: "http://188.166.127.207:8888/Server.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Path" : "users/",
                "Album-Name" : albumName,
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
                that.updateDb(fileName, id, "photo", albumId, permission, description, location);
                alert("Upload complete");
            }
            console.log(e.eventName);       
        }  
    }

    uploadProfilPhoto(fileUrl: string, id: number) {
        return new Promise((resolve, reject) => {
        var fileName = this.getTimeStamp();
        var _that = this;
        var request = {
            url: "http://188.166.127.207:8888/Server.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Path" : "avatars/",
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
                _that.updateDb(fileName, id, "avatar", null, "Public", null, null);
                alert("Upload complete");
            }
            console.log(e.eventName);       
        }  

        resolve ("img" + fileName + ".jpg");
        });
    }

    private updateDb(fileName: string, id: number, type: string, albumId: number, permission: string, description: string, location: string) {
        var result;
        var name = "img" + fileName + ".jpg";
        console.log("The id " + id);
        if (type == "photo") {
            http.request({
                url: "http://188.166.127.207:5555/api.php/files/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //put file url instead of just name
                content: JSON.stringify({ user_Id : id, file_Name : name, album_Id : albumId, file_URL : name, 
                file_Permission : permission, file_Description : description, file_Location : location })
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
            }, function(e) {
                console.log("Error occured " + e);
            });
        }
        else if (type == "avatar") {
            http.request({
                url: "http://188.166.127.207:5555/api.php/users/" + id,
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                //put file url instead of just name
                content: JSON.stringify({ avatar : "img" + fileName + ".jpg"}),
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
            }, function(e) {
                console.log("Error occured " + e);
            });
        }

    }

    private getTimeStamp() {
        var date = new Date(); 
        var string = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString()
            + date.getHours().toString() + date.getMinutes().toString() +
            + date.getSeconds().toString() + date.getMilliseconds().toString();
        return string;
    }

    //rfix removing from server - removes only from db
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
    }); }

    //returns promise with number of likes as a parameter
    public getLikes(photoId: number, userId: number) {
        console.log("Getting likes for " + photoId + " and my user id is " + userId);
        var query = this.db + "reacts?transform=1&filter=file_Id,eq," + photoId;
        console.log("Query " + query);
        return new Promise((resolve, reject) => {
            var likes = 0;
            http.getJSON(query).then((result) => {
                for (var i = 0; i < result.reacts.length; i++) {
                likes++;
            }
            var query2 = this.db + "reacts?transform=1&filter[]=user_Id,eq," + userId + "&filter[]=file_Id,eq," + photoId;
            console.log("Query 2 " + query2);
            http.getJSON(query2).then((res) => {
                console.log("Res react length is  " + res.reacts.length);
                if (res.reacts.length > 0) {
                    console.log("Resolving with " + likes + " likes");
                    resolve(likes);
                } else {
                    console.log("Rejecting with " + likes + " likes");
                    reject(likes)
                }
            }), function(e) {
                console.log("Error in query2 getLikes in Server" + e);
            }
        }), function(e) {
            console.log("Error in query1 getLikes in Server" + e);
        }
        }); 
    }

    public updateLikes(photoId: number, userId: number, add: boolean) {
        console.log("Updating likes for " + photoId + " userId " + userId + " Adding? " + add);
        var result;
        if (add) {
            http.request({
                url: "http://188.166.127.207:5555/api.php/reacts/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //put file url instead of just name
                content: JSON.stringify({ user_Id : userId, file_Id : photoId})
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
            }, function(e) {
                console.log("Error occured " + e);
            });
        }
        else {
            var query = this.db + "/reacts?transform=1&filter[]=user_Id,eq," + userId + "&filter[]=file_Id,eq," + photoId;
            http.getJSON(query).then((res) => {
                var reactId = res.reacts[0].react_Id;
                http.request({
                    url: this.db + "reacts/" + reactId,
                    method : "DELETE",
                    headers : { "Content-Type" : "application/json" },
                }).then(() => {

                }), function(e) {
                    console.log(e);
                }
            }), function(e) {
                console.log(e);
            }
        }
    }

    public saveDetails(id: number, first: string, last: string, gender: string, 
        bDate: string, location: string, hobby: string, profession: string) {
        var result;
        http.request({
            url: this.db + "/users/" + id,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ first_Name : first, last_Name : last, gender: gender,
            DOB: bDate, profession: profession, location: location, hobby: hobby})
        }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
        }, function(e) {
            console.log("Error occured " + e);
        });
    }

    public deletePhoto(userId: number, fileName: string, type: string, photoId: number, albumName: string) {
        var pathToFile;
        if (albumName != null) {
            pathToFile = albumName + "/" + fileName; 
        } else {
            pathToFile = fileName;
        }
        var request = {
            url: "http://188.166.127.207:8889/ServerDel.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Task" : "delete",
                "Path" : type,
                "File-Name": pathToFile,
                "User-id": userId
            },
            description: "{ 'deleting': fileName }"
        };
        http.getJSON(request).then((response) => {
            var status = response["status"];
            console.log(status); //response is either OK or ERROR
            if (status == "OK" && type == "avatar") {
                var result;
                http.request({
                url: this.db + "users/" + userId,
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            //put file url instead of just name
            content: JSON.stringify({ avatar: "default-avatar.png"})
            }).then(function(response) {
            result = response.content.toJSON();
            console.log(result);
            }, function(e) {
            console.log("Error occured " + e);
            });
        } else if (status == "OK" && type == "photo") {
            this.deleteDBPhoto(photoId);
            this.deleteComments(photoId);
            this.deleteLikes(photoId);
        }
    });

    }

    //delete comments of the removed photo from db
    private deleteComments(photoId: number) {
        console.log("Deleting comments for file " + photoId);
        var query = this.db + "comments?transform=1&filter=file_id,eq," + photoId;
        console.log("QUERY in delete comments " + query);
        http.getJSON(query).then((result) => {
            for (var i = 0; i < result.comments.length; i++) {
                http.request({
                    url: this.db + "comments/" + result.comments[i].comment_Id,
                    method : "DELETE",
                    headers : { "Content-Type" : "application/json" },
                }).then(function(response) {
                    result = response.content.toJSON();
                    console.log(JSON.stringify(response));
                }, function(e) {
                    console.log(e);
                })
            }
        })
    }

    //delete likes (reacts) of the removed photo from db
    private deleteLikes(photoId: number) {
        console.log("Deleting likes for file " + photoId);
        var query = this.db + "reacts?transform=1&filter=file_id,eq," + photoId;
        console.log("QUERY in delete likes" + query);
        http.getJSON(query).then((result) => {
            for (var i = 0; i < result.reacts.length; i++) {
                http.request({
                    url: this.db + "reacts/" + result.reacts[i].react_Id,
                    method : "DELETE",
                    headers : { "Content-Type" : "application/json" }
                }).then(function(response) {
                    result = response.content.toJSON();
                    console.log(JSON.stringify(response));
                }, function(e) {
                    console.log(e);
                })
            }
        })
    }

    private deleteDBPhoto(photoId: number) {
        http.request({
            url: this.db + "files/" + photoId,
            method: "DELETE",
            headers : { "Content-Type" : "application/json" }
        }).then((response) => {
            console.log(JSON.stringify(response));
        }, function(e) {
            console.log(e);
        })
    }

    public saveAlbum(userId: number, name: string, publicR: boolean, description: string) {
        return new Promise((resolve, reject) => {
            var result;
            var permission: string;
            if (publicR) {
                permission = "public";
            } else {
                permission = "private";
            }
            http.request({
                url: this.db + "albums/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ user_Id : userId, album_Name: name, album_Permission : permission,
                album_Description: description })
            }).then(function(response) {
                result = response.content.toJSON();
                console.log(result);
            }, function(e) {
                console.log("Error occured " + e);
            });
            resolve();
        })
    }

    //Get albums of the user with given userId
    public getAlbums(userId: number) {
        console.log("Getting albums for user " + userId);
        var albums: Array<Album> = [];
        var query: string = this.db + "albums?transform=1&filter=user_Id,eq," + userId;
        console.log("The query " + query);
        http.getJSON(query).
        then((r) => {
            for (let i = 0; i < r.albums.length; i++) {
                albums.push(
                    new Album(
                        r.albums[i].album_Id,
                        r.albums[i].album_Name,
                        r.albums[i].album_Permission,
                        r.albums[i].album_Description                    )
                );
            }
        }, function(e) {
            console.log(e);
        })
        return albums;
    }

    public getAlbumPhotos(albumId: number) {
        console.log("Getting photos fot album id " + albumId);
        var photos : Array<Photo> = [];
        var query : string = this.db + "files?transform=1&filter=album_Id,eq," + albumId;
        console.log("The query " + query);
        http.getJSON(query).then((r) => {
            for (let i = 0; i < r.files.length; i++) {
                photos.push(
                    new Photo(
                        r.files[i].file_Id,
                        r.files[i].file_URL,
                        r.files[i].user_Id,
                        r.files[i].created_at,
                        r.files[i].description,
                        r.files[i].album_Id,
                        r.files[i].file_Name,
                        r.files[i].event_Id
                    )
                );
            }
        }, function(e) {
            console.log(e);
        })
        return photos;
    }

    getFeedId(userId: number) {
        return new Promise((resolve, reject) => {
            var query = this.db + "albums?transform=1&filter[]=user_Id,eq," + userId + "&filter[]=album_Description,cs,Album&filter[]=album_Description,cs,for&filter[]=album_Description,cs,feed&filter[]=album_Description,cs,photos&satisfy=all";
            console.log("GGGGGGGGGGGGGGGGGGGGGG" + query);
            http.getJSON(query).then((r) => {
                resolve(r.albums[0].album_Id);
            })
        })

    }

    getAlbumRights(albumId) {
        return new Promise((resolve, reject) => {
            var query = this.db + "albums?transform=1&filter=album_Id,eq," + albumId;
            http.getJSON(query).then((res) => {
                console.log("AAAAAAAAAAAAAAAAAAAAAlbum rights to lower case " + (res.albums[0].album_Permission).toLowerCase());
                if ((res.albums[0].album_Permission).toLowerCase() == "public") {
                    resolve();
                } else {
                    reject();
                }
            })
        })
    }

    getPhoto(photoId: number) {
        return new Promise((resolve, reject) => {
            var query = this.db + "files?transform=1&filter=file_Id,eq," + photoId;
            http.getJSON(query).then((res) => {
                var photo: Photo = new Photo(
                    photoId,
                    res.files[0].file_URL,
                    res.files[0].user_Id,
                    (res.files[0].created_at).slice(0,16),
                    res.files[0].file_Description,
                    res.files[0].album_Id,
                    res.files[0].file_Name,
                    res.files[0].event_Id
                );
                resolve(photo);
            })
        })

    }

    getUsersByHint(hint: string, userId: number) {
        var users : Array<User> = [];
        var query = this.db + "users?transform=1&filter[]=first_Name,cs," + hint + "&filter[]=last_Name,cs," + hint +
        "&filter[]=email,cs," + hint + "&satisfy=any";
        console.log(query);
        http.getJSON(query).then((res) => {
            for (let i = 0; i < res.users.length; i++) {
               if (res.users[i].user_Id == userId) {
                   continue;
               }
               //uncomment if you want to have max n entries in the list
               /*if (i > 5) {
                   break;
               }*/
               users.push(
                   new User(
                       res.users[i].user_Id,
                       res.users[i].first_Name,
                       res.users[i].last_Name
                   )
               )
            }        
            })
            return users;
    }

    /*public deleteInvitation(eventId: number, userId: number) {
        var query = this.db + "participants?transform=1&filter[]=event_Id,eq," + eventId + 
        "&filter[]=user_Id,eq," + userId;
        console.log("     " + query);
        http.getJSON(query).then((result) => {
            var inviteId = JSON.stringify(result.participants[0]);
            console.log(inviteId);
        });
    }*/

    public deleteAlbum(albumId: number, userId: number, albumName: string) {
        console.log("Deleting album " + albumName + " id " + albumId);
        var request = {
            url: "http://188.166.127.207:8889/ServerDel.js",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Task" : "deleteFolder",
                "Path" : "album",
                "File-Name": albumName,
                "User-id": userId
            },
            description: "{ 'deleting': fileName }"
        }
        http.getJSON(request).then((response) => {
            var status = response["status"];
            console.log("Status " + status);
            if (status == "OK") {
                //delete photo and its comments and likes
                var query = this.db + "files?transform=1&filter=album_Id,eq," + albumId;
                http.getJSON(query).then((r) => {
                    for (let i = 0; i < r.files.length; i++) {
                        this.deleteDBPhoto(r.files[i].file_Id);
                        this.deleteLikes(r.files[i].file_Id);
                        this.deleteComments(r.files[i].file_Id);
                        console.log("Deleted photo " + r.files[i].file_Id);
                    }
                });
                //delete album from db
                http.request({
                    url: this.db + "albums/" + albumId,
                    method : "DELETE",
                    headers : { "Content-Type" : "application/json" },
                }).then(() => {
                    console.log("Album " + albumId + "deleted");
                }), function(e) {
                    console.log(e);
                }
            }
        })

        //delete album
        //delete from files table
    }



}