textureList = ["14KR", "14KW", "14KY", "CC", "NTA", "T", "Z"]
for (i = 0; i<textureList.length; i++){
    thisLayer = app.activeDocument.layers.getByName("PATTERNS");
    app.activeDocument.activeLayer = thisLayer;
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    playAction("turn on " + textureList[i], "PATTERNS w/o SLEEVE (AMY)");

    app.activeDocument.save();
    app.activeDocument.close();
    exportLayer(textureList[i]);

    thisLayer = app.activeDocument.layers.getByName("SLEEVES");
    app.activeDocument.activeLayer = thisLayer;
    app.activeDocument.activeLayer.visible = true;
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    app.activeDocument.activeLayer.visible = false;
    thisLayer = app.activeDocument.layers.getByName(textureList[i] + "_SLEEVE_BLURRY");
    app.activeDocument.activeLayer = thisLayer;
    app.activeDocument.activeLayer.visible = true;
    app.activeDocument.save();
    app.activeDocument.close();
    exportLayerSleeve(textureList[i]);
    thisLayer = app.activeDocument.layers.getByName("SLEEVES");
    app.activeDocument.activeLayer = thisLayer;
    app.activeDocument.activeLayer.visible = false;

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

    function exportLayer(textureName){

        var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 50;
    
    // Folder
    var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/branches fix');
    
    // Extension
    var saveExt = 'png';
    
    //change name
    newName = "";
    var docHead = decodeURI(app.activeDocument.fullName);
    docHead = docHead.replace("~/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/warping PSDs/", "");
    docHead = docHead.replace("_INSIDE.psd","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+CER+BRANCHES_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
    
    
    
    // Save file
    var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );
    
    // Save for Web
        activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
    }




function exportLayerSleeve(textureName){

        var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 50;
    
    // Folder
    var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/branches fix');
    
    // Extension
    var saveExt = 'png';
    
    //change name
    newName = "";
    var docHead = decodeURI(app.activeDocument.fullName);
    docHead = docHead.replace("~/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/warping PSDs/", "");
    docHead = docHead.replace("_INSIDE.psd","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+BRANCHES_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
    
    
    
    // Save file
    var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );
    
    // Save for Web
        activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
    }

