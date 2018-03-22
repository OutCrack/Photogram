"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var imagepicker = require("nativescript-imagepicker");
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(_changeDetectionRef) {
        this._changeDetectionRef = _changeDetectionRef;
        this.items = [];
    }
    GalleryComponent.prototype.openGallery = function () {
        var context = imagepicker.create({
            mode: "single" //"multiple"
        });
        this.startSelecting(context);
    };
    GalleryComponent.prototype.startSelecting = function (context) {
        var _that = this;
        console.log("in Gallery constructor");
        context
            .authorize()
            .then(function () {
            _that.items = [];
            return context.present();
        })
            .then(function (selection) {
            selection.forEach(function (selected) {
                console.log("----------------");
                console.log("uri: " + selected.uri);
                console.log("fileUri: " + selected.fileUri);
            });
            _that.items = selection;
            _that._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    };
    GalleryComponent = __decorate([
        core_1.Component({
            selector: "gallery-tab",
            templateUrl: "./pages/tabs/gallery/gallery.tab.html"
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], GalleryComponent);
    return GalleryComponent;
}());
exports.GalleryComponent = GalleryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBd0Q7QUFPeEQ7SUFJSSwwQkFBb0IsbUJBQXNDO1FBQXRDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFGMUQsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUdYLENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQ0ksSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLEVBQUUsUUFBUSxDQUFDLFlBQVk7U0FDOUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8seUNBQWMsR0FBdEIsVUFBdUIsT0FBTztRQUMxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RDLE9BQU87YUFDRixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUM7WUFDRixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFDLFNBQVM7WUFDWixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQ0osQ0FBQztZQUNFLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFuQ1EsZ0JBQWdCO1FBSjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsdUNBQXVDO1NBQ3ZELENBQUM7eUNBSzJDLHdCQUFpQjtPQUpqRCxnQkFBZ0IsQ0FzQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGltYWdlcGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYWxsZXJ5LXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9nYWxsZXJ5L2dhbGxlcnkudGFiLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5Q29tcG9uZW50IHtcblxuICAgIGl0ZW1zID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgb3BlbkdhbGxlcnkoKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZGU6IFwic2luZ2xlXCIgLy9cIm11bHRpcGxlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhcnRTZWxlY3RpbmcoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGFydFNlbGVjdGluZyhjb250ZXh0KSB7XG4gICAgICAgIGxldCBfdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gR2FsbGVyeSBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgY29udGV4dFxuICAgICAgICAgICAgLmF1dGhvcml6ZSgpIFxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgX3RoYXQuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHNlbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cmk6IFwiICsgc2VsZWN0ZWQudXJpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWxlVXJpOiBcIiArIHNlbGVjdGVkLmZpbGVVcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7IFxuICAgICAgICAgICAgICAgIF90aGF0Lml0ZW1zID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIF90aGF0Ll9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpOyBcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbn0iXX0=