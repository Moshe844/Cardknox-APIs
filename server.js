const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/reportjson", (req, res) => {
  const { xKey, xCommand, xBeginDate, xEndDate } = req.body;
  const xVersion = "5.0.0";
  const xSoftwareName = "Cardknox";
  const xSoftwareVersion = "2.1";

  if (!xKey || !xCommand || !xBeginDate || !xEndDate) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  const options = {
    url: "https://x1.cardknox.com/reportjson",
    method: "POST",
    headers: {
      xKey: xKey,
      xCommand: xCommand,
      xBeginDate: xBeginDate,
      xEndDate: xEndDate,
      xVersion: xVersion,
      xSoftwareName: xSoftwareName,
      xSoftwareVersion: xSoftwareVersion,
    },
  };
  // console.log(options);

  request(options, (error, response, body) => {
    // if (error) {
    //   return console.log(error);
    // }
    try {
      // Parse the response from the API
      let json = JSON.parse(body);

      // Extract the desired JSON object from the response
      let result = {
        xRefNum: json.xRefNum,
        xCommand: json.xCommand,
        xName: json.xName,
        xMaskedCardNumber: json.xMaskedCardNumber,
        xToken: json.xToken,
        xAmount: json.xAmount,
        xRequestAmount: json.xRequestAmount,
        xCustom01: json.xCustom01,
        xCustom02: json.xCustom02,
        xEnteredDate: json.xEnteredDate,
        xResponseAuthCode: json.xResponseAuthCode,
        xResponseResult: json.xResponseResult,
      };

      // Send the desired JSON object as the response
      console.log(result);
      return res.status(200).json(result);
      // console.log(result);
    } catch (e) {
      return console.log("The response is not a valid JSON", body);
    }
  });
});

app.listen(3008, () => {
  console.log("Server running on port 3008");
});
