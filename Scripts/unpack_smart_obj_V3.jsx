var layers = new Array();
//select smart object you wish to unpack first, should I write out an alert?
if (app.activeDocument.activeLayer )

thisSObj = app.activeDocument.activeLayer.name;
app.activeDocument.activeLayer.name = thisSObj + "test";
executeAction(stringIDToTypeID("placedLayerEditContents"));
    var doc = app.activeDocument;
    var layerCount = doc.layers.length;
    //collect layer names in array
    for (x = 0; x < layerCount; x++){
        app.activeDocument.activeLayer = app.activeDocument.layers[x];
        thisLayer = app.activeDocument.activeLayer.name;
        layers.push(thisLayer);
        app.activeDocument.activeLayer.visible = false;

    }
    //take each layer and unpack
    for (x = 0; x < layerCount; x++){
        app.activeDocument.activeLayer.visible = false;
        app.activeDocument.activeLayer = app.activeDocument.layers.getByName(layers[x]);
        app.activeDocument.activeLayer.visible = true;

        app.activeDocument.save();
        app.activeDocument.close();

                //duplicate and rasterize layer
                prevLayer = app.activeDocument.activeLayer.name;
                app.activeDocument.activeLayer.duplicate()
                sObjLayer = prevLayer + " copy";

                app.activeDocument.activeLayer = app.activeDocument.layers.getByName(sObjLayer);
                app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
                app.activeDocument.activeLayer.name = layers[x];

                if (x == layerCount - 1){
                    app.activeDocument.activeLayer = app.activeDocument.layers.getByName(prevLayer);
                    app.activeDocument.activeLayer.remove();
                }
                else {
                    //go back to original smart object
                    app.activeDocument.activeLayer = app.activeDocument.layers.getByName(prevLayer);
                    executeAction(stringIDToTypeID("placedLayerEditContents"));
                }
    }