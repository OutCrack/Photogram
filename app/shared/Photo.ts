import { Comment } from "./Comment";
import { Server } from "./Server/Server";

/**
 * 
 * 
 * @export
 * @class Photo
 */
export class Photo {
    id: number;
    userId: number;
    albumId: number;
    eventId: number;
    fileName: string;
    created: string;
    url: string;
    description: string;
    likes: number;
    comments: Array<Comment>;
    server: Server = new Server();
    albumPath: string;
    userName: string;
    urlCommon = "http://188.166.127.207/uploads/";

    /**
     * Creates an instance of Photo.
     * @param {number} id 
     * @param {string} url 
     * @param {number} userId 
     * @param {string} created 
     * @param {string} description 
     * @param {number} albumId 
     * @param {string} fileName 
     * @param {number} eventId 
     * @memberof Photo
     */
    constructor(id: number, url:string, userId: number, created: string, description: string,
         albumId: number, fileName: string, eventId: number) {
        this.id = id;
        this.userId = userId;
        this.created = created;
        this.description = description;
        this.fileName = fileName;
        this.albumId = albumId;
        this.getUser();
        this.eventId = eventId;
        if (eventId == null) {
            var promise = new Promise((resolve, reject) => {        
                if (albumId == null) {
                    resolve();
                } else {
                    reject(albumId);
                }
                resolve(albumId);
                })
                
                promise.then((fromResolve) => {
                    this.url = this.urlCommon + "users/" + this.userId + "/" + this.fileName;
                }).catch((fromReject) => {
                    this.getUrl(fromReject).then((fromResolve) => {
                        this.url = this.urlCommon + "users/" + this.userId + "/" + fromResolve.toString() + "/" + this.fileName;
                    });
                });  
                this.getComments();
        } else {
            this.url = this.urlCommon + "/events/" + eventId + "/" + fileName;
        }
    }

    /**
     * 
     * 
     * @private
     * @memberof Photo
     */
    private getUser() {
        this.server.getUsername(this.userId).then((res) => {
            this.userName = JSON.stringify(res).slice(1, JSON.stringify(res).length - 1);
        }).catch((res) => {
            this.userName = JSON.stringify(res).slice(1, JSON.stringify(res).length - 1);
        })
    }

    /**
     * 
     * 
     * @private
     * @param {any} albumId 
     * @returns 
     * @memberof Photo
     */
    private getUrl(albumId) {
        return new Promise((resolve, reject) => {
            this.server.getAlbumName(albumId).then((res) => {
                var name = JSON.stringify(res).slice(1, JSON.stringify(res).length - 1);
                var replace = / /gi;
                this.albumPath = JSON.stringify(res).slice(1, JSON.stringify(res).length - 1);
                name = name.replace(replace, "%20");
                resolve(name);
                
            })
        }) 
    }

    /**
     * 
     * 
     * @returns 
     * @memberof Photo
     */
    public getComments() {
        return new Promise((resolve, reject) => {
            this.comments = [];
            this.comments = this.server.getComments(this.id, null, null, null);
            resolve(this.id);
        });
    }
} 