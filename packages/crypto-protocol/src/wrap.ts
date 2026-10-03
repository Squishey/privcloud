import { sodium } from "./sodium.js";




export function wrapKey(lock: Uint8Array, key: Uint8Array, ad: Uint8Array){
    if (key.length !== 32) throw new Error('wrap_format: la clave debe medir 32 bytes');
    const nonce = sodium.randombytes_buf(24);
    const cipherTxtWTag = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(key, ad, null, nonce, lock);
    const wrap = new Uint8Array(1 + nonce.length + cipherTxtWTag.length);
    wrap[0] = 1;
    wrap.set(nonce, 1);
    wrap.set(cipherTxtWTag, 1 + nonce.length);
    return wrap;
}

export function unwrapKey(lock: Uint8Array, wrap: Uint8Array, ad: Uint8Array){
    if( wrap[0] != 1 || wrap.length != 73 ) throw new Error('wrap_format: wrap invalido');
    const nonce = wrap.subarray(1, 25);
    const ciphertext = wrap.subarray(25, 73);

    const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext, ad, nonce, lock);
    return decrypted
}