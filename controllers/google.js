import { google } from "googleapis"
import Bottleneck from "bottleneck"
import * as gSheetsHelpers from "../helpers/g-sheets-lib.js"
import * as gDriveHelpers from "../helpers/g-drive-lib.js"

async function index(req, res) {
  const limiter = new Bottleneck({
    minTime: 5000,
    maxConcurrent: 1,
  })

  try {
    const sheets = google.sheets({ version: "v4", auth: req.googleOAuthClient })
    const drive = google.drive({ version: "v3", auth: req.googleOAuthClient })
    req.body.templateSpreadsheet =
      "13dXZs4AzO8sKwXAgOgQNWl7teM9DU6O3utTEwdSI5rw"
    req.body.dataSourceSpreadsheet =
      "11IC77QB6zfvRVAw0qbnl-DENl3woZ445pWYrPQTWAno"
    req.body.projectPlanning = true
    req.body.range = req.body.range ? req.body.range : "ProjectDetails"
    const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
      sheets,
      req.body.templateSpreadsheet,
    )
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    for (const row of sourceData) {
      const newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
      const newFile = await limiter.schedule(() => (
        gDriveHelpers.copyFileInPlace(
          drive,
          req.body.templateSpreadsheet,
          newSpreadsheetTitle,
        )
      ))
      const newSpreadsheetId = newFile.data.id
      console.log("SId", newSpreadsheetId)
      const dataToFill = [
        {
          range: "StudentName",
          values: [[row[0]]]
        },
        {
          range: "ProjectName",
          values: [[row[1]]]
        },
        {
          range: "GitHubLink",
          values: [[row[2]]]
        },
        {
          range: "DeploymentLink",
          values: [[row[3]]]
        },
      ]
      if (req.body.projectPlanning) {
        dataToFill.push({
          range: "ProjectPlanningMaterials",
          values: [[row[4]]]
        })
      }
      await gSheetsHelpers.batchUpdateSpreadsheet(
        sheets,
        newSpreadsheetId,
        dataToFill
      )
    }
    res.redirect("/")
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
    res.redirect("/")
  }
}

export { index }
