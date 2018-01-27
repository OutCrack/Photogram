import { Component } from "@angular/core";
import { SearchBar } from "ui/search-bar";

@Component({
    selector: "search-tab",
    //moduleId: module.id,
    templateUrl: "./pages/tabs/search/search.tab.html"
})

export class SearchComponent {
    public searchPhrase: string;

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        alert("You are searching for " + searchBar.text);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);
    }
}