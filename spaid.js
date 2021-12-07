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
// =
// <>
// !=
// >
// >=
// <
// <=

let dbObject = {};


if (document.getElementById('spaid-data') == null) {
    //alert('no spaid-data div found, creating it!');

    spaidDataDiv = document.createElement('div');
    spaidDataDiv.setAttribute('id', 'spaid-data');

    spaidButtonsDiv = document.createElement('div');
    spaidButtonsDiv.setAttribute('id', 'spaid-buttons');

    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'spaid-save');
    saveButton.innerHTML = 'save page with data';

    loadDBButton = document.createElement('button');
    loadDBButton.setAttribute('id', 'spaid-load-db');
    loadDBButton.innerHTML = 'load database';;

    saveDBButton = document.createElement('button');
    saveDBButton.setAttribute('id', 'spaid-save-db');
    saveDBButton.innerHTML = 'save database';

    showButton = document.createElement('button');
    showButton.setAttribute('id', 'spaid-show');
    showButton.innerHTML = 'show/hide';

    document.body.prepend(spaidDataDiv);
    spaidButtonsDiv.appendChild(saveButton);
    spaidButtonsDiv.appendChild(loadDBButton)
    spaidButtonsDiv.appendChild(saveDBButton);
    spaidButtonsDiv.appendChild(showButton);
    document.body.prepend(spaidButtonsDiv);

} else {

    spaidDataDiv = document.getElementById('spaid-data');
    saveButton = document.getElementById('spaid-save');
    showButton = document.getElementById('spaid-show');
    loadDBButton = document.getElementById('spaid-load-db');
    saveDBButton = document.getElementById('spaid-save-db');
}

saveButton.addEventListener('click', savePage);
loadDBButton.addEventListener('click', loadDatabase);
saveDBButton.addEventListener('click', saveDatabase);
showButton.addEventListener("click", toggleDataVisible);

//SPAID functions
function savePage() {
    let thisDocument = new XMLSerializer().serializeToString(document.documentElement);
    saveStringToTextFile(thisDocument, "spaid", ".html");
}

function saveDatabase() {
    saveStringToTextFile(spaidDataDiv.innerHTML, "database", ".json");
}

