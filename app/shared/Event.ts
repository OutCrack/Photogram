import { Photo } from "../shared/Photo";
import { Server } from "../shared/Server/Server";

export class Event {
    id: number;
    name: string;
    location: string;
    description: string;
    type: string;
    privacy: string;
    photo_url: string;
    role: string;
    photos: Array<Photo>;
    server = new Server();

    constructor(id: number, name: string, role: string, description: string, type: string) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.description = description;
        this.type = type;
    }


}