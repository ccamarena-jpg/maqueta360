/**
 * Maqueta 360 – Backend de propuestas de puestos (TT Audit)
 * Guarda cada propuesta (claudia / daniela) en una pestaña de un Google Sheet.
 *
 * Implementar como: Aplicación web
 *   - Ejecutar como: Yo
 *   - Quién tiene acceso: Cualquier persona
 * Al actualizar el código: Implementar > Gestionar implementaciones > ✏️ > Versión: Nueva versión
 * (así la URL /exec no cambia).
 */
const PROPUESTAS = ['claudia', 'daniela'];
const ENCABEZADO = ['N°', 'x (m)', 'z (m)', 'giro (°)', 'zona', 'nombre', 'propuesta'];

function libro_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SHEET_ID');
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) { /* se recrea abajo */ }
  }
  const ss = SpreadsheetApp.create('Maqueta360 – Propuestas de puestos');
  props.setProperty('SHEET_ID', ss.getId());
  return ss;
}

function pestana_(ss, nombre, encabezado) {
  let sh = ss.getSheetByName(nombre);
  if (!sh) {
    sh = ss.insertSheet(nombre);
    sh.appendRow(encabezado);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, encabezado.length).setFontWeight('bold');
  }
  return sh;
}

function leer_(ss, nombre) {
  const sh = pestana_(ss, nombre, ENCABEZADO);
  const valores = sh.getDataRange().getValues().slice(1).filter(r => r[0] !== '');
  return valores.map(r => ({
    id: Number(r[0]), x: Number(r[1]), z: Number(r[2]), rot: Number(r[3]),
    zone: String(r[4]), name: String(r[5] || ''),
    prop: r[6] === true || String(r[6]).toUpperCase() === 'TRUE' || String(r[6]).toUpperCase() === 'SÍ'
  }));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const ss = libro_();
    const props = PropertiesService.getScriptProperties();
    const out = { ok: true, actualizado: {}, hoja: ss.getUrl() };
    PROPUESTAS.forEach(n => {
      out[n] = leer_(ss, n);
      out.actualizado[n] = props.getProperty('ACT_' + n) || null;
    });
    return json_(out);
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const body = JSON.parse(e.postData.contents || '{}');
    const n = String(body.propuesta || '');
    if (body.action !== 'save' || PROPUESTAS.indexOf(n) < 0) return json_({ ok: false, error: 'Solicitud no válida' });
    const desks = Array.isArray(body.desks) ? body.desks.slice(0, 300) : null;
    if (!desks || !desks.length) return json_({ ok: false, error: 'Sin mesas' });

    const ss = libro_();
    const sh = pestana_(ss, n, ENCABEZADO);
    const filas = desks.map(d => [
      Number(d.id), Number(d.x), Number(d.z), Number(d.rot),
      String(d.zone || ''), String(d.name || '').slice(0, 80), d.prop ? 'SÍ' : 'NO'
    ]);
    if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, ENCABEZADO.length).clearContent();
    sh.getRange(2, 1, filas.length, ENCABEZADO.length).setValues(filas);

    const ahora = new Date();
    PropertiesService.getScriptProperties().setProperty('ACT_' + n, ahora.toISOString());
    const asignados = filas.filter(f => f[5].trim()).length;
    pestana_(ss, 'historial', ['fecha', 'propuesta', 'mesas', 'asignados'])
      .appendRow([ahora, n, filas.length, asignados]);

    return json_({ ok: true, actualizado: ahora.toISOString() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

/** Ejecútala una vez desde el editor para autorizar y crear el Sheet. */
function inicializar() {
  const ss = libro_();
  PROPUESTAS.forEach(n => pestana_(ss, n, ENCABEZADO));
  Logger.log('Sheet listo: ' + ss.getUrl());
}
