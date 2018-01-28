"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchComponent = /** @class */ (function () {
    function SearchComponent() {
    }
    SearchComponent.prototype.onSubmit = function (args) {
        var searchBar = args.object;
        alert("You are searching for " + searchBar.text);
    };
    SearchComponent.prototype.onTextChanged = function (args) {
        //let searchBar = <SearchBar>args.object;
        //console.log("SearchBar text changed! New value: " + searchBar.text);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: "search-tab",
            //moduleId: module.id,
            templateUrl: "./pages/tabs/search/search.tab.html"
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFTMUM7SUFBQTtJQVlBLENBQUM7SUFUVSxrQ0FBUSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSx1Q0FBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3JCLHlDQUF5QztRQUN6QyxzRUFBc0U7SUFDMUUsQ0FBQztJQVhRLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLHNCQUFzQjtZQUN0QixXQUFXLEVBQUUscUNBQXFDO1NBQ3JELENBQUM7T0FFVyxlQUFlLENBWTNCO0lBQUQsc0JBQUM7Q0FBQSxBQVpELElBWUM7QUFaWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInNlYXJjaC10YWJcIixcclxuICAgIC8vbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9zZWFyY2gvc2VhcmNoLnRhYi5odG1sXCJcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQge1xyXG4gICAgcHVibGljIHNlYXJjaFBocmFzZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBvblN1Ym1pdChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgYWxlcnQoXCJZb3UgYXJlIHNlYXJjaGluZyBmb3IgXCIgKyBzZWFyY2hCYXIudGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIC8vbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlNlYXJjaEJhciB0ZXh0IGNoYW5nZWQhIE5ldyB2YWx1ZTogXCIgKyBzZWFyY2hCYXIudGV4dCk7XHJcbiAgICB9XHJcbn0iXX0=