# HNR — Website

Landing page de HUMANS NOT REQUIRED (HNR). Sitio estático de una sola página: `index.html` + `assets/logo.png`, sin build ni dependencias — HTML/CSS/JS plano.

## Origen

Este sitio se diseñó e iteró como [Artifact de Claude](https://claude.ai/artifact/5Z6FvpdVeYFqrfgKkd9cju) (canvas de diseño). Este repo es la **versión estática exportada**, lista para desplegar — el archivo `index.html` es una traducción directa de ese artifact a HTML plano (sin el runtime propio del editor de Artifacts).

Si se vuelve a iterar el diseño, el flujo es: ajustar en el Artifact → volver a exportar a este repo (no editar el Artifact y este repo como si fueran la misma fuente de verdad en paralelo).

## Contenido
- Hero, problema, servicios (IA / Automatización / Software a medida), proceso, casos reales (MILA Joyería, Industria Primetal S.A.C.), founder, garantía, y un formulario de contacto que arma un `mailto:` a `benites.ee@gmail.com`.
- Paleta e identidad: ver `assets/logo.png` y las variables CSS en `index.html` (`--ink`, `--paper`, `--green`, `--orange`, `--purple`).

## Desarrollo local

Sin build. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
npx serve .
```

## Deploy

Pensado para Vercel o Cloudflare Pages — sitio 100% estático, sin configuración especial (no hay `vercel.json` ni build command, el root del repo ya es el output).
