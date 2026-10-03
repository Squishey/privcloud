import { sodium } from "./sodium.js";

// Contextos de (5.3): "v1:" + propósito, rellenado con "_" hasta 8 bytes. 
export const KDF_CONTEXT = {
  auth: "v1:auth_",
  kek: "v1:kek__",
  masterWrap: "v1:mkwr_",
  folderWrap: "v1:fkwr_",
  folderName: "v1:fnam_",
  content: "v1:cont_",
  metadata: "v1:meta_",
  thumbnail: "v1:thmb_",
  passkeyWrap: "v1:pkwr_",
  recoveryKek: "v1:rkek_",
  recoveryAuth: "v1:rauth",
} as const;

export type KdfContext = (typeof KDF_CONTEXT)[keyof typeof KDF_CONTEXT];

// Deriva una subclave de 32 bytes de una clave madre (5.3). Todas las subclaves v1 usan id = 1. 
export function deriveSubkey(parentKey: Uint8Array, context: KdfContext): Uint8Array {
  return sodium.crypto_kdf_derive_from_key(32, 1, context, parentKey);
}
