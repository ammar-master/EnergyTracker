//-----------------------------------------------
//Originally published by Mogsdad@Stackoverflow
//Modified for jarkomdityaz.appspot.com
//Modified for Hackster.io by Stephen Borsay
// These modifications was made by Ammar Master for the Energy Tracker
//-----------------------------------------------
/*
----------------------------------------------------------------------

GScript, PushingBox and Arduino/ESP8266 Variables in order:

status
lastSwitch
----------------------------------------------------
*/


/* Using spreadsheet API */

function doGet(e) {
Logger.log( JSON.stringify(e) );  // view parameters

var result = 'Ok'; // assume success

if (e.parameter == undefined) {
result = 'No Parameters';
}
else {
var id = '1Mges7G6Z8rfU5XdeDoX6zFcYaH8CXjj64mB0boCfntQ';//docs.google.com/spreadsheetURL/d
var sheet = SpreadsheetApp.openById(id).getActiveSheet();
var newRow = sheet.getLastRow() + 1;
var rowData = [];
//var waktu = new Date();
rowData[0] = new Date(); // Timestamp in column A

for (var param in e.parameter) {
Logger.log('In for loop, param='+param);
var value = stripQuotes(e.parameter[param]);
//Logger.log(param + ':' + e.parameter[param]);
switch (param) {
case 'status': //Parameter
rowData[1] = value; //Value in column B
break;
case 'lastSwitch':
rowData[2] = value;
break;
default:
result = "unsupported parameter";
}
}
Logger.log(JSON.stringify(rowData));

// Write new row below
var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
newRange.setValues([rowData]);
}

// Return result of operation
return ContentService.createTextOutput(result);
}

/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes( value ) {
return value.replace(/^["']|['"]$/g, "");
}
