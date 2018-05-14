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

    constructor(id: number, name: string, role: string, description: string, type: string, privacy: string, photo_url: string) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.description = description;
        this.type = type;
        this.privacy = privacy;
        this.photo_url = "http://sergphoto.com:8000/uploads/events/" + photo_url;
    }


}