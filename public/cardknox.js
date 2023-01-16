document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("payment-form");
  form.addEventListener("submit", function (event) {
    console.log("it is working");
    event.preventDefault();
    const xKey = document.getElementById("xKey").value;
    const xCommand = document.getElementById("xCommand").value;
    const xBeginDate = document.getElementById("xBeginDate").value;
    const xEndDate = document.getElementById("xEndDate").value;
    fetch(
      "/reportjson?xKey=" +
        xKey +
        "&xCommand=" +
        xCommand +
        "&xBeginDate=" +
        xBeginDate +
        "&xEndDate=" +
        xEndDate
    )
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data here
        console.log(data);
      });
  });
});
