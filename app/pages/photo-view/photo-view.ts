import { Component, ChangeDetectorRef } from "@angular/core"
import { Data } from "../../shared/Data";
import { ActivatedRoute } from "@angular/router";
import { Server } from "../../shared/Server/Server";
import { Comment } from "../../shared/Comment";
import * as dialogs from "ui/dialogs";
import { RouterExtensions } from "nativescript-angular";

/**
 * 
 * 
 * @export
 * @class PhotoViewComponent
 */
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
    public eventId: number;

    /**
     * Creates an instance of PhotoViewComponent.
     * @param {RouterExtensions} routerExtensions 
     * @param {Data} data 
     * @param {ActivatedRoute} route 
     * @param {ChangeDetectorRef} _changeDetectionRef 
     * @memberof PhotoViewComponent
     */
    constructor(private routerExtensions: RouterExtensions  ,private data: Data, private route: ActivatedRoute, 
        private _changeDetectionRef: ChangeDetectorRef) {

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
            this.eventId = params["eventId"];
        });

        if (this.data.storage["id"] == this.photoOwner || this.data.storage["id"] == this.eventOwner) {
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

    /**
     * 
     * 
     * @memberof PhotoViewComponent
     */
    stackLoaded = function(args) {
        this.comments = this.server.getComments(this.photoId, this.data.storage["id"], this.photoOwner, this.eventOwner);
    }

    /**
     * 
     * 
     * @memberof PhotoViewComponent
     */
    updateLikes() {
        var promise = new Promise((resolve, reject) => {
            var adding = this.canGiveLike;
            this.server.updateLikes(this.photoId, this.data.storage["id"], adding);
            this.canGiveLike = !this.canGiveLike;
            resolve(adding);
        });
        promise.then((fromResolve) => {
            if (fromResolve) {
                this.likes++;
            } else {
                this.likes--;
            }
        });
    }

    /**
     * 
     * 
     * @param {any} result 
     * @memberof PhotoViewComponent
     */
    addComment(result) {
        this.add(result.text).then(() => {
            dialogs.alert("Comment added").then(() => {
                this.comments = this.server.getComments(this.photoId, this.data.storage["id"], 
                this.photoOwner, this.eventOwner);
            })
        }).catch(() => {
            alert("Cannot insert empty comment");
        })
        result.text = "";
        }

    /**
     * 
     * 
     * @private
     * @param {string} text 
     * @returns 
     * @memberof PhotoViewComponent
     */
    private add(text: string) {
        return new Promise((resolve, reject)=> {
            if (text.length < 1) {
                reject();
            } else {
                this.server.updateComment(this.photoId, this.data.storage["id"], text).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        }
    }) }

    /**
     * 
     * 
     * @param {number} commentId 
     * @memberof PhotoViewComponent
     */
    removeComment(commentId: number) {
        dialogs.confirm({
            title: "Are you sure you want to remove that comment?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if(result) {
                this.remove(commentId).then(() => {
                    dialogs.alert("Comment successfully removed").then(() => {
                        this.comments = this.server.getComments(this.photoId, this.data.storage["id"], 
                        this.photoOwner, this.eventOwner);
                    })
                })
            }
        })
    }

    /**
     * 
     * 
     * @private
     * @param {number} commentId 
     * @returns 
     * @memberof PhotoViewComponent
     */
    private remove(commentId: number) {
        return new Promise((resolve, reject) => {
            this.server.removeComment(commentId).then(() => {
                resolve();
            }).catch(() => {
                alert("Something went wrong. Try again");
            });
        })
    }

    /**
     * 
     * 
     * @memberof PhotoViewComponent
     */
    onDeletePhoto() {
        var type;
        if (this.eventOwner == null) {
            type = "photo";
        } else {
            type = "event";
        }
        dialogs.confirm({
            title: "Are you sure you want to delete this photo?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                this.server.deletePhoto(this.data.storage["id"], this.fileName, type, this.photoId, 
                this.albumPath, this.eventId);
                dialogs.alert("Photo deleted").then(()=> {
                    this.routerExtensions.back();
                })
            }
        }); 
    }
}
