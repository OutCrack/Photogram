"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("../../../shared/Photo");
var Server_1 = require("../../../shared/Server/Server");
var http = require("http");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.site = "http://188.166.127.207:5555/api.php/";
        console.log("In home constructor");
        this.getPhotos();
        this.server = new Server_1.Server();
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
        //var _server = new Server();
        //this.photos = _server.getPublicPhotos();
        //console.log("Have " + this.photos.length + " photos");
        var _this = this;
        //testing
        //console.log("In getPhotos");
        this.photos = new Array();
        //get public photos that are not connected to a event, are not in an album and are max 2 days old
        var limitDate = getLimitDate();
        var query = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null&filter[]=created_at,gt," + limitDate + "&filter[]=album_Name,is,null&order=created_at,desc";
        console.log("LIMIT DATE IN QUERY " + query);
        http.getJSON(query)
            .then(function (r) {
            //testing
            //console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, "users/" + r.files[i].user_Id + "/" + r.files[i].file_URL, r.files[i].user_Id, r.files[i].created_at));
                //testing
                //console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(function () {
            //testing
            //console.log("There are " + this.photos.length + " photos in photos");
        });
        //get string that represents the day before yesterday
        function getLimitDate() {
            var date = new Date();
            console.log("Date is " + date.toDateString());
            date.setDate(date.getDate() - 1);
            var dateString = date.getFullYear() + "-";
            var month = date.getMonth() + 1;
            if (month < 10) {
                dateString += "0" + month;
            }
            else {
                dateString += date.getMonth();
            }
            dateString += "-";
            if (date.getDay() < 10) {
                dateString += "0" + date.getDay();
            }
            else {
                dateString += date.getDay();
            }
            console.log("The date " + dateString);
            return dateString;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQywrQ0FBOEM7QUFFOUMsd0RBQXVEO0FBQ3ZELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQiwwRUFBd0U7QUFFeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUcsY0FBSyxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBUTVGO0lBUUk7UUFQQSxTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFRbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ1osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsVUFBVSxDQUFDO1lBQ1AsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWIsQ0FBQztJQUNELDhDQUE4QztJQUM5QyxpQ0FBUyxHQUFUO1FBQ0ksNkJBQTZCO1FBQzdCLDBDQUEwQztRQUMxQyx3REFBd0Q7UUFINUQsaUJBNERDO1FBdkRHLFNBQVM7UUFDVCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLGlHQUFpRztRQUNqRyxJQUFJLFNBQVMsR0FBVyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxHQUFHLHdH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aW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9TZXJ2ZXIvU2VydmVyXCI7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcblxucmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiICwgKCk9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG4gXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJob21lLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9ob21lL2hvbWUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsgXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5jc3NcIiBdXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCB7XG4gICAgc2l0ZTogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjU1NTUvYXBpLnBocC9cIjtcbiAgICAvL2ZvciBzdG9yaW5nIGZldGNoZWQgcGhvdG9zXG4gICAgcHVibGljIHBob3RvczogQXJyYXk8UGhvdG8+O1xuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcblxuICAgIFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW4gaG9tZSBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgdGhpcy5nZXRQaG90b3MoKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaEZlZWQoYXJncykge1xuICAgICAgICB0aGlzLmdldFBob3RvcygpO1xuICAgICAgICB2YXIgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIFxuICAgIH1cbiAgICAvL2dldCBwaG90b3MgZnJvbSBkYiwgcHV0IHRoZW0gaW4gcGhvdG9zIGFycmF5XG4gICAgZ2V0UGhvdG9zKCkge1xuICAgICAgICAvL3ZhciBfc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgICAgICAvL3RoaXMucGhvdG9zID0gX3NlcnZlci5nZXRQdWJsaWNQaG90b3MoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkhhdmUgXCIgKyB0aGlzLnBob3Rvcy5sZW5ndGggKyBcIiBwaG90b3NcIik7XG4gICAgICAgIFxuICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkluIGdldFBob3Rvc1wiKTtcbiAgICAgICAgdGhpcy5waG90b3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgLy9nZXQgcHVibGljIHBob3RvcyB0aGF0IGFyZSBub3QgY29ubmVjdGVkIHRvIGEgZXZlbnQsIGFyZSBub3QgaW4gYW4gYWxidW0gYW5kIGFyZSBtYXggMiBkYXlzIG9sZFxuICAgICAgICB2YXIgbGltaXREYXRlOiBzdHJpbmcgPSBnZXRMaW1pdERhdGUoKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcltdPWZpbGVfUGVybWlzc2lvbixlcSxwdWJsaWMmZmlsdGVyW109ZXZlbnRfSWQsaXMsbnVsbCZmaWx0ZXJbXT1jcmVhdGVkX2F0LGd0LFwiICsgbGltaXREYXRlICtcIiZmaWx0ZXJbXT1hbGJ1bV9OYW1lLGlzLG51bGwmb3JkZXI9Y3JlYXRlZF9hdCxkZXNjXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTElNSVQgREFURSBJTiBRVUVSWSBcIiArIHF1ZXJ5KTtcbiAgICAgICAgaHR0cC5nZXRKU09OKHF1ZXJ5KVxuICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgLy90ZXN0aW5nXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRmlsZXMubGVuZ3RoIGlzXCIgKyByLmZpbGVzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHIuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlbGxlciBcIiArIGkpO1xuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQaG90byhcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uZmlsZV9JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcnMvXCIgKyByLmZpbGVzW2ldLnVzZXJfSWQgK1wiL1wiICsgci5maWxlc1tpXS5maWxlX1VSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0udXNlcl9JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZmlsZXNbaV0uY3JlYXRlZF9hdFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC8vdGVzdGluZ1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coci5maWxlc1tpXS5maWxlX1VSTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvL3Rlc3RpbmdcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUaGVyZSBhcmUgXCIgKyB0aGlzLnBob3Rvcy5sZW5ndGggKyBcIiBwaG90b3MgaW4gcGhvdG9zXCIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vZ2V0IHN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGRheSBiZWZvcmUgeWVzdGVyZGF5XG4gICAgICAgIGZ1bmN0aW9uIGdldExpbWl0RGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0ZSBpcyBcIiArIGRhdGUudG9EYXRlU3RyaW5nKCkpO1xuICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpLTEpO1xuICAgICAgICAgICAgdmFyIGRhdGVTdHJpbmcgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIjtcbiAgICAgICAgICAgIHZhciBtb250aDogbnVtYmVyID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIjBcIiArIG1vbnRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gXCItXCI7XG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXREYXkoKSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIjBcIiArIGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkYXRlIFwiICsgZGF0ZVN0cmluZyk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICAgICAgfVxuICAgICAgIFxuICAgIH1cblxufSJdfQ==