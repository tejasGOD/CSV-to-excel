document
  .getElementById("upload-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("csv-file");
    const file = fileInput.files[0];

    if (file && file.type === "text/csv") {
      convertCsvToExcel(file);
    } else {
      displayMessage("Please select a valid CSV file.");
    }
  });

function displayMessage(message) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
}

function convertCsvToExcel(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = event.target.result;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.csv_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.xlsx";
    link.click();

    displayMessage("File converted successfully.");
  };
  reader.readAsText(file);
}
