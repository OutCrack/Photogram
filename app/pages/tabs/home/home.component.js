"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Photo_1 = require("./Photo");
var http = require("http");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.site = "http://188.166.127.207:5555/api.php/";
        this.prefix = "http://188.166.127.207:8000/uploads/users/";
        this.numbers = 4;
        console.log("In home constructor");
        this.getPhotos();
    }
    HomeComponent.prototype.getPhotos = function () {
        var _this = this;
        console.log("In getPhotos");
        this.photos = new Array();
        var query = this.site + "files?transform=1&filter[]=file_Permission,eq,public&filter[]=event_Id,is,null";
        http.getJSON(query)
            .then(function (r) {
            console.log("Files.length is" + r.files.length);
            for (var i = 0; i < r.files.length; i++) {
                console.log("teller " + i);
                _this.photos.push(new Photo_1.Photo(r.files[i].file_Id, r.files[i].file_URL));
                console.log(r.files[i].file_URL);
            }
        }, function (e) {
            console.log(e);
        }).then(function () {
            console.log("There are " + _this.photos.length + " photos in photos");
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home-tab",
            templateUrl: "./pages/tabs/home/home.tab.html"
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxpQ0FBZ0M7QUFDaEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTzNCO0lBVUk7UUFUQSxTQUFJLEdBQVcsc0NBQXNDLENBQUM7UUFDdEQsV0FBTSxHQUFXLDRDQUE0QyxDQUFBO1FBTXRELFlBQU8sR0FBRyxDQUFDLENBQUM7UUFHZixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQUEsaUJBd0JDO1FBdkJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0ZBQWdGLENBQUM7UUFDakgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDbEIsSUFBSSxDQUFDLFVBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDWixJQUFJLGFBQUssQ0FDTCxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFDbEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQ3RCLENBQ0osQ0FBQTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNMLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUNBLENBQUE7SUFFTCxDQUFDO0lBdkNRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxpQ0FBaUM7U0FDakQsQ0FBQzs7T0FFVyxhQUFhLENBeUN6QjtJQUFELG9CQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiLi9QaG90b1wiO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaG9tZS10YWJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLnRhYi5odG1sXCJcbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHtcbiAgICBzaXRlOiBzdHJpbmcgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6NTU1NS9hcGkucGhwL1wiO1xuICAgIHByZWZpeDogc3RyaW5nID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjgwMDAvdXBsb2Fkcy91c2Vycy9cIlxuICAgIHB1YmxpYyBwaG90b3M6IEFycmF5PFBob3RvPjtcbiAgICBwdWJsaWMgaW1hZ2U6IHN0cmluZztcbiAgICBwdWJsaWM6IHN0cmluZztcbiAgICBwdWJsaWMgaW1hZ2UxOiBzdHJpbmc7XG4gICAgcHVibGljIGltYWdlMjogc3RyaW5nO1xuICAgIHB1YmxpYyBudW1iZXJzID0gNDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluIGhvbWUgY29uc3RydWN0b3JcIik7XG4gICAgICAgIHRoaXMuZ2V0UGhvdG9zKCk7XG4gICAgfVxuXG4gICAgZ2V0UGhvdG9zKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluIGdldFBob3Rvc1wiKTtcbiAgICAgICAgdGhpcy5waG90b3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdmFyIHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLnNpdGUgKyBcImZpbGVzP3RyYW5zZm9ybT0xJmZpbHRlcltdPWZpbGVfUGVybWlzc2lvbixlcSxwdWJsaWMmZmlsdGVyW109ZXZlbnRfSWQsaXMsbnVsbFwiO1xuICAgICAgICBodHRwLmdldEpTT04ocXVlcnkpXG4gICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGVzLmxlbmd0aCBpc1wiICsgci5maWxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZWxsZXIgXCIgKyBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBob3Rvcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUGhvdG8oXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByLmZpbGVzW2ldLmZpbGVfVVJMXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coci5maWxlc1tpXS5maWxlX1VSTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIGFyZSBcIiArIHRoaXMucGhvdG9zLmxlbmd0aCArIFwiIHBob3RvcyBpbiBwaG90b3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICB9XG5cbn0iXX0=