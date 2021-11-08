import { google } from "googleapis"

function index(req, res) {
  console.log(req.user)
  console.log("index!")
  
  const sheets = google.sheets({version: 'v4', auth: req.googleOAuthClient});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1Q2_IsFYekwpiafXPMVlxGJw0Q9SeEbxREzRZaGqkwkw',
    range: 'A2:E',
  }, (err, response) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = response.data.values;
    if (rows.length) {
      console.log('Name, Project Name, Project Planning Materials, GitHub Link, Deployment Link');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });

}

export {
  index
}