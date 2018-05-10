export class Album {

    id: number;
    name: string;
    privacy: string;
    description: string;
    userId: number;

    constructor(id: number, name: string, privacy: string, description: string) {
        this.id = id;
        this.name = name;
        this.privacy = privacy.toLowerCase();
        this.description = description;
    }
}