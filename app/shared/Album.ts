/**
 * 
 * 
 * @export
 * @class Album
 */
export class Album {

    id: number;
    name: string;
    privacy: string;
    description: string;
    userId: number;

    /**
     * Creates an instance of Album.
     * @param {number} id 
     * @param {string} name 
     * @param {string} privacy 
     * @param {string} description 
     * @memberof Album
     */
    constructor(id: number, name: string, privacy: string, description: string) {
        this.id = id;
        this.name = name;
        this.privacy = privacy.toLowerCase();
        this.description = description;
    }
}