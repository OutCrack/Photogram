import { Event } from "../Event";
var http = require("http");

export class Server {

    db: string = "http://188.166.127.207:5555/api.php/";
    public myEvents: Array<Event>;

    constructor() {}

    public getPublicEvents() {
        //files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&order=created_at,desc
        var query: string =  this.db + "events?transform=1"; 
        http.getJSON(query)
        .then((r) => {
            //testing
            
            for (var i = 0; i < r.files.length; i++) {
                /*this.myPhotos.push(
                    new Photo(
                        r.files[i].file_Id,
                        "users/" + r.files[i].file_URL, //need to adjust when photo is in event catalog
                        this.id,
                        r.files[i].created_at
                    )
                )*/
            }
        }, function (e) {
            console.log(e);
        })
    }

    getMyEvents(id: number) {
        this.myEvents = [];
        console.log("In get my events function");
        var query: string = this.db + "participants?transform=1&filter=user_Id,eq," + id;
        this.myEvents = [];
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
                    this.myEvents.push(
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
        return this.myEvents;
    }
}