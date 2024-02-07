var message = "Welcome to " +app.name
message += " version " +app.version + "\r\r"
message += "I'm installed in " + app.path.fsName + "\r\r"
message += "You have this much memory available for Adobe Photoshop CC: " + app.freeMemory + "\r\r"
var documentsOpen = app.documents.length
message += "You currently have " +documentsOpen + " document(s) open. \r\r"
alert(message)
var answer = confirm("do you love Photoshop?")
if (answer) {
    alert("cool")
}
else {
    alert("that's too bad")
}
