import { Component, ChangeDetectorRef } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

@Component({
    selector: "gallery-tab",
    templateUrl: "./pages/tabs/gallery/gallery.tab.html"
})
export class GalleryComponent {

    items = [];

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    openGallery() {
        let context = imagepicker.create({
            mode: "single" //"multiple"
        });
        this.startSelecting(context);
    }

    private startSelecting(context) {
        let _that = this;
        console.log("in Gallery constructor");
        context
            .authorize() 
            .then(function() {
                _that.items = [];
                return context.present();
            })
            .then((selection) => {
                selection.forEach(function(selected) {
                    console.log("----------------");
                    console.log("uri: " + selected.uri);
                    console.log("fileUri: " + selected.fileUri);
                }
            ); 
                _that.items = selection;
                _that._changeDetectionRef.detectChanges(); 
            }).catch(function(e) {
                console.log(e);
            })
    }


}