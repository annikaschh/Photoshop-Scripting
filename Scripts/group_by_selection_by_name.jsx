var doc = app.activeDocument;
var layers = doc.layers;
var groups = {};
amountOfLayers = doc.layers.length
var groupName = ''

var selectedLayers = getSelectedLayers(app.activeDocument);

function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

function newGroupFromLayers(doc) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass( sTID('layerSection') );
    desc.putReference( cTID('null'), ref );
    var lref = new ActionReference();
    lref.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
    desc.putReference( cTID('From'), lref);
    executeAction( cTID('Mk  '), desc, DialogModes.NO );
};

function undo() {
   executeAction(cTID("undo", undefined, DialogModes.NO));
};

function getSelectedLayers(doc) {
  var selLayers = [];
  newGroupFromLayers();

  var group = doc.activeLayer;
  var layers = group.layers;

  for (var i = 0; i < layers.length; i++) {
    selLayers.push(layers[i].name);
  }

  undo();

  return selLayers;
};


for (i = 0; i < selectedLayers; i++){
    
    doc.activeLayer = doc.selectedLayers[i];
    if (doc.activeLayer.typename == "LayerSet"){
      groupName = doc.activeLayer.name;
      
      groups[groupName] = doc.activeLayer;

    }
    else{
      thisLayer = doc.activeLayer.name;
    layerList.push(thisLayer);
    }
    
}

function nthIndex(str, pat, n){
  var L= str.length, i= -1;
  while(n-- && i++<L){
      i= str.indexOf(pat, i);
      if (i < 0) break;
  }
  return i;
}

for (i = 0; i<=selectedLayers.length-1; i++) {
    var currentLayer = app.activeDocument.layers.getByName(selectedLayers[i]);
  var layerName = currentLayer.name;

 /* if (layerName.indexOf("FINISH+2") !== -1) {
    if (!groups["Texture"]) {
      groups["Texture"] = doc.layerSets.add();
      groups["Texture"].name = "Texture";
    }
    layer.move(groups["Texture"], ElementPlacement.INSIDE);
    continue;
  } 

  var firstUnderscoreIndex = layerName.indexOf("_");*/


//gets name of material
  indexOfFourthPlus = nthIndex(layerName, "+", 3);
  indexOfThirdUnderscore = nthIndex(layerName, "_", 3);
  var groupName = layerName.substring(indexOfFourthPlus+1, indexOfThirdUnderscore);


  if (!groups[groupName]) {
    groups[groupName] = doc.layerSets.add();
    groups[groupName].name = groupName;
  }

 /* if (!groups[subgroupName]) {
    groups[subgroupName] = groups[groupName].layerSets.add();
    groups[subgroupName].name = subgroupName;
  }*/

  currentLayer.move(groups[groupName], ElementPlacement.INSIDE);
}
app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));