const settingsID = "exportOptions"
//try and load previous settings
var testDoc = app.activeDocument;
var exportSettings;

try {
exportSettings = app.getCustomOptions(settingsID);
} catch (e) {
saveSettings();
}

function saveSettings() {
    //save defaults
    var newExportSettings = new ActionDescriptor();
    app.putCustomOptions(settingsID,newExportSettings,true);
}

if(typeof exportSettings == "undefined") {
saveSettings();
}

executeAction(stringIDToTypeID("placedLayerEditContents"));
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

var myButtonGroup = exportdestination.add("group");
myButtonGroup.orientation = 'row';

    
var Cancel = myButtonGroup.add("button {text: 'Cancel'}");
 

 exportdestination.show();

exportButton.onClick = get_file(newExport);



function get_file(exportName) {
    /* this doesn't work lol IGNORE --------
    var input = document.createElement('input');
input.type = 'file';

input.click();
alert(file.name);
*/
var inputFolder = Folder.selectDialog("haha I wrote code :) - annika")
if (inputFolder == null) {return}
newExport = inputFolder;
}



// export layer
function exportLayer(exportPath){

var sfwOptions = new ExportOptionsSaveForWeb();   
sfwOptions.format = SaveDocumentType.PNG;
sfwOptions.PNG8 = false;       
sfwOptions.optimized = true;   
sfwOptions.quality = 50;

// Folder
var saveFolder = new Folder(exportPath);

// Extension
var saveExt = 'png';

//Name

var docName = nameList[i];

// Save file
var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );

// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
}

turnOnLayers();

// turn off all other layers, go into smart object
//turn on all layers
function turnOnLayers(){
    var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );
    var desc35 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref18 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref18.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc35.putReference( idnull, ref18 );
executeAction( idselectAllLayers, desc35, DialogModes.NO );

var idshow = stringIDToTypeID( "show" );
    var desc33 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var list16 = new ActionList();
            var ref17 = new ActionReference();
            var idlayer = stringIDToTypeID( "layer" );
            var idordinal = stringIDToTypeID( "ordinal" );
            var idtargetEnum = stringIDToTypeID( "targetEnum" );
            ref17.putEnumerated( idlayer, idordinal, idtargetEnum );
        list16.putReference( ref17 );
    desc33.putList( idnull, list16 );
executeAction( idshow, desc33, DialogModes.NO );
//deselect layers
var idselectNoLayers = stringIDToTypeID( "selectNoLayers" );
    var desc52 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref27 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref27.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc52.putReference( idnull, ref27 );
//select top layer 
executeAction( idselectNoLayers, desc52, DialogModes.NO );
var idselect = stringIDToTypeID( "select" );
    var desc55 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref30 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idbackwardEnum = stringIDToTypeID( "backwardEnum" );
        ref30.putEnumerated( idlayer, idordinal, idbackwardEnum );
    desc55.putReference( idnull, ref30 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc55.putBoolean( idmakeVisible, false );
    var idlayerID = stringIDToTypeID( "layerID" );
        var list26 = new ActionList();
        list26.putInteger( 164 );
    desc55.putList( idlayerID, list26 );
executeAction( idselect, desc55, DialogModes.NO );
}


//collect names in an array
nameList = [];

for (i = 0; i < app.activeDocument.layers.length; i++){
  thisLayer = app.activeDocument.activeLayer.name;
  nameList.push(thisLayer);
  app.activeDocument.activeLayer.visible = false;

  //select backward layer
var idslct = charIDToTypeID( "slct" );
var desc6 = new ActionDescriptor();
var idnull = charIDToTypeID( "null" );
    var ref4 = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idBckw = charIDToTypeID( "Bckw" );
    ref4.putEnumerated( idLyr, idOrdn, idBckw );
desc6.putReference( idnull, ref4 );
var idMkVs = charIDToTypeID( "MkVs" );
desc6.putBoolean( idMkVs, false );
executeAction( idslct, desc6, DialogModes.NO );

}

var win = new Window("palette", "loading");
var progressbar1 = win.add("progressbar", undefined, 0, app.activeDocument.layers.length, {name: "progressbar1"}); 
progressbar1.maxvalue = app.activeDocument.layers.length; 
progressbar1.preferredSize.width = 50; 
progressbar1.preferredSize.height = 4; 
win.show();

layerCount = app.activeDocument.layers.length;

//turn on layer by name, export
for (i = 0; i<layerCount; i++){
    win.progressbar1.value = i+1;
    win.show();

    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer(newExport);
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
   

    if (i == app.activeDocument.layers.length-1){
        
        thisLayer.visible = true;
        app.activeDocument.save();
        app.activeDocument.close();
    }
}


/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":5,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"exportdestination","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Export Destination","preferredSize":[235,120],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"Select Folder to Export to","justify":"center","preferredSize":[0,33],"alignment":null,"helpTip":null}},"item-2":{"id":2,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"OK","text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"Cancel","text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-5":{"id":5,"type":"Progressbar","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[50,4],"alignment":null,"helpTip":null}}},"order":[0,1,4,5,2,3],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

