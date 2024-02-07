#target photoshop
app.bringToFront();
function main(){
var dlg =
"dialog{text:'Script Interface',bounds:[100,100,500,230],"+
"panel0:Panel{bounds:[10,10,390,120] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"statictext0:StaticText{bounds:[30,10,160,30] , text:'Run Action X Times..' ,properties:{scrolling:undefined,multiline:undefined}},"+
"Xtimes:EditText{bounds:[200,10,261,30] , text:'1' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"ActionSet:DropDownList{bounds:[10,50,180,70]},"+
"ActionName:DropDownList{bounds:[200,50,370,70]},"+
"button0:Button{bounds:[40,80,140,100] , text:'Ok' },"+
"button1:Button{bounds:[240,80,340,100] , text:'Cancel' }}}";

var win = new Window(dlg,"Action Runner");
win.center();

var actionSets = new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	item = win.panel0.ActionSet.add ('item', "" + actionSets[i]);      
}; 
win.panel0.ActionSet.selection=0;

var actions = new Array();	
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	item = win.panel0.ActionName.add ('item', "" + actions[i]);      
};
win.panel0.ActionName.selection=0;

win.panel0.ActionSet.onChange = function() {
win.panel0.ActionName.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	item = win.panel0.ActionName.add ('item', "" + actions[i]);  
	}
	win.panel0.ActionName.selection=0;
};
var done = false; 
    while (!done) { 
      var x = win.show(); 
      if (x == 0 || x == 2) {
        win.canceled = true;
        //Cancelled
        done = true; 
      } else if (x == 1) { 
        done = true; 
       var result = valiDate();
        if(result != true) {
        	alert(result);
        	return;
        }else
        {
			var XTimes = parseInt (win.panel0.Xtimes.text);
			for (var a =0;a<XTimes;a++){
        doAction(win.panel0.ActionName.selection.text, win.panel0.ActionSet.selection.text);
			}
        }
      } 
   } 
}

main();

function valiDate(){

return true;
};

function getActionSets() { 
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); }; 
  var i = 1; 
  var sets = [];  
  while (true) { 
    var ref = new ActionReference(); 
    ref.putIndex(cTID("ASet"), i); 
    var desc; 
    var lvl = $.level; 
    $.level = 0; 
    try { 
      desc = executeActionGet(ref); 
    } catch (e) { 
      break;    // all done 
    } finally { 
      $.level = lvl; 
    } 
    if (desc.hasKey(cTID("Nm  "))) { 
      var set = {}; 
      set.index = i; 
      set.name = desc.getString(cTID("Nm  ")); 
      set.toString = function() { return this.name; }; 
      set.count = desc.getInteger(cTID("NmbC")); 
      set.actions = []; 
      for (var j = 1; j <= set.count; j++) { 
        var ref = new ActionReference(); 
        ref.putIndex(cTID('Actn'), j); 
        ref.putIndex(cTID('ASet'), set.index); 
        var adesc = executeActionGet(ref); 
        var actName = adesc.getString(cTID('Nm  ')); 
        set.actions.push(actName); 
      } 
      sets.push(set); 
    } 
    i++; 
  } 
  return sets; 
}; 

function getActions(aset) {
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); };
  var i = 1;
  var names = [];
  if (!aset) {
    throw "Action set must be specified";
  }  
  while (true) {
    var ref = new ActionReference();
    ref.putIndex(cTID("ASet"), i);
    var desc;
    try {
      desc = executeActionGet(ref);
    } catch (e) {
      break;    // all done
    }
    if (desc.hasKey(cTID("Nm  "))) {
      var name = desc.getString(cTID("Nm  "));
      if (name == aset) {
        var count = desc.getInteger(cTID("NmbC"));
        var names = [];
        for (var j = 1; j <= count; j++) {
          var ref = new ActionReference();
          ref.putIndex(cTID('Actn'), j);
          ref.putIndex(cTID('ASet'), i);
          var adesc = executeActionGet(ref);
          var actName = adesc.getString(cTID('Nm  '));
          names.push(actName);
        }
        break;
      }
    }
    i++;
  }
  return names;
};