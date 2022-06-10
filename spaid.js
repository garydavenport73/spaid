//  Example Database Structure
//  
// {
//     "table1Name": [{
//             "field1_name": value1   \ 
//             "field2_name": value2,   \  //these are rows of data
//             "field3_name": value3    /
//         },
//         {
//             "field1_name": value1   \ 
//             "field2_name": value2,   \  //these are rows of data
//             "field3_name": value3    /
//         },
//         {
//             "field1_name": value1   \ 
//             "field2_name": value2,   \  //these are rows of data
//             "field3_name": value3    /
//         }
//     ],
//     "table2Name": [{
//             "field1_name": value1   \ 
//             "field2_name": value2,   \  //these are rows of data
//             "field3_name": value3    /
//         },
//         {
//             "field1_name": value1   \ 
//             "field2_name": value2,   \  //these are rows of data
//             "field3_name": value3    /
//         },
//         {
//             "field1_name": value1   \ 
//             "field2_name": value2,   \  //these are rows of data
//             "field3_name": value3    /
//         }
//     ]
// }
//
//
//
// Notes:
// the order is very important
// <>
// !=
// >=
// >
// <=
// <
// =

let dbObject = {};
let dbMetaData = {};
dbMetaData["CURRENT_FILENAME"] = '';

if (document.getElementById('spaid-data') == null) {
    //alert('no spaid-data div found, creating it!');

    spaidDataDiv = document.createElement('div');
    spaidDataDiv.setAttribute('id', 'spaid-data');
    spaidDataDiv.style.display = 'none';
    spaidDataDiv.innerHTML = "";

    spaidButtonsDiv = document.createElement('div');
    spaidButtonsDiv.setAttribute('id', 'spaid-buttons');

    spaidResultDiv = document.createElement('div');
    spaidResultDiv.setAttribute('id', 'spaid-result');
    spaidResultDiv.innerHTML = '<hr>Run SQL statement above to see results.<br>Type HELP for example statements and info.<hr>';
    // spaidResultDiv.style.display = 'none';

    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'spaid-save');
    saveButton.innerHTML = 'save page with data';

    loadDBButton = document.createElement('button');
    loadDBButton.setAttribute('id', 'spaid-load-db');
    loadDBButton.innerHTML = 'load database';

    saveDBButton = document.createElement('button');
    saveDBButton.setAttribute('id', 'spaid-save-db');
    saveDBButton.innerHTML = 'save database';

    showButton = document.createElement('button');
    showButton.setAttribute('id', 'spaid-show');
    showButton.innerHTML = 'show/hide database';

    sqlInput = document.createElement('input');
    sqlInput.setAttribute('id', 'spaid-input');
    sqlInput.setAttribute('placeholder', '[ENTER SQL STATEMENT]')

    runButton = document.createElement('button');
    runButton.setAttribute('id', 'spaid-run');
    runButton.innerHTML = 'run';

    showResultButton = document.createElement('button');
    showResultButton.setAttribute('id', 'spaid-show-result');
    showResultButton.innerHTML = 'show/hide result';

    loadDBRemoteButton = document.createElement('button');
    loadDBRemoteButton.setAttribute('id', 'spaid-load-db-remote');
    loadDBRemoteButton.innerHTML = 'load database remote';

    saveDBRemoteButton = document.createElement('button');
    saveDBRemoteButton.setAttribute('id', 'spaid-save-db-remote');
    saveDBRemoteButton.innerHTML = 'save database remote';

    remoteUsernameInput = document.createElement('input');
    remoteUsernameInput.setAttribute('id', 'spaid-remote-username-input');
    remoteUsernameInput.setAttribute('placeholder', 'remote username');

    remotePasswordInput = document.createElement('input');
    remotePasswordInput.setAttribute('id', 'spaid-remote-password-input');
    remotePasswordInput.setAttribute('placeholder', 'remote password');

    remoteURLInput = document.createElement('input');
    remoteURLInput.setAttribute('id', 'spaid-remote-URL-input');
    remoteURLInput.setAttribute('placeholder', 'remote URL');

    remoteFilenameInput = document.createElement('input');
    remoteFilenameInput.setAttribute('id', 'spaid-remote-filename-input');
    remoteFilenameInput.setAttribute('placeholder', 'remote filename');

    document.body.prepend(spaidDataDiv);
    spaidButtonsDiv.appendChild(saveButton);
    spaidButtonsDiv.appendChild(loadDBButton)
    spaidButtonsDiv.appendChild(saveDBButton);
    spaidButtonsDiv.appendChild(showButton);
    spaidButtonsDiv.appendChild(sqlInput);
    spaidButtonsDiv.appendChild(runButton);
    spaidButtonsDiv.appendChild(showResultButton);
    spaidButtonsDiv.appendChild(document.createElement('br'));
    spaidButtonsDiv.appendChild(loadDBRemoteButton);
    spaidButtonsDiv.appendChild(saveDBRemoteButton);
    spaidButtonsDiv.appendChild(remoteUsernameInput);
    spaidButtonsDiv.appendChild(remotePasswordInput);
    spaidButtonsDiv.appendChild(remoteURLInput);
    spaidButtonsDiv.appendChild(remoteFilenameInput);
    document.body.prepend(spaidResultDiv);
    document.body.prepend(spaidButtonsDiv);

} else {

    spaidDataDiv = document.getElementById('spaid-data');
    spaidResultDiv = document.getElementById('spaid-result');
    saveButton = document.getElementById('spaid-save');
    showButton = document.getElementById('spaid-show');
    loadDBButton = document.getElementById('spaid-load-db');
    saveDBButton = document.getElementById('spaid-save-db');

    loadDBRemoteButton = document.getElementById('spaid-load-db-remote');
    saveDBRemoteButton = document.getElementById('spaid-save-db-remote');
    remoteUsernameInput = document.getElementById('spaid-remote-username-input');
    remotePasswordInput = document.getElementById('spaid-remote-password-input');
    remoteURLInput = document.getElementById('spaid-remote-URL-input');
    remoteFilenameInput = document.getElementById('spaid-remote-filename-input');

    sqlInput = document.getElementById('spaid-input');
    runButton = document.getElementById('spaid-run');
    showResultButton = document.getElementById('spaid-show-result');
    readInDatabaseFromDiv();

}

saveButton.addEventListener('click', savePage);
loadDBButton.addEventListener('click', loadDatabase);
saveDBButton.addEventListener('click', saveDatabase);
loadDBRemoteButton.addEventListener('click', _loadDatabaseRemote);
saveDBRemoteButton.addEventListener('click', _saveDatabaseRemote);


showButton.addEventListener('click', toggleDataVisible);
runButton.addEventListener('click', runSQL);
sqlInput.addEventListener('change', () => { runButton.focus() });
showResultButton.addEventListener('click', toggleResultVisible);

let initialDatabaseName = "database" + Date.now().toString();
//this ensures some database name will be present, likely overwritten
sqlQuery("NAME DATABASE `" + initialDatabaseName + "`;");

//SPAID functions

function runSQL() {
    let strSQL = document.getElementById('spaid-input').value;

    resultDiv = document.getElementById('spaid-result');

    thisResult = sqlQuery(strSQL); //could be error string or array

    tableName = thisResult["TABLE_NAME"];

    resultDiv.innerHTML = '<hr>';
    resultDiv.innerHTML += '<br';
    resultDiv.innerHTML += 'SQL statement processed: ' + strSQL + '<br>';
    resultDiv.innerHTML += 'Table name: ' + tableName + '<br>';
    resultDiv.innerHTML += '<hr>';

    let formattedTable = formatTable2(thisResult); //will check to see if string

    if (formattedTable.includes("ERROR")) {
        resultDiv.innerHTML += formattedTable;
    } else {
        resultDiv.innerHTML += (formattedTable).replaceAll('undefined', '-').replaceAll(null, '-');
    }
    resultDiv.innerHTML += '<hr>';

}

