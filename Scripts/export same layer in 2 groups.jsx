doc = app.activeDocument;

//hide all layers in both groups 
doc.activeLayer = doc.layers.getByName("Group 1")
thisLayer = doc.activeLayer;

for (i = 0; i < thisLayer.layers.length; i++){
    thisLayer.layers[i].visible = false;
}

doc.activeLayer = doc.layers.getByName("Group 2")
thisLayer = doc.activeLayer;

for (i = 0; i < thisLayer.layers.length; i++){
    thisLayer.layers[i].visible = false;
}

//select each layer in hierarchy
doc.activeLayer = doc.layers.getByName("Group 1")
thisLayer = doc.layers.getByName("Group 1");


for (i = 0; i < thisLayer.layers.length; i++){
    selectedLayer = thisLayer.layers[i].name;
    doc.activeLayer = thisLayer.layers.getByName(selectedLayer)
    selectedLayer.visible = true;
    selectedLayer2 = doc.layers.getByName("Group 2").layers[i];
    doc.activeLayer = selectedLayer2;
    selectedLayer2.visible = true;

    exportLayerFunction(selectedLayer)

    thisLayer.layers[i].visible = false
    selectedLayer2.visible = false;

}


// export layer
function exportLayerFunction(name){
    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 60;
    
// Folder
var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/NCAA/test');

// Extension
var saveExt = 'png';

// Save file
var saveFile = new File( saveFolder + '/' + name + '.' + saveExt );

// Save for Web
activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 

}


