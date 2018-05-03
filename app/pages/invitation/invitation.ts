import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { ImageSource } from "image-source";
import * as imageSourceModule from "image-source";
import * as email from "nativescript-email";
import * as fs from "file-system";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
var orientation = require("nativescript-orientation");
var dom = require("nativescript-dom");
var plugin = require("nativescript-screenshot");
var image = require("ui/image");
var stackLayout;
var stylePanel;
var sendButton;

exports.testTap = function(args) {
    console.log("tapped" + args);
}


@Component({
    selector: "Invitation",
    templateUrl: "./pages/invitation/invitation.html",
    styleUrls: ["./pages/invitation/invitation.css" ]
})

export class InvitationComponent {

    public page: Page
    public bodyColor: string;
    public fontStyle: string;
    public ort: boolean;
    public mode: string;
    constructor(private router: Router) {
        if (this.bodyColor == null) {
            this.bodyColor = "gold";
        } 
        if (this.fontStyle == null) {
            this.bodyColor = "font1";
        } 
        if (this.mode == null) {
            this.mode = "normal";
        }
        this.ort = orientation.getOrientation() == "landscape" ? true : false;
    
        app.on("orientationChanged", this.onOrientationChanged);
    }

    stackLoaded = function(args) {
        stackLayout = args.object;
        stylePanel = stackLayout.getElementById("style_panel");
        sendButton = stackLayout.getElementById("send_btn");
        //var layout = page.getElementById('button-ctn');
        console.log("-------------------------");
        console.log("-------------------------");
        console.log("-------------------------");
        console.log(stackLayout);
        //layout.classList.add('visible');
     }

     testTap = function(args) {
        //var layout = page.getElementById('button-ctn');
        console.log("buttonTapped");
        console.log(stackLayout.classList);
        stylePanel.style.visibility = "collapse";
        //var image: Image = new Image();
        //image.src = "res://logo";
        //stackLayout.addChild(image);
        //layout.classList.add('visible');
     }

    public changeBackground(color: string) {
        console.log("Tapped " + color);
        this.bodyColor = color;
        console.log("Body color" + this.bodyColor);
        console.log("Landscape? " + this.ort);
    }

    public onOrientationChanged = (evt) => {
        console.log("Orientation has changed");
        this.ort = orientation.getOrientation() == "landscape" ? true : false;
        console.log("Landscape? " + this.ort);
        if (this.ort) {
            stylePanel.style.visibility = "collapse";
            sendButton.style.visibility = "visible";
        } else {
            stylePanel.style.visibility = "visible";
            sendButton.style.visibility = "collapse";
        }
    }

    public changeFont(font: string) {
        this.fontStyle = font;
        console.log("Font changed to " + font);
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
        var promise = new Promise((resolve, reject)=> {
        //var img = new imageSourceModule.ImageSource();
        var img = new image.Image();
        img.imageSource = plugin.getImage(stackLayout/*.getElementById('fullscreen')*/);
        //console.log("Image " + JSON.stringify(img));
        //console.log("Source " + JSON.stringify(img.imageSource));
        //let source = img.src;
        //source.loadFromData(img);
        //console.log("Source " + JSON.stringify(source));
        var source = imageSourceModule.fromBase64(img);
        var folder = fs.knownFolders.documents().path;
        console.log("Folder " + folder);
        var path = fs.path.join(folder, "Invitation.png");
        console.log("path " + path);
        var saved = source.saveToFile(folder, "png");
        console.log("Saved " + saved);
        if (img == null) reject("big error");
        resolve(img);
        });
        promise.then((img) => console.log("RESOLVED" + img)).catch((e) => console.log("error " + e));
        /*promise.then((img) => {
            var thePath: string = JSON.stringify(img);
            console.log(thePath);
            email.available().then(available => {
                console.log("Email status is " + available);
                if (available) {
                    email.compose({
                        to : ['kasia.klm@wp.pl'],
                        subject: 'Invitation',
                        body: 'Invitation',
                        attachments: [ 
                            {
                            fileName: 'Invitation',
                            path: thePath,
                            mimeType: 'image/png'
                        }
                    ]
                    }).then(() => console.log("Email composer closed"))
                }
            }).catch(error => console.error(error));
        });*/


    }





}