function formatTable2(arrayOfObjectsTable) {

    try {
        if ((typeof(arrayOfObjectsTable) === "string") && (arrayOfObjectsTable.includes("ERROR"))) {
            return "<pre><table><tbody><tr><th>ERROR:</th></tr><tr><td>" + arrayOfObjectsTable + "</td></tr></tbody></table></pre>";
        } else {
            thisTable = arrayOfObjectsTable;

            let headerArray = [];

            //build headerArray

            if ((thisTable["TABLE_NAME"].includes("_METADATA")) || (thisTable["TABLE_NAME"] === "SHOW TABLES")) { //how to display the metadata table
                for (const key in thisTable) {
                    if (Object.hasOwnProperty.call(thisTable, key)) {
                        if (typeof(thisTable[key]) != "object") {
                            headerArray.push(key);

                        }
                    }
                }
            } else {
                for (const key in thisTable) {
                    if (Object.hasOwnProperty.call(thisTable, key)) {
                        if (typeof(thisTable[key]) != "object") {
                            if ((key === "TABLE_NAME") || (key === "NEXT_PRIMARY_KEY")) {
                                //do nothing
                            } else {
                                headerArray.push(key);
                            }
                        }
                    }
                }
            }

            console.log("");
            console.log("-".repeat(32));
            console.log("table:" + thisTable["TABLE_NAME"]);
            let tempString = "";
            tempStringHtml = "<pre><table>"; //start table
            tempStringHtml += "<tr>"; //start header row
            for (let j = 0; j < headerArray.length; j++) {
                tempString += headerArray[j] + " ";
                tempStringHtml += '<th>' + headerArray[j] + '</th>';
            }

            console.log("-".repeat(32));
            console.log(tempString);
            console.log("-".repeat(32));
            tempStringHtml += '</tr>' //finish header row

            tempString = "";
            for (let i = 0; i < thisTable.length; i++) { //go through every index in table and build table rows
                tempStringHtml += '<tr>';
                for (let j = 0; j < headerArray.length; j++) { //go through every index of header array
                    tempString += thisTable[i][headerArray[j]] + " ";
                    tempStringHtml += '<td>' + thisTable[i][headerArray[j]] + '</td>';
                }
                console.log(tempString);
                tempString = "";

                tempStringHtml += '</tr>';
            }
            tempStringHtml += '</table></pre>';

            let formattedTable = tempStringHtml;

            return formattedTable;
        }

    } catch (error) {
        return "<pre><table><tbody><tr><th>ERROR</th></tr><tr><td>" + "ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack + "</td></tr></tbody></table></pre>";

    }
}

//function savePage() {
//    let thisDocument = new XMLSerializer().serializeToString(document.documentElement);
//    saveStringToTextFile(thisDocument, "spaid", ".html");
//}
function savePage() {
    let thisDocument = turnWebPageIntoString();


    saveStringToTextFile(thisDocument, "pagecopy", ".html");
}

function turnWebPageIntoString() {
    let thisDocument = new XMLSerializer().serializeToString(document.documentElement);
    let styleTempArray = [];
    thisDocument = thisDocument.replaceAll("<\/style", "<style");
    styleTempArray = thisDocument.split('<style');
    for (let i = 0; i < styleTempArray.length; i++) {
        if ((i + 1) % 2 === 0) {
            styleTempArray[i] = styleTempArray[i].replaceAll('&gt;', '>');
            styleTempArray[i] = styleTempArray[i].replaceAll('&lt;', '<');
            styleTempArray[i] = styleTempArray[i].replaceAll('&amp;', '&');
        }
    }
    thisDocument = '';
    for (let i = 0; i < styleTempArray.length - 1; i++) {
        if (i % 2 == 0) {
            thisDocument += styleTempArray[i] + '<style';
        } else {
            thisDocument += styleTempArray[i] + '<\/style';
        }
    }
    thisDocument += styleTempArray[styleTempArray.length - 1];
    let scriptTempArray = [];
    thisDocument = thisDocument.replaceAll("<\/script", "<script");
    scriptTempArray = thisDocument.split('<script');
    for (let i = 0; i < scriptTempArray.length; i++) {
        if ((i + 1) % 2 === 0) {
            scriptTempArray[i] = scriptTempArray[i].replaceAll('&gt;', '>');
            scriptTempArray[i] = scriptTempArray[i].replaceAll('&lt;', '<');
            scriptTempArray[i] = scriptTempArray[i].replaceAll('&amp;', '&');
        }
    }
    thisDocument = '';
    for (let i = 0; i < scriptTempArray.length - 1; i++) {
        if (i % 2 === 0) {
            thisDocument += scriptTempArray[i] + '<script';
        } else {
            thisDocument += scriptTempArray[i] + '<\/script';
        }
    }
    thisDocument += scriptTempArray[scriptTempArray.length - 1];
    return thisDocument;
}

function saveDatabase() {
    let baseName = dbObject["DBNAME"][0]["NAME"];
    let extension = ".json";
    let addDate = true;
    saveStringToTextFile(spaidDataDiv.innerHTML, baseName, extension, addDate);
}

function saveDatabaseRemote(username, password, url, filename, contents, timeoutMS = 2000) {
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    filename = encodeURIComponent(filename);
    contents = encodeURIComponent(contents);
    let http = new XMLHttpRequest();
    http.timeout = timeoutMS;
    //I use 'do-this' keyword in my php processing file, it may not be needed in yours
    let params = "username=" + username + "&password=" + password + "&filename=" + filename + "&contents=" + contents + "&do-this=save-contents-to-file&using-spaid=true";
    http.ontimeout = function(e) {
        alert("The request timed out.");
    };
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log("Recieved the following response:");
            console.log(http.responseText);
            alert(http.responseText);
        }
    }
    http.send(params);

}

function _saveDatabaseRemote(username, password, url, filename, contents, timeoutMS = 2000) {
    username = remoteUsernameInput.value;
    password = remotePasswordInput.value
    url = remoteURLInput.value;
    filename = remoteFilenameInput.value;
    updateDataDiv(); //should be updated already, but just in case
    contents = spaidDataDiv.innerHTML;
    saveDatabaseRemote(username, password, url, filename, contents, timeoutMS = 2000);
}

function _loadDatabaseRemote(username, password, url, filename, timeoutMS = 2000) {
    username = remoteUsernameInput.value;
    password = remotePasswordInput.value
    url = remoteURLInput.value;
    filename = remoteFilenameInput.value;
    loadDatabaseRemote(username, password, url, filename, timeoutMS = 2000);

}

function loadDatabaseRemote(username, password, url, filename, timeoutMS = 2000) {
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    filename = encodeURIComponent(filename);
    let http = new XMLHttpRequest();
    http.timeout = timeoutMS; // time in milliseconds
    let params = 'username=' + username + '&password=' + password + '&filename=' + filename + '&do-this=send-data-to-client';
    http.ontimeout = function(e) {
        alert("The request timed out.");
    };
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log("Recieved the following response:");
            console.log(http.responseText);
            try {
                testObject = JSON.parse(http.responseText);
                baseName = testObject["DBNAME"][0]["NAME"];
                console.log(baseName);
                if (baseName != "") {
                    dbObject = JSON.parse(http.responseText);
                    updateDataDiv();
                    alert("Successfully loaded database with name: " + baseName);
                }
            } catch (error) {
                alert("Data could not be loaded: \n" + error);
            }
        }
    }
    http.send(params);

}

function saveDatabaseNoTimeStamp() {
    let baseName = dbObject["DBNAME"][0]["NAME"];
    let extension = ".json";
    let addDate = false;
    saveStringToTextFile(spaidDataDiv.innerHTML, baseName, extension, addDate);
}

function saveStringToTextFile(str1, fileName = "spaid", fileType = ".html", addDate = false) {
    let saveFileName = fileName;
    let dateString = '';

    if (addDate === true) {
        //make a string representing the date to add on to the filename
        dateString = (new Date()).toLocaleString();
        dateString = "_" + dateString.replaceAll("/", "_").replaceAll(",", "_").replaceAll(" ", "_").replaceAll(":", "_");
    }

    saveFileName = fileName + dateString + fileType;

    let blobVersionOfText = new Blob([str1], {
        type: "text/plain"
    });
    let urlToBlob = window.URL.createObjectURL(blobVersionOfText);
    let downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.download = saveFileName;
    downloadLink.href = urlToBlob;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.parentElement.removeChild(downloadLink);
}

function loadDatabase() {
    let fileContents = "";
    let inputTypeIsFile = document.createElement('input');
    inputTypeIsFile.type = "file";
    inputTypeIsFile.addEventListener("change", function() {
        let inputFile = inputTypeIsFile.files[0];
        dbMetaData["CURRENT_FILENAME"] = inputFile.name;
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            dbObject = JSON.parse(fileLoadedEvent.target.result);
            updateDataDiv();
        };
        fileReader.readAsText(inputFile, "UTF-8");
    });
    inputTypeIsFile.click();
}

function toggleDataVisible() {
    if (spaidDataDiv.style.display == 'none') {
        spaidDataDiv.style.display = 'inherit';
    } else {
        spaidDataDiv.style.display = 'none';;
    }
}

function toggleResultVisible() {
    if (spaidResultDiv.style.display == 'none') {
        spaidResultDiv.style.display = 'inherit';
    } else {
        spaidResultDiv.style.display = 'none';;
    }
}

function readInDatabaseFromDiv() {
    jsonData = spaidDataDiv.innerHTML;
    console.log(jsonData);
    if (jsonData != "") {
        dbObject = JSON.parse(jsonData);
    }
}


function attachMetaDataToTable(someTable, metaData) {
    //use by select all to add properties to the table
    //so that when it is returned metadata is available even
    //if the return is not a table in the database, but a 
    //select where query for example
    for (const key in metaData) {
        if (Object.hasOwnProperty.call(metaData, key)) {
            someTable[key] = metaData[key];
        }
    }
    return someTable;
}

