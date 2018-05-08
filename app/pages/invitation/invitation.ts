import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { ImageSource } from "image-source";
import * as imageSourceModule from "image-source";
import * as email from "nativescript-email";
import * as fs from "file-system";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { isNavigationCancelingError } from "@angular/router/src/shared";
//var orientation = require("nativescript-orientation");
var dom = require("nativescript-dom");
var plugin = require("nativescript-screenshot");
var image = require("ui/image");
var stackLayout;
var inviteBody;
var sendButton;

/*exports.testTap = function(args) {
    console.log("tapped" + args);
}*/


@Component({
    selector: "Invitation",
    templateUrl: "./pages/invitation/invitation.html",
    styleUrls: ["./pages/invitation/invitation.css" ]
})

export class InvitationComponent {

    public page: Page
    public bodyColor: string;
    public fontStyle: string;
    public fontColor: string = "gold";
    //public ort: boolean;
    public mode: string;
    constructor(private router: Router) {
        if (this.mode == null) {
            this.mode = "normal";
        }
        //this.ort = orientation.getOrientation() == "landscape" ? true : false;
    
        //app.on("orientationChanged", this.onOrientationChanged);
    }

    stackLoaded = function(args) {
        stackLayout = args.object;
        inviteBody = stackLayout.getElementById("body");
        this.fontColor = "gold";
        this.bodyColor = "bgr_black";
        this.fontStyle = "font1";
        sendButton = stackLayout.getElementById("send_btn");
        //var layout = page.getElementById('button-ctn');
        console.log("-------------------------");
        console.log("-------------------------");
        console.log("-------------------------");
        console.log(stackLayout);
        //layout.classList.add('visible');
     }

    /* testTap = function(args) {
        //var layout = page.getElementById('button-ctn');
        console.log("buttonTapped");
        console.log(stackLayout.classList);
        stylePanel.style.visibility = "collapse";
        //var image: Image = new Image();
        //image.src = "res://logo";
        //stackLayout.addChild(image);
        //layout.classList.add('visible');
     }*/

    public changeBackground() {
        if (this.bodyColor == "bgr_white") {
            this.bodyColor = "bgr_black";
        }
        else if (this.bodyColor == "bgr_black") {
            this.bodyColor = "bgr_golden";
        }
        else if (this.bodyColor == "bgr_golden") {
            this.bodyColor = "bgr_pink"
        } else {
            this.bodyColor = "bgr_white";
        }
        console.log("Body color" + this.bodyColor);
        //console.log("Landscape? " + this.ort);
    }

    /*public onOrientationChanged = (evt) => {
        console.log("Orientation has changed");
        this.ort = orientation.getOrientation() == "landscape" ? true : false;
        console.log("Landscape? " + this.ort);
        if (this.ort) {
            stylePanel.style.visibility = "collapse";
        } else {
            stylePanel.style.visibility = "visible";
        }
    }*/

    public setFont() {
        if (this.fontStyle == "font1") {
            this.fontStyle = "font2";
        }
        else if (this.fontStyle == "font2") {
            this.fontStyle = "font3";
        }
        else if (this.fontStyle == "font3") {
            this.fontStyle = "font4";
        }
        else {
            this.fontStyle = "font1";
        }
        console.log("Font style changed to  " + this.fontStyle);
    }

    public setFontColor() {
        if (this.fontColor == "gold") {
            this.fontColor = "red";
        }
        else if (this.fontColor == "red") {
            this.fontColor = "white";
        }
        else if (this.fontColor == "white") {
            this.fontColor = "black";
        }
        else if (this.fontColor == "black") {
            this.fontColor = "green";
        }
        else if (this.fontColor == "green") {
            this.fontColor = "violet";
        }
        else {
            this.fontColor = "gold";
        }
        console.log("Font color changed to  " + this.fontColor);
    }

    /*public fullscreen() {
        if (this.mode == "normal") {
            this.mode = "fullscreen";
        } else {
            this.mode = "normal";
        }
        console.log("Mode is " + this.mode);
    }*/

    public sendInvitation() {
        console.log("Send invitation tapped");
        var promise = new Promise((resolve, reject)=> {
        var img = new image.Image();
        var body = stackLayout.getElementById('fullscreen');
        var imageSource = plugin.getImage(inviteBody);
        img.imageSource = imageSource;
        // testing: stackLayout.addChild(img);
        console.error("LOOOOOOOOOL" + body);;
        console.error("imgsource" + JSON.stringify(imageSource));
        console.error("From plugin " + plugin.getImage(inviteBody));
        var folder = fs.knownFolders.documents().path;
        console.log("Folder " + folder);
        var path = fs.path.join(folder, "Invitation.png");
        /*testing*/ console.error("path " + path);
        var saved = imageSource.saveToFile(path, "png");
        console.log("Saved " + saved);
        //if (img == null) reject("big error");
        resolve(folder + "/Invitation.png");
        });
        promise.then((file) => {
            var path: string = JSON.stringify(file);
            path = path.slice(1, path.length - 1);
            console.log("File " + file);
            console.log("JSON" + path);
            email.available().then(available => {
                console.log("Email status is " + available);
                if (available) {
                    email.compose({
                        to : ['kasia.zubowicz@gmail.com'],
                        subject: 'Invitation',
                        body: 'Hello <strong style="font-family: GreatVibes">dude</strong>',
                        attachments: [
                            {
                                fileName : "Invitation.png",
                                path: path,
                                mimeType : "image/png"
                            }
                        ]
                    }).then(() => console.log("Email composer closed"))
                }
            }).catch(error => console.error(error));
        });


    }





}