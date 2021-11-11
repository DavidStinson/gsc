import { google } from "googleapis"
import * as gSheetsHelpers from "../helpers/g-sheets-lib.js"
import * as gDriveHelpers from "../helpers/g-drive-lib.js"

async function index(req, res) {
  try {
    const sheets = google.sheets({ version: "v4", auth: req.googleOAuthClient })
    const drive = google.drive({ version: "v3", auth: req.googleOAuthClient})
    req.body.spread = "18l5BhNFhEDFElnKlTRaXRlWgb6RE5ArmQChUb4QLJiY"
    const spread = await gSheetsHelpers.getSpreadsheet(
      sheets,
      req.body.spread
    )
    const newSpreadTitle = `test ${spread.properties.title}`
    await gDriveHelpers.copyFileInPlace(drive, req.body.spread, newSpreadTitle)
    
  } catch (error) {
    if (error.response?.data) {
      const apiError = error.response
      console.log("THE API ERROR:", apiError.data?.error?.message)
      if (apiError.data.error.code === 404){
        console.log("While looking for this resource:", apiError.config.url)
        console.log("Ensure you provided the correct values.")
      }
    } else {
      console.log("THIS ERROR WAS THROWN:", error)
    }
  }



  // sheets.spreadsheets
  //   .get({
  //     spreadsheetId: "18l5BhNFhEDFElnKlTRaXRlWgb6RE5ArmQChUb4QLJiY",
  //   })
  //   .then((response) => {
  //     console.log(response.data)
  //     console.log(response.data.sheets)
  //     // const rows = response.data.values
  //     // if (!rows.length) throw new Error("No data found")
  //     // rows.forEach(row => {

  //     // })
  //   })
  //   .catch((error) => {
      
  //   })
  //  (err, response) => {
  //   if (err) return console.log('The API returned an error: ' + err)
  //   const rows = response.data.values
  //   if (rows.length) {
  //     console.log('Name, Project Name, Project Planning Materials, GitHub Link, Deployment Link')
  //     // Print columns A through E, which correspond to indices 0 and 4.
  //     rows.map((row) => {
  //       console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`)
  //     })
  //   } else {
  //     console.log('No data found.')
  //   }
  // })
}

export { index }