function _selectAllFrom(tableName) {

    //get a copy of the datatable from the database
    let tempTable = [];
    for (let i = 0; i < dbObject[tableName].length; i++) {
        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
    }

    //get a copy of the metadata from the database
    if (tableName.includes("_METADATA")) {
        //this is a special request
        //the metadata table does not have an entry of itself
        let metaDataEntry = JSON.parse(JSON.stringify(tempTable[0]));
        for (const key in metaDataEntry) {
            if (Object.hasOwnProperty.call(metaDataEntry, key)) {
                tempTable[key] = metaDataEntry[key];
            }
        }
        tempTable["TABLE_NAME"] = tableName;
    } else {
        let metaData = JSON.parse(JSON.stringify(dbObject[tableName + "_METADATA"][0]));
        //attach metadata to this copy
        tempTable = attachMetaDataToTable(tempTable, metaData);
    }
    //console.log(tempTable);
    return tempTable;
}

function columnsFilter(thisTable, columns = []) {

    //make a new table with only fields in column
    //attach only metadata corresponding fields to table
    //return the table

    let tempTable = [];
    let tempRow = {};

    for (let i = 0; i < thisTable.length; i++) { //loop through every row in table
        tempRow = {};
        for (let j = 0; j < columns.length; j++) { //loop through every column
            if (thisTable[i].hasOwnProperty(columns[j])) { //build the row for the new table
                tempRow[columns[j]] = thisTable[i][columns[j]];
                tempTable[columns[j]] = thisTable[columns[j]]; //add the metadata, very inefficient
            }
        }
        tempTable.push(JSON.parse(JSON.stringify(tempRow)));
    }

    tempTable["TABLE_NAME"] = thisTable["TABLE_NAME"];
    return tempTable;
}

function orderByFilter(thisTable, field, direction = "ASC") {
    function compare(a, b) {
        if (a[sortField] < b[sortField]) {
            return -1;
        }
        if (a[sortField] > b[sortField]) {
            return 1;
        }
        return 0;
    }
    sortField = field;
    thisTable.sort(compare);
    if (direction === "DESC") {
        thisTable.reverse();
    }

    return thisTable;
}

function _innerJoin(table1, table2, table1Field, table2Field) {
    tempTable1 = [];
    tempTable2 = [];
    joinedTable = [];

    //make a copy of table 1 with new field names  table1_column1, table1_column2, etc
    for (let i = 0; i < table1.length; i++) {
        rowObject = JSON.parse(JSON.stringify(table1[i]));

        for (const key in rowObject) {
            newFieldName = table1["TABLE_NAME"] + "_" + key; //make the new field name
            rowObject[newFieldName] = rowObject[key]; //add the field name as property and value as key
            delete rowObject[key]; //delete the old column data
            //attach metadata to the table array
            tempTable1[newFieldName] = table1[key]; //very inefficient, but straightforward, repeats/overrwrites
            joinedTable[newFieldName] = table1[key]; //same with joined table which will contain all columns
        }

        tempTable1.push(rowObject);
    }

    //make a copy of table 2 with new field names  table2_column1, table2_column2, etc
    for (let i = 0; i < table2.length; i++) {
        rowObject = JSON.parse(JSON.stringify(table2[i]));

        for (const key in rowObject) {
            newFieldName = table2["TABLE_NAME"] + "_" + key; //make the new field name
            rowObject[newFieldName] = rowObject[key]; //add the field name as property and value as key
            delete rowObject[key]; //delete the old column data
            //attach metadata to the table array
            tempTable2[newFieldName] = table2[key]; //very inefficient, but straightforward, repeats/overrwrites
            joinedTable[newFieldName] = table2[key]; //same with joined table which will contain all columns
        }

        tempTable2.push(rowObject);
    }

    //We now have 2 tables with associated string or number values attached and new headings with same data

    //these are the arguments passed through to join on
    table1Field = table1["TABLE_NAME"] + "_" + table1Field; //getting these tablenames as attached properties 
    table2Field = table2["TABLE_NAME"] + "_" + table2Field;

    for (let i = 0; i < tempTable1.length; i++) { //loop through allentries in table1
        for (let j = 0; j < tempTable2.length; j++) { //loop through all entries in table2
            rowObject = {}
            if ((tempTable1[i].hasOwnProperty(table1Field)) && (tempTable2[j].hasOwnProperty(table2Field))) {
                if ((tempTable1[i][table1Field] === tempTable2[j][table2Field])) { //if there is a match add add objects together and add to table

                    rowObject = JSON.parse(JSON.stringify({...tempTable1[i], ...tempTable2[j] }));

                    joinedTable.push(rowObject);
                }
            }

        }
    }

    joinedTable["TABLE_NAME"] = table1["TABLE_NAME"] + "INNERJOIN" + table2["TABLE_NAME"]; //renaming this table

    // console.log("/////////////CHECKING KEYS HERE/////////////////");
    // for (const key in joinedTable) {
    //     if (Object.hasOwnProperty.call(joinedTable, key)) {
    //         console.log('column: ' + key + '    dataType: ' + joinedTable[key]);
    //     }
    // }
    // console.log("/////////////END CHECKING KEYS//////////////////");

    return joinedTable;
}

