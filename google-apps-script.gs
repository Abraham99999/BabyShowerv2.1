function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Confirmaciones");

  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Confirmaciones");
    sheet.appendRow(["Fecha registro", "Evento", "Asistente", "Personas", "Estado"]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.fechaRegistro || new Date(),
    data.evento || "Baby Shower de Julieta",
    data.asistente || "",
    data.personas || "",
    data.estado || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
