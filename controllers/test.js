import { google } from "googleapis"
import Bottleneck from "bottleneck"
import * as gSheetsHelpers from "../helpers/g-sheets-lib.js"
import * as gDriveHelpers from "../helpers/g-drive-lib.js"

async function index(req, res) {
  const limiter = new Bottleneck({
    minTime: 50,
    maxConcurrent: 1,
  })
  try {
    const sheets = google.sheets({ version: "v4", auth: req.googleOAuthClient })
    const drive = google.drive({ version: "v3", auth: req.googleOAuthClient })
    req.body.templateSpreadsheet =
      "13dXZs4AzO8sKwXAgOgQNWl7teM9DU6O3utTEwdSI5rw"
    req.body.dataSourceSpreadsheet =
      "11IC77QB6zfvRVAw0qbnl-DENl3woZ445pWYrPQTWAno"
    req.body.range = req.body.range ? req.body.range : "ProjectDetails"
    const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
      sheets,
      req.body.templateSpreadsheet,
    )
    // const destinationRanges = await gSheetsHelpers.getRangesFromSpreadsheet(
    //   sheets,
    //   req.body.templateSpreadsheet,
    //   [
    //     "StudentName",
    //     "ProjectName",
    //     "GitHubLink",
    //     "DeploymentLink",
    //     "ProjectPlanningMaterials",
    //   ],
    // )
    // console.log(destinationRanges)
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    sourceData.forEach(async (row) => {
      const newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
      const newFile = await limiter.schedule(() => (
        gDriveHelpers.copyFileInPlace(
          drive,
          req.body.templateSpreadsheet,
          newSpreadsheetTitle,
        )
      ))
      const newSpreadsheetid = newFile.data.id
      const dataToFill = {
        range: "C3:C7",
        majorDimension: "COLUMNS",
        values: [[
           row[0], row[1], row[4], row[2], row[3]
        ]]
      }
      const finished = await gSheetsHelpers.updateSpreadsheet(
        sheets, 
        newSpreadsheetid, 
        dataToFill,
      )
      console.log(finished)
    })
  } catch (error) {
    if (error.response?.data) {
      const apiError = error.response
      console.log("THE API ERROR:", apiError.data?.error?.message)
      if (apiError.data.error.code === 404) {
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
