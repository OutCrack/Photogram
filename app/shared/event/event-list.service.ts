import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Event } from "./event";

@Injectable()
export class EventListService {
  baseUrl = Config.apiUrl + "appdata/" + Config.appKey + "/Events";

  constructor(private http: Http) {}

  load() {
    // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
    let params = new URLSearchParams();
    params.append("sort", "{\"_kmd.lmt\": 1}");

    return this.http.get(this.baseUrl, {
      headers: this.getCommonHeaders(),
      params: params
    })
    .map(res => res.json())
    .map(data => {
      let eventList = [];
      data.forEach((event) => {
        eventList.push(new Event(event._id, event.Name));
      });
      return eventList;
    })
    .catch(this.handleErrors);
  }

  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Kinvey " + Config.token);
    return headers;
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}