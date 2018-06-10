/**
 * 
 * 
 * @export
 * @class Event
 */
export class Event {
    id: number;
    name: string;
    location: string;
    description: string;
    type: string;
    privacy: string;
    photo_url: string;
    role: string;

    /**
     * Creates an instance of Event.
     * @param {number} id 
     * @param {string} name 
     * @param {string} role 
     * @param {string} description 
     * @param {string} type 
     * @param {string} privacy 
     * @param {string} photo_url 
     * @memberof Event
     */
    constructor(id: number, name: string, role: string, description: string, type: string, privacy: string, photo_url: string) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.description = description;
        this.type = type;
        this.privacy = privacy;
        if (type.toLowerCase() == "wedding") {
            this.photo_url = "https://sergphoto.com/uploads/events/wedding-default.png";
        } else {
            this.photo_url = "https://sergphoto.com/uploads/events/party-default.png";
        }
    }


}