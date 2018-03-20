"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../model/Photo");
var http = require("http");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.site = "http://188.166.127.207:5555/api.php/";
        console.log("In home constructor");
        this.getPhotos();
    }
    //get photos from db, put them in photos array
    HomeComponent.prototype.getPhotos = function () {
        var _this = this;
        //testing
        console.log("In getPhotos");
        this.photos = new Array();
        //get public photos that are not connected to a event
        var query = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&order=created_at,desc";
        http.getJSON(query)
            .then(function (r) {
            //testing
            console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].file_URL, r.files[i].user_Id, r.files[i].created_at));
                //testing
                console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(function () {
            //testing
            console.log("There are " + _this.photos.length + " photos in photos");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyx3Q0FBdUM7QUFFdkMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBUTNCO0lBS0k7UUFKQSxTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFLbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsOENBQThDO0lBQzlDLGlDQUFTLEdBQVQ7UUFBQSxpQkE4QkM7UUE3QkcsU0FBUztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLHFEQUFxRDtRQUNyRCxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxHQUFHLHNHQUFzRyxDQUFDO1FBQ3ZJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2FBQ2xCLElBQUksQ0FBQyxVQUFDLENBQUM7WUFDSixTQUFTO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNaLElBQUksYUFBSyxDQUNMLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUNsQixRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQzlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUNsQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FDeEIsQ0FDSixDQUFBO2dCQUNELFNBQVM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBVSxDQUFDO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixTQUFTO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUF6Q1EsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBRSxnQ0FBZ0MsQ0FBRTtTQUNsRCxDQUFDOztPQUVXLGFBQWEsQ0EyQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztBQTNDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi9tb2RlbC9QaG90b1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbC9Vc2VyXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsgXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5jc3NcIiBdXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCB7XG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcbiAgICAvL2ZvciBzdG9yaW5nIGZldGNoZWQgcGhvdG9zXG4gICAgcHVibGljIHBob3RvczogQXJyYXk8UGhvdG8+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW4gaG9tZSBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgdGhpcy5nZXRQaG90b3MoKTtcbiAgICB9XG5cbiAgICAvL2dldCBwaG90b3MgZnJvbSBkYiwgcHV0IHRoZW0gaW4gcGhvdG9zIGFycmF5XG4gICAgZ2V0UGhvdG9zKCkge1xuICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBnZXRQaG90b3NcIik7XG4gICAgICAgIHRoaXMucGhvdG9zID0gbmV3IEFycmF5KCk7XG4gICAgICAgIC8vZ2V0IHB1YmxpYyBwaG90b3MgdGhhdCBhcmUgbm90IGNvbm5lY3RlZCB0byBhIGV2ZW50XG4gICAgICAgIHZhciBxdWVyeTogc3RyaW5nID0gdGhpcy5zaXRlICsgXCJmaWxlcz90cmFuc2Zvcm09MSZmaWx0ZXJbXT1maWxlX1Blcm1pc3Npb24sZXEscHVibGljJmZpbHRlcltdPWV2ZW50X0lkLGlzLG51bGwmb3JkZXI9Y3JlYXRlZF9hdCxkZXNjXCI7XG4gICAgICAgIGh0dHAuZ2V0SlNPTihxdWVyeSlcbiAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlcy5sZW5ndGggaXNcIiArIHIuZmlsZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgci5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGVsbGVyIFwiICsgaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5waG90b3MucHVzaChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFBob3RvKFxuICAgICAgICAgICAgICAgICAgICAgICAgci5maWxlc1tpXS5maWxlX0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2Vycy9cIiArIHIuZmlsZXNbaV0uZmlsZV9VUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLnVzZXJfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmNyZWF0ZWRfYXRcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyLmZpbGVzW2ldLmZpbGVfVVJMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBhcmUgXCIgKyB0aGlzLnBob3Rvcy5sZW5ndGggKyBcIiBwaG90b3MgaW4gcGhvdG9zXCIpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbn0iXX0=