
import { Server } from "./Server/Server";

export class Comment {
    id: number;
    userId: number;
    text: string;
    rights: boolean;
    userName: string;
    server: Server;

    constructor(id: number, userId: number, text: string, rights: boolean) {
        this.server = new Server();
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.getUser();
        this.rights = rights;
    }

    public getUser() {
        this.server.getUsername(this.userId).then((res) => {
            this.userName = JSON.stringify(res).slice(1, JSON.stringify(res).length - 1);
        }).catch((res) => {
            this.userName = JSON.stringify(res).slice(1, JSON.stringify(res).length - 1);
        })
    }
}