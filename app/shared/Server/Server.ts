import { Event } from "../Event";
import { Photo } from "../Photo";
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
                        r.files[i].created_at

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
}