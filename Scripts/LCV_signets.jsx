var layerList = new Array();
LCVgroup = app.activeDocument.layerSets["LCVs"]
layerName = app.activeDocument.activeLayer.name
textureList = ["14KW","14KR","14KY","Z"]
var rev = false


//set selection
var idset = stringIDToTypeID( "set" );
    var desc375 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref47 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref47.putProperty( idchannel, idselection );
    desc375.putReference( idnull, ref47 );
    var idto = stringIDToTypeID( "to" );
        var ref48 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
        ref48.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc375.putReference( idto, ref48 );
executeAction( idset, desc375, DialogModes.NO );


//intersect guide layer
var idinterfaceIconFrameDimmed = stringIDToTypeID( "interfaceIconFrameDimmed" );
    var desc230 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref4 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref4.putEnumerated( idchannel, idchannel, idmask );
        var idlayer = stringIDToTypeID( "layer" );
        ref4.putName( idlayer, "LCVs" );
    desc230.putReference( idnull, ref4 );
    var idwith = stringIDToTypeID( "with" );
        var ref5 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref5.putProperty( idchannel, idselection );
    desc230.putReference( idwith, ref5 );
executeAction( idinterfaceIconFrameDimmed, desc230, DialogModes.NO );

//DELETE MASK CHANNEL AND CREATE MASK
var idselect = stringIDToTypeID( "select" );
    var desc233 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref6 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        ref6.putName( idlayer, "engraved textures" );
    desc233.putReference( idnull, ref6 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc233.putBoolean( idmakeVisible, false );
executeAction( idselect, desc233, DialogModes.NO );

function hasLayerMask() { 
    var hasLayerMask = false; 
    try { 
    var ref = new ActionReference(); 
    var keyUserMaskEnabled = app.charIDToTypeID( 'UsrM' ); 
    ref.putProperty( app.charIDToTypeID( 'Prpr' ), keyUserMaskEnabled ); 
    ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) ); 
    var desc = executeActionGet( ref ); 
    if ( desc.hasKey( keyUserMaskEnabled ) ) { 
    hasLayerMask = true; 
    } 
    }catch(e) { 
    hasLayerMask = false; 
    } 
    return hasLayerMask; 
    } 

if(hasLayerMask()){
    var iddelete = stringIDToTypeID( "delete" );
    var desc490 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref84 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref84.putEnumerated( idchannel, idordinal, idtargetEnum );
    desc490.putReference( idnull, ref84 );
executeAction( iddelete, desc490, DialogModes.NO );
}

