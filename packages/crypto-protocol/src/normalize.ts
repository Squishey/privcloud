import { WORDLIST } from "./wordlist.js";

const WORDS = new Set(WORDLIST);

export function normalizePassword(password: string){
    password = password.normalize('NFKC');
    password = password.trim();

    // partir la password en trozos por espacio
    const pieces = password.split(/[ \-_.]+/);
    const words = pieces.map( t => t.toLowerCase());
    if (words.length >= 4 && words.every(w => WORDS.has(w)) ){
        return words.join('-');
    }
    

    return password;
}