const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/reportjson", (req, res) => {
  const { xKey, xCommand, xBeginDate, xEndDate } = req.body;

  if (!xKey || !xCommand || !xBeginDate || !xEndDate) {
    return res.status(400).json({ message: "Missing required parameters" });
  }
  const options = {
    url: "https://x1.cardknox.com/reportjson",
    method: "POST",
    headers: {
      xVersion: "5.0.0",
      xSoftwareName: "Cardknox",
      xSoftwareVersion: "2.1",
      xKey: xKey,
      xCommand: xCommand,
      xBeginDate: xBeginDate,
      xEndDate: xEndDate,
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ message: "Error making API request" });
    }
    try {
      const data = JSON.parse(body);
      res.json({
        xAmount: data.xAmount,
        xCardType: data.xCardType,
        xCommand: data.xCommand,
        xEnteredDate: data.xEnteredDate,
        xMaskedCardnumber: data.xMaskedCardnumber,
        xRefnum: data.xRefnum,
        xResponseResult: data.xResponseResult,
        xToken: data.xToken,
      });
    } catch (err) {
      return res.status(500).json({ message: "Error parsing response" });
    }
  });
});

app.listen(3008, () => {
  console.log("Server running on port 3008");
});