var idmake = stringIDToTypeID( "make" );
    var desc237 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc237.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
        var ref8 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref8.putEnumerated( idchannel, idchannel, idmask );
    desc237.putReference( idat, ref8 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc237.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
executeAction( idmake, desc237, DialogModes.NO );



app.activeDocument.activeLayer = app.activeDocument.layers["LCVs"].layers.getByName(layerName)
app.activeDocument.activeLayer.visible = false;
app.activeDocument.layers['BASES'].layers["TYPE+BASE_MATERIAL+_14KR"].visible = false;
var count = 0

//export not rev
for (i = 0; i < textureList.length; i++){
    thisTexture = textureList[i];

    for (a = 0; a < app.activeDocument.layerSets['engraved textures'].layers.length; a++){
        app.activeDocument.activeLayer = app.activeDocument.layerSets['engraved textures'].layers[a]
        textureName = app.activeDocument.activeLayer.name
        textureName = textureName.replace("_MATERIAL+","")
        textureName = textureName.replace("_IMAGE+1","")
        if (textureName == thisTexture){
            count = a
            break;
        }
        else{
            app.activeDocument.activeLayer.visible = false;
        }
        
    }
    app.activeDocument.activeLayer.visible = true;

    for (b = 0; b < app.activeDocument.layerSets['BASES'].layers.length; b++){
        app.activeDocument.activeLayer = app.activeDocument.layerSets['BASES'].layers[b]
        textureName = app.activeDocument.activeLayer.name
        textureName = textureName.replace("TYPE+BASE_MATERIAL+_","")
        if (textureName == thisTexture){
            break;
        }
        else{
            app.activeDocument.activeLayer.visible = false;
        }
    }
    app.activeDocument.activeLayer.visible = true;
    exportLayer(thisTexture,rev)

    app.activeDocument.activeLayer.visible = false;
    app.activeDocument.activeLayer = app.activeDocument.layers['engraved textures'].layers[count];
    app.activeDocument.activeLayer.visible = false;
    if ( i == textureList.length-1 ){
         app.activeDocument.activeLayer = app.activeDocument.layers["LCVs"].layers.getByName(layerName)
    }
}

//make rev
var idset = stringIDToTypeID( "set" );
    var desc375 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref47 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idselection = stringIDToTypeID( "selection" );
        ref47.putProperty( idchannel, idselection );
    desc375.putReference( idnull, ref47 );
    var idto = stringIDToTypeID( "to" );
        var ref48 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
        ref48.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc375.putReference( idto, ref48 );
executeAction( idset, desc375, DialogModes.NO );

var idinverse = stringIDToTypeID( "inverse" );
executeAction( idinverse, undefined, DialogModes.NO );

var idselect = stringIDToTypeID( "select" );
    var desc233 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref6 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        ref6.putName( idlayer, "engraved textures" );
    desc233.putReference( idnull, ref6 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc233.putBoolean( idmakeVisible, false );
executeAction( idselect, desc233, DialogModes.NO );

if(hasLayerMask()){
    var iddelete = stringIDToTypeID( "delete" );
    var desc490 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref84 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref84.putEnumerated( idchannel, idordinal, idtargetEnum );
    desc490.putReference( idnull, ref84 );
executeAction( iddelete, desc490, DialogModes.NO );
}

var idmake = stringIDToTypeID( "make" );
    var desc237 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc237.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
        var ref8 = new ActionReference();
        var idchannel = stringIDToTypeID( "channel" );
        var idchannel = stringIDToTypeID( "channel" );
        var idmask = stringIDToTypeID( "mask" );
        ref8.putEnumerated( idchannel, idchannel, idmask );
    desc237.putReference( idat, ref8 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc237.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
executeAction( idmake, desc237, DialogModes.NO );


app.activeDocument.activeLayer = app.activeDocument.layers["LCVs"].layers.getByName(layerName)
app.activeDocument.activeLayer.visible = false;
//export rev
rev = true
for (i = 0; i < textureList.length; i++){
    thisTexture = textureList[i];

    for (a = 0; a < app.activeDocument.layerSets['engraved textures'].layers.length; a++){
        app.activeDocument.activeLayer = app.activeDocument.layerSets['engraved textures'].layers[a]
        textureName = app.activeDocument.activeLayer.name
        textureName = textureName.replace("_MATERIAL+","")
        textureName = textureName.replace("_IMAGE+1","")
        if (textureName == thisTexture){
            count = a
            break;
        }
        else{
            app.activeDocument.activeLayer.visible = false;
        }
        
    }
    app.activeDocument.activeLayer.visible = true;

    for (b = 0; b < app.activeDocument.layerSets['BASES'].layers.length; b++){
        app.activeDocument.activeLayer = app.activeDocument.layerSets['BASES'].layers[b]
        textureName = app.activeDocument.activeLayer.name
        textureName = textureName.replace("TYPE+BASE_MATERIAL+_","")
        if (textureName == thisTexture){
            break;
        }
        else{
            app.activeDocument.activeLayer.visible = false;
        }
    }
    app.activeDocument.activeLayer.visible = true;
    exportLayer(thisTexture,rev)

    app.activeDocument.activeLayer.visible = false;
    app.activeDocument.activeLayer = app.activeDocument.layers['engraved textures'].layers[count];
    app.activeDocument.activeLayer.visible = false;
    if ( i == textureList.length-1 ){
        app.activeDocument.layers['BASES'].layers["TYPE+BASE_MATERIAL+_14KR"].visible = true;
         app.activeDocument.activeLayer = app.activeDocument.layers["LCVs"].layers.getByName(layerName)
    }
}



    function exportLayer(textureName,rev){

        var sfwOptions = new ExportOptionsSaveForWeb();   
        sfwOptions.format = SaveDocumentType.PNG;
        sfwOptions.PNG8 = false;       
        sfwOptions.optimized = true;   
        sfwOptions.quality = 50;
        
        // Folder
        var saveFolder = new Folder('/Users/annika.schwartz/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/NCAA/LCVS ON SIGNETS');
        
        // Extension
        var saveExt = 'png';
        
        //Name
        
        var docName = layerName + "_" + textureName;
        
        // Save file
        if(rev){
           var saveFile = new File( saveFolder + '/' + docName + "_REVERSE" + '.' + saveExt ); 
        }
        else{
            var saveFile = new File( saveFolder + '/' + docName  + '.' + saveExt );
        }
        
        
        // Save for Web
            activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, sfwOptions ); 
        }