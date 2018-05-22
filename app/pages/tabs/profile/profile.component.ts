import { Component, ChangeDetectorRef } from "@angular/core";
import { Photo } from "../../../shared/Photo";
import { Router, ActivatedRoute } from "@angular/router";
import { TabComponent } from "../tab.component";
import { User } from "../../../shared/User";
import { Data } from "../../../shared/Data";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { Server } from "../../../shared/Server/Server";
import * as imagepicker from "nativescript-imagepicker";
var http = require("http");
var layout = require("ui/layouts/grid-layout");
const firebase = require("nativescript-plugin-firebase");

/**
 * 
 * 
 * @export
 * @class ProfileComponent
 */
@Component({
    selector: "profile-tab",
    templateUrl: "./pages/tabs/profile/profile.tab.html",
    styleUrls: ["./pages/tabs/profile/profile-tab.css"]
})

export class ProfileComponent {

    public firstName: string;
    public lastName: string;
    public email: string;
    public profession: string;
    public location: string;
    public hobby: string;
    public avatar: string;
    public birthDate: string;
    public gender: string;
    public id: any;
    public profile: boolean;
    public photos: boolean;
    public editing: boolean;
    public newData: any;
    public server: Server;
    public item: any;
    public hasAvatar: boolean;
    public isMale: boolean;
    

    /**
     * Creates an instance of ProfileComponent.
     * @param {Router} router 
     * @param {Data} data 
     * @param {ChangeDetectorRef} _changeDetectionRef 
     * @memberof ProfileComponent
     */
    constructor(private router: Router, private data: Data, private _changeDetectionRef: ChangeDetectorRef) {
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        this.profession = this.data.storage["profession"];
        this.location = this.data.storage["location"];
        this.gender = this.data.storage["gender"];
        this.isMale = this.data.storage["gender"].toLowerCase() == "male" ? true : false;
        this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + this.data.storage["avatar"];
        this.birthDate = this.data.storage["dob"];
        this.hobby = this.data.storage["hobby"];
        this.editing = false;
        this.newData = {
            "first" : this.firstName,
            "last" : this.lastName,
            "gender" : this.gender,
            "bdate" : this.birthDate,
            "location" : this.location,
            "hobby" : this.hobby,
            "profession" : this.profession
        };
        this.server = new Server();
        this.checkAvatar();
    }

    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    checkAvatar() {
        if (this.data.storage["avatar"] == "default-avatar.png") {
            this.hasAvatar = false;
        } else {
            this.hasAvatar = true;
        }
    }

    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    editData() {
        this.editing = true;
    }

    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    cancel() { 
        this.editing = false;
    }

    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    changePhoto() {
        if (this.data.storage["avatar"] == "default-avatar.png") {
            this.openGallery();
        } else {
            this.deletePhoto().then(() => {
                this.openGallery();
            });
        }
        this.checkAvatar();
    }

    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    openGallery() {
        this.id = this.data.storage["id"];
        let context = imagepicker.create({
            mode: "single" 
        });
        this.startSelecting(context);
    }

    /**
     * 
     * 
     * @private
     * @param {any} context 
     * @memberof ProfileComponent
     */
    private startSelecting(context) {
        let _that = this;
        context
            .authorize() 
            .then(function() {
                return context.present();
            })
            .then((selection) => {
                selection.forEach(function(selected) {
                    _that.uploadPhoto(selected.fileUri).then(() => {
                        _that.hasAvatar = true;
                    });
                }
            ); 
                _that.item = selection;
                _that._changeDetectionRef.detectChanges(); 
            }).catch(function(e) {
                console.log(e);
            })
    }

    /**
     * 
     * 
     * @param {string} fileUri 
     * @returns 
     * @memberof ProfileComponent
     */
    uploadPhoto(fileUri: string) {
        return new Promise((resolve, reject) => {
            this.server.uploadProfilPhoto(fileUri, this.data.storage["id"]).then((fileName) => {
                this.data.storage["avatar"] = fileName;
                this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + this.data.storage["avatar"];
            })
            resolve();
        });
    }

    /**
     * 
     * 
     * @returns 
     * @memberof ProfileComponent
     */
    deletePhoto() {
        return new Promise((resolve, reject) => {
            this.server.deletePhoto(this.data.storage["id"], this.data.storage["avatar"], "avatar", 0, null, null);
            this.data.storage["avatar"] = "default-avatar.png";
            this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + "default-avatar.png";
            this.hasAvatar = false;
            resolve();
        });
    }

    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    changeGender() {
        if (this.isMale) {
            this.newData.gender = "Female";
            this.isMale = false;
        } else {
            this.newData.gender = "Male";
            this.isMale = true;
        }
    }
    
    /**
     * 
     * 
     * @memberof ProfileComponent
     */
    saveData() {
        if (this.newData.first && this.newData.last) {
            this.firstName = this.newData.first;
            this.lastName = this.newData.last;
            this.gender = this.newData.gender;
            this.birthDate = this.newData.bdate;
            this.location = this.newData.location;
            this.hobby = this.newData.hobby;
            this.profession = this.newData.profession;
            this.server.saveDetails(this.data.storage["id"], this.newData.first, this.newData.last, this.newData.gender,
            this.newData.birthDate, this.newData.location, this.newData.hobby, this.newData.profession);
            this.editing = false;
        } else {
            alert("Fields first and last name can't be empty");
        }
    }

}