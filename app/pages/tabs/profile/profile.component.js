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
        this.isMale = true;
        this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + this.data.storage["avatar"];
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
                _this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + _this.data.storage["avatar"];
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
            _this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + "default-avatar.png";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxRTtBQUVyRSwwQ0FBeUQ7QUFHekQsNkNBQTRDO0FBRTVDLHdEQUF1RDtBQUN2RCxzREFBd0Q7QUFDeEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpEOzs7OztHQUtHO0FBT0g7SUFzQkk7Ozs7OztPQU1HO0lBQ0gsMEJBQW9CLE1BQWMsRUFBVSxJQUFVLEVBQVUsbUJBQXNDO1FBQWxGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUNsRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENB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aUI7T0E3QjdGLGdCQUFnQixDQXFONUI7SUFBRCx1QkFBQztDQUFBLEFBck5ELElBcU5DO0FBck5ZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvUGhvdG9cIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi4vdGFiLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvVXNlclwiO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvRGF0YVwiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL1NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCAqIGFzIGltYWdlcGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG52YXIgbGF5b3V0ID0gcmVxdWlyZShcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIik7XG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG4vKipcbiAqIFxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUHJvZmlsZUNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9maWxlLXRhYlwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUudGFiLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUtdGFiLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQge1xuXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICAgIHB1YmxpYyBwcm9mZXNzaW9uOiBzdHJpbmc7XG4gICAgcHVibGljIGxvY2F0aW9uOiBzdHJpbmc7XG4gICAgcHVibGljIGhvYmJ5OiBzdHJpbmc7XG4gICAgcHVibGljIGF2YXRhcjogc3RyaW5nO1xuICAgIHB1YmxpYyBiaXJ0aERhdGU6IHN0cmluZztcbiAgICBwdWJsaWMgZ2VuZGVyOiBzdHJpbmc7XG4gICAgcHVibGljIGlkOiBhbnk7XG4gICAgcHVibGljIHByb2ZpbGU6IGJvb2xlYW47XG4gICAgcHVibGljIHBob3RvczogYm9vbGVhbjtcbiAgICBwdWJsaWMgZWRpdGluZzogYm9vbGVhbjtcbiAgICBwdWJsaWMgbmV3RGF0YTogYW55O1xuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlcjtcbiAgICBwdWJsaWMgaXRlbTogYW55O1xuICAgIHB1YmxpYyBoYXNBdmF0YXI6IGJvb2xlYW47XG4gICAgcHVibGljIGlzTWFsZTogYm9vbGVhbjtcbiAgICBcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvZmlsZUNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIFxuICAgICAqIEBwYXJhbSB7RGF0YX0gZGF0YSBcbiAgICAgKiBAcGFyYW0ge0NoYW5nZURldGVjdG9yUmVmfSBfY2hhbmdlRGV0ZWN0aW9uUmVmIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhOiBEYXRhLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJmaXJzdE5hbWVcIl07XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImxhc3ROYW1lXCJdO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJpZFwiXTtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiZW1haWxcIl07XG4gICAgICAgIHRoaXMucHJvZmVzc2lvbiA9IHRoaXMuZGF0YS5zdG9yYWdlW1wicHJvZmVzc2lvblwiXTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHRoaXMuZGF0YS5zdG9yYWdlW1wibG9jYXRpb25cIl07XG4gICAgICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5kYXRhLnN0b3JhZ2VbXCJnZW5kZXJcIl07XG4gICAgICAgIHRoaXMuaXNNYWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdmF0YXIgPSBcImh0dHA6Ly8xODguMTY2LjEyNy4yMDc6ODAwMC91cGxvYWRzL2F2YXRhcnMvXCIgKyB0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXTtcbiAgICAgICAgdGhpcy5iaXJ0aERhdGUgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImRvYlwiXTtcbiAgICAgICAgdGhpcy5ob2JieSA9IHRoaXMuZGF0YS5zdG9yYWdlW1wiaG9iYnlcIl07XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5ld0RhdGEgPSB7XG4gICAgICAgICAgICBcImZpcnN0XCIgOiB0aGlzLmZpcnN0TmFtZSxcbiAgICAgICAgICAgIFwibGFzdFwiIDogdGhpcy5sYXN0TmFtZSxcbiAgICAgICAgICAgIFwiZ2VuZGVyXCIgOiB0aGlzLmdlbmRlcixcbiAgICAgICAgICAgIFwiYmRhdGVcIiA6IHRoaXMuYmlydGhEYXRlLFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiIDogdGhpcy5sb2NhdGlvbixcbiAgICAgICAgICAgIFwiaG9iYnlcIiA6IHRoaXMuaG9iYnksXG4gICAgICAgICAgICBcInByb2Zlc3Npb25cIiA6IHRoaXMucHJvZmVzc2lvblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgdGhpcy5jaGVja0F2YXRhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY2hlY2tBdmF0YXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXSA9PSBcImRlZmF1bHQtYXZhdGFyLnBuZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0F2YXRhciA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYXNBdmF0YXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIFByb2ZpbGVDb21wb25lbnRcbiAgICAgKi9cbiAgICBlZGl0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyb2YgUHJvZmlsZUNvbXBvbmVudFxuICAgICAqL1xuICAgIGNhbmNlbCgpIHsgXG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY2hhbmdlUGhvdG8oKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuc3RvcmFnZVtcImF2YXRhclwiXSA9PSBcImRlZmF1bHQtYXZhdGFyLnBuZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5HYWxsZXJ5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVBob3RvKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuR2FsbGVyeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0F2YXRhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgb3BlbkdhbGxlcnkoKSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmRhdGEuc3RvcmFnZVtcImlkXCJdO1xuICAgICAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiIFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGluZyhjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFydFNlbGVjdGluZyhjb250ZXh0KSB7XG4gICAgICAgIGxldCBfdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnRleHRcbiAgICAgICAgICAgIC5hdXRob3JpemUoKSBcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoc2VsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoYXQudXBsb2FkUGhvdG8oc2VsZWN0ZWQuZmlsZVVyaSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5oYXNBdmF0YXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApOyBcbiAgICAgICAgICAgICAgICBfdGhhdC5pdGVtID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIF90aGF0Ll9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpOyBcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVVcmkgXG4gICAgICogQHJldHVybnMgXG4gICAgICogQG1lbWJlcm9mIFByb2ZpbGVDb21wb25lbnRcbiAgICAgKi9cbiAgICB1cGxvYWRQaG90byhmaWxlVXJpOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnVwbG9hZFByb2ZpbFBob3RvKGZpbGVVcmksIHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0pLnRoZW4oKGZpbGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0b3JhZ2VbXCJhdmF0YXJcIl0gPSBmaWxlTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhciA9IFwiaHR0cDovLzE4OC4xNjYuMTI3LjIwNzo4MDAwL3VwbG9hZHMvYXZhdGFycy9cIiArIHRoaXMuZGF0YS5zdG9yYWdlW1wiYXZhdGFyXCJdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogXG4gICAgICogQHJldHVybnMgXG4gICAgICogQG1lbWJlcm9mIFByb2ZpbGVDb21wb25lbnRcbiAgICAgKi9cbiAgICBkZWxldGVQaG90bygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLmRlbGV0ZVBob3RvKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIHRoaXMuZGF0YS5zdG9yYWdlW1wiYXZhdGFyXCJdLCBcImF2YXRhclwiLCAwLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdG9yYWdlW1wiYXZhdGFyXCJdID0gXCJkZWZhdWx0LWF2YXRhci5wbmdcIjtcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyID0gXCJodHRwOi8vMTg4LjE2Ni4xMjcuMjA3OjgwMDAvdXBsb2Fkcy9hdmF0YXJzL1wiICsgXCJkZWZhdWx0LWF2YXRhci5wbmdcIjtcbiAgICAgICAgICAgIHRoaXMuaGFzQXZhdGFyID0gZmFsc2U7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBQcm9maWxlQ29tcG9uZW50XG4gICAgICovXG4gICAgY2hhbmdlR2VuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc01hbGUpIHtcbiAgICAgICAgICAgIHRoaXMubmV3RGF0YS5nZW5kZXIgPSBcIkZlbWFsZVwiO1xuICAgICAgICAgICAgdGhpcy5pc01hbGUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV3RGF0YS5nZW5kZXIgPSBcIk1hbGVcIjtcbiAgICAgICAgICAgIHRoaXMuaXNNYWxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyb2YgUHJvZmlsZUNvbXBvbmVudFxuICAgICAqL1xuICAgIHNhdmVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdEYXRhLmZpcnN0ICYmIHRoaXMubmV3RGF0YS5sYXN0KSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRoaXMubmV3RGF0YS5maXJzdDtcbiAgICAgICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLm5ld0RhdGEubGFzdDtcbiAgICAgICAgICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5uZXdEYXRhLmdlbmRlcjtcbiAgICAgICAgICAgIHRoaXMuYmlydGhEYXRlID0gdGhpcy5uZXdEYXRhLmJkYXRlO1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHRoaXMubmV3RGF0YS5sb2NhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuaG9iYnkgPSB0aGlzLm5ld0RhdGEuaG9iYnk7XG4gICAgICAgICAgICB0aGlzLnByb2Zlc3Npb24gPSB0aGlzLm5ld0RhdGEucHJvZmVzc2lvbjtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnNhdmVEZXRhaWxzKHRoaXMuZGF0YS5zdG9yYWdlW1wiaWRcIl0sIHRoaXMubmV3RGF0YS5maXJzdCwgdGhpcy5uZXdEYXRhLmxhc3QsIHRoaXMubmV3RGF0YS5nZW5kZXIsXG4gICAgICAgICAgICB0aGlzLm5ld0RhdGEuYmlydGhEYXRlLCB0aGlzLm5ld0RhdGEubG9jYXRpb24sIHRoaXMubmV3RGF0YS5ob2JieSwgdGhpcy5uZXdEYXRhLnByb2Zlc3Npb24pO1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIkZpZWxkcyBmaXJzdCBhbmQgbGFzdCBuYW1lIGNhbid0IGJlIGVtcHR5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19