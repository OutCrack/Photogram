import { Component, OnInit } from "@angular/core";

import { Event } from "../../../shared/Event"
import { EventService } from "../../../shared/event/event.service"

@Component({
    selector: "EventDetail",
    moduleId: module.id,
    templateUrl: "./event-detail.html"

})
export class EventDetailComponent implements OnInit {
    private _event: Event;

    constructor(

    ){}

    ngOnInit(): void{}

}