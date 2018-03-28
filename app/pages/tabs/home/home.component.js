"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../../../shared/Photo");
var http = require("http");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.site = "http://188.166.127.207:5555/api.php/";
        console.log("In home constructor");
        this.getPhotos();
    }
    HomeComponent.prototype.refreshFeed = function (args) {
        this.getPhotos();
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    //get photos from db, put them in photos array
    HomeComponent.prototype.getPhotos = function () {
        var _this = this;
        //testing
        //console.log("In getPhotos");
        this.photos = new Array();
        //get public photos that are not connected to a event
        var query = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&order=created_at,desc";
        http.getJSON(query)
            .then(function (r) {
            //testing
            //console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].file_URL, r.files[i].user_Id, r.files[i].created_at));
                //testing
                //console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(function () {
            //testing
            //console.log("There are " + this.photos.length + " photos in photos");
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home-tab",
            templateUrl: "./pages/tabs/home/home.tab.html",
            styleUrls: ["./pages/tabs/home/home.tab.css"]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywrQ0FBOEM7QUFFOUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLDBFQUF3RTtBQUV4RSxrQ0FBZSxDQUFDLGVBQWUsRUFBRyxjQUFLLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFRNUY7SUFPSTtRQU5BLFNBQUksR0FBVyxzQ0FBc0MsQ0FBQztRQU9sRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNaLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLFVBQVUsQ0FBQztZQUNQLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7SUFDRCw4Q0FBOEM7SUFDOUMsaUNBQVMsR0FBVDtRQUFBLGlCQThCQztRQTdCRyxTQUFTO1FBQ1QsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQixxREFBcUQ7UUFDckQsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxzR0FBc0csQ0FBQztRQUN2SSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUNsQixJQUFJLENBQUMsVUFBQyxDQUFDO1lBQ0osU0FBUztZQUNULGtEQUFrRDtZQUNsRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDWixJQUFJLGFBQUssQ0FDTCxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFDbEIsUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFDbEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQ3hCLENBQ0osQ0FBQTtnQkFDRCxTQUFTO2dCQUNULG1DQUFtQztZQUN2QyxDQUFDO1FBQ0wsQ0FBQyxFQUFFLFVBQVUsQ0FBQztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osU0FBUztZQUNULHVFQUF1RTtRQUMzRSxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFuRFEsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBRSxnQ0FBZ0MsQ0FBRTtTQUNsRCxDQUFDOztPQUVXLGFBQWEsQ0FxRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQXJERCxJQXFEQztBQXJEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1VzZXJcIjtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuXG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIgLCAoKT0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcbiBcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImhvbWUtdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS50YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmNzc1wiIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcbiAgICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICAgIC8vZm9yIHN0b3JpbmcgZmV0Y2hlZCBwaG90b3NcbiAgICBwdWJsaWMgcGhvdG9zOiBBcnJheTxQaG90bz47XG5cbiAgICBcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluIGhvbWUgY29uc3RydWN0b3JcIik7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaEZlZWQoYXJncykge1xuICAgICAgICB0aGlzLmdldFBob3RvcygpO1xuICAgICAgICB2YXIgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIFxuICAgIH1cbiAgICAvL2dldCBwaG90b3MgZnJvbSBkYiwgcHV0IHRoZW0gaW4gcGhvdG9zIGFycmF5XG4gICAgZ2V0UGhvdG9zKCkge1xuICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkluIGdldFBob3Rvc1wiKTtcbiAgICAgICAgdGhpcy5waG90b3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgLy9nZXQgcHVibGljIHBob3RvcyB0aGF0IGFyZSBub3QgY29ubmVjdGVkIHRvIGEgZXZlbnRcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcltdPWZpbGVfUGVybWlzc2lvbixlcSxwdWJsaWMmZmlsdGVyW109ZXZlbnRfSWQsaXMsbnVsbCZvcmRlcj1jcmVhdGVkX2F0LGRlc2NcIjtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRmlsZXMubGVuZ3RoIGlzXCIgKyByLmZpbGVzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlbGxlciBcIiArIGkpO1xuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQaG90byhcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcnMvXCIgKyByLmZpbGVzW2ldLmZpbGVfVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS51c2VyX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5jcmVhdGVkX2F0XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyLmZpbGVzW2ldLmZpbGVfVVJMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRoZXJlIGFyZSBcIiArIHRoaXMucGhvdG9zLmxlbmd0aCArIFwiIHBob3RvcyBpbiBwaG90b3NcIik7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxufSJdfQ==