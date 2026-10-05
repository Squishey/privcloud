import { sodium } from  "./sodium.js";


export function uuidToBytes(uuid: string){
    const bytes = sodium.from_hex(uuid.replaceAll('-', ''));
    if(bytes.length !== 16){ 
        throw new Error('invalid uuid');
    }
    return bytes;
}

export function concat(...parts: Uint8Array[]){
    let total = 0;
    for (const part of parts) total += part.length;

    let pastLength = 0;
    const concated = new Uint8Array(total);
    for (const part of parts){
        concated.set(part, pastLength);
        pastLength += part.length;
   }
   return concated;
}

export function getMkAD(suffix: 'kek' | 'recovery', userID: string){
    const labelBytes = sodium.from_string('v1/wrap/mk');
    const userIDToBytes = uuidToBytes(userID);
    const suffixToBytes = sodium.from_string(suffix);

    return concat(labelBytes, userIDToBytes, suffixToBytes);
}