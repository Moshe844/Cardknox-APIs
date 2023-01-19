const form = document.getElementById("payment-form");

const xKeyEl = document.getElementById("xKey");
const xCommandEl = document.getElementById("xCommand");
const xBeginDateEl = document.getElementById("xBeginDate");
const xEndDateEl = document.getElementById("xEndDate");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
let currentPage = 1;
let totalPages = 0;
let transactions = [];

const fetchData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  const jsonData = await response.json();
  if (!jsonData.xReportData) {
    console.log("No report data found!");
    return;
  }
  return jsonData;
};
document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const xKey = xKeyEl.value;
    const xCommand = xCommandEl.value;
    const xBeginDate = xBeginDateEl.value;
    const xEndDate = xEndDateEl.value;

    fetchData("/reportjson", { xKey, xCommand, xBeginDate, xEndDate }).then(
      (data) => {
        // Extract the array of data items
        transactions = data.xReportData;
        totalPages = Math.ceil(data.xReportData.length / 15);
        currentPage = 1;
        renderTable();
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        if (prevButton) {
          prevButton.addEventListener("click", function () {
            currentPage--;
            renderTable();
            prevButton.style.display = "block";
            nextButton.style.display = "block";
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
          });
        }

        if (nextButton) {
          nextButton.addEventListener("click", function () {
            currentPage++;
            renderTable();
            prevButton.style.display = "block";
            nextButton.style.display = "block";
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
          });
        }
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
      }
    );
  });
});

const renderTable = () => {
  console.log("renderTable function is called");

  const table = document.getElementById("data-table");
  const tableBody = document.getElementById("data-table-body");
  if (table && tableBody) {
    if (transactions.length === 0) {
      tableBody.innerHTML = "No Transactions to Display";
    } else {
      tableBody.innerHTML = "";
    }
  }
  console.log(tableBody.innerHTML);

  totalPages = Math.ceil(transactions.length / 15);

  const startIndex = (currentPage - 1) * 15;
  const endIndex = startIndex + 15;
  for (let i = startIndex; i < endIndex; i++) {
    if (transactions[i]) {
      const row = document.createElement("tr");

      // xRefNum
      const xRefNumCell = document.createElement("td");
      xRefNumCell.innerHTML = transactions[i].xRefNum;
      row.appendChild(xRefNumCell);

      // xCommand
      const xCommandCell = document.createElement("td");
      xCommandCell.innerHTML = transactions[i].xCommand;
      row.appendChild(xCommandCell);

      // xName
      const xNameCell = document.createElement("td");
      xNameCell.innerHTML = transactions[i].xName;
      row.appendChild(xNameCell);

      // xMaskedCardNumber
      const xMaskedCardNumberCell = document.createElement("td");
      xMaskedCardNumberCell.innerHTML = transactions[i].xMaskedCardNumber;
      row.appendChild(xMaskedCardNumberCell);

      // xAmount
      const xAmountCell = document.createElement("td");
      xAmountCell.innerHTML = transactions[i].xAmount;
      row.appendChild(xAmountCell);

      // xResponseResult
      const xResponseResultCell = document.createElement("td");
      xResponseResultCell.innerHTML = transactions[i].xResponseResult;
      row.appendChild(xResponseResultCell);

      // xEnteredDate
      const xEnteredDateCell = document.createElement("td");
      xEnteredDateCell.innerHTML = transactions[i].xEnteredDate;
      row.appendChild(xEnteredDateCell);

      // xResponseAuthCode
      const xResponseAuthCodeCell = document.createElement("td");
      xResponseAuthCodeCell.innerHTML = transactions[i].xResponseAuthCode;
      row.appendChild(xResponseAuthCodeCell);

      //Append the row to the table body
      if (table && tableBody) {
        tableBody.appendChild(row);
      }

      //Add class to hide the table before submission
      document.getElementById("data-table").classList.remove("table-hide");

      //update the button status
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    }
  }

  //Add class to hide the table before submission

  //Add event listener to the prev and next button
  prevButton.addEventListener("click", function () {
    currentPage--;
    renderTable();
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  });
  nextButton.addEventListener("click", function () {
    currentPage++;
    renderTable();
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  });
};
