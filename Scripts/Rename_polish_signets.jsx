doc = app.activeDocument;
thisGroup = doc.layerSets.getByName("POLISH");

for (i = 0; i < thisGroup.layers.length; i++){
    doc.activeLayer = thisGroup.layers[i];
    oldName = doc.activeLayer.name;
    indexOfFirstPlus = oldName.indexOf("_");
    newName = oldName;
   newName = newName.substring(indexOfFirstPlus);
    doc.activeLayer.name = newName;

}