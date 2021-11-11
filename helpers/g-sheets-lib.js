async function getSpreadsheet(sheets, spreadsheetId) {
  const spreadsheet = await sheets.spreadsheets.get({spreadsheetId})
  return spreadsheet.data
}

export {
  getSpreadsheet,
}