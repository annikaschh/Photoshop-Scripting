alert('This script will take up to 4 hours, and will show "DONE" when complete.');
layerName = "SLEEVES"
var sObj = app.activeDocument.layers.getByName(layerName);
app.activeDocument.activeLayer = sObj;
app.activeDocument.activeLayer.visible = false;
layerName = "GUIDE"
var sObj = app.activeDocument.layers.getByName(layerName);
app.activeDocument.activeLayer = sObj;
app.activeDocument.activeLayer.visible = false;
layerName = "BASE"
var sObj = app.activeDocument.layers.getByName(layerName);
app.activeDocument.activeLayer = sObj;
app.activeDocument.activeLayer.visible = false;
layerName = "WHITE"
var sObj = app.activeDocument.layers.getByName(layerName);
app.activeDocument.activeLayer = sObj;
app.activeDocument.activeLayer.visible = false;
layerName = "PATTERNS"
var sObj = app.activeDocument.layers.getByName(layerName);
app.activeDocument.activeLayer = sObj;
app.activeDocument.activeLayer.visible = true;

executeAction(stringIDToTypeID("placedLayerEditContents"));

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
turnOnLayers();


//collect names in an array & turn on 14kr
nameList = [];

for (i = 0; i < app.activeDocument.layers.length; i++){
  thisLayer = app.activeDocument.activeLayer.name;
  nameList.push(thisLayer);

  playAction("turn on 14KR copy", "PATTERNS w/o SLEEVE (AMY)")
  

}

function playAction(actionName, actionSet){
    var idplay = stringIDToTypeID( "play" );
    var desc79 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref42 = new ActionReference();
        var idaction = stringIDToTypeID( "action" );
        ref42.putName( idaction, actionName );
        var idactionSet = stringIDToTypeID( "actionSet" );
        ref42.putName( idactionSet, actionSet );
    desc79.putReference( idnull, ref42 );
executeAction( idplay, desc79, DialogModes.NO );
}

//turn on layer by name, export
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();

    exportLayer("14KR");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

turnOnLayers();
for (i = 0; i<app.activeDocument.layers.length; i++){
    playAction("turn on 14KW", "PATTERNS w/o SLEEVE (AMY)");
}

//14KW
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer("14KW");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

turnOnLayers();
for (i = 0; i<app.activeDocument.layers.length; i++){
    playAction("turn on 14KY", "PATTERNS w/o SLEEVE (AMY)");
}
//14KY
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer("14KY");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

turnOnLayers();
for (i = 0; i<app.activeDocument.layers.length; i++){
    playAction("turn on CC", "PATTERNS w/o SLEEVE (AMY)");
}
//CC
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer("CC");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

turnOnLayers();
for (i = 0; i<app.activeDocument.layers.length; i++){
    playAction("turn on NTA", "PATTERNS w/o SLEEVE (AMY)");
}
//NTA
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer("NTA");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

turnOnLayers();
for (i = 0; i<app.activeDocument.layers.length; i++){
    playAction("turn on T", "PATTERNS w/o SLEEVE (AMY)");
}
//T
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer("T");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

turnOnLayers();
for (i = 0; i<app.activeDocument.layers.length; i++){
    playAction("turn on Z", "PATTERNS w/o SLEEVE (AMY)");
}
//Z
for (i = 0; i<app.activeDocument.layers.length; i++){
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer("Z");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    thisLayer = app.activeDocument.layers.getByName(nameList[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = false;
}

alert("DONE");

// export layer
function exportLayer(textureName){

    var sfwOptions = new ExportOptionsSaveForWeb();   
sfwOptions.format = SaveDocumentType.PNG;
sfwOptions.PNG8 = false;       
sfwOptions.optimized = true;   
sfwOptions.quality = 50;

// Folder
var saveFolder = new Folder('/Users/amy.schrader/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/TEMP - RENAME Amy');

// Extension
var saveExt = 'png';

//change name
newName = "";
var docHead = decodeURI(app.activeDocument.fullName);
docHead = docHead.replace("~/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/warping PSDs/", "");
docHead = docHead.replace("_INSIDE.psd","");

if (nameList[i].indexOf("_OPT+A") != -1){
    newName = nameList[i].replace("_OPT+A","");
    newName = newName.replace("LCV","ENG");
    var docName = docHead +"_TYPE+PATTERNOVERLAY+" + newName + "_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
}
else if (nameList[i].indexOf("_OPT+B") != -1 ){
    newName = nameList[i].replace("_OPT+B","");
    newName = newName.replace("LCV","ENG");
    var docName = docHead +"_TYPE+PATTERNOVERLAY+" + newName + "_MATERIAL+" + textureName + "_OPT+B_IMAGE+1";
}
else if (nameList[i].indexOf("_OPT+C") != -1){
    newName = nameList[i].replace("_OPT+C","");
    newName = newName.replace("LCV","ENG");
    var docName = docHead +"_TYPE+PATTERNOVERLAY+" + newName + "_MATERIAL+" + textureName + "_OPT+C_IMAGE+1";
}
else{
    newName = nameList[i].replace("LCV","ENG");
    var docName = docHead +"_TYPE+PATTERNOVERLAY+" + newName + "_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
}


// Save file
var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );

// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
}