function whereFilter(thisTable, compareField, operator, compareValue) {

    // make new empty table
    let tempTable = [];

    // see if compare value is string or number
    // if number convert to number

    if (thisTable[compareField] === "NUMBER") {
        compareValue = Number(compareValue);
    }

    // if condition is met in table, add that row to new table

    if (operator === '=') {
        for (let i = 0; i < thisTable.length; i++) {
            if (thisTable[i].hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] === compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if ((operator === "!=") || (operator === "<>")) {
        for (let i = 0; i < thisTable.length; i++) {
            if (thisTable[i].hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] != compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '>') {
        for (let i = 0; i < thisTable.length; i++) {
            if (thisTable[i].hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] > compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '>=') {
        for (let i = 0; i < thisTable.length; i++) {
            if (thisTable[i].hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] >= compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '<') {
        for (let i = 0; i < thisTable.length; i++) {
            if (thisTable[i].hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] < compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '<=') {
        for (let i = 0; i < thisTable.length; i++) {
            if (thisTable[i].hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] <= compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    }

    tempTable = transferMetadata(tempTable, thisTable);

    return tempTable;
}

function transferMetadata(table, donorTable) {

    for (const key in donorTable) {
        if (Object.hasOwnProperty.call(donorTable, key)) {
            if (typeof(donorTable[key]) != "object") {
                if (key != "NEXT_PRIMARY_KEY") {
                    //console.log("key " + key + "  value " + thisTable[key] + "type of" + typeof(thisTable[key]));

                    table[key] = donorTable[key];

                }
            }
        }
    }
    return (table);

}

function _showTables() {
    let tempTable = [];
    let tempRowObject = {};
    for (let tableName in dbObject) {
        tempRowObject["TABLE_NAME"] = tableName;
        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
    }
    tempTable["TABLE_NAME"] = 'SHOW TABLES';
    return tempTable;
}

function updateDataDiv() {
    spaidDataDiv.innerHTML = JSON.stringify(dbObject);
}

/// MAIN FUNCTION THAT FINDS THE RIGHT FUNCTION TO CALL, 
/// ThGETS
/// ITS RETURN VALUE AND RETURNS IT BACK.  ALWAYS RETURNS
/// A TABLE LIKE OBJECT, ARRAY OF OBJECTS, EXCEPT FOR DROP
/// THE TABLE LIKE OBJECT IS AN
///     array of objects
///     additionally it has properties TABLE_NAME NEXT_PRIMARY_KEY and column name
///         the values are a tablename string, an integer, and each column name is string or number
///         
/// TABLE, WHICH RETURNS UNDEFINED


// main function that parses the query string and then calls the appropriate function.
//      the appropriate function returns a table (an array of objects) with attached properties of metadata
//      this table (and array of objects) is returned with attached metadata as properties.
//      the idea is that although we are returning an indexed array of objects, the array itself 
//      is an object which can have its own properties, so the tablename, next primary key for autoincrementing
//      and column names and types are attached as the tables properties.
//
//  the function takes a sql statement as its argument
//  the function returns an index array of objects with attached properties

function sqlQuery(strSQL) {
    let sqlStatementsArray = splitSQLStatementsBySemicolon(strSQL);
    let tempTable = [];
    for (let i = 0; i < sqlStatementsArray.length; i++) {
        tempTable = _sqlQuery(sqlStatementsArray[i]);
    }
    return tempTable;
}

function _sqlQuery(strSQL) {

    let dbMetaDataBackup = JSON.parse(JSON.stringify(dbMetaData));
    let dbObjectBackup = JSON.parse(JSON.stringify(dbObject));

    console.log(strSQL);
    //NOTE ORDER IS IMPORTANT

    strSQL = strSQL.trim();

    if (strSQL[strSQL.length - 1] === ";") {
        strSQL = strSQL.slice(0, -1);
    }

    let thisTable = [];

    if ((strSQL.includes("INSERT")) && (strSQL.includes("SELECT"))) {
        console.log("proces  INSERT SELECT"); //also will process inner join
        thisTable = processInsertSelect(strSQL);

    } else if (strSQL.includes("INNER")) {
        console.log("process INNER JOIN");
        thisTable = processInnerJoin(strSQL);

    } else if (strSQL.includes("SELECT")) {
        console.log("process SELECT statement");
        thisTable = processSelectStatement(strSQL);

    } else if (strSQL.includes("INSERT")) {
        console.log("process INSERT INTO");
        thisTable = processInsertInto(strSQL);

    } else if (strSQL.includes("UPDATE")) {
        console.log("process UPDATE statement");
        thisTable = processUpdate(strSQL);

    } else if (strSQL.includes("DELETE")) {
        console.log("process DELETE statement");
        thisTable = processDelete(strSQL);

    } else if (strSQL.includes("CREATE")) {
        console.log("process CREATE table statement");
        thisTable = processCreateTable(strSQL);

    } else if ((strSQL.includes("DROP")) && (!strSQL.includes("ALTER"))) {
        console.log("process DROP TABLE statement");
        thisTable = processDropTable(strSQL);

    } else if (strSQL.includes("SHOW")) {
        console.log("process SHOW TABLES statement");
        thisTable = processShowTables();

    } else if (strSQL.includes("DESCRIBE")) {
        console.log("process DESCRIBE TABLE statement");
        thisTable = processDescribeTable(strSQL);

    } else if (strSQL.includes("HELP")) {
        console.log("process HELP statement");
        thisTable = processHelp(strSQL);

    } else if ((strSQL.includes("ALTER")) && (strSQL.includes("TABLE")) && (strSQL.includes("CHANGE"))) {
        console.log("process ALTER TABLE CHANGE statement");
        thisTable = processAlterTableChange(strSQL);

    } else if ((strSQL.includes("ALTER")) && (strSQL.includes("TABLE")) && (strSQL.includes("ADD"))) {
        console.log("process ALTER TABLE ADD statement");
        thisTable = processAlterTableAddColumn(strSQL);

    } else if ((strSQL.includes("ALTER")) && (strSQL.includes("TABLE")) && (strSQL.includes("DROP"))) {
        console.log("process ALTER TABLE DROP statement");
        thisTable = processAlterTableDropColumn(strSQL);

    } else if (strSQL.includes("NAME")) {
        console.log("process NAME DATABASE statement");
        thisTable = processNameDatabase(strSQL);

    } else {
        console.log('sql statement not understood');
        thisTable = "ERROR:\n - sql statement not understood, could not be parsed.";
    }

    if ((typeof(thisTable) === 'string') && (thisTable.includes("ERROR"))) { //indicates an error
        dbMetaData = JSON.parse(JSON.stringify(dbMetaDataBackup));
        dbObject = JSON.parse(JSON.stringify(dbObjectBackup));
        updateDataDiv();
        thisTable += "\n dbObject and dbMetaData reset to values before attempted SQL operation."
        console.log(thisTable);
    }

    return thisTable;

}

function processNameDatabase(strSQL) {
    try {
        let tempTable = [];
        let databaseName = readBackTicks(strSQL)[0]; //get filename
        sqlQuery("CREATE TABLE DBNAME (NAME STRING);");
        tempTable = sqlQuery("INSERT INTO DBNAME (NAME) VALUES (`" + databaseName + "`);");
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processAlterTableDropColumn(strSQL) {
    //will parse something like - ALTER TABLE table_name DROP COLUMN column_name;
    //it calls the paramaterized function and passes its return value back
    try {
        let tempTable = [];
        let tokens = tokenizeStringBySpace(strSQL);
        let tableName = tokens[2];
        let columnName = getTokenAfter(tokens, "COLUMN");
        tempTable = _alterTableDropColumn(tableName, columnName);
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }

}

function _alterTableDropColumn(tableName, columnName) {
    try {
        tempTable = dbObject[tableName]; //an array of objects
        // go through table, and at each line remove the property
        for (i = 0; i < tempTable.length; i++) {
            if (columnName in tempTable[i]) { //if the property is in the object
                delete tempTable[i][columnName];
            }
        }

        // remove that column from the table's metadata entry
        metaDataTable = dbObject[tableName + "_METADATA"];

        if (columnName in metaDataTable[0]) {
            delete metaDataTable[0][columnName];
        }

        //update visually
        updateDataDiv();

        return sqlQuery("SELECT * FROM " + tableName);
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }

}

function processAlterTableAddColumn(strSQL) {
    //will parse something like - ALTER TABLE table_name ADD column_name datatype;
    //it calls the paramaterized function and passes its return value back

    try {
        let tempTable = [];
        let tokens = tokenizeStringBySpace(strSQL);
        let tableName = tokens[2];
        let endString = getStringAfter(strSQL, "ADD");
        let tokens2 = tokenizeStringBySpace(endString);
        let columnName = tokens2[0];
        let dataType = tokens2[1];
        tempTable = _alterTableAddColumn(tableName, columnName, dataType);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }


}

function _alterTableAddColumn(tableName, columnName, dataType) {

    try {
        if (columnName in dbObject[tableName + "_METADATA"][0]) {
            console.log(tableName + " already has column with name " + columnName + ".");
        } else {
            dbObject[tableName + "_METADATA"][0][columnName] = dataType;
        }
        updateDataDiv();
        return sqlQuery("SELECT * FROM " + tableName);
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }

}

function processAlterTableChange(strSQL) {
    //will parse something like - //ALTER TABLE table_name CHANGE pets_name name STRING;
    //it calls the paramaterized function and passes its return value back
    try {
        let tempTable = [];
        let tokens = tokenizeStringBySpace(strSQL);
        let tableName = tokens[2];
        let endString = getStringAfter(strSQL, "CHANGE");
        let tokens2 = tokenizeStringBySpace(endString);
        let originalName = tokens2[0];
        let newName = tokens2[1];
        let dataType = tokens2[2];
        //call the parameterized function and get its return value
        tempTable = _alterTableChange(tableName, originalName, newName, dataType);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function _alterTableChange(tableName, originalName, newName, dataType) {
    try {

        //change datatype
        let thisTable = dbObject[tableName];

        if (dataType === "STRING") {
            for (let i = 0; i < thisTable.length; i++) { //change all table entries to new datatype
                if (originalName in thisTable[i]) {
                    thisTable[i][originalName] = thisTable[i][originalName].toString();
                }
            }
        } else if (dataType === "NUMBER") {
            for (let i = 0; i < thisTable.length; i++) { //change all table entries to new datatype
                if (originalName in thisTable[i]) {
                    thisTable[i][originalName] = Number(thisTable[i][originalName]);
                }
            }
        }

        //change column name, ie add new column and delete old if names are different
        //note: allowing to be same allows updating datatype only
        if (newName != originalName) {
            for (let i = 0; i < thisTable.length; i++) {
                if (originalName in thisTable[i]) {
                    thisTable[i][newName] = thisTable[i][originalName];
                    delete thisTable[i][originalName];
                }
            }
        }

        //update metadatatale
        metaDataTable = dbObject[tableName + "_METADATA"];

        //add new column name and type
        metaDataTable[0][newName] = dataType;

        //delete old column name and type if names are different
        if (newName != originalName) {
            delete metaDataTable[0][originalName];
        }

        //updating visually and writing to text database storage
        updateDataDiv();

        let tempTable = sqlQuery("SELECT * FROM " + tableName);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}


function processHelp(strSQL) {
    try {
        //note helpstring is global scope
        let tempTable = [];
        let tempObject = { 'HELP': helpString };
        tempTable.push(tempObject);
        tempTable["TABLE_NAME"] = "HELP";
        tempTable["HELP"] = "STRING";
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }

}

function processShowTables(strSQL) {
    try {
        return _showTables();
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processDescribeTable(strSQL) {
    try {
        let tempTable = [];
        let tokens = tokenizeStringBySpace(strSQL);
        let tableName = getTokenAfter(tokens, "DESCRIBE");
        tempTable = _describe(tableName);
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function _describe(thisTableName) {
    try {
        if (thisTableName.includes("_METADATA")) {
            let tempTable = sqlQuery("SELECT * FROM " + thisTableName);
            tempTable["TABLE_NAME"] = thisTableName;
        } else {
            let tempTable = sqlQuery("SELECT * FROM " + thisTableName + "_METADATA");
            tempTable["TABLE_NAME"] = thisTableName + "_METADATA";
        }
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processDropTable(strSQL) {
    //will parse something like - DROP TABLE table_name;
    //it calls the paramaterized function and passes its return value back
    try {
        let tempTable = [];
        let tokens = tokenizeStringBySpace(strSQL);
        tableName = getTokenAfter(tokens, "TABLE");
        tempTable = _dropTable(tableName);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function _dropTable(tableName) {
    try {
        delete dbObject[tableName];
        delete dbObject[tableName + "_METADATA"];
        updateDataDiv();
        //send something back
        let tempTable = [];
        tempTable["TABLE_NAME"] = "DROPPED " + tableName;

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processCreateTable(strSQL) {
    try {
        //will parse something like - CREATE TABLE table_name (column1 datatype, column2 datatype, column3 datatype, .... );
        //it calls the paramaterized function and passes its return value back
        let tempTable = [];
        let fieldNames = [];
        let dataTypes = [];
        let tokens = tokenizeStringBySpace(strSQL);
        let tableName = getTokenAfter(tokens, "TABLE");
        endString = getStringAfter(strSQL, tableName);
        endString = endString.replace("(", " ");
        endString = endString.replace(")", " ");
        tokenPairs = splitByCommasAndCleanWhiteSpace(endString);
        let tempArray = []
        for (let i = 0; i < tokenPairs.length; i++) {
            tempArray = tokenizeStringBySpace(tokenPairs[i]);
            fieldNames[i] = tempArray[0];
            dataTypes[i] = tempArray[1];
        }
        tempTable = _createTable(tableName, fieldNames, dataTypes);
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }

}

function _createTable(tableName, fieldNames = [], dataTypes = []) {
    try {
        tempTable = [];
        //make an empty entry into the database
        dbObject[tableName] = [];

        //make a metatable entry into the database
        dbObject[tableName + "_METADATA"] = [];

        //place metadata in the table's metadata table
        metaData = {};
        metaData["TABLE_NAME"] = tableName;
        metaData["NEXT_PRIMARY_KEY"] = 1;
        metaData["PRIMARY_KEY"] = "NUMBER";

        //loop through field names and datatype and add to metadata
        for (let i = 0; i < fieldNames.length; i++) {
            metaData[fieldNames[i]] = dataTypes[i];
        }

        //make the metadatatable
        dbObject[tableName + "_METADATA"][0] = JSON.parse(JSON.stringify(metaData));

        //update visually
        updateDataDiv();

        //return the table just made
        tempTable = sqlQuery("SELECT * FROM " + tableName);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processDelete(strSQL) {
    try {
        // will parse something like-
        // DELETE FROM table_name WHERE condition;
        // DELETE FROM table_name WHERE column=` some value   `;
        // it calls the paramaterized function and passes its return value back;

        let tempTable = [];

        let tokens = tokenizeStringBySpace(strSQL);
        tableName = getTokenAfter(tokens, "FROM"); //got tableName!

        //get compareField and operator
        let lastString = getStringAfter(strSQL, "WHERE");

        let stopIndex = lastString.indexOf("`");
        firstTwoThirdsOfLastString = lastString.substring(0, stopIndex);

        firstTwoThirdsOfLastString = addWhiteSpaceFirstOperator(firstTwoThirdsOfLastString);

        //get compare field and operator
        let tempTokens3 = tokenizeStringBySpace(firstTwoThirdsOfLastString);

        let compareField = tempTokens3[0];
        let operator = tempTokens3[1];

        //get compare value
        compareValue = readBackTicks(lastString)[0];

        if (dbObject[tableName][compareField] === "NUMBER") {
            compareValue = Number(compareValue);
        }

        //alert(compareValue);

        if (compareValue === undefined) {
            //do nothing
        } else {
            tempTable = _deleteFromTable(tableName, compareField, operator, compareValue);
        }

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }

}

function _deleteFromTable(tableName, compareField, operator = "=", compareValue) {
    try {

        tempTable = [];
        metaData = dbObject[tableName + "_METADATA"][0];

        //get datatype of compareValue so it can be compared to stored value
        if (metaData[compareField] === "NUMBER") {
            compareValue = Number(compareValue);
        }

        if (operator === "=") {
            for (let i = dbObject[tableName].length - 1; i >= 0; i--) {
                if (dbObject[tableName][i][compareField] === compareValue) {
                    dbObject[tableName].splice(i, 1);
                }
            }
        } else if ((operator === "!=") || (operator === "<>")) {
            for (let i = dbObject[tableName].length - 1; i >= 0; i--) {
                if (dbObject[tableName][i][compareField] != compareValue) {
                    dbObject[tableName].splice(i, 1);
                }
            }
        } else if (operator === ">") {
            for (let i = dbObject[tableName].length - 1; i >= 0; i--) {
                if (dbObject[tableName][i][compareField] > compareValue) {
                    dbObject[tableName].splice(i, 1);
                }
            }
        } else if (operator === ">=") {
            for (let i = dbObject[tableName].length - 1; i >= 0; i--) {
                if (dbObject[tableName][i][compareField] >= compareValue) {
                    dbObject[tableName].splice(i, 1);
                }
            }
        } else if (operator === "<") {
            for (let i = dbObject[tableName].length - 1; i >= 0; i--) {
                if (dbObject[tableName][i][compareField] < compareValue) {
                    dbObject[tableName].splice(i, 1);
                }
            }
        } else if (operator === "<=") {
            for (let i = dbObject[tableName].length - 1; i <= 0; i--) {
                if (dbObject[tableName][i][compareField] === compareValue) {
                    dbObject[tableName].splice(i, 1);
                }
            }
        }
        updateDataDiv();

        tempTable = sqlQuery("SELECT * FROM " + tableName);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function trimArrayElements(myArray) {
    for (let i = 0; i < myArray.length; i++) { //trim both side of each token
        myArray[i] = myArray[i].trim();
    }
    return myArray;
}

function processUpdate(strSQL) {
    try {

        //will parse something like - 
        //UPDATE table_name SET column1 = `value1`, column2 = `value2`, ... WHERE condition;

        //UPDATE table_name SET column1 = `value1`, column2 = `value2`, ... WHERE something >= `something`;  remove ticks from where clause just in case->done
        //it calls the paramaterized function and passes its return value back

        tempTable = [];
        //strSQL = addWhiteSpaceAroundOperators(strSQL);

        //get tableName
        let tempTokens1 = tokenizeStringBySpace(strSQL);
        tableName = getTokenAfter(tempTokens1, "UPDATE"); //got tableName!


        //get compareField and operator
        let lastString = getStringAfter(strSQL, "WHERE");

        let stopIndex = lastString.indexOf("`");
        firstTwoThirdsOfLastString = lastString.substring(0, stopIndex);

        firstTwoThirdsOfLastString = addWhiteSpaceFirstOperator(firstTwoThirdsOfLastString);

        //no get first tick and go from that space
        //lastString = addWhiteSpaceAroundOperators(lastString);
        let tempTokens3 = tokenizeStringBySpace(firstTwoThirdsOfLastString);

        let compareField = tempTokens3[0];
        let operator = tempTokens3[1];

        //get compare value


        compareValue = readBackTicks(lastString)[0];

        let middleString = getStringBetween(strSQL, "SET", "WHERE");
        middleString = middleString.trim();

        let updatePairs = splitByBackTicks(middleString);

        //remove the equal sign from first and every other token, at the end
        for (let i = 0; i < updatePairs.length; i = i + 2) {
            updatePairs[i] = updatePairs[i].slice(0, -1);
        }

        //remove a comma from beginning if present
        for (let i = 0; i < updatePairs.length; i = i + 2) {
            if (updatePairs[i][0] === ",") {
                updatePairs[i] = updatePairs[i].slice(1);
            }
        }

        for (let i = 0; i < updatePairs.length; i = i + 2) { //trim only odd 
            updatePairs[i] = updatePairs[i].trim();
        }

        let fieldNames = [];
        let values = [];

        console.log(updatePairs);
        for (let i = 0; i < updatePairs.length / 2; i++) {
            fieldNames[i] = updatePairs[i * 2];
            //values[i] = updatePairs[(i * 2) + 1];  //no longer this half of 'pairs' see below using backticks
        }

        values = readBackTicks(middleString);

        tempTable = _update(tableName, fieldNames, values, compareField, operator, compareValue);
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function _update(tableName, fieldNames = [], values = [], compareField, operator = "=", compareValue) {
    try {
        tempTable = [];
        metaData = dbObject[tableName + "_METADATA"][0];

        //get datatype of compareValue so it can be compared to stored value
        if (metaData[compareField] === "NUMBER") {
            compareValue = Number(compareValue);
        }

        if (fieldNames.length != values.length) {
            let tempTable = [];
            tempTable["TABLE_NAME"] = "FIELD VALUE MISMATCH";
            return tempTable;

        } else {
            if (operator === "=") {
                for (let i = 0; i < dbObject[tableName].length; i++) {
                    if (dbObject[tableName][i][compareField] === compareValue) {
                        for (let j = 0; j < fieldNames.length; j++) {
                            if (metaData[fieldNames[j]] === "NUMBER") {
                                dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                            } else {
                                dbObject[tableName][i][fieldNames[j]] = values[j];
                            }

                        }
                    }
                }
            } else if ((operator === "!=") || (operator === "<>")) {
                for (let i = 0; i < dbObject[tableName].length; i++) {
                    if (dbObject[tableName][i][compareField] != compareValue) {
                        for (let j = 0; j < fieldNames.length; j++) {
                            if (metaData[fieldNames[j]] === "NUMBER") {
                                dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                            } else {
                                dbObject[tableName][i][fieldNames[j]] = values[j];
                            }
                        }
                    }
                }
            } else if (operator === ">") {
                for (let i = 0; i < dbObject[tableName].length; i++) {
                    if (dbObject[tableName][i][compareField] > compareValue) {
                        for (let j = 0; j < fieldNames.length; j++) {
                            if (metaData[fieldNames[j]] === "NUMBER") {
                                dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                            } else {
                                dbObject[tableName][i][fieldNames[j]] = values[j];
                            }
                        }
                    }
                }
            } else if (operator === ">=") {
                for (let i = 0; i < dbObject[tableName].length; i++) {
                    if (dbObject[tableName][i][compareField] >= compareValue) {
                        for (let j = 0; j < fieldNames.length; j++) {
                            if (metaData[fieldNames[j]] === "NUMBER") {
                                dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                            } else {
                                dbObject[tableName][i][fieldNames[j]] = values[j];
                            }
                        }
                    }
                }
            } else if (operator === "<") {
                for (let i = 0; i < dbObject[tableName].length; i++) {
                    if (dbObject[tableName][i][compareField] < compareValue) {
                        for (let j = 0; j < fieldNames.length; j++) {
                            if (metaData[fieldNames[j]] === "NUMBER") {
                                dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                            } else {
                                dbObject[tableName][i][fieldNames[j]] = values[j];
                            }
                        }
                    }
                }
            } else if (operator === "<=") {
                for (let i = 0; i < dbObject[tableName].length; i++) {
                    if (dbObject[tableName][i][compareField] <= compareValue) {
                        for (let j = 0; j < fieldNames.length; j++) {
                            if (metaData[fieldNames[j]] === "NUMBER") {
                                dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                            } else {
                                dbObject[tableName][i][fieldNames[j]] = values[j];
                            }
                        }
                    }
                }
            }
            updateDataDiv();

            tempTable = sqlQuery("SELECT * FROM " + tableName);

            return tempTable;
        }
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processInsertInto(strSQL) {
    try {
        //will parse something like - INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
        //it calls the paramaterized function and passes its return value back

        tempTable = [];

        strSQL = strSQL.replace("(", " ( "); //only replaces first
        strSQL = strSQL.replace(")", " ) "); //only replaces first

        let tempTokens = tokenizeStringBySpace(strSQL);
        let tableName = getTokenAfter(tempTokens, "INTO"); //got tableName!

        let middleString = getStringBetween(strSQL, "(", ")");

        columns = splitByCommasAndCleanWhiteSpace(middleString); //got columns!


        lastString = getStringAfter(strSQL, "VALUES");
        lastString = lastString.replace("(", " "); //replace only first in string

        let position = lastString.lastIndexOf(')');
        lastString = lastString.substring(0, position) + " " + lastString.substring(position + 1); //replace only last )

        lastString = lastString.trim(); //trim edges

        values = readBackTicks(lastString);

        tempTable = _insertInto(tableName, columns, values);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function readBackTicks(myString) {
    let tickLocations = [];
    let myArray = [];
    let tempString = "";
    for (let i = 0; i < myString.length; i++) {
        if (myString[i] === "`") {
            tickLocations.push(i);
        }
    }
    for (let i = 0; i < tickLocations.length / 2; i++) {
        tempString = myString.substring(tickLocations[i * 2] + 1, tickLocations[(i * 2) + 1]);
        myArray.push(tempString);
    }
    return myArray;
}

function _insertInto(tableName, fieldNames = [], values = []) {
    try {
        if (fieldNames.length != values.length) {
            let tempTable = [];
            tempTable["TABLE_NAME"] = "FIELD VALUE MISMATCH";
            return tempTable;
        } else {
            tempTable = [];

            //get a copy of the metadata from the database
            let metaData = JSON.parse(JSON.stringify(dbObject[tableName + "_METADATA"][0]));
            let thisPrimaryKey = metaData["NEXT_PRIMARY_KEY"];
            //build row entry which is an object
            let tempObject = {};
            tempObject['PRIMARY_KEY'] = thisPrimaryKey; //
            for (let i = 0; i < fieldNames.length; i++) {
                //check to see what type of data type field is
                if (metaData[fieldNames[i]] === "NUMBER") {
                    tempObject[fieldNames[i]] = Number(values[i]);
                } else {
                    tempObject[fieldNames[i]] = values[i];
                }
            }
            //add the entry to the table
            dbObject[tableName].push(JSON.parse(JSON.stringify(tempObject)));
            //advance the primary key in the table's metadata
            dbObject[tableName + "_METADATA"][0]["NEXT_PRIMARY_KEY"] = thisPrimaryKey + 1;

            //update visually
            updateDataDiv();

            //return the table just modified
            tempTable = sqlQuery("SELECT * FROM " + tableName);
            //console.log(tempTable);

            return tempTable;
        }
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processInsertSelect(strSQL) {
    try {
        //will parse something like these:
        //
        //INSERT INTO copiedTable SELECT * FROM myTable;
        //INSERT INTO dogOwners SELECT * FROM petTable WHERE pets_pettype = "dog";
        //INSERT INTO someTable SELECT owners.firstname, pets.name FROM owners INNER JOIN pets ON owners.PRIMARY_KEY = pets.ownerID
        //
        //it calls the paramaterized function and passes its return value back

        let tempTable = [];

        let tokens = tokenizeStringBySpace(strSQL);
        let newTableName = getTokenAfter(tokens, "INTO");

        //remove the insert into tablename part and process select or inner join to get table
        strSQL = strSQL.replace("INSERT", "");
        strSQL = strSQL.replace("INTO", "");
        strSQL = strSQL.replace(newTableName, "");
        strSQL = strSQL.trim();

        //important step choose inner join vs ordinary select statement
        if (tokens.includes("INNER")) { //process inner join
            tempTable = processInnerJoin(strSQL);
        } else { //process ordinary select statement
            tempTable = processSelectStatement(strSQL);
        }

        //add primary keys to this table
        for (let i = 0; i < tempTable.length; i++) {
            tempTable[i]["PRIMARY_KEY"] = i + 1;
        }
        //add the table to the database
        dbObject[newTableName] = JSON.parse(JSON.stringify(tempTable));
        //get the metadata from the returned joined table
        let metaData = {};
        for (const key in tempTable) {
            if (Object.hasOwnProperty.call(tempTable, key)) {
                if (typeof(tempTable[key]) != "object") { //skip row object entries and next primary key
                    if (key != "NEXT_PRIMARY_KEY") {
                        metaData[key] = tempTable[key];
                    }
                }
            }
        }
        //revise metadata to match
        metaData["TABLE_NAME"] = newTableName;
        metaData["PRIMARY_KEY"] = "NUMBER";
        metaData["NEXT_PRIMARY_KEY"] = tempTable.length + 1;
        //create the metadata table
        dbObject[newTableName + "_METADATA"] = [];
        //add the metadata row entry to the table
        dbObject[newTableName + "_METADATA"][0] = JSON.parse(JSON.stringify(metaData));
        //update visually, add to text database
        updateDataDiv();

        tempTable = sqlQuery("SELECT * FROM " + newTableName);

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

function processInnerJoin(strSQL) {
    try {
        tempTable = [];
        let field1 = "";
        let field2 = "";

        // SELECT Orders.OrderID, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

        strSQL = addWhiteSpaceAroundOperators(strSQL);

        let middleString = getStringBetween(strSQL, "SELECT", "FROM");

        middleString = middleString.replaceAll(".", "_");
        let columns = splitByCommasAndCleanWhiteSpace(middleString); //got columns!

        //get table1 name   got tableNames!
        //get table2 name
        tokens = tokenizeStringBySpace(strSQL);
        tokens = removeCommaEntriesFromArray(tokens);
        let table1Name = getTokenAfter(tokens, "FROM");
        let table2Name = getTokenAfter(tokens, "JOIN");

        //get field1 name
        //console.log(tokens)
        let tokenLeft = getTokenAfter(tokens, "ON");
        let tokenRight = getTokenAfter(tokens, "=");

        let tokenLeftArray = tokenLeft.split(".");
        let tokenRightArray = tokenRight.split(".");

        if (tokenLeftArray[0] === table1Name) {
            field1 = tokenLeftArray[1];
            field2 = tokenRightArray[1];
        } else {
            field1 = tokenRightArray[1];
            field2 = tokenLeftArray[1];
        }
        //get field2 name
        //get columns       (done)

        //table1 = _selectAllFrom table1name

        let table1 = _selectAllFrom(table1Name);
        let table2 = _selectAllFrom(table2Name);
        //table2 = _selectAllFrom table2name

        tempTable = _innerJoin(table1, table2, field1, field2); //check that fields are appropriate type in innerJoin function *******

        if (columns[0] != "*") {
            tempTable = columnsFilter(tempTable, columns);
        }

        //-> not available in this inner join function use ON instead
        // if (strSQL.includes("WHERE")) { //check for where clause
        //     console.log(tokens);
        // }

        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

//SELECT column1, column2, ... FROM table_name WHERE column <>`something` ORDER BY column ASC|DESC;<br>\
function processSelectStatement(strSQL) {
    try {
        tempTable = [];
        //strSQL = addWhiteSpaceAroundOperators(strSQL); //NEED TO DO AWAY WITH ************
        strSQL = addWhiteSpaceFirstOperator(strSQL);
        // get an array of columns
        let columns = []
            //   get string between SELECT and FROM
            //   remove whitespace
            //   split by commas
            //   this is the columns array
        let middleString = getStringBetween(strSQL, "SELECT", "FROM");
        columns = splitByCommasAndCleanWhiteSpace(middleString); //Got columns!

        // get table name
        let tokens = tokenizeStringBySpace(strSQL);

        let tableName = getTokenAfter(tokens, "FROM"); //Got tableName!

        tempTable = _selectAllFrom(tableName);

        if (strSQL.includes("WHERE")) {
            whereIndex = tokens.indexOf("WHERE");
            let compareField = tokens[whereIndex + 1];
            let operator = tokens[whereIndex + 2];
            let compareValue = readBackTicks(strSQL)[0];
            tempTable = whereFilter(tempTable, compareField, operator, compareValue);
        }

        if (strSQL.includes("ORDER")) {
            let orderIndex = tokens.indexOf("ORDER");
            orderByField = tokens[orderIndex + 2]; //got order by field!
            console.log(orderByField);
            if (tokens.includes("DESC")) {
                direction = "DESC";
            } else {
                direction = "ASC";
            }
            tempTable = orderByFilter(tempTable, orderByField, direction);
        }

        if (columns[0] != "*") {
            tempTable = columnsFilter(tempTable, columns);
        }

        console.log(tempTable);
        return tempTable;
    } catch (error) {
        let thisError = ("ERROR:\n" + error.name + "\n" + error.message + "\n" + error.stack).toString();
        return thisError;
    }
}

//////  STRING FUNCTIONS FOR HELP IN PARSING SQL STATMENTS /////////
function removeEmptyEntriesFromArray(myArray) {
    for (let i = myArray.length - 1; i >= 0; i--) {
        if (myArray[i] === "") {
            myArray.splice(i, 1);
        }
    }
    return myArray;
}

function removeCommaEntriesFromArray(myArray) {
    for (let i = myArray.length - 1; i >= 0; i--) {
        if (myArray[i] === ",") {
            myArray.splice(i, 1);
        }
    }
    return myArray;
}

function removeEntriesFromArray(myArray, entry) {
    for (let i = myArray.length - 1; i >= 0; i--) {
        if (myArray[i] === entry) {
            myArray.splice(i, 1);
        }
    }
    return myArray;
}

function getStringBetween(completeString, startString, endString) {
    let middleString = completeString.substring(
        completeString.indexOf(startString) + startString.length,
        completeString.indexOf(endString)
    );
    return middleString;
}

function getStringAfter(completeString, thisString) {
    let endString = completeString.substring(completeString.lastIndexOf(thisString) + thisString.length);
    return endString;
}

function tokenizeStringBySpace(string) {
    let myArray = string.split(" ");
    myArray = removeEmptyEntriesFromArray(myArray);
    return myArray;
}

function cleanWhiteSpaceInArrayElements(myArray) {
    for (let i = 0; i < myArray.length; i++) {
        myArray[i] = myArray[i].trim()
    }
    return myArray;
}

function splitByCommasAndCleanWhiteSpace(string) {
    let myArray = string.split(",");
    myArray = cleanWhiteSpaceInArrayElements(myArray);
    return myArray;
}

function collapseParenthesis(myArray) {
    for (let i = 0; i < myArray.length; i++) {
        myArray[i] = myArray[i].replaceAll(" ( ", "(");
        myArray[i] = myArray[i].replaceAll(" ) ", ")");
    }
    return myArray;
}

function splitByBackTicks(string) {
    let myArray = string.split("`");
    //myArray = collapseParenthesis(myArray);
    myArray = cleanWhiteSpaceInArrayElements(myArray);
    myArray = removeCommaEntriesFromArray(myArray);
    myArray = removeEmptyEntriesFromArray(myArray);

    console.log("***********SPLIT BACKTICK************** WITH single comma reemove and empty remove")
    console.log(myArray);
    return myArray;
}

function onlySplitByBackTicks(thisString) {
    let myArray = thisString.split("`");
    return myArray;
}

//return array of sql statements split by ; outside of back-ticks
function splitSQLStatementsBySemicolon(sqlStatementsSeparatedBySemicolon) {

    let tempArray = [];
    tempArray = sqlStatementsSeparatedBySemicolon.split('`');
    //go through elements in array, and only replace ; in odd elements;
    for (let i = 0; i < tempArray.length; i++) {
        if ((i + 1) % 2 === 0) {
            tempArray[i] = tempArray[i].replaceAll(';', "NOLOCIMES");
        }
    }

    //rejoin back into string
    sqlStatementsSeparatedBySemicolon = tempArray.join('`');
    //split by ;
    tempArray = [];
    tempArray = sqlStatementsSeparatedBySemicolon.split(';');

    //go through each sql statement and replace the ; in between ticks
    for (let i = 0; i < tempArray.length; i++) {
        tempArray[i] = tempArray[i].replaceAll('NOLOCIMES', ';');
        tempArray[i] = tempArray[i].trim();
    }

    tempArray = removeEmptyEntriesFromArray(tempArray);
    return tempArray;
}

function splitBySingleQuote(string) {
    let myArray = string.split("'");
    myArray = cleanWhiteSpaceInArrayElements(myArray);
    console.log(myArray);
    return myArray;
}

function getTokenAfter(myArray, string) {
    let index = 0;
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] === string) {
            index = i
        }
    }
    lastindex = myArray.length - 1;
    if (index + 1 > lastindex) {
        return -1;
    } else {
        return myArray[index + 1];
    }
}

function addWhiteSpaceAroundOperators(myString) {
    // the order is very important
    // <>
    // !=
    // >=
    // >
    // <=
    // <
    // =

    if (myString.includes("<>") === true) {
        myString = myString.replaceAll("<>", " <> ");
    } else if (myString.includes("!=") === true) {
        myString = myString.replaceAll("!=", " != ");
    } else if (myString.includes(">=") === true) {
        myString = myString.replaceAll(">=", " >= ");
    } else if (myString.includes(">") === true) {
        myString = myString.replaceAll(">", " > ");
    } else if (myString.includes("<=") === true) {
        myString = myString.replaceAll("<=", " <= ");
    } else if (myString.includes("<") === true) {
        myString = myString.replaceAll("<", " < ");
    } else if (myString.includes("=") === true) {
        myString = myString.replaceAll("=", " = ");
    }

    return myString;
}

function addWhiteSpaceFirstOperator(myString) {
    // the order is very important
    // <>
    // !=
    // >=
    // >
    // <=
    // <
    // =

    if (myString.includes("<>") === true) {
        myString = myString.replace("<>", " <> ");
    } else if (myString.includes("!=") === true) {
        myString = myString.replace("!=", " != ");
    } else if (myString.includes(">=") === true) {
        myString = myString.replace(">=", " >= ");
    } else if (myString.includes(">") === true) {
        myString = myString.replace(">", " > ");
    } else if (myString.includes("<=") === true) {
        myString = myString.replace("<=", " <= ");
    } else if (myString.includes("<") === true) {
        myString = myString.replace("<", " < ");
    } else if (myString.includes("=") === true) {
        myString = myString.replace("=", " = ");
    }

    return myString;
}

let helpString = "<pre><br>\
Available datatypes are STRING or NUMBER.<br>\
<br>\
Available SQL statements:<br>\
-----------------------------<br>\
NAME DATABASE `myDatabaseName`;<br>\
CREATE TABLE table_name (column1 datatype, column2 datatype, column3 datatype...);<br>\
SHOW TABLES;<br>\
DESCRIBE table_name;<br>\
DROP TABLE table_name;<br>\
ALTER TABLE table_name ADD column_name datatype;<br>\
ALTER TABLE table_name DROP COLUMN column_name;<br>\
ALTER TABLE table_name CHANGE samename samename newdatatype;<br>\
ALTER TABLE table_name CHANGE oldname newname samedatatype:<br>\
ALTER TABLE table_name CHANGE oldname newname newdatatype;<br>\
INSERT INTO table_name (column1, column2, column3, ...) VALUES (`value1`, `value2`, `value3`, ...);<br>\
UPDATE table_name SET column1 = `value1`, column2 = `value2`, ... WHERE condition;<br>\
DELETE FROM table_name WHERE condition;<br>\
SELECT * FROM table_name;<br>\
SELECT column1, column2, ...FROM table_name;<br>\
SELECT column1, column2, ... FROM table_name WHERE condition;<br>\
SELECT column1, column2, ... FROM table_name ORDER BY column ASC|DESC;<br>\
SELECT column1, column2, ... FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;<br>\
INSERT INTO newtable [a SELECT statement];<br>\
HELP<br>\
<br>\
Reserved Keywords:<br>\
-----------------------------<br>\
INNER, JOIN, SELECT, INSERT, INTO, UPDATE, DELETE, CREATE, DROP, TABLE, SHOW, TABLES, DESCRIBE, HELP, SET,<br>\
WHERE, VALUES, ON, PRIMARY_KEY, NEXT_PRIMARY_KEY, _METADATA, STRING, NUMBER,<br>\
=, !=, <>, >=, <=, >, <, * `(back ticks), NOLOCIMES, ERROR<br>\
<br>\
Notes:<br>\
-----------------------------<br>\
 Datatypes are STRING and NUMBER.<br>\
 ; not needed.<br>\
 use `backticks` around all values whether STRING OR NUMBER<br>\
 CAPITALIZATION of keywords is required.<br>\
 All tables are autoincremented starting at 1.<br>\
 Column name of primary key is PRIMARY_KEY.<br>\
 INNER JOIN will give back combined column names, but can be renamed<br>\
<br>\
Examples/Tutorial:<br>\
-----------------------------<br>\
NAME DATABASE `myPetInfo`;<br>\
CREATE TABLE owners (firstname STRING, lastname STRING, email STRING, age NUMBER);<br>\
INSERT INTO owners (firstname, lastname, email) VALUES (`John`, `Jones`, `john@gmail.com`);<br>\
INSERT INTO owners (firstname, lastname, email, age) VALUES (`David`, `Davis`, `ddavis@gmail.com`,`73`);<br>\
INSERT INTO owners (firstname, lastname, email) VALUES (`Justin`, `Thyme`, `justint@gmail.com`);<br>\
CREATE TABLE pets (name STRING, sex STRING, pettype STRING, ownerID NUMBER);<br>\
SHOW TABLES;<br>\
SELECT * FROM owners;<br>\
SELECT * FROM pets;<br>\
INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`fido`, `female`, `dog`, `3`);<br>\
INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`cuddles`, `female`, `cat`, `3`);<br>\
INSERT INTO pets (name, pettype, ownerID) VALUES (`gina`, `guinea pig`, `3`);<br>\
INSERT INTO pets (name, pettype, ownerID) VALUES (`jeany`, `guinea pig`, `3`);<br>\
INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`sherman`, `male`, `dog`, `2`);<br>\
INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`freddie`, `male`, `dog`, `1`);<br>\
UPDATE pets SET sex = `male`, name = `gene` WHERE name =`gina`;<br>\
SELECT * FROM pets;<br>\
UPDATE pets SET sex = `male`, ownerID = `5` WHERE pettype = `guinea pig`;<br>\
ALTER TABLE pets ADD weight NUMBER;<br>\
UPDATE pets SET weight = `70` WHERE name = `sherman`;<br>\
DESCRIBE pets;<br>\
SELECT owners.PRIMARY_KEY, pets.ownerID, owners.firstname, pets.name FROM owners INNER JOIN pets ON owners.PRIMARY_KEY = pets.ownerID;<br>\
INSERT INTO petDirectory SELECT pets.ownerID, owners.firstname, pets.name FROM owners INNER JOIN pets ON owners.PRIMARY_KEY = pets.ownerID;<br>\
DESCRIBE petDirectory;<br>\
SELECT * FROM petDirectory;<br>\
ALTER TABLE petDirectory CHANGE pets_ownerID ownerID STRING;<br>\
ALTER TABLE petDirectory CHANGE pets_name name STRING;<br>\
ALTER TABLE petDirectory CHANGE owners_firstname owner STRING;<br>\
SHOW TABLES;<br>\
INSERT INTO directory SELECT * FROM petDirectory;<br>\
SHOW TABLES;<br>\
DROP TABLE petDirectory;<br>\
SHOW TABLES;<br>\
ALTER TABLE owners ADD telephone STRING;<br>\
UPDATE owners SET telephone = `3042321000` WHERE PRIMARY_KEY = `2`;<br>\
DESCRIBE owners;<br>\
ALTER TABLE owners CHANGE telephone telephone NUMBER;<br>\
DESCRIBE owners;<br>\
SELECT * FROM owners;<br>\
INSERT INTO dogsOnly SELECT * FROM pets WHERE pettype = `dog` ORDER BY ownerID DESC;<br>\
SELECT * FROM dogsOnly;<br>\
ALTER TABLE dogsOnly DROP COLUMN pettype;<br>\
INSERT INTO dogNames SELECT name FROM dogsOnly;<br>\
SHOW TABLES;<br>\
DELETE FROM pets WHERE sex = `male`;<br>\
SHOW TABLES;<br>\
</pre>";

//if initial database name is same as above and length is 2
function isBrandNewDatabase() {
    readInDatabaseFromDiv();
    return (Object.keys(dbObject).length === 2) && (dbObject["DBNAME"][0]["NAME"] === initialDatabaseName);
}

//////////THIS CAN BE COMMENTED OUT BELOW BUT IS HERE FOR DEMONSTRATION
if (isBrandNewDatabase()) {
    alert("New Database!");
    alert("Right now, sample data is being loading for demonstration purposes.  Just comment out the end of the Javascript file to disable this.");
    sqlQuery("NAME DATABASE `myPetsDatabase`;");
    sqlQuery("CREATE TABLE owners (firstname STRING, lastname STRING, email STRING, age NUMBER);");
    sqlQuery("INSERT INTO owners (firstname, lastname, email) VALUES (`John`, `Jones`, `john@gmail.com`);");
    sqlQuery("INSERT INTO owners (firstname, lastname, email, age) VALUES (`David`, `Davis`, `ddavis@gmail.com`,`73`);");
    sqlQuery("INSERT INTO owners (firstname, lastname, email) VALUES (`Justin`, `Thyme`, `justint@gmail.com`);");
    sqlQuery("CREATE TABLE pets (name STRING, sex STRING, pettype STRING, ownerID NUMBER);");
    sqlQuery("SHOW TABLES;");
    sqlQuery("SELECT * FROM owners;");
    sqlQuery("SELECT * FROM pets;");
    sqlQuery("INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`fido`, `female`, `dog`, `3`);");
    sqlQuery("INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`cuddles`, `female`, `cat`, `3`);");
    sqlQuery("INSERT INTO pets (name, pettype, ownerID) VALUES (`gina`, `guinea pig`, `3`);");
    sqlQuery("INSERT INTO pets (name, pettype, ownerID) VALUES (`jeany`, `guinea pig`, `3`);");
    sqlQuery("INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`sherman`, `male`, `dog`, `2`);");
    sqlQuery("INSERT INTO pets (name, sex, pettype, ownerID) VALUES (`freddie`, `male`, `dog`, `1`);");

    let combinedSQLStatement = 'UPDATE pets SET sex = `male`, name = `gene` WHERE name =`gina`;\
SELECT * FROM pets;\
UPDATE pets SET sex = `male`, ownerID = `5` WHERE pettype = `guinea pig`;\
ALTER TABLE pets ADD weight NUMBER;\
UPDATE pets SET weight = `70` WHERE name = `sherman`;\
DESCRIBE pets;\
SELECT owners.PRIMARY_KEY, pets.ownerID, owners.firstname, pets.name FROM owners INNER JOIN pets ON owners.PRIMARY_KEY = pets.ownerID;\
INSERT INTO petDirectory SELECT pets.ownerID, owners.firstname, pets.name FROM owners INNER JOIN pets ON owners.PRIMARY_KEY = pets.ownerID;\
DESCRIBE petDirectory;\
SELECT * FROM petDirectory;\
ALTER TABLE petDirectory CHANGE pets_ownerID ownerID STRING;\
ALTER TABLE petDirectory CHANGE pets_name name STRING;\
ALTER TABLE petDirectory CHANGE owners_firstname owner STRING;\
SHOW TABLES;\
INSERT INTO directory SELECT * FROM petDirectory;\
SHOW TABLES;\
DROP TABLE petDirectory;\
SHOW TABLES;\
ALTER TABLE owners ADD telephone STRING;\
UPDATE owners SET telephone = `3042321000` WHERE PRIMARY_KEY = `2`;\
DESCRIBE owners;\
ALTER TABLE owners CHANGE telephone telephone NUMBER;\
DESCRIBE owners;\
SELECT * FROM owners;\
INSERT INTO dogsOnly SELECT * FROM pets WHERE pettype = `dog` ORDER BY ownerID DESC;\
SELECT * FROM dogsOnly;\
ALTER TABLE dogsOnly DROP COLUMN pettype;\
INSERT INTO dogNames SELECT name FROM dogsOnly;\
SHOW TABLES;'
    sqlQuery(combinedSQLStatement);
}