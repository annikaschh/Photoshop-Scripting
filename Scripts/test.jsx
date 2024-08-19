//doc = app.activeDocument;

var csvFile = File.openDialog("Select CSV file", "*.csv");
csvFile.open("r");
var csvContent = csvFile.read();
csvFile.close();
var csvData = csvContent.split("\n");

console.log(csvData)