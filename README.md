# privcloud

Nube personal con cifrado de extremo a extremo. Los archivos se cifran en el
navegador antes de subirse: el servidor guarda y sincroniza, pero no puede leer
el contenido, los nombres ni las claves.

## Estado

En desarrollo temprano. Por ahora solo existe parte de la criptografía del
cliente; todavía no hay aplicación ni servidor que funcionen.

**No lo uses para guardar datos reales.** El código no ha sido auditado.

## Qué hay hecho

- Normalización y validación de contraseñas (zxcvbn)
- Derivación de la clave raíz con Argon2id
- Derivación de subclaves
- Envoltura de claves (XChaCha20-Poly1305)

## Estructura

| Carpeta | Contenido |
|---|---|
| `apps/web` | Aplicación web (PWA) |
| `packages/crypto-protocol` | Criptografía del cliente, sobre libsodium |
| `packages/client-core` | Sincronización y cliente de la API |
| `packages/ui` | Componentes de interfaz |
| `packages/types` | Tipos compartidos entre cliente y servidor |
| `backend/api` | API |
| `infrastructure` | Despliegue |

## Desarrollo

Requiere Node 22 o superior y pnpm.

    pnpm install
    pnpm build

## Licencia

MIT