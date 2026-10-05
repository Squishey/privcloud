/** Implementación TS del protocolo v1. Especificación: docs/crypto.md */
export const PROTOCOL_VERSION = 1;

export { ready } from "./sodium.js";
export { KDF_CONTEXT, deriveSubkey, type KdfContext } from "./kdf.js";
export { normalizePassword } from "./normalize.js";
export { makeArgonid, DEFAULT_KDF_PARAMS } from "./argon2id.js";
export { wrapKey, unwrapKey } from "./wrap.js";
export { uuidToBytes, concat, getMkAD } from "./ad.js";

