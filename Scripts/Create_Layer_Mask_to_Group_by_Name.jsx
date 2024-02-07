var doc = app.activeDocument;
var layers = doc.layers;
var layerList = new Array();
amountOfLayers = doc.layers.length
for (i = 0; i <= amountOfLayers -1; i++){
    doc.activeLayer = doc.layers[i];
    if (doc.activeLayer.typename != "LayerSet" && doc.activeLayer.parent == doc){
        thisLayer = doc.activeLayer.name;
        layerList.push(thisLayer);
    }
 
}
//make mask with group with same name
for (i = 0; i <= layerList.length-1; i++){
    doc.activeLayer = doc.layers.getByName(layerList[i]);
    layerName = layerList[i]
    var firstUnderscoreIndex = layerName.indexOf("_");
    var groupName = layerName.substring(0, firstUnderscoreIndex);

//set selection of finish layer
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
//select group 
var idselect = stringIDToTypeID( "select" );
    var desc245 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref11 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        ref11.putName( idlayer, groupName );
    desc245.putReference( idnull, ref11 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc245.putBoolean( idmakeVisible, false );
    var idlayerID = stringIDToTypeID( "layerID" );
        var list6 = new ActionList();
        list6.putInteger( 5 );
    desc245.putList( idlayerID, list6 );
executeAction( idselect, desc245, DialogModes.NO );

//make mask
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
//delete
doc.activeLayer = doc.layers.getByName(layerList[i])
var iddelete = stringIDToTypeID( "delete" );
    var desc19019 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref104 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref104.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc19019.putReference( idnull, ref104 );
executeAction( iddelete, desc19019, DialogModes.NO );
}
app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));