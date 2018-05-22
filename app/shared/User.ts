/**
 * 
 * 
 * @export
 * @class User
 */
export class User {
    id: number;
    firstN: string;
    lastN: string;
    gender: string;
    email: string;
    birthD: string;
    role: string;
    
    /**
     * Creates an instance of User.
     * @param {number} id 
     * @param {string} firstN 
     * @param {string} lastN 
     * @memberof User
     */
    constructor(id: number, firstN: string, lastN: string) {
        this.id = id;
        this.firstN = firstN;
        this.lastN = lastN;
    }
}