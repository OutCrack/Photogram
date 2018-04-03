export class Event {
    id: number;
    name: string;
    location: string;
    description: string;
    type: string;
    privacy: string;
    photo_url: string;
    role: string;

    constructor(id: number, name: string, role: string) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}