
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


//export cer, no reverse
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
exportLayer(sub,ce,re);


sleevesGroup.layers[i].visible = true;
ce = false;

//export no cerakote, no rev
exportLayer(sub,ce,re);


//export rev by reversing original mask and then intersecting with guide layer
doc.activeLayer = doc.layers.getByName(thisLayer)
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

//invert
var idinverse = stringIDToTypeID( "inverse" );
executeAction( idinverse, undefined, DialogModes.NO );

//intersect guide layer
var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
    var desc250 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref11 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref11.putEnumerated( idchannel, idchannel, idmask );
        var idlayer = stringIDToTypeID( "layer" );
        ref11.putName( idlayer, "GUIDE" );
    desc250.putReference( idnull, ref11 );
    var idwith = stringIDToTypeID( "with" );
        var ref12 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref12.putProperty( idchannel, idselection );
    desc250.putReference( idwith, ref12 );
executeAction( idinterfaceIconFrameDimmed, desc250, DialogModes.NO );


doc.activeLayer = textureGroup;

//make mask
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

re = true
exportLayer(sub,ce,re);


sleevesGroup.layers[i].visible = false;
//export no cerakote, yes rev
ce = true
exportLayer(sub,ce,re);

//revert to original mask, no reverse
doc.activeLayer = doc.layers.getByName(thisLayer)
doc.activeLayer.visible = false;

//set selection, nonrev
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

//intersect guide layer, nonrev
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

//delete mask, nonrev
doc.activeLayer = textureGroup;

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
//make mask with selection, nonrev
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


textureGroup.layers[i].visible = false;

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
var currentLayer = doc.activeLayer;


for(i=0; i < doc.layers.length; )
{         
  if(doc.layers[i]==currentLayer)
  {
      a=i;
      //alert(a);
      i = doc.layers.length;
  }
  else{ i++; }
}


try
{
  var nextLayer = doc.layers[a+1];
  var check = nextLayer.visible;
}
catch(e)
{
  var nextLayer = doc.layers[0];
  var check = nextLayer.visible;
}  

doc.activeLayer = nextLayer;
if (check == false)
  doc.activeLayer.visible = false;

  doc.activeLayer.visible = true;