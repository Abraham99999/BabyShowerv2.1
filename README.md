# Baby Shower de Julieta - Deluxe v4 con Google Sheets

## Qué cambió
La sección de confirmación ahora tiene:
- Campo de texto: Asistente
- Lista desplegable: 1 a 4 personas
- Botón: Confirmar asistencia
- Botón: No asisto
- Envío a Google Sheets mediante Google Apps Script

## Cómo conectar Google Sheets

1. Crea un Google Sheets nuevo.
2. Crea una hoja llamada: Confirmaciones
3. En el menú, ve a Extensiones > Apps Script.
4. Borra el código que aparezca y pega el contenido del archivo:
   google-apps-script.gs
5. Da clic en Implementar > Nueva implementación.
6. Tipo: Aplicación web.
7. Ejecutar como: Tú.
8. Quién tiene acceso: Cualquier usuario.
9. Copia la URL que termina en /exec.
10. Abre js/app.js.
11. Reemplaza:
   PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT
   por tu URL real.
12. Sube todos los archivos a GitHub conservando carpetas.

## Importante
No subas los archivos sueltos sin las carpetas css y js.
