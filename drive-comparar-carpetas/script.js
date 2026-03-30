/**
 * Compara dos carpetas de Google Drive de forma recursiva
 * 
 * Qué hace:
 * - Cuenta el total de archivos en cada carpeta (incluyendo subcarpetas)
 * - Suma el peso total de los archivos
 * - Muestra diferencias entre ambas carpetas
 * 
 * Nota:
 * - file.getSize() puede no ser exacto para archivos nativos de Google (Docs, Sheets, etc.)
 * - Para archivos subidos (PDF, Excel, videos) sí es confiable
 */
function compararCarpetasDrive() {

  // IDs de las carpetas (tomados del link de Drive)
  var folderId1 = '1BfmausngtG8_qcrjlWsg9pDnGE_OFxlB';
  var folderId2 = '1E25LB1t2K6Ms4PYPb-2D0VtGRBn1Ef8S';

  // Obtiene los objetos de carpeta
  var folder1 = DriveApp.getFolderById(folderId1);
  var folder2 = DriveApp.getFolderById(folderId2);

  // Calcula estadísticas de cada carpeta
  var stats1 = obtenerStats(folder1);
  var stats2 = obtenerStats(folder2);

  // ===== RESULTADOS INDIVIDUALES =====
  Logger.log('===== RESULTADOS =====');

  Logger.log('Carpeta 1: ' + folder1.getName());
  Logger.log('Archivos: ' + stats1.archivos);
  Logger.log('Peso (MB): ' + mb(stats1.bytes));

  Logger.log('Carpeta 2: ' + folder2.getName());
  Logger.log('Archivos: ' + stats2.archivos);
  Logger.log('Peso (MB): ' + mb(stats2.bytes));

  // ===== COMPARACIÓN =====
  Logger.log('===== DIFERENCIA =====');
  Logger.log('Archivos diff (1 - 2): ' + (stats1.archivos - stats2.archivos));
  Logger.log('Peso diff (MB) (1 - 2): ' + mb(stats1.bytes - stats2.bytes));
}


/**
 * Calcula estadísticas de una carpeta:
 * - total de archivos
 * - total de bytes
 */
function obtenerStats(folder) {
  var resultado = { archivos: 0, bytes: 0 };

  // Llamada recursiva
  recorrer(folder, resultado);

  return resultado;
}


/**
 * Recorre una carpeta y todas sus subcarpetas (recursivo)
 * 
 * Parámetros:
 * - folder: carpeta actual
 * - resultado: objeto acumulador
 */
function recorrer(folder, resultado) {

  // Itera archivos en la carpeta actual
  var files = folder.getFiles();

  while (files.hasNext()) {
    var file = files.next();

    // Incrementa contador de archivos
    resultado.archivos++;

    // Suma tamaño del archivo
    try {
      resultado.bytes += file.getSize();
    } catch (e) {
      // Algunos archivos pueden fallar (ej. permisos o tipos especiales)
      Logger.log('Error leyendo tamaño: ' + file.getName());
    }
  }

  // Itera subcarpetas
  var subfolders = folder.getFolders();

  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();

    // Llamada recursiva para seguir bajando niveles
    recorrer(subfolder, resultado);
  }
}


/**
 * Convierte bytes a MB (megabytes)
 */
function mb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}
