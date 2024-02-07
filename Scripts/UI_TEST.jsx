var newExport = ""
// EXPORTDESTINATION UI
// =================
var exportdestination = new Window("dialog", "choose folder"); 
    exportdestination.text = "Export Destination"; 
    exportdestination.preferredSize.width = 235;
    exportdestination.preferredSize.height = 120; 
    exportdestination.alignChildren = ["center","top"]; 
    exportdestination.spacing = 10; 
    exportdestination.margins = 16; 

var exportButton = exportdestination.add("button", undefined, undefined, {name: "OK"}); 
    exportButton.text = "Select Folder to Export to"; 
    exportButton.preferredSize.height = 33; 

var divider1 = exportdestination.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

var progressbar1 = exportdestination.add("progressbar", undefined, 0, app.activeDocument.layers.length, {name: "progressbar1"}); 
    progressbar1.maxvalue = app.activeDocument.layers.length; 
    progressbar1.preferredSize.width = 50; 
    progressbar1.preferredSize.height = 4; 

var myButtonGroup = exportdestination.add("group");
myButtonGroup.orientation = 'row';

    
var Cancel = myButtonGroup.add("button {text: 'Cancel'}");
 

 exportdestination.show();

exportButton.onClick = get_file(newExport);



function get_file(exportName) {
    /*
    var input = document.createElement('input');
input.type = 'file';

input.click();
alert(file.name);
*/
var inputFolder = Folder.selectDialog("Please select folder to process ")
if (inputFolder == null) {return}
newExport = inputFolder;
}