async function getSpreadsheet(sheets, spreadsheetId) {
  const spreadsheet = await sheets.spreadsheets.get({spreadsheetId})
  return spreadsheet.data
}

async function getRangeValuesFromSpreadsheet(sheets, spreadsheetId, range) {
  console.log(spreadsheetId)
  const spreadsheetRange = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  })
  return spreadsheetRange.data.values
}

async function getRangesFromSpreadsheet(sheets, spreadsheetId, ranges) {
  console.log(spreadsheetId)
  const spreadsheetRange = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges
  })
  return spreadsheetRange.data.ranges
}

export {
  getSpreadsheet,
  getRangeValuesFromSpreadsheet,
  getRangesFromSpreadsheet
}