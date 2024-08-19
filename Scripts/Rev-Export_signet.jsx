function getSelectedLayers(){
        var idGrp = stringIDToTypeID( "groupLayersEvent" );
        var descGrp = new ActionDescriptor();
        var refGrp = new ActionReference();
        refGrp.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Trgt" ));
        descGrp.putReference(charIDToTypeID( "null" ), refGrp );
        executeAction( idGrp, descGrp, DialogModes.ALL );
        var resultLayers=new Array();
        for (var ix=0;ix<app.activeDocument.activeLayer.layers.length;ix++){resultLayers.push(app.activeDocument.activeLayer.layers[ix].name)}
        var id8 = charIDToTypeID( "slct" );
            var desc5 = new ActionDescriptor();
            var id9 = charIDToTypeID( "null" );
            var ref2 = new ActionReference();
            var id10 = charIDToTypeID( "HstS" );
            var id11 = charIDToTypeID( "Ordn" );
            var id12 = charIDToTypeID( "Prvs" );
            ref2.putEnumerated( id10, id11, id12 );
        desc5.putReference( id9, ref2 );
        executeAction( id8, desc5, DialogModes.NO );
        return resultLayers;
    }   
    var layers = getSelectedLayers();
    doc = app.activeDocument;

    function deleteMask(apply)
    {
        if (apply == undefined) apply = false;
        try
        {
            var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
            desc.putReference(charIDToTypeID('null'), ref);
            desc.putBoolean(charIDToTypeID('Aply'), apply);
            executeAction(charIDToTypeID('Dlt '), desc, DialogModes.NO);
            return true
        }
        catch (e)
        {
            return false
        }
    };

    for (i = 0; i < layers.length; i++){
        doc.activeLayer = doc.layers.getByName(layers[i]);
        doc.activeLayer.visible = false;
    }

   for (i = 0; i < layers.length; i++){
        doc.activeLayer = doc.layers.getByName(layers[i]);
        //set selection of current layer
        var idset = stringIDToTypeID( "set" );
    var desc242 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref9 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref9.putProperty( idchannel, idselection );
    desc242.putReference( idnull, ref9 );
    var idto = stringIDToTypeID( "to" );
        var ref10 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
        ref10.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc242.putReference( idto, ref10 );
executeAction( idset, desc242, DialogModes.NO );

//invert
var idinverse = stringIDToTypeID( "inverse" );
executeAction( idinverse, undefined, DialogModes.NO );
        //go to color fill

        doc.activeLayer.visible = false;
        doc.activeLayer = doc.layers.getByName("Color Fill 1");

        // make mask
        var idmake = stringIDToTypeID( "make" );
    var desc249 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc249.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
        var ref12 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref12.putEnumerated( idchannel, idchannel, idmask );
    desc249.putReference( idat, ref12 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc249.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
executeAction( idmake, desc249, DialogModes.NO );
//export
exportLayerFunction(layers[i])
deleteMask()

    }


// export layer
function exportLayerFunction(name){
    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.PNG;
    sfwOptions.PNG8 = false;       
    sfwOptions.optimized = true;   
    sfwOptions.quality = 60;
    
// Folder
var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/NCAA/test');

// Extension
var saveExt = 'png';

//naming
var firstUnderscoreIndex = name.indexOf("_");
newName = name.substring(0,firstUnderscoreIndex+3)
newName2 = name.substring(firstUnderscoreIndex+3)

// Save file
var saveFile = new File( saveFolder + '/' + newName + "REV_" + newName2 + '.' + saveExt );

// Save for Web
activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 

}