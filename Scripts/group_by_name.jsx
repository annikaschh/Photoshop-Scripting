var doc = app.activeDocument;
var layers = doc.layers;
var groups = {};
var layerList = new Array();
amountOfLayers = doc.layers.length
for (i = 0; i < amountOfLayers; i++){
    
    doc.activeLayer = doc.layers[i];
    thisLayer = doc.activeLayer.name;
    layerList.push(thisLayer);
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