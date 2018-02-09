import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: "home-tab",
    moduleId: module.id,
    templateUrl: "./pages/tabs/home/home.tab.html",
    styleUrls: ["./home-tab-common.css", "./home-tab.css"]
})
export class HomeComponent implements OnInit{
    eventList: Array<Object> = [];

    ngOnInit(){
        this.eventList.push({ name: "Wedding" });
        this.eventList.push({ name: "Party" });
        this.eventList.push({ name: "Birthday" });
    }

}