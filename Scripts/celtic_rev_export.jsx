doc = app.activeDocument;
thisLayer = "LCVCELTICTRINITY";

doc.layers.getByName("BASE").visible = false;
doc.layers.getByName("WHITE").visible = false;
doc.layers.getByName("GUIDE").visible = false;

doc.activeLayer = doc.layerSets.getByName("ENGRAVED TEXTURES");

doc.activeLayer.show;


textureGroup = doc.activeLayer;
sleevesGroup = doc.layerSets.getByName("SLEEVES - Smart Object Group");
ce=true;
re=false;
textureName = ""
//select and hide all but Z inside
for (i = 0; i < textureGroup.layers.length; i++){
    textureGroup.layers[i].visible = false;
    sleevesGroup.layers[i].visible = false;
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

//export rev
// no cer, yes rev
re = true

exportLayer(sub,ce,re);


sleevesGroup.layers[i].visible = true;

//export yes cerakote, yes rev
ce = false
exportLayer(sub,ce,re);

sleevesGroup.layers[i].visible = false;
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
  