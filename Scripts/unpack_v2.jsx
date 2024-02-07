var layers = ["LCVABSTRACT1","LCVABSTRACTSTRIPES1","LCVABSTRACTSTRIPES2","LCVABSTRACTSTRIPES3",
"LCVAMERICANFLAG","LCVAZTEC1", "LCVAZTEC2", "LCVAZTEC3", "LCVBEACH_OPT+A","LCVBEACH_OPT+B","LCVBEARMOOSEDEERMTN",
"2LCVBEARMOOSEDEERMTN","LCVBLACKLEAF", "LCVBRANCHES", "LCVCELESTIAL", "LCVCELTIC9", "LCVCELTIC10",
"LCVCELTIC17", "LCVCELTICHEART", "LCVCELTICLOOPU", "LCVCELTICTRINITY", "LCVCLADDAGH4", "LCVCLADDAGHCELTIC",
"LCVCOMPUTERCHIP", "LCVDESERT_OPT+A", "LCVDESERT_OPT+B", "LCVDUCKHUNT", "LCVESCHER1", "LCVESCHER2", "LCVFEATHER",
"LCVFINGERPRINT2", "LCVFLORAL1", "LCVFLORAL1LG", "LCVFLYFISHING", "2LCVFLYFISHING", "LCVFLYINGDUCKBAND_OPT+A",
"LCVFLYINGDUCKBAND_OPT+B", "LCVFOOTBALL", "LCVGEARS", "LCVGEOWEAVE", "LCVGEOWEAVELG", "LCVGRIFFIN_OPT+A",
"LCVGRIFFIN_OPT+B", "LCVHANDWRITING", "LCVHONEYCOMB", "LCVLABYRINTH", "LCVLOCKINGINFINITY", "LCVMAORI",
"LCVMOUNTAIN2", "LCVNATIVE1", "LCVNAVIGATOR", "LCVPALM", "LCVPIANO", "LCVROMANNUMERALS2",
"LCVROMANNUMERALS3", "LCVSAFARI_OPT+A", "LCVSAFARI_OPT+B", "LCVSAFARI_OPT+C", "LCVSEGTRIANGLE", "LCVSEGTRIANGLELG",
"LCVSKULL", "LCVSKYLINENEWYORK", "LCVSNAKESKIN", "LCVSOCCER", "LCVSOUNDWAVE", "LCVTILE", "LCVTREES", 
"LCVTRELLIS1", "LCVTRELLIS2", "LCVTRIATHALON", "LCVTRIBALBRAID", "LCVTWISTEDLEAF", "LCVWESTERNSCROLL",
"LCVWOLFMTN_OPT+A", "LCVWOLFMTN_OPT+B", "LCVWOODGRAIN1", "LCVWOODGRAIN2"]

// go into patterns
executeAction(stringIDToTypeID("placedLayerEditContents"));
app.activeDocument.activeLayer.visible = false;
app.activeDocument.activeLayer = app.activeDocument.layers.getByName(layers[0]);
//repeat for every pattern
for (x = 0; x < 77; x++){

    //hide current layer, turn on next layer in stack
    
  
    app.activeDocument.activeLayer.visible = true;

    // go into smart obj sleeve
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    // sleeve textures
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    // do for each texture
    layers = app.activeDocument.layers.length;
    for (y = 0; y < layers; y++){
        app.activeDocument.activeLayer.visible = false;
        app.activeDocument.activeLayer = app.activeDocument.layers[y];
        app.activeDocument.activeLayer.visible = true;
        //get name, take only first letter separated by a "_"
        currentTexture = app.activeDocument.activeLayer.name;
        chara = currentTexture.indexOf("_");
        currentTexture = currentTexture.substring(0,chara);
        
        //get back to all patterns smart obj
        app.activeDocument.save();
        app.activeDocument.close();
        app.activeDocument.save();
        app.activeDocument.close();
        //duplicate pattern, rasterize and rename
        currentPattern = app.activeDocument.activeLayer.name;
        app.activeDocument.activeLayer.duplicate()
        app.activeDocument.activeLayer = app.activeDocument.layers.getByName(currentPattern + " copy");
        app.activeDocument.activeLayer.name = currentPattern + " " + currentTexture;
        app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
        app.activeDocument.activeLayer.visible = false;
        app.activeDocument.activeLayer = app.activeDocument.layers.getByName(currentPattern);
        if (y != layers-1){
            executeAction(stringIDToTypeID("placedLayerEditContents"));
            executeAction(stringIDToTypeID("placedLayerEditContents"));
        }
        else{
            app.activeDocument.activeLayer.remove()
        }

    }

}
//start from top, go down exporting


var doc = app.activeDocument;
var layerCount = doc.layers.length

for (x = 0; x < layerCount; x++){
    //get first layer, go down list. Get name and save
    app.activeDocument.activeLayer = app.activeDocument.layers[x];
    thisLayer = doc.activeLayer.name;
    app.activeDocument.save();
    app.activeDocument.close();

    //export image

    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 50;
    stwOptions.transparency = true;

// Folder
    var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/TEST');

// Extension
    var saveExt = 'png';

// Ask for name
    var str = thisLayer.substring(3);
    newStr = "ENG" + str;
    chara = newStr.indexOf(" ");
    patternName = newStr.substring(chara+1);
    newStr = newStr.substring(0,chara)

    if (newStr.indexOf('_OPT+A') != 0){
        chara = newStr.indexOf('_OPT+A');
        newStr.substring(chara+1, newStr.length-1);
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+A_IMAGE+1"; 
    }
    else if (newStr.indexOf('_OPT+B') != 0){
        chara = newStr.indexOf('_OPT+B');
        newStr.substring(chara+1, newStr.length-1);
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+B_IMAGE+1"; 
    }
    else if (newStr.indexOf('_OPT+C') != 0){
        chara = newStr.indexOf('_OPT+C');
        newStr.substring(chara+1, newStr.length-1);
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+C_IMAGE+1"; 
    }
    else{
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+A_IMAGE+1"; 
    }

// Save file
    var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );

// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 

}

