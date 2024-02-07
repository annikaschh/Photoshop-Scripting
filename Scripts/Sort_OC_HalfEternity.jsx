doc = app.activeDocument
var layerList = new Array();
newList = new Array();
counter = 0;
groupName = ""
var groups = {};

for (i = 0; i < doc.layers.length; i++){
    doc.activeLayer = doc.layers[i];
    if (doc.activeLayer.typename == "LayerSet"){
        for (a = 0; a<activeLayer.layers.length; a++){
            layerName = doc.activeLayer.layers[a].name;
            if (layerName.indexOf("SETTING") != -1){
                layerList.push(layerName);
            }
            if (layerName.indexOf("STONE") != -1){
                layerList.push(layerName);
            }
        }
    }

    layerName = doc.activeLayer.name;
 
    if (layerName.indexOf("SETTING") != -1){
        layerList.push(layerName);
    }
    if (layerName.indexOf("STONE") != -1){
        layerList.push(layerName);
    }
}

function sortList(setting, key, size){
    for (i = 0; i < layerList.length; i++){
    if (layerList[i].indexOf(setting) != -1 && layerList[i].indexOf(key) != -1 && layerList[i].indexOf(size) != -1){
        newList.push(layerList[i])
    }
}
}
/*
sortList("STONE", "BEAD+", ".015");
sortList("SETTING", "BEAD+", ".015");
sortList("STONE", "BEAD+", ".03");
sortList("SETTING", "BEAD+", ".03");
sortList("STONE", "BEAD+", ".05");
sortList("SETTING", "BEAD+", ".05");
sortList("STONE", "BEAD+", ".07");
sortList("SETTING", "BEAD+", ".07");
sortList("STONE", "BEADCHANNEL", ".015");
sortList("SETTING", "BEADCHANNEL", ".015");
sortList("STONE", "BEADCHANNEL", ".03");
sortList("SETTING", "BEADCHANNEL", ".03");
sortList("STONE", "BEADCHANNEL", ".05");
sortList("SETTING", "BEADCHANNEL", ".05");
sortList("STONE", "BEADCHANNEL", ".07");
sortList("SETTING", "BEADCHANNEL", ".07");
sortList("STONE", "+CHANNEL", ".015");
sortList("SETTING", "+CHANNEL", ".015");
sortList("STONE", "+CHANNEL", ".03");
sortList("SETTING", "+CHANNEL", ".03");
sortList("STONE", "+CHANNEL", ".05");
sortList("SETTING", "+CHANNEL", ".05");
sortList("STONE", "+CHANNEL", ".07");
sortList("SETTING", "+CHANNEL", ".07");
//move layers to place
for (i =newList.length-1; i>=0; i--) {
    doc.activeLayer = doc.layers.getByName(newList[i]);
    currentLayer = doc.activeLayer;
    currentLayer.move(doc.layers[0], ElementPlacement.PLACEBEFORE);
}


for (i = newList.length-1; i >=0; i--){
    doc.activeLayer = doc.layers.getByName(newList[i]);

    var firstPlusIndex = newList[i].indexOf("+");
    groupName = newList[i].substring(firstPlusIndex, newList[i].indexOf("+R"));

        groups[groupName] = doc.layerSets.add();
        groups[groupName].name = groupName;
    currentLayer = app.activeDocument.layers.getByName(newList[i]);

    currentLayer.move(groups[groupName], ElementPlacement.INSIDE);
    i--;
    doc.activeLayer = doc.layers.getByName(newList[i]);
    currentLayer = app.activeDocument.layers.getByName(newList[i]);
    currentLayer.move(groups[groupName], ElementPlacement.INSIDE);
    groups[groupName].visible = false;
}


app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));

*/

