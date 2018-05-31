import { Component } from "@angular/core";
import { SearchBar } from "ui/search-bar";
import { Server } from "../../../shared/Server/Server"
import { User } from "../../../shared/User";
import { Data } from "../../../shared/Data";
import { Event } from "../../../shared/Event";
import { Router } from "@angular/router";

/**
 * 
 * 
 * @export
 * @class SearchComponent
 */
@Component({
    selector: "search-tab",
    templateUrl: "./pages/tabs/search/search.tab.html",
    styleUrls: [ "./pages/tabs/search/search-tab.css" ]
})


export class SearchComponent {
    public searchPhrase: string;
    public users: Array<User>;
    public events: Array<Event>;
    public server;
    public search: boolean;
    public searchBar: SearchBar;

    /**
     * 
     * 
     * @memberof SearchComponent
     */
    stackLoaded = function(args) {
        this.search = false;
    }

    /**
     * Creates an instance of SearchComponent.
     * @param {Data} data 
     * @memberof SearchComponent
     */
    constructor(private data: Data, private router: Router) {
        this.server = new Server;
        this.users = [];
        this.events = [];
    }

    /**
     * 
     * 
     * @param {any} args 
     * @memberof SearchComponent
     */
    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        if (searchBar.text.length < 3) {
            this.users = [];
            this.events = [];
            this.search = false;
            alert("The search phrase must be at least 3 characters long");
        } else {
            this.search = true;
            this.users = this.server.getUsersByHint(searchBar.text, this.data.storage["id"]);
            this.events = this.server.getEventsByHint(searchBar.text);
        }
        
    }

    /**
     * 
     * 
     * @param {any} args 
     * @memberof SearchComponent
     */
    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        if (searchBar.text.length < 3) {
            this.users = [];
            this.events = [];
            this.search = false;
        } else {
            this.users = this.server.getUsersByHint(searchBar.text, this.data.storage["id"]);
            this.events = this.server.getEventsByHint(searchBar.text);
        }
    }

}