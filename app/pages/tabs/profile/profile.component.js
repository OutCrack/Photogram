"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Data_1 = require("../../../shared/Data");
var Server_1 = require("../../../shared/Server/Server");
var imagepicker = require("nativescript-imagepicker");
var http = require("http");
var layout = require("ui/layouts/grid-layout");
var firebase = require("nativescript-plugin-firebase");
/**
 *
 *
 * @export
 * @class ProfileComponent
 */
var ProfileComponent = /** @class */ (function () {
    /**
     * Creates an instance of ProfileComponent.
     * @param {Router} router
     * @param {Data} data
     * @param {ChangeDetectorRef} _changeDetectionRef
     * @memberof ProfileComponent
     */
    function ProfileComponent(router, data, _changeDetectionRef) {
        this.router = router;
        this.data = data;
        this._changeDetectionRef = _changeDetectionRef;
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        this.profession = this.data.storage["profession"];
        this.location = this.data.storage["location"];
        this.gender = this.data.storage["gender"];
        if (this.data.storage["provider1"] == "google.com") {
            this.google = true;
        }
        else if (this.data.storage["provider1"] == "facebook.com") {
            this.facebook = true;
        }
        else {
            this.password = true;
        }
        this.isMale = true;
        this.avatar = "http://188.166.127.207/uploads/avatars/" + this.data.storage["avatar"];
        this.birthDate = this.data.storage["dob"];
        this.hobby = this.data.storage["hobby"];
        this.editing = false;
        this.newData = {
            "first": this.firstName,
            "last": this.lastName,
            "gender": this.gender,
            "bdate": this.birthDate,
            "location": this.location,
            "hobby": this.hobby,
            "profession": this.profession
        };
        this.server = new Server_1.Server();
        this.checkAvatar();
    }
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.checkAvatar = function () {
        if (this.data.storage["avatar"] == "default-avatar.png") {
            this.hasAvatar = false;
        }
        else {
            this.hasAvatar = true;
        }
    };
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.editData = function () {
        this.editing = true;
    };
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.cancel = function () {
        this.editing = false;
    };
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.changePhoto = function () {
        var _this = this;
        if (this.data.storage["avatar"] == "default-avatar.png") {
            this.openGallery();
        }
        else {
            this.deletePhoto().then(function () {
                _this.openGallery();
            });
        }
        this.checkAvatar();
    };
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.openGallery = function () {
        this.id = this.data.storage["id"];
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelecting(context);
    };
    /**
     *
     *
     * @private
     * @param {any} context
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.startSelecting = function (context) {
        var _that = this;
        context
            .authorize()
            .then(function () {
            return context.present();
        })
            .then(function (selection) {
            selection.forEach(function (selected) {
                _that.uploadPhoto(selected.fileUri).then(function () {
                    _that.hasAvatar = true;
                });
            });
            _that.item = selection;
            _that._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    };
    /**
     *
     *
     * @param {string} fileUri
     * @returns
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.uploadPhoto = function (fileUri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.server.uploadProfilPhoto(fileUri, _this.data.storage["id"]).then(function (fileName) {
                _this.data.storage["avatar"] = fileName;
                _this.avatar = "http://188.166.127.207/uploads/avatars/" + _this.data.storage["avatar"];
            });
            resolve();
        });
    };
    /**
     *
     *
     * @returns
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.deletePhoto = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.server.deletePhoto(_this.data.storage["id"], _this.data.storage["avatar"], "avatar", 0, null, null);
            _this.data.storage["avatar"] = "default-avatar.png";
            _this.avatar = "http://188.166.127.207/uploads/avatars/" + "default-avatar.png";
            _this.hasAvatar = false;
            resolve();
        });
    };
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.changeGender = function () {
        if (this.isMale) {
            this.newData.gender = "Female";
            this.isMale = false;
        }
        else {
            this.newData.gender = "Male";
            this.isMale = true;
        }
    };
    /**
     *
     *
     * @memberof ProfileComponent
     */
    ProfileComponent.prototype.saveData = function () {
        if (this.newData.first && this.newData.last) {
            this.firstName = this.newData.first;
            this.lastName = this.newData.last;
            this.gender = this.newData.gender;
            this.birthDate = this.newData.bdate;
            this.location = this.newData.location;
            this.hobby = this.newData.hobby;
            this.profession = this.newData.profession;
            this.server.saveDetails(this.data.storage["id"], this.newData.first, this.newData.last, this.newData.gender, this.newData.birthDate, this.newData.location, this.newData.hobby, this.newData.profession);
            this.editing = false;
        }
        else {
            alert("Fields first and last name can't be empty");
        }
    };
    ProfileComponent.prototype.addFacebook = function () {
        // det er en feil med provider her
        var provider = new firebase.auth.FacebookAuthProvider();
        alert(provider);
        firebase.auth.currentUser.linkWithRedirect(provider).then(function (result) {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            this.facebook = true;
            // ...
        }).catch(function (error) {
            alert(error);
        });
    };
    ProfileComponent.prototype.addGoogle = function () {
        alert("Adding google account");
    };
    ProfileComponent.prototype.addPassword = function () {
        var provider = new firebase.auth();
        alert(provider);
        //alert("Adding password");
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "profile-tab",
            templateUrl: "./pages/tabs/profile/profile.tab.html",
            styleUrls: ["./pages/tabs/profile/profile-tab.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, Data_1.Data, core_1.ChangeDetectorRef])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxRTtBQUVyRSwwQ0FBeUQ7QUFHekQsNkNBQTRDO0FBRTVDLHdEQUF1RDtBQUN2RCxzREFBd0Q7QUFDeEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpEOzs7OztHQUtHO0FBT0g7SUF5Qkk7Ozs7OztPQU1HO0lBQ0gsMEJBQW9CLE1BQWMsRUFBVSxJQUFVLEVBQVUsbUJBQXNDO1FBQWxGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUNsRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENB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LEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztTQUN0RCxDQUFDO3lDQWtDOEIsZUFBTSxFQUFnQixXQUFJLEVBQStCLHdCQUFpQjtPQWhDN0YsZ0JBQWdCLENBd1A1QjtJQUFELHVCQUFDO0NBQUEsQUF4UEQsSUF3UEM7QUF4UFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9QaG90b1wiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gXCIuLi90YWIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9Vc2VyXCI7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9EYXRhXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvU2VydmVyL1NlcnZlclwiO1xuaW1wb3J0ICogYXMgaW1hZ2VwaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiKTtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbi8qKlxuICogXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQcm9maWxlQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInByb2ZpbGUtdGFiXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy90YWJzL3Byb2ZpbGUvcHJvZmlsZS50YWIuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9wYWdlcy90YWJzL3Byb2ZpbGUvcHJvZmlsZS10YWIuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgZmlyc3ROYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGxhc3ROYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gICAgcHVibGljIHByb2Zlc3Npb246IHN0cmluZztcbiAgICBwdWJsaWMgbG9jYXRpb246IHN0cmluZztcbiAgICBwdWJsaWMgaG9iYnk6IHN0cmluZztcbiAgICBwdWJsaWMgYXZhdGFyOiBzdHJpbmc7XG4gICAgcHVibGljIGJpcnRoRGF0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBnZW5kZXI6IHN0cmluZztcbiAgICBwdWJsaWMgaWQ6IGFueTtcbiAgICBwdWJsaWMgcHJvZmlsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgcGhvdG9zOiBib29sZWFuO1xuICAgIHB1YmxpYyBlZGl0aW5nOiBib29sZWFuO1xuICAgIHB1YmxpYyBuZXdEYXRhOiBhbnk7XG4gICAgcHVibGljIHNlcnZlcjogU2VydmVyO1xuICAgIHB1YmxpYyBpdGVtOiBhbnk7XG4gICAgcHVibGljIGhhc0F2YXRhcjogYm9vbGVhbjtcbiAgICBwdWJsaWMgaXNNYWxlOiBib29sZWFuO1xuICAgIHB1YmxpYyBwYXNzd29yZDogYm9vbGVhbjtcbiAgICBwdWJsaWMgZmFjZWJvb2s6IGJvb2xlYW47XG4gICAgcHVibGljIGdvb2dsZTogYm9vbGVhbjtcbiAgICBcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvZmlsZUNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIFxuICAgICAqIEBwYXJhbSB7RGF0YX0gZGF0YSBcbiAgICAgKiBAcGFyYW0ge0NoYW5nZURldGVjdG9yUmVmfSBfY2hhbmdlRGV0ZWN0aW9uUmVmIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhOiBEYXRhLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJmaXJzdE5hbWVcIl07XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImxhc3ROYW1lXCJdO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZW1haWxcIl07XG4gICAgICAgIHRoaXMucHJvZmVzc2lvbiA9IHRoaXMuZGF0YS5zdG9yYWdlW1wicHJvZmVzc2lvblwiXTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHRoaXMuZGF0YS5zdG9yYWdlW1wibG9jYXRpb25cIl07XG4gICAgICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJnZW5kZXJcIl07XG4gICAgICAgIGlmICh0aGlzLmRhdGEuc3RvcmFnZVtcInByb3ZpZGVyMVwiXSA9PSBcImdvb2dsZS5jb21cIikge1xuICAgICAgICAgICAgdGhpcy5nb29nbGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5zdG9yYWdlW1wicHJvdmlkZXIxXCJdID09IFwiZmFjZWJvb2suY29tXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZWJvb2sgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc01hbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmF2YXRhciA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNy91cGxvYWRzL2F2YXRhcnMvXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXTtcbiAgICAgICAgdGhpcy5iaXJ0aERhdGUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImRvYlwiXTtcbiAgICAgICAgdGhpcy5ob2JieSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaG9iYnlcIl07XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5ld0RhdGEgPSB7XG4gICAgICAgICAgICBcImZpcnN0XCIgOiB0aGlzLmZpcnN0TmFtZSxcbiAgICAgICAgICAgIFwibGFzdFwiIDogdGhpcy5sYXN0TmFtZSxcbiAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiB0aGlzLmdlbmRlcixcbiAgICAgICAgICAgIFwiYmRhdGVcIiA6IHRoaXMuYmlydGhEYXRlLFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogdGhpcy5sb2NhdGlvbixcbiAgICAgICAgICAgIFwiaG9iYnlcIiA6IHRoaXMuaG9iYnksXG4gICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHRoaXMucHJvZmVzc2lvblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5jaGVja0F2YXRhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY2hlY2tBdmF0YXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXSA9PSBcImRlZmF1bHQtYXZhdGFyLnBuZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0F2YXRhciA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYXNBdmF0YXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIFByb2ZpbGVDb21wb25lbnRcbiAgICAgKi9cbiAgICBlZGl0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyb2YgUHJvZmlsZUNvbXBvbmVudFxuICAgICAqL1xuICAgIGNhbmNlbCgpIHsgXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY2hhbmdlUGhvdG8oKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXSA9PSBcImRlZmF1bHQtYXZhdGFyLnBuZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5HYWxsZXJ5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVBob3RvKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuR2FsbGVyeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0F2YXRhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgb3BlbkdhbGxlcnkoKSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiIFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGluZyhjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFydFNlbGVjdGluZyhjb250ZXh0KSB7XG4gICAgICAgIGxldCBfdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnRleHRcbiAgICAgICAgICAgIC5hdXRob3JpemUoKSBcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoYXQudXBsb2FkUGhvdG8oc2VsZWN0ZWQuZmlsZVVyaSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5oYXNBdmF0YXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApOyBcbiAgICAgICAgICAgICAgICBfdGhhdC5pdGVtID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIF90aGF0Ll9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpOyBcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVcmkgXG4gICAgICogQHJldHVybnMgXG4gICAgICogQG1lbWJlcm9mIFByb2ZpbGVDb21wb25lbnRcbiAgICAgKi9cbiAgICB1cGxvYWRQaG90byhmaWxlVXJpOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnVwbG9hZFByb2ZpbFBob3RvKGZpbGVVcmksIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pLnRoZW4oKGZpbGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0b3JhZ2VbXCJhdmF0YXJcIl0gPSBmaWxlTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhciA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNy91cGxvYWRzL2F2YXRhcnMvXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgZGVsZXRlUGhvdG8oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci5kZWxldGVQaG90byh0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdLCB0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXSwgXCJhdmF0YXJcIiwgMCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXSA9IFwiZGVmYXVsdC1hdmF0YXIucG5nXCI7XG4gICAgICAgICAgICB0aGlzLmF2YXRhciA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNy91cGxvYWRzL2F2YXRhcnMvXCIgKyBcImRlZmF1bHQtYXZhdGFyLnBuZ1wiO1xuICAgICAgICAgICAgdGhpcy5oYXNBdmF0YXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIFByb2ZpbGVDb21wb25lbnRcbiAgICAgKi9cbiAgICBjaGFuZ2VHZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTWFsZSkge1xuICAgICAgICAgICAgdGhpcy5uZXdEYXRhLmdlbmRlciA9IFwiRmVtYWxlXCI7XG4gICAgICAgICAgICB0aGlzLmlzTWFsZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdEYXRhLmdlbmRlciA9IFwiTWFsZVwiO1xuICAgICAgICAgICAgdGhpcy5pc01hbGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgc2F2ZURhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld0RhdGEuZmlyc3QgJiYgdGhpcy5uZXdEYXRhLmxhc3QpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5uZXdEYXRhLmZpcnN0O1xuICAgICAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRoaXMubmV3RGF0YS5sYXN0O1xuICAgICAgICAgICAgdGhpcy5nZW5kZXIgPSB0aGlzLm5ld0RhdGEuZ2VuZGVyO1xuICAgICAgICAgICAgdGhpcy5iaXJ0aERhdGUgPSB0aGlzLm5ld0RhdGEuYmRhdGU7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uID0gdGhpcy5uZXdEYXRhLmxvY2F0aW9uO1xuICAgICAgICAgICAgdGhpcy5ob2JieSA9IHRoaXMubmV3RGF0YS5ob2JieTtcbiAgICAgICAgICAgIHRoaXMucHJvZmVzc2lvbiA9IHRoaXMubmV3RGF0YS5wcm9mZXNzaW9uO1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuc2F2ZURldGFpbHModGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXSwgdGhpcy5uZXdEYXRhLmZpcnN0LCB0aGlzLm5ld0RhdGEubGFzdCwgdGhpcy5uZXdEYXRhLmdlbmRlcixcbiAgICAgICAgICAgIHRoaXMubmV3RGF0YS5iaXJ0aERhdGUsIHRoaXMubmV3RGF0YS5sb2NhdGlvbiwgdGhpcy5uZXdEYXRhLmhvYmJ5LCB0aGlzLm5ld0RhdGEucHJvZmVzc2lvbik7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRmllbGRzIGZpcnN0IGFuZCBsYXN0IG5hbWUgY2FuJ3QgYmUgZW1wdHlcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRGYWNlYm9vaygpIHtcbiAgICAgICAgLy8gZGV0IGVyIGVuIGZlaWwgbWVkIHByb3ZpZGVyIGhlclxuICAgICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5GYWNlYm9va0F1dGhQcm92aWRlcigpO1xuICAgICAgICBhbGVydChwcm92aWRlcik7XG4gICAgICAgIGZpcmViYXNlLmF1dGguY3VycmVudFVzZXIubGlua1dpdGhSZWRpcmVjdChwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIEFjY291bnRzIHN1Y2Nlc3NmdWxseSBsaW5rZWQuXG4gICAgICAgICAgICB2YXIgY3JlZGVudGlhbCA9IHJlc3VsdC5jcmVkZW50aWFsO1xuICAgICAgICAgICAgdmFyIHVzZXIgPSByZXN1bHQudXNlcjtcbiAgICAgICAgICAgIHRoaXMuZmFjZWJvb2sgPSB0cnVlO1xuICAgICAgICAgICAgLy8gLi4uXG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRHb29nbGUoKSB7XG4gICAgICAgIGFsZXJ0KFwiQWRkaW5nIGdvb2dsZSBhY2NvdW50XCIpO1xuICAgIH1cblxuICAgIGFkZFBhc3N3b3JkKCkge1xuICAgICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aCgpO1xuICAgICAgICBhbGVydChwcm92aWRlcik7XG4gICAgICAgIC8vYWxlcnQoXCJBZGRpbmcgcGFzc3dvcmRcIik7XG4gICAgfVxuXG59Il19