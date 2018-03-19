export class Photo {
    id: number;
    url: string;

    constructor(id: number, url:string) {
        this.id = id;
        this.url = "http://188.166.127.207:8000/uploads/users/" + url;
    }
}