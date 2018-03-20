export class User {
    id: number;
    firstN: string;
    lastN: string;
    gender: string;
    email: string;
    birthD: string;
    
    constructor(id: number, firstN: string, lastN: string) {
        this.id = id;
        this.firstN = firstN;
        this.lastN = lastN;
    }
}