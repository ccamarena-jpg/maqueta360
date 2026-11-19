# Maqueta 360 – Puestos Oficinas 509 y 510 (TT Audit)

Maqueta 3D interactiva para asignar puestos. Tiene dos propuestas: **Claudia** y **Daniela**, más una vista **Comparar** que muestra qué personas cambian de puesto entre una propuesta y otra.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La maqueta (una sola página, sin instalación). |
| `data/propuestas.json` | **Dónde se guardan los datos oficiales**: mesas, posiciones y nombres de ambas propuestas. |

## Cómo se guardan los datos

1. **Versión oficial:** está en `data/propuestas.json`, en este repo. Es lo que ve cualquiera que abra la página, tu jefa incluida.
2. **Borrador:** lo que cada persona edita (nombres, mover mesas, agregar mesas) se guarda **solo en su propio navegador** hasta que lo publique. Mientras tanto aparece un aviso amarillo.
3. **Para publicar:** botón **Exportar** (descarga y copia `propuestas.json`) → en GitHub abre `data/propuestas.json` → ✏️ *Edit* → pega el contenido → *Commit changes*. En 1–2 minutos la página se actualiza.

> El JSON exportado incluye **ambas** propuestas tal como se ven en ese navegador. Si Daniela edita la suya en su computadora, debe exportar ella, o mandarte su archivo para que lo subas. Si no, se pisa su versión con la que tú tengas.

## Publicarla en la web (una sola vez)

- **GitHub Pages:** *Settings → Pages → Source: Deploy from a branch → `main` / root → Save*. Queda en `https://ccamarena-jpg.github.io/maqueta360/`.
- O importa el repo en **Vercel** (sin configuración, es un sitio estático).

Enlaces directos: `…/#claudia`, `…/#daniela`.

## Privacidad

El repo es **público**, así que cualquiera con el enlace puede ver los nombres en `data/propuestas.json`. Si eso no conviene, haz el repo privado y publica con Vercel.
