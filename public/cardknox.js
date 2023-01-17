const form = document.getElementById("payment-form");

const xKeyEl = document.getElementById("xKey");
const xCommandEl = document.getElementById("xCommand");
const xBeginDateEl = document.getElementById("xBeginDate");
const xEndDateEl = document.getElementById("xEndDate");

document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const xKey = xKeyEl.value;
    const xCommand = xCommandEl.value;
    const xBeginDate = xBeginDateEl.value;
    const xEndDate = xEndDateEl.value;

    fetchData("/reportjson", { xKey, xCommand, xBeginDate, xEndDate }).then(
      (data) => {
        console.log(data); // JSON data parsed by `data.json()` call
      }
    );
  });
});

const fetchData = async (url = "", data = {}) => {
  console.log(data);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects

  r;
};
