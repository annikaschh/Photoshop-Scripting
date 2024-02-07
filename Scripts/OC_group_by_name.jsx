var doc = app.activeDocument;
var layers = doc.layers;
var groups = {};
var layerList = new Array();
amountOfLayers = doc.layers.length
var groupName = ''

for (i = 0; i < amountOfLayers; i++){
    
    doc.activeLayer = doc.layers[i];
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

for (i = 0; i<=layerList.length-1; i++) {
    var currentLayer = app.activeDocument.layers.getByName(layerList[i]);
  var layerName = currentLayer.name;

 /* if (layerName.indexOf("FINISH+2") !== -1) {
    if (!groups["Texture"]) {
      groups["Texture"] = doc.layerSets.add();
      groups["Texture"].name = "Texture";
    }
    layer.move(groups["Texture"], ElementPlacement.INSIDE);
    continue;
  } */

  var firstUnderscoreIndex = layerName.indexOf("_");
  var groupName = layerName.substring(0, firstUnderscoreIndex);

  if (firstUnderscoreIndex == -1 ){
    groupName = layerName;
  }

  if (!groups[groupName]) {
    groups[groupName] = doc.layerSets.add();
    groups[groupName].name = groupName;
  }

  currentLayer.move(groups[groupName], ElementPlacement.INSIDE);

  indexOfSecondPlus = nthIndex(layerName, "+", 2);
  indexOfThirdPlus = nthIndex(layerName, "+", 3);
  subgroupName = layerName.substring(indexOfSecondPlus+1, indexOfThirdPlus);

  indexOfFifthPlus = nthIndex(layerName, "+", 5);
  indexOfSixthPlus = nthIndex(layerName, "+", 6);
  newNamePlaceholder = layerName.substring(indexOfFifthPlus+1, indexOfSixthPlus);
  subgroupName = groupName + " - " + subgroupName + " - " + newNamePlaceholder;

 if (!groups[subgroupName]) {
    groups[subgroupName] = groups[groupName].layerSets.add();
    groups[subgroupName].name = subgroupName;
  }

  

  currentLayer.move(groups[subgroupName], ElementPlacement.INSIDE);
}
app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));