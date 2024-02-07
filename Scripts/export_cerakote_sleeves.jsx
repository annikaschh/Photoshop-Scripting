// find a way to collect this info without writing it out
var layers = ["LCVABSTRACT1","LCVABSTRACTSTRIPES1","LCVABSTRACTSTRIPES2","LCVABSTRACTSTRIPES3",
"LCVAMERICANFLAG","LCVAZTEC1", "LCVAZTEC2", "LCVAZTEC3", "LCVBEACH","2LCVBEACH","LCVBEARMOOSEDEERMTN",
"2LCVBEARMOOSEDEERMTN","LCVBLACKLEAF", "LCVBRANCHES", "LCVCELESTIAL", "LCVCELTIC9", "LCVCELTIC10",
"LCVCELTIC17", "LCVCELTICHEART", "LCVCELTICLOOPU", "LCVCELTICTRINITY", "LCVCLADDAGH4", "LCVCLADDAGHCELTIC",
"LCVCOMPUTERCHIP", "LCVDESERT", "2LCVDESERT", "LCVDUCKHUNT", "LCVESCHER1", "LCVESCHER2", "LCVFEATHER",
"LCVFINGERPRINT2", "LCVFLORAL1", "LCVFLORAL1LG", "LCVFLYFISHING", "2LCVFLYFISHING", "LCVFLYINGDUCKBAND",
"2LCVFLYINGDUCKBAND", "LCVFOOTBALL", "LCVGEARS", "LCVGEOWEAVE", "LCVGEOWEAVELG", "LCVGRIFFIN",
"2LCVGRIFFIN", "LCVHANDWRITING", "LCVHONEYCOMB", "LCVLABYRINTH", "LCVLOCKINGINFINITY", "LCVMAORI",
"LCVMOUNTAIN2", "LCVNATIVE1", "LCVNAVIGATOR", "LCVPALM", "LCVPIANO", "LCVROMANNUMERALS2",
"LCVROMANNUMERALS3", "LCVSAFARI", "2LCVSAFARI", "3LCVSAFARI", "LCVSEGTRIANGLE", "LCVSEGTRIANGLELG",
"LCVSKULL", "LCVSKYLINENEWYORK", "LCVSNAKESKIN", "LCVSOCCER", "LCVSOUNDWAVE", "LCVTILE", "LCVTREES", 
"LCVTRELLIS1", "LCVTRELLIS2", "LCVTRIATHALON", "LCVTRIBALBRAID", "LCVTWISTEDLEAF", "LCVWESTERNSCROLL",
"LCVWOLFMTN", "2LCVWOLFMTN", "LCVWOODGRAIN1", "LCVWOODGRAIN2"]
// highlights smart object "patterns" and opens it
var sObj = app.activeDocument.layers.getByName("PATTERNS");
app.activeDocument.activeLayer = sObj;

// for loop turns on layer and exports
for (i = 0; i < 3; i++) {
    executeAction(stringIDToTypeID("placedLayerEditContents"));
    app.activeDocument.activeLayer.visible = false;
    var thisLayer = app.activeDocument.layers.getByName(layers[i]);
    app.activeDocument.activeLayer = thisLayer;
    thisLayer.visible = true;

//save smart obj and close

    app.activeDocument.save();
    app.activeDocument.close();

// export layer

    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 60;
    stwOptions.transparency = true;

// Folder
    var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/TEMP - RENAME Amy');

// Extension
    var saveExt = 'png';

// Ask for name
    var str = layers[i];

        if ((layers[i].indexOf('2') != 0) && (layers[i].indexOf('3') != 0)){
            var newStr = str.substring(3);
            newStr = "ENG" + newStr;
            var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+14KR_OPT+A_IMAGE+1"; 
        }
        else if (layers[i].indexOf('2') == 0) {
            var str = layers[i];
            var newStr = str.substring(1);
            newStr = newStr.substring(3);
            newStr = "ENG" + newStr;
            var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+14KR_OPT+B_IMAGE+1";
        }
        else {
            var str = layers[i];
            var newStr = str.substring(1);
            newStr = newStr.substring(3);
            newStr = "ENG" + newStr;
            var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+14KR_OPT+C_IMAGE+1";
        }

// Save file
    var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );

// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
 

}
alert("done");
