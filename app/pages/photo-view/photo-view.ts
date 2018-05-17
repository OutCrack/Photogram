import { Component, ChangeDetectorRef } from "@angular/core"
import { Data } from "../../shared/Data";
import { ActivatedRoute } from "@angular/router";
import { Server } from "../../shared/Server/Server";
import { Comment } from "../../shared/Comment";
import * as dialogs from "ui/dialogs";
import { RouterExtensions } from "nativescript-angular";
//import { registerElement } from "nativescript-angular/element-registry";

//registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@Component({
    templateUrl: "./pages/photo-view/photo-view.html",
    styleUrls: [ "./pages/photo-view/photo-view.css" ]
})
export class PhotoViewComponent {

    public photoId: number;
    public photoOwner: number;
    public server: Server;
    public url: string;
    public fileName: string;
    public created: string;
    public likes: number;
    public canGiveLike: boolean;
    public comments: Array<Comment> = [];
    public eventOwner: number;
    public description: string;
    public ownerName: string;
    public albumPath;
    public canDelete: boolean;

    constructor(private routerExtensions: RouterExtensions  ,private data: Data, private route: ActivatedRoute, private _changeDetectionRef: ChangeDetectorRef) {
        this.server = new Server();
        this.route.queryParams.subscribe(params => {
            this.photoId = params["photoId"];
            this.url = params["url"];
            this.created = params["created"];
            this.photoOwner = params["photoOwner"];
            this.eventOwner = params["eventOwner"];
            this.description = params["description"];
            this.ownerName = params["ownerName"];
            this.fileName = params["fileName"];
            this.albumPath = params["albumPath"];
        });

        if (this.data.storage["id"] == this.photoOwner) {
            this.canDelete = true;
        } else {
            this.canDelete = false;
        }
        this.server.getLikes(this.photoId, this.data.storage["id"]).then((result) => {
            this.likes = parseInt(JSON.stringify(result));
            this.canGiveLike = false;
        }).catch((reject) => {
            this.likes = parseInt(JSON.stringify(reject));
            this.canGiveLike = true;
        });
        this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);
    }

    stackLoaded = function(args) {
        console.log("Stack Loaded");
        this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);
    }

    test() {
        console.log("URL " + this.albumPath);
        alert("My id is " + this.data.storage["id"] + " owner " + this.photoOwner + " " + this.canDelete);
    }

    updateLikes(id: number) {
        var promise = new Promise((resolve, reject) => {
            var adding = this.canGiveLike;
            this.server.updateLikes(id, this.data.storage["id"], adding);
            this.canGiveLike = !this.canGiveLike;
            resolve(adding);
        });
        promise.then((fromResolve) => {
            if (fromResolve) {
                this.likes++;
            } else {
                this.likes--;
            }
            console.log("You tapped " + id);
        });
    }

    addComment(result) {
        this.add(result.text).then(() => {
            dialogs.alert("Comment added").then(() => {
                this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);
            })
        }).catch(() => {
            alert("Cannot insert empty comment");
        })
        result.text = "";
        }

    private add(text: string) {
        return new Promise((resolve, reject)=> {
            console.log("Comment " + text);
            if (text.length < 1) {
                reject();
            } else {
                this.server.updateComment(this.photoId, this.data.storage["id"], text).then(() => {
                resolve();
            });
            //var comment = new Comment(commentId, this.data.storage["id"], result.text, true); 
        }
    }) }

    removeComment(commentId: number) {
        dialogs.confirm({
            title: "Are you sure?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if(result) {
                this.remove(commentId).then(() => {
                    dialogs.alert("Comment successfully removed").then(() => {
                        this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);
                    })
                })
            }
        })
        this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);
    }

    remove(commentId: number) {
        return new Promise((resolve, reject) => {
            console.log("You click comment id " + commentId);
            this.server.removeComment(commentId).then(() => {
                resolve();
                
            }).catch(() => {
                alert("Something went wrong. Try again");
            });
        })
    }

    onDeletePhoto() {
        console.log("Deleting photo " + this.fileName);
        dialogs.confirm({
            title: "Are you sure you want to delete this photo?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this.server.deletePhoto(this.data.storage["id"], this.fileName, "photo", this.photoId, this.albumPath);
                dialogs.alert("Photo deleted").then(()=> {
                    this.routerExtensions.back();
                })
            }
        }); 
    }
}

//this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);