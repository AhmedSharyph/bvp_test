function doPost(e) {
  const sheet = SpreadsheetApp.openById("PASTE_SHEET_ID")
    .getSheetByName("Visits");

  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.nid,
    data.visitType,
    data.findings,
    data.actions
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}
