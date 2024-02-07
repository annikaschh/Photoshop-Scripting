var patterns = ["ABSTRACTSTRIPES3", "AMERICANFLAG", "BEACH_OPT+A", "BEACH_OPT+B", "BEARMOOSEDEERMTN (OPT A)", "BEARMOOSEDEERMTN (OPT B)", "BRANCHES", "CELTICTRINITY", "DESERT (OPT A)", "DESERT (OPT B)", "FEATHER", "FLYFISHING (OPT A)", "FLYFISHING (OPT B)", "LABYRINTH", "MAORI", "MOUNTAIN2", "NATIVE1", "SAFARI (OPT A)", "SAFARI (OPT B)", "SAFARI (OPT C)", "SEGTRIANGLE", "SEGTRIANGLELG", "TREES", "TRELLIS1", "WOLFMTN (OPT A)", "WOLFMTN (OPT B)"];
for (word in patterns){
    patterns[word] = "LCV" + patterns[word]
    newStr = patterns[word];
//change original names in array
    if (newStr.indexOf("(OPT A)") != -1){
        newStr = newStr.replace(" (OPT A)", "_OPT+A")
        patterns[word] = newStr
    }
    if (newStr.indexOf("(OPT B)") != -1){
        newStr = newStr.replace(" (OPT B)", "_OPT+B")
        patterns[word] = newStr
    }
    if (newStr.indexOf("(OPT C)") != -1){
        newStr = newStr.replace(" (OPT C)", "_OPT+C")
        patterns[word] = newStr
    }



}

var thisLayer = "";
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":0,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Choose Engraving","preferredSize":[250,100],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"DropDownList","parentId":0,"style":{"enabled":true,"varName":"Engraving","text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[171,24],"alignment":null,"selection":0,"helpTip":null}},"item-3":{"id":3,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":"right","helpTip":null}}},"order":[0,1,3],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Choose Engraving"; 
    dialog.preferredSize.width = 250; 
    dialog.preferredSize.height = 100; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var Engraving_array = patterns; 
var Engraving = dialog.add("dropdownlist", undefined, undefined, {name: "Engraving", items: Engraving_array}); 
    Engraving.selection = 0; 
    Engraving.preferredSize.width = 171; 
    Engraving.preferredSize.height = 24; 

    var button1 = dialog.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "Go"; 
    button1.alignment = ["right","top"]; 
    button1.onClick = function pickEngraving(){
        thisLayer = Engraving.selection.text;
        app.activeDocument.activeLayer = app.activeDocument.layers.getByName(thisLayer);
        dialog.close();
    }

var button2 = dialog.add("button", undefined, undefined, {name: "button1"}); 
    button2.text = "Cancel"; 
    button2.alignment = ["right","top"]; 

button2.onChange = function chooseName(){
    thisLayer = Engraving.selection.text;
}

dialog.show();

