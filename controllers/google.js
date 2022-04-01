import { google } from 'googleapis'
import Bottleneck from 'bottleneck'
import * as gSheetsHelpers from '../helpers/g-sheets-lib.js'
import * as gDriveHelpers from '../helpers/g-drive-lib.js'
import { backOff } from 'exponential-backoff'

async function index(req, res) {
  const limiter = new Bottleneck({
    minTime: 3000,
    maxConcurrent: 1,
  })

  try {
    const sheets = google.sheets({ version: 'v4', auth: req.googleOAuthClient })
    const drive = google.drive({ version: 'v3', auth: req.googleOAuthClient })
    req.body.templateSpreadsheet =
      '18dPnI-IbgCtcpqMPgToxlLFCRaF4PD_dVVf39qyzaDA'
    req.body.dataSourceSpreadsheet =
      '1Evu8mpAt3dPRmAf4WJ7aD-2ew4Tz7qzgomzcp6qDMl0'
    req.body.uThree = true
    req.body.range = req.body.range ? req.body.range : 'ProjectDetails'
    const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
      sheets,
      req.body.templateSpreadsheet
    )
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    for (const row of sourceData) {
      await backOff(
        async () => {
          let newSpreadsheetTitle
          if (req.body.uThree) {
            newSpreadsheetTitle = `${row[1]} - ${templateSpreadsheet.properties.title}`
          } else {
            newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
          }
          const newFile = await limiter.schedule(() =>
            gDriveHelpers.copyFileInPlace(
              drive,
              req.body.templateSpreadsheet,
              newSpreadsheetTitle
            )
          )
          const newSpreadsheetId = newFile.data.id
          console.log('SId', newSpreadsheetId)
          let dataToFill = []
          if (req.body.uThree) {
            dataToFill = [
              {
                range: 'StudentName',
                values: [[row[0]]],
              },
              {
                range: 'TeamName',
                values: [[row[1]]],
              },
              {
                range: 'ProjectName',
                values: [[row[2]]],
              },
              {
                range: 'ProjectPlanningMaterials',
                values: [[row[3]]],
              },
              {
                range: 'GitHubFELink',
                values: [[row[4]]],
              },
              {
                range: 'GitHubBELink',
                values: [[row[5]]],
              },
              {
                range: 'DeploymentLink',
                values: [[row[6]]],
              },
            ]
          } else {
            dataToFill = [
              {
                range: 'StudentName',
                values: [[row[0]]],
              },
              {
                range: 'ProjectName',
                values: [[row[1]]],
              },
              {
                range: 'ProjectPlanningMaterials',
                values: [[row[2]]],
              },
              {
                range: 'GitHubLink',
                values: [[row[3]]],
              },
              {
                range: 'DeploymentLink',
                values: [[row[4]]],
              },
            ]
          }
          await gSheetsHelpers.batchUpdateSpreadsheet(
            sheets,
            newSpreadsheetId,
            dataToFill
          )
        },
        {
          maxDelay: 64000,
          retry: function (error, attemptNumber) {
            console.log(
              `a backoff error occurred on attempt number ${attemptNumber}:`,
              error
            )
            return true
          },
        }
      )
    }
    res.redirect('/')
  } catch (error) {
    if (error.response?.data) {
      const apiError = error.response
      console.log(apiError)
      console.log('THE API ERROR:', apiError.data?.error?.message)
      if (apiError.data.error.code === 404) {
        console.log('While looking for this resource:', apiError.config.url)
        console.log('Ensure you provided the correct values.')
      }
    } else {
      console.log('THIS ERROR WAS THROWN:', error)
    }
    res.redirect('/')
  }
}

export { index }
