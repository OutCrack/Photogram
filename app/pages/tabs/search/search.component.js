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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFTMUM7SUFBQTtJQVlBLENBQUM7SUFUVSxrQ0FBUSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSx1Q0FBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3JCLHlDQUF5QztRQUN6QyxzRUFBc0U7SUFDMUUsQ0FBQztJQVhRLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLHNCQUFzQjtZQUN0QixXQUFXLEVBQUUscUNBQXFDO1NBQ3JELENBQUM7T0FFVyxlQUFlLENBWTNCO0lBQUQsc0JBQUM7Q0FBQSxBQVpELElBWUM7QUFaWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzZWFyY2gtdGFiXCIsXG4gICAgLy9tb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9zZWFyY2gvc2VhcmNoLnRhYi5odG1sXCJcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQge1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcblxuICAgIHB1YmxpYyBvblN1Ym1pdChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBhbGVydChcIllvdSBhcmUgc2VhcmNoaW5nIGZvciBcIiArIHNlYXJjaEJhci50ZXh0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIC8vbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJTZWFyY2hCYXIgdGV4dCBjaGFuZ2VkISBOZXcgdmFsdWU6IFwiICsgc2VhcmNoQmFyLnRleHQpO1xuICAgIH1cbn0iXX0=