doc = app.activeDocument;
layerList = new Array()
var thisTexture = ''

layerName = doc.activeLayer.name;


//turn off sleeves
doc.activeLayer = doc.layers.getByName("SLEEVES");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    doc = app.activeDocument;
    for (i = 0; i < doc.layers.length; i++){
        doc.activeLayer = doc.layers[i]
        doc.activeLayer.visible = false
    }
    app.activeDocument.save();
    app.activeDocument.close();

doc = app.activeDocument;
textureGroup = doc.layerSets.getByName("EXPORT");
texturesLayer = textureGroup.layers.getByName("TEXTURES");
doc.activeLayer = texturesLayer




executeAction(stringIDToTypeID("placedLayerEditContents"));

for (i = 0; i < app.activeDocument.layers.length; i++){
    doc = app.activeDocument;
    doc.activeLayer = doc.layers[i]
    thisLayer = doc.activeLayer.name
    thisLayer = thisLayer.substring(0, thisLayer.indexOf("_"))
    layerList.push(thisLayer)
    doc.activeLayer.visible = false;
}

a = 0
count = app.activeDocument.layers.length
for (i = 0; i < count; i++){
    doc = app.activeDocument;
    doc.activeLayer = doc.layers[i]
    doc.activeLayer.visible = true;
    while (doc.activeLayer.name.substring(0, doc.activeLayer.name.indexOf("_")) != layerList[a]){

        if (a>= layerList.length){
            a = 0
        }
        a++
    }
    thisTexture = layerList[a]
    app.activeDocument.save();
    app.activeDocument.close();

    exportLayer(thisTexture, false)

//cerakote  
    doc = app.activeDocument;
    doc.activeLayer = doc.layers.getByName("SLEEVES");
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    doc = app.activeDocument;
    doc.activeLayer.visible = false
    doc.activeLayer = doc.layers.getByName(layerList[a] + "_SLEEVE_BLURRY")
    doc.activeLayer.visible = true
    app.activeDocument.save();
    app.activeDocument.close();
    doc = app.activeDocument;
    doc.layers.getByName("SLEEVES").visible = true;

    exportLayer(thisTexture, true)
    
    doc.layers.getByName("SLEEVES").visible = false;


    if (i == count -1 ){
        break;
    }
    else{
        doc.activeLayer = texturesLayer
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    app.activeDocument.activeLayer.visible = false;
    }

}

//EXPORT LAYER
function exportLayer(textureName, cerakote){

var sfwOptions = new ExportOptionsSaveForWeb();   
sfwOptions.format = SaveDocumentType.PNG;
sfwOptions.PNG8 = false;       
sfwOptions.optimized = true;   
sfwOptions.quality = 50;

// Folder
var saveFolder = new Folder('/Users/amy.schrader/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/inside pattern fixes/READY TO UPLOAD');

// Extension
var saveExt = 'png';

//change name
newName = "";
var docHead = app.activeDocument.name
docHead = docHead.replace("_INSIDE.psd", "")

if (layerName.indexOf("_OPT+A") != -1){
    newName = layerName.replace("_OPT+A","");
    newName = newName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
}
else if (layerName.indexOf("_OPT+B") != -1 ){
    newName = layerName.replace("_OPT+B","");
    newName = newName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+B_IMAGE+1";
}
else if (layerName.indexOf("_OPT+C") != -1){
    newName = layerName.replace("_OPT+C","");
    newName = newName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+C_IMAGE+1";
}
else{
    newName = layerName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
}


// Save file
if (cerakote == false){
  var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );  
}
else if (cerakote == true){
    newName = docName.replace("INSIDEPATTERN+","INSIDEPATTERN+CER+")

    var saveFile = new File( saveFolder + '/' + newName + '.' + saveExt );
}


// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
}
