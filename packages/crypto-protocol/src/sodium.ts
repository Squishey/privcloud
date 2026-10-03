import sodium from "libsodium-wrappers-sumo";

/** Espera a que cargue el WASM de libsodium. Llamar antes de usar cualquier otra función. */
export async function ready(): Promise<typeof sodium> {
  await sodium.ready;
  return sodium;
}

export { sodium };
