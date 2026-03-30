# Drive - Comparar Carpetas

## Descripción

Compara dos carpetas de Google Drive de forma recursiva.

Calcula:

* Total de archivos
* Peso total
* Diferencia entre carpetas

## Uso

1. Abrir https://script.google.com
2. Crear un nuevo proyecto
3. Pegar el contenido de `script.js`
4. Configurar los IDs de carpeta:

```javascript
var folderId1 = '...';
var folderId2 = '...';
```

5. Ejecutar la función:

```javascript
compararCarpetasDrive()
```

6. Ver resultados en:

* Logs (`Logger.log`)

## Output esperado

```
Carpeta 1: Nombre carpeta A
Archivos: 320
Peso (MB): 1240.55

Carpeta 2: Nombre carpeta B
Archivos: 298
Peso (MB): 1180.20

DIFERENCIA
Archivos diff: 22
Peso diff (MB): 60.35
```

## Notas

* No compara contenido ni nombres de archivos (solo volumen)
* `getSize()` no es exacto para:

  * Google Docs
  * Google Sheets
  * Google Slides

## Casos de uso

* Validar migraciones de Drive
* Comparar respaldos
* Auditoría rápida de volumen de información
* Pre-check antes de ETL

## Mejoras futuras

* Comparación por nombre/ruta
* Detección de archivos faltantes
* Export a Google Sheets