function saveStringToTextFile(str1, fileName = "spaid", fileType = ".html") {
    let saveFileName = fileName;
    let datetime = new Date();
    saveFileName = saveFileName.concat("_", (datetime.getMonth() + 1).toString(), "_", (datetime.getDate()).toString(), "_",
        datetime.getFullYear().toString(), "_", datetime.getHours().toString(), datetime.getMinutes().toString(),
        datetime.getMinutes().toString(), datetime.getSeconds().toString(), fileType);
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
        filenameOfLoadedDB = inputFile.name;
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

function readInDatabaseFromDiv() {
    jsonData = spaidDataDiv.innerHTML;
    console.log(jsonData);
    dbObject = JSON.parse(jsonData);
}

function createTable(tableName, fieldNames = [], dataTypes = []) {
    if (fieldNames.length != dataTypes.length) {
        console.log("fieldNames dataTypes mismatch length")
    } else {
        dbObject[tableName] = [];
        dbObject[tableName]["primaryKey"] = 1
        for (let i = 0; i < fieldNames.length; i++) {
            dbObject[tableName][fieldNames[i]] = dataTypes[i];
        }
    }
    dbObject[tableName]["TABLE_NAME"] = tableName;
    updateDataDiv();
    return dbObject[tableName];
}

function dropTable(tableName) {
    delete dbObject[tableName];
    updateDataDiv();
    return dbObject[tableName];
}

function insertInto(tableName, fieldNames = [], values = []) {
    if (fieldNames.length != values.length) {
        alert('field/value mismatch!');
    } else {
        let primaryKey = dbObject[tableName]["primaryKey"];
        let tempObject = {};
        tempObject['primaryKey'] = primaryKey;
        for (let i = 0; i < fieldNames.length; i++) {
            //check to see what type of data type field is
            //console.log(dbObject[tableName][fieldNames[i]]);
            if (dbObject[tableName][fieldNames[i]] === "number") {
                tempObject[fieldNames[i]] = Number(values[i]);
            } else {
                tempObject[fieldNames[i]] = values[i];
            }
        }
        dbObject[tableName].push(JSON.parse(JSON.stringify(tempObject)));
        dbObject[tableName]["primaryKey"] = dbObject[tableName]["primaryKey"] + 1;
        //console.log(tempObject);
    }
    updateDataDiv();
    //console.log(dbObject[tableName]);
    return dbObject[tableName];
}

function selectAllFrom(tableName) {
    let tempTable = [];
    //console.log(dbObject[tableName]);
    //console.log(dbObject[tableName].length);

    for (let i = 0; i < dbObject[tableName].length; i++) {
        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
    }
    tempTable['TABLE_NAME'] = tableName;
    console.log(tempTable);
    return tempTable;
}

function columnsFilter(arrayOfObjectsTable, columns = []) {
    let thisTable = arrayOfObjectsTable;
    let tempTable = [];
    let tempRow = {};
    //loop through thisTable
    for (let i = 0; i < thisTable.length; i++) {
        //loop through each column
        tempRow = {};
        for (let j = 0; j < columns.length; j++) {
            //if thisTable has column as key
            if (thisTable[i].hasOwnProperty(columns[j])) {
                tempRow[columns[j]] = thisTable[i][columns[j]];
                //add the key/value pair to the temprow
            }
        }
        //push the temprow onto the temp table
        tempTable.push(JSON.parse(JSON.stringify(tempRow)))
    }
    //return the new table
    tempTable["TABLE_NAME"] = thisTable.TABLE_NAME;
    console.log(tempTable);
    return tempTable;
}

function orderByFilter(arrayOfObjectsTable, field, direction = "ASC") {
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
    //console.log(JSON.stringify(arrayOfObjectsTable));
    arrayOfObjectsTable.sort(compare);
    //console.log(JSON.stringify(arrayOfObjectsTable));
    if (direction === "DESC") {
        arrayOfObjectsTable.reverse();
    }
    console.log(arrayOfObjectsTable);
    return arrayOfObjectsTable;
}

function innerJoin(arrayOfObjectsTable1, arrayOfObjectsTable2, table1Field, table2Field) {
    tempTable1 = [];
    tempTable2 = [];
    joinedTable = [];
    table1 = arrayOfObjectsTable1;
    table2 = arrayOfObjectsTable2;

    //rewrite field names in each table to   table1_field and table2_field, etc
    for (let i = 0; i < table1.length; i++) {
        rowObject = JSON.parse(JSON.stringify(table1[i]));
        for (const key in rowObject) {
            newFieldName = `${table1.TABLE_NAME}_${key}`;
            //console.log(newFieldName);
            rowObject[newFieldName] = rowObject[key];
            delete rowObject[key];
        }
        tempTable1.push(rowObject);
    }

    for (let i = 0; i < table2.length; i++) {
        rowObject = JSON.parse(JSON.stringify(table2[i]));
        for (const key in rowObject) {
            newFieldName = `${table2.TABLE_NAME}_${key}`;
            //console.log(newFieldName);
            rowObject[newFieldName] = rowObject[key];
            delete rowObject[key];
        }
        tempTable2.push(rowObject);
    }

    console.log(tempTable1);
    console.log(tempTable2);


    //rewrite table1Field to table1_table1Field
    //rewrite table2Field to table2_table2Field

    table1Field = table1.TABLE_NAME + "_" + table1Field;
    table2Field = table2.TABLE_NAME + "_" + table2Field;

    console.log(table1Field);
    console.log(table2Field);


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

    joinedTable["TABLE_NAME"] = table1.TABLE_NAME + "INNERJOIN" + table2.TABLE_NAME;
    console.log(joinedTable);
    return joinedTable;
}

function whereFilter(arrayOfObjectsTable, compareField, operator = '=', compareValue) {

    //check here to see if compareValue needs to be checked for number

    if ((compareField === "primaryKey") || (arrayOfObjectsTable[compareField] === "number")) {
        compareValue = Number(compareValue);
    }

    let thisTable = arrayOfObjectsTable;
    let tempTable = [];
    if (operator === '=') {
        for (let i = 0; i < thisTable.length; i++) {
            rowObject = thisTable[i];
            if (rowObject.hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] === compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if ((operator === "!=") || (operator === "<>")) {
        for (let i = 0; i < thisTable.length; i++) {
            rowObject = thisTable[i];
            if (rowObject.hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] != compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '>') {
        for (let i = 0; i < thisTable.length; i++) {
            rowObject = thisTable[i];
            if (rowObject.hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] > compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '>=') {
        for (let i = 0; i < thisTable.length; i++) {
            rowObject = thisTable[i];
            if (rowObject.hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] >= compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '<') {
        for (let i = 0; i < thisTable.length; i++) {
            rowObject = thisTable[i];
            if (rowObject.hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] < compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    } else if (operator === '<=') {
        for (let i = 0; i < thisTable.length; i++) {
            rowObject = thisTable[i];
            if (rowObject.hasOwnProperty(compareField)) {
                if (thisTable[i][compareField] <= compareValue) {
                    tempTable.push(JSON.parse(JSON.stringify(thisTable[i])));
                }
            }
        }
    }
    console.log(tempTable);
    tempTable["TABLE_NAME"] = tempTable.TABLE_NAME
    return tempTable;
}


function deleteFromTable(tableName, compareField, operator = "=", compareValue) {

    if ((compareField === "primaryKey") || (dbObject[tableName][compareField] === "number")) {
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
    return dbObject[tableName];
}

function update(tableName, fieldNames = [], values = [], compareField, operator = "=", compareValue) {
    if (fieldNames.length != values.length) {
        alert('field/value mismatch!');
    } else {
        if (operator === "=") {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] === compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        if (dbObject[tableName][fieldNames[j]] === "number") {
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
                        if (dbObject[tableName][fieldNames[j]] === "number") {
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
                        if (dbObject[tableName][fieldNames[j]] === "number") {
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
                        if (dbObject[tableName][fieldNames[j]] === "number") {
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
                        if (dbObject[tableName][fieldNames[j]] === "number") {
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
                        if (dbObject[tableName][fieldNames[j]] === "number") {
                            dbObject[tableName][i][fieldNames[j]] = Number(values[j]);
                        } else {
                            dbObject[tableName][i][fieldNames[j]] = values[j];
                        }
                    }
                }
            }
        }
        updateDataDiv();
        return dbObject[tableName];
    }
}

function showTables() {
    //just formatting horizontal bars
    let maxLength = 0;
    for (let tableName in dbObject) {
        maxLength = Math.max(maxLength, tableName.length);
    }
    //
    console.log("");
    console.log("-".repeat(maxLength));
    console.log('dbObject');
    console.log("-".repeat(maxLength));
    for (let tableName in dbObject) {
        console.log(tableName);
    }
}

function describe(thisTableName) {
    let keys = Object.keys(dbObject[thisTableName]);
    console.log(dbObject[thisTableName]["TABLE_NAME"]);
    console.log("-".repeat(32));
    for (let i = 0; i < keys.length; i++) {
        if ((keys[i] != "primaryKey") && (keys[i] != "TABLE_NAME") && (isNaN(keys[i]))) {
            if (dbObject[thisTableName].hasOwnProperty(keys[i])) {
                console.log(keys[i], dbObject[thisTableName][keys[i]]);
            }

        }
    }
}

function updateDataDiv() {
    spaidDataDiv.innerHTML = JSON.stringify(dbObject);
}

function sqlQuery(strSQL) {
    //NOTE ORDER IS IMPORTANT

    strSQL = strSQL.replaceAll("'", " ");
    strSQL = strSQL.replaceAll("\"", " ");
    strSQL = strSQL.replaceAll(";", " ")

    let thisTable = [];

    if (strSQL.includes("INNER")) {
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

    } else if (strSQL.includes("DROP")) {
        console.log("process DROP TABLE statement");
        thisTable = processDropTable(strSQL);

    } else {
        console.log('sql statement not understood');
    }
    console.log("from sqlQuery");
    console.log(thisTable);
    return thisTable;

}

function processDropTable(strSQL) {
    // DROP TABLE table_name;
    // function dropTable(tableName) {
    //     delete dbObject[tableName];
    let tempTable = [];
    strSQL = strSQL.replaceAll(";", " ");
    let tokens = tokenizeStringBySpace(strSQL);
    tableName = getTokenAfter(tokens, "TABLE");
    tempTable = dropTable(tableName);
    return tempTable;
}

function processCreateTable(strSQL) {
    let tempTable = [];

    // CREATE TABLE table_name (column1 datatype, column2 datatype, column3 datatype, .... );
    //function createTable(tableName, fieldNames = [], dataTypes = []) 

    let fieldNames = [];
    let dataTypes = [];

    console.log(strSQL);
    strSQL = strSQL.replaceAll(";", " ");
    let tokens = tokenizeStringBySpace(strSQL);

    let tableName = getTokenAfter(tokens, "TABLE");

    endString = getStringAfter(strSQL, tableName);

    endString = endString.replace("(", " ");
    endString = endString.replace(")", " ");

    tokenPairs = splitByCommas(endString);

    let tempArray = []
    for (let i = 0; i < tokenPairs.length; i++) {
        tempArray = tokenizeStringBySpace(tokenPairs[i]);
        fieldNames[i] = tempArray[0];
        dataTypes[i] = tempArray[1];
    }

    tempTable = createTable(tableName, fieldNames, dataTypes);
    return tempTable;

}

function processDelete(strSQL) {
    // DELETE FROM
    // DELETE FROM table_name WHERE condition;
    // DELETE FROM table_name WHERE name = freddie;

    let tempTable = [];

    strSQL = strSQL.replaceAll(";", " ")
    strSQL = addWhiteSpaceAroundOperators(strSQL);

    let tokens = tokenizeStringBySpace(strSQL);
    tableName = getTokenAfter(tokens, "FROM");

    endString = getStringAfter(strSQL, "WHERE");
    myArray = tokenizeStringBySpace(endString);
    compareField = myArray[0];
    operator = myArray[1];
    compareValue = myArray[2];

    if ((dbObject[tableName][compareField] === "number") || (compareField === "primaryKey")) {
        compareValue = Number(compareValue);
    }

    tempTable = deleteFromTable(tableName, compareField, operator, compareValue);
    return tempTable;
}

function processUpdate(strSQL) {
    //function update(tableName, fieldNames = [], values = [], compareField, operator = "=", compareValue)
    // UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;

    tempTable = [];
    strSQL = strSQL.replaceAll(";", " ")
    strSQL = addWhiteSpaceAroundOperators(strSQL);

    //get tableName
    let tempTokens1 = tokenizeStringBySpace(strSQL);
    tableName = getTokenAfter(tempTokens1, "UPDATE");

    let lastString = getStringAfter(strSQL, "WHERE");
    let tempTokens3 = tokenizeStringBySpace(lastString);
    let compareField = tempTokens3[0];
    let operator = tempTokens3[1];
    let compareValue = tempTokens3[2];

    let middleString = getStringBetween(strSQL, "SET", "WHERE");
    let updatePairs = splitByCommas(middleString);
    let fieldNames = [];
    let values = [];
    let tempArray = [];
    for (let i = 0; i < updatePairs.length; i++) {
        tempArray = tokenizeStringBySpace(updatePairs[i]);
        fieldNames[i] = tempArray[0];
        values[i] = tempArray[2];
    }

    for (let i = 0; i < values.length; i++) {
        if (dbObject[tableName][fieldNames[i]] === "number") {
            values[i] = Number(values[i]);
        }
    }

    if (compareField === "primaryKey") {
        compareValue = Number(compareValue);
    } else if (dbObject[tableName][compareField] === "number") {
        compareValue = Number(compareValue);
    }
    //get fieldNames
    //get values
    //get compareField
    //get operator
    //get compareValue

    tempTable = update(tableName, fieldNames, values, compareField, operator, compareValue);
    return tempTable;
}

function processInsertInto(strSQL) {
    // INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);

    tempTable = [];
    //need
    //tableName
    //columns
    //values
    console.log(strSQL);
    strSQL = strSQL.replaceAll(";", " ")
    console.log(strSQL);

    let tempTokens = tokenizeStringBySpace(strSQL);
    let tableName = getTokenAfter(tempTokens, "INTO"); //got tableName!
    let middleString = getStringBetween(strSQL, tableName, "VALUES");
    middleString = middleString.replace("(", " ");
    middleString = middleString.replace(")", " ");
    columns = splitByCommas(middleString); //got columns!

    lastString = getStringAfter(strSQL, "VALUES");
    lastString = lastString.replace("(", " ");
    lastString = lastString.replace(")", " ");
    values = splitByCommas(lastString);

    for (let i = 0; i < values.length; i++) {
        if (dbObject[tableName][columns[i]] === "number") {
            values[i] = Number(values[i]);
        }
    }

    tempTable = insertInto(tableName, columns, values);

    return tempTable;
}

function processInnerJoin(strSQL) {
    strSQL = strSQL.replaceAll(";", " ")
    tempTable = []
    let field1 = "";
    let field2 = "";

    // SELECT Orders.OrderID, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

    strSQL = addWhiteSpaceAroundOperators(strSQL);

    let middleString = getStringBetween(strSQL, "SELECT", "FROM");

    middleString = middleString.replaceAll(".", "_");
    let columns = splitByCommas(middleString); //got columns!

    //get table1 name   got tableNames!
    //get table2 name
    tokens = tokenizeStringBySpace(strSQL);
    tokens = removeCommaEntriesFromArray(tokens);
    let table1Name = getTokenAfter(tokens, "FROM");
    let table2Name = getTokenAfter(tokens, "JOIN");

    //get field1 name
    console.log(tokens)
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

    //table1 = selectallfrom table1name

    let table1 = selectAllFrom(table1Name);
    let table2 = selectAllFrom(table2Name);
    //table2 = selectallfrom table2name

    tempTable = innerJoin(table1, table2, field1, field2); //check that fields are appropriate type in innerJoin function *******

    if (columns[0] != "*") {
        tempTable = columnsFilter(tempTable, columns);
    }
    console.log(tempTable);
    return tempTable;

}

function processSelectStatement(strSQL) {
    strSQL = strSQL.replaceAll(";", " ")

    tempTable = [];
    strSQL = addWhiteSpaceAroundOperators(strSQL);
    // get an array of columns
    let columns = []
        //   get string between SELECT and FROM
    let middleString = getStringBetween(strSQL, "SELECT", "FROM");
    columns = splitByCommas(middleString); //Got columns!
    //   remove whitespace
    //   split by commas
    //   this is the columns array


    // get table name
    let tokens = tokenizeStringBySpace(strSQL);

    let tableName = getTokenAfter(tokens, "FROM"); //Got tableName!
    //   split by spaces and get the next toke after FROM
    //   remove whitespace

    tempTable = selectAllFrom(tableName);

    if (columns[0] != "*") {
        tempTable = columnsFilter(tempTable, columns);
    }

    if (strSQL.includes("WHERE")) {
        //console.log("there is a WHERE CONDITION");
        whereIndex = tokens.indexOf("WHERE");
        let compareField = tokens[whereIndex + 1];
        let operator = tokens[whereIndex + 2];
        let compareValue = tokens[whereIndex + 3];
        // see if there is a where condition
        //   lowercase and check for where, if so
        //   replace '=' with  ' = ', '!=' with ' != ' and so forth
        //   split by spaces
        //   remove spaces 

        //console.log(tempTable[compareField]);

        if ((dbObject[tableName][compareField] === "number") || (compareField.includes("primaryKey"))) { //check if primary key also
            tempTable = whereFilter(tempTable, compareField, operator, Number(compareValue));
        } else {
            tempTable = whereFilter(tempTable, compareField, operator, compareValue);
        }


    }

    if (strSQL.includes("ORDER")) {
        console.log("there is a ORDER BY");
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
    // see if ther is an order by condition
    //   get string after order 
    //   split string by spaces
    //   remove extra spaces
    //   get field
    //   look for ASC or DESC
    //       //   look for ASC or DESC
    console.log(tempTable);
    return tempTable;
}

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

function getStringBetween(completeString, startString, endString) {
    let middleString = completeString.substring(
        completeString.lastIndexOf(startString) + startString.length,
        completeString.lastIndexOf(endString)
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

function splitByCommas(string) {
    let myArray = string.split(",");
    myArray = cleanWhiteSpaceInArrayElements(myArray);
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
    if (myString.includes("<>")) {
        myString = myString.replaceAll("<>", " <> ");
    } else if (myString.includes("!=")) {
        myString = myString.replaceAll("!=", " != ");
    } else if (myString.includes(">=")) {
        myString = myString.replaceAll(">=", " >= ");
    } else if (myString.includes(">=")) {
        myString = myString.replaceAll(">", " > ");
    } else if (myString.includes("<=")) {
        myString = myString.replaceAll("<=", " <= ");
    } else if (myString.includes("<")) {
        myString = myString.replaceAll("<", " < ");
    } else if (myString.includes("=")) {
        myString = myString.replaceAll("=", " = ");
    }
    return myString;
}


// SELECT ----------------(DONE)----------------------
// SELECT column1, column2, column3 FROM table_name WHERE condition ORDER BY column1 DESC;

// INNER JOIN ----------(DONE) ----------------------------
// SELECT column_name(s) FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;
// SELECT Orders.OrderID, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

// INSERT INTO --------------(DONE)---------------------------
// INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);

// UPDATE -----------------(DONE)------------------------
// UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;

// DELETE FROM -------------(DONE)---------------------------
// DELETE FROM table_name WHERE condition;

// CREATE TABLE ---------------(DONE)-----------------
// CREATE TABLE table_name (column1 datatype, column2 datatype, column3 datatype, .... );

// DROP TABLE
// DROP TABLE table_name;

/////// not part of spaid programming  ////

sqlQuery("CREATE TABLE users (firstName string, lastName string, age number);");
sqlQuery("INSERT INTO users (firstName,lastName, age) VALUES (booboo, jones, 77) ;")
sqlQuery("INSERT INTO users (firstName,lastName, age) VALUES (sherman, tank, 88) ;")

/////// not part of spaid programming  //// these are for web page functions
changeButton = document.getElementById('change-name');
changeButton.addEventListener('click', writeOutUser);
const user1TextArea = document.getElementById('user1');
readInDatabaseFromDiv();
console.log(dbObject);
readInUser1();
////// just testing functions
function readInUser1() {
    user1TextArea.innerHTML = dbObject["users"][0].firstName;
}

function writeOutUser() {
    dbObject["users"][0].firstName = user1TextArea.value;
    spaidDataDiv.innerHTML = JSON.stringify(dbObject);
}

//create another table
createTable("anotherTable", ["name", "age", "date"], ["string", "number", "string"]);

//add stuff to it
insertInto("anotherTable", ["name", "age", "date"], ["Adam", 4000, "today"]);
insertInto("anotherTable", ["name", "age", "date"], ["Paisley", 20, "yesteryear"]);


createTable("customers", ["name", "customerID"], ["string", "number"]);
for (let i = 0; i < 5; i++) {
    insertInto("customers", ["name", "customerID"], ["name" + i.toString(), i + 3]);
}
createTable("orders", ["orderID", "productName", "purchaserID"], ["number", "string", "number"]);
for (let i = 0; i < 7; i++) {
    insertInto("orders", ["orderID", "productName", "purchaserID"], [(i + 5), "productName" + (i + 3).toString(), i + 4]);
}




sqlQuery("CREATE TABLE newTable (name string, age number)");

sqlQuery("INSERT INTO newTable (name,age)VALUES(buster,5)");

sqlQuery("INSERT INTO newTable (name,age)VALUES(brown,7)");

describe("newTable");