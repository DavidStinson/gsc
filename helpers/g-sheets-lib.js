async function getSpreadsheet(sheets, spreadsheetId) {
  const spreadsheet = await sheets.spreadsheets.get({spreadsheetId})
  return spreadsheet.data
}

async function getRangeValuesFromSpreadsheet(sheets, spreadsheetId, range) {
  const spreadsheetRange = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  })
  return spreadsheetRange.data.values
}

async function batchUpdateSpreadsheet(sheets, spreadsheetId, request) {
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    resource: {
      valueInputOption: "RAW",
      data: request
    }
  })
}

export {
  getSpreadsheet,
  getRangeValuesFromSpreadsheet,
  batchUpdateSpreadsheet,
}