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

/**
 * 
 * 
 * @export
 * @class InvitationComponent
 */
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

    constructor(private router: Router) {
    
    }

    /**
     * 
     * 
     * @memberof InvitationComponent
     */
    stackLoaded = function(args) {
        stackLayout = args.object;
        inviteBody = stackLayout.getElementById("body");
        this.fontColor = "gold";
        this.bodyColor = "bgr_black";
        this.fontStyle = "font1";
        sendButton = stackLayout.getElementById("send_btn");
     }


    /**
     * 
     * 
     * @memberof InvitationComponent
     */
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
    }

    /**
     * 
     * 
     * @memberof InvitationComponent
     */
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
    }

    /**
     * 
     * 
     * @memberof InvitationComponent
     */
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
    }


    /**
     * 
     * 
     * @memberof InvitationComponent
     */
    public sendInvitation() {
        var promise = new Promise((resolve, reject)=> {
        var img = new image.Image();
        var body = stackLayout.getElementById('fullscreen');
        var imageSource = plugin.getImage(inviteBody);
        img.imageSource = imageSource;
        var folder = fs.knownFolders.documents().path;
        var path = fs.path.join(folder, "Invitation.png");
        var saved = imageSource.saveToFile(path, "png");
        console.log("Saved?" + saved);
        resolve(folder + "/Invitation.png");
        });
        promise.then((file) => {
            var path: string = JSON.stringify(file);
            path = path.slice(1, path.length - 1);
            email.available().then(available => {
                if (available) {
                    email.compose({
                        subject: 'Invitation',
                        body: 'Dear Guest!',
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