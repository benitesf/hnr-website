# HNR — Website

Landing page de HUMANS NOT REQUIRED (HNR). Frontend estático (`public/index.html` + `public/assets/logo.png`, sin build ni framework) servido por un **Cloudflare Worker** (`src/index.js`) que además expone `POST /api/contact` para enviar el formulario de contacto por correo real (sin abrir ninguna app), vía [Resend](https://resend.com).

## Origen

El diseño se iteró como [Artifact de Claude](https://claude.ai/artifact/5Z6FvpdVeYFqrfgKkd9cju) (canvas de diseño) y se exportó a código estándar. Si se vuelve a iterar el diseño visual, el flujo es: ajustar en el Artifact → volver a exportar a `public/index.html` (no editar el Artifact y este repo como si fueran la misma fuente de verdad en paralelo).

## Estructura
- `public/index.html` — toda la página (hero, problema, servicios, proceso, casos reales, founder, garantía, contacto).
- `public/assets/logo.png` — logo de marca.
- `src/index.js` — Worker: sirve los archivos estáticos de `public/` y maneja `POST /api/contact` (llama a la API de Resend).
- `wrangler.toml` — configuración del Worker (assets + entrypoint).

## Variables de entorno / secrets
- `RESEND_API_KEY` — configurado como **secret** en el dashboard de Cloudflare (Settings → Variables and Secrets), nunca en el repo.

### Límite de Resend en modo prueba
Sin un dominio verificado en resend.com/domains, Resend solo deja enviar a la dirección con la que te registraste ahí (hoy, `edsonbenitesf@gmail.com` — por eso `DESTINATARIO` en `src/index.js` apunta a ese correo, no a `benites.ee@gmail.com`). Si se verifica un dominio propio de HNR más adelante, se puede: (1) cambiar `REMITENTE` a una dirección de ese dominio, y (2) mandar los leads a `benites.ee@gmail.com` si se prefiere.

## Desarrollo local

```bash
npx wrangler dev
```

Para que `/api/contact` funcione en local hace falta un `.dev.vars` con `RESEND_API_KEY=...` (no versionado — agregarlo a `.gitignore` si se crea).

## Deploy

Desplegado en Cloudflare: **https://hnr-website.edzon-bf.workers.dev/** — Git-conectado, cada push a `main` redespliega automático.
