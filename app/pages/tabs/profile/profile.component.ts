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
    public selectedPhoto: string;
    site: string = "http://188.166.127.207:5555/api.php/";
    public myPhotos: Array<Photo>;
    public photoUrl: string;
    public photoCreated: string;
    public editing: boolean;
    public newData: any;
    public server: Server;
    public item: any;
    public hasAvatar: boolean;
    

    constructor(private router: Router, private data: Data, private _changeDetectionRef: ChangeDetectorRef) {
        this.firstName = this.data.storage["firstName"];
        this.lastName = this.data.storage["lastName"];
        this.id = this.data.storage["id"];
        this.email = this.data.storage["email"];
        this.profession = this.data.storage["profession"];
        this.location = this.data.storage["location"];
        this.gender = this.data.storage["gender"];
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

    checkAvatar() {
        if (this.data.storage["avatar"] == "default-avatar.png") {
            this.hasAvatar = false;
        } else {
            this.hasAvatar = true;
        }
    }

    editData() {
        this.editing = true;
    }
    cancel() { 
        this.editing = false;
    }

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

    openGallery() {
        this.id = this.data.storage["id"];
        //console.log(this.getTimeStamp());
        //console.log("Id " + this.id);
        let context = imagepicker.create({
            mode: "single" 
        });
        this.startSelecting(context);
    }

    private startSelecting(context) {
        let _that = this;
        console.log("in Gallery constructor");
        context
            .authorize() 
            .then(function() {
                //_that.items = [];
                return context.present();
            })
            .then((selection) => {
                selection.forEach(function(selected) {
                    console.log("----------------");
                    console.log("uri: " + selected.uri);
                    console.log("fileUri: " + selected.fileUri);
                    _that.uploadPhoto(selected.fileUri);
                    //this is not file name - must relog to see the changes
                    _that.data.storage["avatar"] = "img" + selected.fileUri + ".jpg";
                    _that.avatar = "http://188.166.127.207:8000/uploads/avatars/" + _that.data.storage["avatar"];
                }
            ); 
                _that.item = selection;
                _that._changeDetectionRef.detectChanges(); 
            }).catch(function(e) {
                console.log(e);
            })
    }

    uploadPhoto(fileUri: string) {
        this.server.uploadProfilPhoto(fileUri, this.data.storage["id"]);
        this.hasAvatar = true;
    }

    deletePhoto() {
        return new Promise((resolve, reject) => {
            console.log("Deleting photo " + this.data.storage["id"] + this.data.storage["avatar"]);
            this.server.deleteProfilePhoto(this.data.storage["id"], this.data.storage["avatar"]);
            this.data.storage["avatar"] = "default-avatar.png";
            this.avatar = "http://188.166.127.207:8000/uploads/avatars/" + "default-avatar.png";
            this.hasAvatar = false;
            resolve();
        });
    }
    
    saveData() {
        console.log(this.firstName);
        console.log(this.lastName);
        if (this.newData.first && this.newData.last) {
            console.log("OK");
            console.log(this.newData.first + " " + this.newData.last);
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
    //logs out from both Google+ and Facebook accounts
    logout() {
        var router = this.router;
        this.data.storage = {};
        firebase.logout();
        router.navigate([""]);
    }

}