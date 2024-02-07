var layers = new Array();
//select smart object you wish to unpack first, should I write out an alert?
executeAction(stringIDToTypeID("placedLayerEditContents"));
sObjdepth = 1;
    var doc = app.activeDocument;
    var layerCount = doc.layers.length
    for (x = 0; x < layerCount; x++){
        app.activeDocument.activeLayer.visible = false;
        app.activeDocument.activeLayer = app.activeDocument.layers[x];
        app.activeDocument.activeLayer.visible = true;
        // iterate through multiple layers of smart objs, get to the bottom layers
        while (app.activeDocument.activeLayer.kind == "LayerKind.SMARTOBJECT"){
            executeAction(stringIDToTypeID("placedLayerEditContents"))
            sObjdepth++;
            }
        for (i = 0; i < sObjdepth; i++){
            // count layers
            doc2 = app.activeDocument;
            layerCount2 = doc2.layers.length
        
        if (layerCount2 > 1) {
            for (y = 0; y < layerCount2; y++){
                //turn on first layer (then second, and so on)
                if (app.activeDocument.activeLayer.kind == "LayerKind.CURVES"){
                    y+=1;
                }
                app.activeDocument.activeLayer.visible = false;

                app.activeDocument.activeLayer = app.activeDocument.layers[y];
                app.activeDocument.activeLayer.visible = true;
                //get name
                newLayerName = app.activeDocument.activeLayer.name;
                //save
                app.activeDocument.save();
                app.activeDocument.close();

                //duplicate and rasterize layer
                prevLayer = app.activeDocument.activeLayer.name;
                app.activeDocument.activeLayer.duplicate()
                sObjLayer = prevLayer + " copy";

                app.activeDocument.activeLayer = app.activeDocument.layers.getByName(sObjLayer);
                app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
                //alert(app.activeDocument.activeLayer.name.substring(0,3));
                if (app.activeDocument.activeLayer.name.substring(0,3) != "LCV"){
                    app.activeDocument.activeLayer.name = newLayerName;
                }
                else{
                    app.activeDocument.activeLayer.name += newLayerName;
                }

                if (y == layerCount2 - 1){
                    app.activeDocument.activeLayer.remove();
                }
                else {
                    //go back to original smart object
                    app.activeDocument.activeLayer = app.activeDocument.layers.getByName(prevLayer);
                    executeAction(stringIDToTypeID("placedLayerEditContents"));
                }
            
                }
        
            } 
        else {
            app.activeDocument.close();
            app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER);
            }  
        }
        

    }
