doc = app.activeDocument;
thisLayer = doc.activeLayer.name;
doc.activeLayer.visible = false;

//set selection
var idset = stringIDToTypeID( "set" );
    var desc375 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref47 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref47.putProperty( idchannel, idselection );
    desc375.putReference( idnull, ref47 );
    var idto = stringIDToTypeID( "to" );
        var ref48 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
        ref48.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc375.putReference( idto, ref48 );
executeAction( idset, desc375, DialogModes.NO );

//intersect guide layer
var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
    var desc242 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref3 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref3.putEnumerated( idchannel, idchannel, idmask );
        var idlayer = stringIDToTypeID( "layer" );
        ref3.putName( idlayer, "GUIDE" );
    desc242.putReference( idnull, ref3 );
    var idwith = stringIDToTypeID( "with" );
        var ref4 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref4.putProperty( idchannel, idselection );
    desc242.putReference( idwith, ref4 );
executeAction( idinterfaceIconFrameDimmed, desc242, DialogModes.NO );



doc.layers.getByName("BASE").visible = false;
doc.layers.getByName("WHITE").visible = false;
doc.layers.getByName("GUIDE").visible = false;

doc.activeLayer = doc.layerSets.getByName("ENGRAVED TEXTURES");



doc.activeLayer.show;

function hasLayerMask() { 
    var hasLayerMask = false; 
    try { 
    var ref = new ActionReference(); 
    var keyUserMaskEnabled = app.charIDToTypeID( 'UsrM' ); 
    ref.putProperty( app.charIDToTypeID( 'Prpr' ), keyUserMaskEnabled ); 
    ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) ); 
    var desc = executeActionGet( ref ); 
    if ( desc.hasKey( keyUserMaskEnabled ) ) { 
    hasLayerMask = true; 
    } 
    }catch(e) { 
    hasLayerMask = false; 
    } 
    return hasLayerMask; 
    } 

if(hasLayerMask()){
    var iddelete = stringIDToTypeID( "delete" );
    var desc490 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref84 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref84.putEnumerated( idchannel, idordinal, idtargetEnum );
    desc490.putReference( idnull, ref84 );
executeAction( iddelete, desc490, DialogModes.NO );
}

//make mask with selection
var idmake = stringIDToTypeID( "make" );
    var desc428 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc428.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
        var ref64 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref64.putEnumerated( idchannel, idchannel, idmask );
    desc428.putReference( idat, ref64 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc428.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
executeAction( idmake, desc428, DialogModes.NO );

textureGroup = doc.activeLayer;
sleevesGroup = doc.layerSets.getByName("SLEEVES - Smart Object Group");
ce=true;
re=false;
textureName = ""
//select and hide all but Z inside
for (i = 0; i < textureGroup.layers.length; i++){
    textureGroup.layers[i].visible = false;
}


//export
for (i = 0; i < textureGroup.layers.length; i++){
    ce = true
    re = false;
    textureGroup.layers[i].visible = true;
    textureName = textureGroup.layers[i].name;
    var c = '_';
    var index = textureName.indexOf(c);
if (index != -1) {
  var sub = textureName.substring(0, index);
}
//export cerakote, no rev
exportLayer(sub,ce,re)

sleevesGroup.layers[i].visible = true;
ce = false;

//export no cerakote, no rev
exportLayer(sub,ce,re);

textureGroup.layers[i].visible = false;
sleevesGroup.layers[i].visible = false;

}

function exportLayer(textureName, cerakote, reverse){

    var sfwOptions = new ExportOptionsSaveForWeb();   
sfwOptions.format = SaveDocumentType.PNG;
sfwOptions.PNG8 = false;       
sfwOptions.optimized = true;   
sfwOptions.quality = 50;

// Folder
var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/REVERSE INSIDE PATTERNS/test');

// Extension
var saveExt = 'png';

//change name
newName = "";
var docHead = decodeURI(app.activeDocument.fullName);
docHead = docHead.replace("~/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/REVERSE INSIDE PATTERNS/REVERSE_WARPING_PSD/", "");
docHead = docHead.replace("_REVERSE_INSIDE.psd","");

if (thisLayer.indexOf("_OPT+A") != -1){
    newName = thisLayer.replace("_OPT+A","");
    newName = newName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
}
else if (thisLayer.indexOf("_OPT+B") != -1 ){
    newName = thisLayer.replace("_OPT+B","");
    newName = newName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+B_IMAGE+1";
}
else if (thisLayer.indexOf("_OPT+C") != -1){
    newName = thisLayer.replace("_OPT+C","");
    newName = newName.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+C_IMAGE+1";
}
else{
    newName = thisLayer.replace("LCV","");
    var docName = docHead +"_TYPE+INSIDEPATTERN+" + newName + "_MATERIAL+" + textureName + "_OPT+A_IMAGE+1";
}


// Save file
if (cerakote == false && reverse == false){
  var saveFile = new File( saveFolder + '/' + docName + '.' + saveExt );  
}
else if (cerakote == true && reverse == false){
    newName = docName.replace("INSIDEPATTERN+","INSIDEPATTERN+CER+")

    var saveFile = new File( saveFolder + '/' + newName + '.' + saveExt );
}
else if (cerakote == false && reverse == true){
    newName = docName.replace("PATTERN+","PATTERN+REV+")
    var saveFile = new File( saveFolder + '/' + newName + '.' + saveExt );
}
else if (cerakote == true && reverse == true){
    newName = docName.replace("PATTERN+","PATTERN+REV+CER+")
    var saveFile = new File( saveFolder + '/' + newName + '.' + saveExt );
}


// Save for Web
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
}



doc.layers.getByName("BASE").visible = true;
doc.layers.getByName("WHITE").visible = true;
doc.layers.getByName("GUIDE").visible = true;
doc.activeLayer = doc.layers.getByName(thisLayer);
doc.activeLayer.visible = false;

//reverse mask
var idselect = stringIDToTypeID( "select" );
    var desc1132 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref211 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        ref211.putName( idlayer, "ENGRAVED TEXTURES" );
    desc1132.putReference( idnull, ref211 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc1132.putBoolean( idmakeVisible, false );
executeAction( idselect, desc1132, DialogModes.NO );
var idinvert = stringIDToTypeID( "invert" );
executeAction( idinvert, undefined, DialogModes.NO );


doc.activeLayer = textureGroup;
textureGroup.layers[4].visible = true;

alert("use pen tool to make path")