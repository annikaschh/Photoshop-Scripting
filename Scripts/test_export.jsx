//get first layer, go down list. Get name and save
    doc = app.activeDocument;
    thisLayer = doc.activeLayer.name;

    //export image

    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 50;

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


    if (newStr.includes('_OPT+A') == true){
        chara = newStr.indexOf('_');
        newStr.substring(0,chara+6);
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+A_IMAGE+1"; 
    }
    else if (newStr.includes('_OPT+B') == true){
        chara = newStr.indexOf('_');
        newStr.substring(0, chara+6);
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+B_IMAGE+1"; 
    }
    else if (newStr.includes('_OPT+C') ==true ){
        chara = newStr.indexOf('_');
        newStr.substring(0,chara+6);
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+C_IMAGE+1"; 
    }
    else{
        var docName = "_TYPE+PATTERNOVERLAY+" + newStr + "_MATERIAL+" + patternName + "_OPT+A_IMAGE+1"; 
    }

// Save file
    var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );

// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 

