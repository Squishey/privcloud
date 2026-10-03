import { sodium } from "./sodium.js";
import { normalizePassword } from "./normalize.js";
import type { KdfParams } from "@privcloud/types";

// config
export const DEFAULT_KDF_PARAMS: KdfParams = { version: 1, opslimit: 3, memlimit: 64 * 1024 * 1024 };

export function makeArgonid(salt:Uint8Array, password: string, params: KdfParams){
    // rechazar version/params desconocidos
    if (params.version !== 1) throw new Error('kdf_params: versión desconocida');
    if (params.opslimit < DEFAULT_KDF_PARAMS.opslimit || params.opslimit > 10) throw new Error('kdf_params: opslimit fuera de rango');
    if (params.memlimit < DEFAULT_KDF_PARAMS.memlimit || params.memlimit > 1 * 1024 * 1024 * 1024) throw new Error('kdf_params: memlimit fuera de rango')

    // normalizar 
    password = normalizePassword(password);

    const bytesSalida = 32;


    // configurar uso de argon
    const algoritmo = sodium.crypto_pwhash_ALG_ARGON2ID13;

    const hash = sodium.crypto_pwhash(
        bytesSalida,
        password,
        salt,
        params.opslimit,
        params.memlimit,
        algoritmo
    )
    return hash;
}
