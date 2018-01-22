import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";

export class DataItem {
    constructor(public itemDesc: string) {}
}

@Component({
  selector: "tab",
  moduleId: module.id,
  templateUrl: "./tab.html",
  styleUrls: ["./tab-common.css", "./tab.css"]
})
export class TabComponent {
    public items: Array<DataItem>;
    public activeTab: string;

    constructor(private page: Page) {
        this.items = new Array<DataItem>();
        for (let i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }
    }

    toggleDisplay() {
             
    }
}