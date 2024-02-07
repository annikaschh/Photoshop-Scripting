var docHead = decodeURI(app.activeDocument.fullName);
docHead = docHead.replace("~/Lashbrook Dropbox/Lashbrook/New Product Photography/Editing/LCV/warping PSDs/", "");
docHead = docHead.replace("_INSIDE.psd","");
alert(docHead)