# Maqueta 360 – Puestos Oficinas 509 y 510 (TT Audit)

Maqueta 3D interactiva para asignar puestos. Tiene dos propuestas: **Claudia** y **Daniela**, más una vista **Comparar** que muestra qué personas cambian de puesto entre una propuesta y otra.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La maqueta (una sola página, sin instalación). |
| `data/propuestas.json` | **Dónde se guardan los datos oficiales**: mesas, posiciones y nombres de ambas propuestas. |

## Cómo se guardan los datos (Google Sheets)

Los datos se guardan en un **Google Sheet** a través del Apps Script de `apps-script/Code.gs`, que la página usa como URL `/exec`.

- Cada cambio se guarda en la nube **automáticamente** (~1 s después), y solo la propuesta que se está editando. Si Claudia edita la suya y Daniela la suya, ninguna pisa a la otra.
- El Sheet se llama **"Maqueta360 – Propuestas de puestos"**. Tiene una pestaña `claudia`, una `daniela` y una `historial` (quién guardó y cuándo, con el número de asignados).
- Si la nube no responde, los cambios quedan en el navegador. Aparece un aviso para **Subir a la nube** cuando vuelva la conexión.
- **Respaldo:** si el script no está disponible, la página lee `data/propuestas.json` y permite **Exportar**.

### Instalar o actualizar el script

1. Abre el proyecto de Apps Script de la URL `/exec` y pega el contenido de `apps-script/Code.gs` (reemplaza el código).
2. Ejecuta una vez la función **`inicializar`** y autoriza. Esto crea el Sheet. El enlace aparece en *Registro de ejecución*.
3. *Implementar → Gestionar implementaciones → ✏️ → Versión: **Nueva versión** → Implementar*. Configúralo como *Ejecutar como: Yo* y *Acceso: Cualquier persona*. La URL no cambia.

> Cualquiera con el enlace de la página puede editar. Compártelo solo con quien corresponda.

## Publicarla en la web (una sola vez)

- **GitHub Pages:** *Settings → Pages → Source: Deploy from a branch → `main` / root → Save*. Queda en `https://ccamarena-jpg.github.io/maqueta360/`.
- O importa el repo en **Vercel** (sin configuración, es un sitio estático).

Enlaces directos: `…/#claudia`, `…/#daniela`.

## Privacidad

El repo es **público**, así que cualquiera con el enlace puede ver los nombres en `data/propuestas.json`. Si eso no conviene, haz el repo privado y publica con Vercel.
