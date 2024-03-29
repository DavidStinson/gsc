import { google } from 'googleapis'
import * as gSheetsHelpers from '../helpers/g-sheets-lib.js'
import * as gDriveHelpers from '../helpers/g-drive-lib.js'
import { backOff } from 'exponential-backoff'

async function unitOne(req, res) {
  try {
    const sheets = google.sheets({ version: 'v4', auth: req.googleOAuthClient })
    const drive = google.drive({ version: 'v3', auth: req.googleOAuthClient })
    req.body.dataSourceSpreadsheet =
      '1vRnOArPkdvQnC_s91SiT1jaJkamaUSWj2PvhPrel5CU'
    req.body.range = req.body.range ? req.body.range : 'ProjectDetails'
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    for (const row of sourceData) {
      await backOff(
        async () => {
          req.body.templateSpreadsheet = "12kwa6Hxudf7DAXKk1WJDJJHd-UyCoR2Rr205CD37Jpg"
          const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
            sheets,
            req.body.templateSpreadsheet
          )
          const newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
          const newFile = await gDriveHelpers.copyFileInPlace(
            drive,
            req.body.templateSpreadsheet,
            newSpreadsheetTitle
          )
          const newSpreadsheetId = newFile.data.id
          console.log('SId', newSpreadsheetId, newSpreadsheetTitle)
          const dataToFill = [
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
          await gSheetsHelpers.batchUpdateSpreadsheet(
            sheets,
            newSpreadsheetId,
            dataToFill
          )
        },
        {
          maxDelay: 64000,
          retry: function (error, attemptNumber) {
            console.error(
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
      console.error(apiError)
      console.error('THE API ERROR:', apiError.data?.error?.message)
      if (apiError.data.error.code === 404) {
        console.error('While looking for this resource:', apiError.config.url)
        console.error('Ensure you provided the correct values.')
      }
    } else {
      console.error('THIS ERROR WAS THROWN:', error)
    }
    res.redirect('/')
  }
}

async function unitTwo(req, res) {
  try {
    const sheets = google.sheets({ version: 'v4', auth: req.googleOAuthClient })
    const drive = google.drive({ version: 'v3', auth: req.googleOAuthClient })
    req.body.dataSourceSpreadsheet =
      '16l5GXcTfIYzxWuyqe-z4iruelQrZ5cY0zxzvGecVpzw'
    req.body.range = req.body.range ? req.body.range : 'ProjectDetails'
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    for (const row of sourceData) {
      await backOff(
        async () => {
          req.body.templateSpreadsheet = "1hATEQToAklVlOm_l358FY1nbS8W-G2E6d2-eQioh0KE"
          const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
            sheets,
            req.body.templateSpreadsheet
          )
          const newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
          const newFile = await gDriveHelpers.copyFileInPlace(
            drive,
            req.body.templateSpreadsheet,
            newSpreadsheetTitle
          )
          const newSpreadsheetId = newFile.data.id
          console.log('🚀 nSId/title', newSpreadsheetId, newSpreadsheetTitle)
          const dataToFill = [
            {
              range: 'StudentName',
              values: [[row[0]]],
            },
            {
              range: 'ProjectName',
              values: [[row[1]]]
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
          await gSheetsHelpers.batchUpdateSpreadsheet(
            sheets,
            newSpreadsheetId,
            dataToFill
          )
        },
        {
          maxDelay: 64000,
          retry: function (error, attemptNumber) {
            console.error(
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
      console.error(apiError)
      console.error('THE API ERROR:', apiError.data?.error?.errors)
      if (apiError.data.error.code === 404) {
        console.error('While looking for this resource:', apiError.config.url)
        console.error('Ensure you provided the correct values.')
      }
    } else {
      console.error('THIS ERROR WAS THROWN:', error)
    }
    res.redirect('/')
  }
}

async function unitThree(req, res) {
  try {
    const sheets = google.sheets({ version: 'v4', auth: req.googleOAuthClient })
    const drive = google.drive({ version: 'v3', auth: req.googleOAuthClient })
    req.body.dataSourceSpreadsheet =
      '1Es4mMa8X4tGCZph87Zhe-nB6v44kX3l5tVISajEZMpE'
    req.body.templateSpreadsheet = "1VkStNLDoP-KbmHnpLGpNV4hsYxI1ZPXYqj2zrS8OtcI"
    req.body.range = req.body.range ? req.body.range : 'ProjectDetails'
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    for (const row of sourceData) {
      await backOff(
        async () => {
          const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
            sheets,
            req.body.templateSpreadsheet
          )
          let newSpreadsheetTitle = `${row[1]} - ${templateSpreadsheet.properties.title}`
          const newFile = await gDriveHelpers.copyFileInPlace(
            drive,
            req.body.templateSpreadsheet,
            newSpreadsheetTitle
          )
          const newSpreadsheetId = newFile.data.id
          console.log('🚀 nSId/title', newSpreadsheetId, newSpreadsheetTitle)
          let dataToFill = [
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
          await gSheetsHelpers.batchUpdateSpreadsheet(
            sheets,
            newSpreadsheetId,
            dataToFill
          )
        },
        {
          maxDelay: 64000,
          retry: function (error, attemptNumber) {
            console.error(
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
      console.error(apiError)
      console.error('THE API ERROR:', apiError.data?.error?.message)
      if (apiError.data.error.code === 404) {
        console.error('While looking for this resource:', apiError.config.url)
        console.error('Ensure you provided the correct values.')
      }
    } else {
      console.error('THIS ERROR WAS THROWN:', error)
    }
    res.redirect('/')
  }
}

async function unitFour(req, res) {
  try {
    const sheets = google.sheets({ version: 'v4', auth: req.googleOAuthClient })
    const drive = google.drive({ version: 'v3', auth: req.googleOAuthClient })
    req.body.dataSourceSpreadsheet =
      '1q49IN8HHF-H9Rr238wJLFRlKZlxvR7hUMGHcKmsKtck/'
    req.body.range = req.body.range ? req.body.range : 'ProjectDetails'
    const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
      sheets,
      req.body.dataSourceSpreadsheet,
      req.body.range
    )
    for (const row of sourceData) {
      await backOff(
        async () => {
          req.body.templateSpreadsheet = "1TBhf46Ofya3ZPuzmtaSvp4uJTpilsGkcm976Hnf5JxI"
          const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
            sheets,
            req.body.templateSpreadsheet
          )
          const newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
          const newFile = await gDriveHelpers.copyFileInPlace(
            drive,
            req.body.templateSpreadsheet,
            newSpreadsheetTitle
          )
          const newSpreadsheetId = newFile.data.id
          console.log('🚀 nSId/title', newSpreadsheetId, newSpreadsheetTitle)
          const dataToFill = [
            {
              range: 'StudentName',
              values: [[row[0]]],
            },
            {
              range: 'ProjectName',
              values: [[row[1]]]
            },
            {
              range: 'GitHubLink',
              values: [[row[2]]],
            },
            {
              range: 'DeploymentLink',
              values: [[row[3]]],
            },
          ]
          await gSheetsHelpers.batchUpdateSpreadsheet(
            sheets,
            newSpreadsheetId,
            dataToFill
          )
        },
        {
          maxDelay: 64000,
          retry: function (error, attemptNumber) {
            console.error(
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
      console.error(apiError)
      console.error('THE API ERROR:', apiError.data?.error?.errors)
      if (apiError.data.error.code === 404) {
        console.error('While looking for this resource:', apiError.config.url)
        console.error('Ensure you provided the correct values.')
      }
    } else {
      console.error('THIS ERROR WAS THROWN:', error)
    }
    res.redirect('/')
  }
}

// async function unitFour(req, res) {
//   try {
//     const sheets = google.sheets({ version: 'v4', auth: req.googleOAuthClient })
//     const drive = google.drive({ version: 'v3', auth: req.googleOAuthClient })
//     req.body.dataSourceSpreadsheet =
//       '1Ux9JkMTSZR5rM15kXUAT52_t9RKeONBA9xEfcLoQ2Ag'
//     req.body.range = req.body.range ? req.body.range : 'ProjectDetails'
//     const sourceData = await gSheetsHelpers.getRangeValuesFromSpreadsheet(
//       sheets,
//       req.body.dataSourceSpreadsheet,
//       req.body.range
//     )
//     for (const row of sourceData) {
//       await backOff(
//         async () => {
//           if (row[1] === "Yes" && row[5] === "Yes") {
//             req.body.templateSpreadsheet = "1d3ONaRKBxtXrlPj32dCyLS-Zdxhn9q49xH1Fs2-Bif4"
//           } else if (row[1] === "No" && row[5] === "Yes") {
//             req.body.templateSpreadsheet = "18gBKsq7bM6FEApULqzm0L8x_MjpJAzbRZOjBvcF9Kb4"
//           } else {
//             req.body.templateSpreadsheet = "1Yu71O79b4vB3MJfA2LzUjDh-S2vBwhp6M7IjpsqOfHA"
//           }
//           const templateSpreadsheet = await gSheetsHelpers.getSpreadsheet(
//             sheets,
//             req.body.templateSpreadsheet
//           )
//           let newSpreadsheetTitle
//           if (row[1] === "Yes") {
//             newSpreadsheetTitle = `${row[2]} - ${templateSpreadsheet.properties.title}`
//           } else {
//             newSpreadsheetTitle = `${row[0]} - ${templateSpreadsheet.properties.title}`
//           }
//           const newFile = await limiter.schedule(() =>
//             gDriveHelpers.copyFileInPlace(
//               drive,
//               req.body.templateSpreadsheet,
//               newSpreadsheetTitle
//             )
//           )
//           const newSpreadsheetId = newFile.data.id
//           console.log('SId', newSpreadsheetId)
//           let dataToFill = []
//           if (row[1] === "Yes" && row[5] === "Yes") {
//             dataToFill = [
//               {
//                 range: 'StudentName',
//                 values: [[row[0]]],
//               },
//               {
//                 range: 'TeamName',
//                 values: [[row[2]]],
//               },
//               {
//                 range: 'ProjectName',
//                 values: [[row[4]]],
//               },
//               {
//                 range: 'GitHubFELink',
//                 values: [[row[7]]],
//               },
//               {
//                 range: 'GitHubBELink',
//                 values: [[row[8]]],
//               },
//               {
//                 range: 'DeploymentLink',
//                 values: [[row[9]]],
//               },
//             ]
//           } else if (row[1] === "No" && row[5] === "Yes") {
//             dataToFill = [
//               {
//                 range: 'StudentName',
//                 values: [[row[0]]],
//               },
//               {
//                 range: 'ProjectName',
//                 values: [[row[4]]],
//               },
//               {
//                 range: 'GitHubFELink',
//                 values: [[row[7]]],
//               },
//               {
//                 range: 'GitHubBELink',
//                 values: [[row[8]]],
//               },
//               {
//                 range: 'DeploymentLink',
//                 values: [[row[9]]],
//               },
//             ]
//           } else {
//             dataToFill = [
//               {
//                 range: 'StudentName',
//                 values: [[row[0]]],
//               },
//               {
//                 range: 'ProjectName',
//                 values: [[row[4]]],
//               },
//               {
//                 range: 'GitHubLink',
//                 values: [[row[6]]],
//               },
//               {
//                 range: 'DeploymentLink',
//                 values: [[row[9]]],
//               },
//             ]
//           }
//           // if (req.body.uThree) {
//           //   dataToFill = [
//           //     {
//           //       range: 'StudentName',
//           //       values: [[row[0]]],
//           //     },
//           //     {
//           //       range: 'TeamName',
//           //       values: [[row[1]]],
//           //     },
//           //     {
//           //       range: 'ProjectName',
//           //       values: [[row[2]]],
//           //     },
//           //     {
//           //       range: 'ProjectPlanningMaterials',
//           //       values: [[row[3]]],
//           //     },
//           //     {
//           //       range: 'GitHubFELink',
//           //       values: [[row[4]]],
//           //     },
//           //     {
//           //       range: 'GitHubBELink',
//           //       values: [[row[5]]],
//           //     },
//           //     {
//           //       range: 'DeploymentLink',
//           //       values: [[row[6]]],
//           //     },
//           //   ]
//           // } else {
//           //   dataToFill = [
//           //     {
//           //       range: 'StudentName',
//           //       values: [[row[0]]],
//           //     },
//           //     {
//           //       range: 'ProjectName',
//           //       values: [[row[1]]],
//           //     },
//           //     {
//           //       range: 'ProjectPlanningMaterials',
//           //       values: [[row[2]]],
//           //     },
//           //     {
//           //       range: 'GitHubLink',
//           //       values: [[row[3]]],
//           //     },
//           //     {
//           //       range: 'DeploymentLink',
//           //       values: [[row[4]]],
//           //     },
//           //   ]
//           // }
//           await gSheetsHelpers.batchUpdateSpreadsheet(
//             sheets,
//             newSpreadsheetId,
//             dataToFill
//           )
//         },
//         {
//           maxDelay: 64000,
//           retry: function (error, attemptNumber) {
//             console.error(
//               `a backoff error occurred on attempt number ${attemptNumber}:`,
//               error
//             )
//             return true
//           },
//         }
//       )
//     }
//     res.redirect('/')
//   } catch (error) {
//     if (error.response?.data) {
//       const apiError = error.response
//       console.error(apiError)
//       console.error('THE API ERROR:', apiError.data?.error?.message)
//       if (apiError.data.error.code === 404) {
//         console.error('While looking for this resource:', apiError.config.url)
//         console.error('Ensure you provided the correct values.')
//       }
//     } else {
//       console.error('THIS ERROR WAS THROWN:', error)
//     }
//     res.redirect('/')
//   }
// }

export { unitOne, unitTwo, unitThree, unitFour }
