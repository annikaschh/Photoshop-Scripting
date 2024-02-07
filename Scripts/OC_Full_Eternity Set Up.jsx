doc = app.activeDocument
var settingList = new Array();
var stoneList = new Array();
newList = new Array();
counter = 0;
groupName = ""
var groups = {};
a = ""

for (i = 0; i < doc.layers.length; i++){
    doc.activeLayer = doc.layers[i];
    layerName = doc.activeLayer.name;
    
 
    if (layerName.indexOf("SETTING+") != -1){
        settingList.push(layerName);
        doc.activeLayer.rasterize(RasterizeType.ENTIRELAYER)
        a = layerName;
    }
    if (layerName.indexOf("STONE+") != -1){
        stoneList.push(layerName);
        doc.activeLayer.rasterize(RasterizeType.ENTIRELAYER)
    }
}

for (i = 0; i<=settingList.length-1; i++) {

  var groupName = "SETTING"


  if (!groups[groupName]) {
    groups[groupName] = doc.layerSets.add();
    groups[groupName].name = groupName;
  }
  currentLayer = doc.layers.getByName(settingList[i]);
  if (currentLayer.typename != "LayerSet"){
      currentLayer.move(groups[groupName], ElementPlacement.INSIDE);
}
  }



for (i = 0; i<=stoneList.length-1; i++) {
    var currentLayer = app.activeDocument.layers.getByName(stoneList[i]);

  var groupName = "SETTING"


  if (!groups[groupName]) {
    groups[groupName] = doc.layerSets.add();
    groups[groupName].name = groupName;
  }
  if (currentLayer.typename != "LayerSet"){
    currentLayer.move(groups[groupName], ElementPlacement.INSIDE);
}
}
group = doc.layerSets.getByName("SETTING");
doc.activeLayer = group.layers.getByName(a);
currentLayer = doc.activeLayer;
doc.layers.getByName("GUIDE").move(doc.layers[0], ElementPlacement.PLACEBEFORE)
currentLayer.move(app.activeDocument.layers[0],
    ElementPlacement.PLACEAFTER)
app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));
