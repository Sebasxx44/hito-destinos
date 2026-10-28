# HITO

Atlas visual conceptual de Sebastián Sánchez. Astro estático y TypeScript pequeño, sin React ni renderizado 3D. Incluye portada manual de tres destinos, filtro por continente, favoritos locales y descarga de rutas ilustrativas. No hay reservas, pagos, cuentas ni envío de datos.

`npm install` · `npm run dev` · `npm run build` · `npm run typecheck` · `npm test`

Fotografías reales, descargadas y comprimidas a WebP locales en 480/960/1920 px. La portada móvil utiliza recortes verticales dedicados de 600×1300 y 900×1950 desde las fuentes HD, sin ampliar el original. Cada destino conserva su fotografía correspondiente; portada inicial con preload responsive y el resto de imágenes con carga diferida.

| Lugar | Autor y origen | Licencia |
| --- | --- | --- |
| Petra | [Tommaso Ubezio / Unsplash](https://unsplash.com/photos/SUNFMHBlhaE) | [Unsplash](https://unsplash.com/license) |
| Capadocia | [Mikhail Nilov / Pexels](https://www.pexels.com/photo/8321300/) | [Pexels](https://www.pexels.com/license/) |
| Atacama | [Willian Justen de Vasconcellos / Pexels](https://www.pexels.com/photo/30807403/) | Pexels |
| Lofoten | [Andreas Ebner / Pexels](https://www.pexels.com/photo/17226769/) | Pexels |
| Kioto | [Stefan Szankowski / Unsplash](https://unsplash.com/photos/4CwBimuEu5U) | Unsplash |
| Marrakech | [Diego F. Parra / Pexels](https://www.pexels.com/photo/25489567/) | Pexels |

Bebas Neue y Hanken Grotesk se sirven localmente en dos archivos WOFF2 bajo SIL Open Font License; textos de licencia en `public/licenses/`. La foto de referencia facilitada por el usuario solo orientó la composición y no se incluye en los assets.
