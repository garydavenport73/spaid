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

dbObject = {};

if (document.getElementById('spaid-data') == null) {
    //alert('no spaid-data div found, creating it!');

    spaidDataDiv = document.createElement('div');
    spaidDataDiv.setAttribute('id', 'spaid-data');
    spaidDataDiv.innerHTML = '{ "table1": [{ "userID": 1, "firstName": "John", "lastName": "Doe" }, { "userID": 2, "firstName": "Anna", "lastName": "Smith" }, { "userID": 3, "firstName": "Oliver", "lastName": "Jones"} ], "table2Ages": [{ "userID": 1, "Age": 40 }, { "userID": 2, "Age": 40 }, { "userID": 3, "Age": 40 } ] }';

    spaidButtonsDiv = document.createElement('div');
    spaidButtonsDiv.setAttribute('id', 'spaid-buttons');

    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'spaid-save');
    saveButton.innerHTML = 'save';

    saveDBButton = document.createElement('button');
    saveDBButton.setAttribute('id', 'spaid-save-db');
    saveDBButton.innerHTML = 'save database';

    showButton = document.createElement('button');
    showButton.setAttribute('id', 'spaid-show');
    showButton.innerHTML = 'show/hide'

    document.body.prepend(spaidDataDiv);
    spaidButtonsDiv.appendChild(saveButton);
    spaidButtonsDiv.appendChild(saveDBButton);
    spaidButtonsDiv.appendChild(showButton);
    document.body.prepend(spaidButtonsDiv);

    saveButton.addEventListener('click', savePage);

} else {

    spaidDataDiv = document.getElementById('spaid-data');
    saveButton = document.getElementById('spaid-save');
    showButton = document.getElementById('spaid-show');
    saveDBButton = document.getElementById('spaid-save-db');
}

saveButton.addEventListener('click', savePage);
saveDBButton.addEventListener('click', saveDatabase);
showButton.addEventListener("click", toggleDataVisible);

/////// not part of spaid programming  //// these are for web page functions
changeButton = document.getElementById('change-name');
changeButton.addEventListener('click', writeOutUser);
const user1TextArea = document.getElementById('user1');
readInDatabaseFromDiv();
console.log(dbObject);
readInUser1();

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

function toggleDataVisible() {
    if (spaidDataDiv.style.display == 'none') {
        spaidDataDiv.style.display = 'unset';
    } else {
        spaidDataDiv.style.display = 'none';
    }
}

function readInDatabaseFromDiv() {
    jsonData = spaidDataDiv.innerHTML;
    console.log(jsonData);
    dbObject = JSON.parse(jsonData);
}

function createTable(tableName, fieldNames = [], dataTypes = []) {
    dbObject[tableName] = [];
    dbObject[tableName]["primaryKey"] = 0
    updateDataDiv();
}

function dropTable(tableName) {
    delete dbObject[tableName];
    updateDataDiv();
}

function insertInto(tableName, fieldNames = [], values = []) {
    if (fieldNames.length != values.length) {
        alert('field/value mismatch!');
    } else {
        let primaryKey = dbObject[tableName]["primaryKey"];
        let tempObject = {};
        tempObject['primaryKey'] = primaryKey;
        for (let i = 0; i < fieldNames.length; i++) {
            tempObject[fieldNames[i]] = values[i];
        }
        dbObject[tableName].push(JSON.parse(JSON.stringify(tempObject)));
        dbObject[tableName]["primaryKey"] = dbObject[tableName]["primaryKey"] + 1;
        console.log(tempObject);
    }
    updateDataDiv();
}

function select(columns = ['*'], tableName, where = '', compareField = '', operator = '', compareValue) {
    let tempTable = [];
    if ((columns[0] === '*') && (where === '')) { //simple select all statment
        for (let i = 0; i < dbObject[tableName].length; i++) {
            tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
        }
    } else if ((where != '') && (compareField != '') && (operator != '') && (compareValue != '')) { //select where

        if (operator === '=') {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] === compareValue) {
                    if (columns[0] === '*') { //select * where
                        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
                    } else { //select certain columns where
                        rowObject = dbObject[tableName][i];
                        tempRowObject = {};
                        for (let j = 0; j < columns.length; j++) {
                            let key = columns[j];

                            if (rowObject.hasOwnProperty(key)) {
                                tempRowObject[key] = rowObject[key];
                            }
                        }
                        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
                    }
                }
            }
        } else if ((operator === "!=") || (operator === "<>")) {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] != compareValue) {
                    if (columns[0] === '*') { //select * where
                        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
                    } else { //select certain columns where
                        rowObject = dbObject[tableName][i];
                        tempRowObject = {};
                        for (let j = 0; j < columns.length; j++) {
                            let key = columns[j];

                            if (rowObject.hasOwnProperty(key)) {
                                tempRowObject[key] = rowObject[key];
                            }
                        }
                        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
                    }
                }
            }
        } else if (operator === '>') {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] > compareValue) {
                    if (columns[0] === '*') { //select * where
                        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
                    } else { //select certain columns where
                        rowObject = dbObject[tableName][i];
                        tempRowObject = {};
                        for (let j = 0; j < columns.length; j++) {
                            let key = columns[j];

                            if (rowObject.hasOwnProperty(key)) {
                                tempRowObject[key] = rowObject[key];
                            }
                        }
                        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
                    }
                }
            }
        } else if (operator === '>=') {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] >= compareValue) {
                    if (columns[0] === '*') { //select * where
                        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
                    } else { //select certain columns where
                        rowObject = dbObject[tableName][i];
                        tempRowObject = {};
                        for (let j = 0; j < columns.length; j++) {
                            let key = columns[j];

                            if (rowObject.hasOwnProperty(key)) {
                                tempRowObject[key] = rowObject[key];
                            }
                        }
                        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
                    }
                }
            }
        } else if (operator === '<') {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] < compareValue) {
                    if (columns[0] === '*') { //select * where
                        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
                    } else { //select certain columns where
                        rowObject = dbObject[tableName][i];
                        tempRowObject = {};
                        for (let j = 0; j < columns.length; j++) {
                            let key = columns[j];

                            if (rowObject.hasOwnProperty(key)) {
                                tempRowObject[key] = rowObject[key];
                            }
                        }
                        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
                    }
                }
            }
        } else if (operator === '<=') {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] <= compareValue) {
                    if (columns[0] === '*') { //select * where
                        tempTable.push(JSON.parse(JSON.stringify(dbObject[tableName][i])));
                    } else { //select certain columns where
                        rowObject = dbObject[tableName][i];
                        tempRowObject = {};
                        for (let j = 0; j < columns.length; j++) {
                            let key = columns[j];

                            if (rowObject.hasOwnProperty(key)) {
                                tempRowObject[key] = rowObject[key];
                            }
                        }
                        tempTable.push(JSON.parse(JSON.stringify(tempRowObject)));
                    }
                }
            }
        }
    }
    console.log(tempTable);
    return tempTable;
}


function deleteFromTable(tableName, compareField, operator = "=", compareValue) {
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
}

function update(tableName, fieldNames = [], values = [], compareField, operator = "=", compareValue) {
    if (fieldNames.length != values.length) {
        alert('field/value mismatch!');
    } else {
        if (operator === "=") {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] === compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        dbObject[tableName][i][fieldNames[j]] = values[j];
                    }
                }
            }
        } else if ((operator === "!=") || (operator === "<>")) {

            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] != compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        dbObject[tableName][i][fieldNames[j]] = values[j];
                    }
                }
            }
        } else if (operator === ">") {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] > compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        dbObject[tableName][i][fieldNames[j]] = values[j];
                    }
                }
            }
        } else if (operator === ">=") {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] >= compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        dbObject[tableName][i][fieldNames[j]] = values[j];
                    }
                }
            }
        } else if (operator === "<") {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] < compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        dbObject[tableName][i][fieldNames[j]] = values[j];
                    }
                }
            }
        } else if (operator === "<=") {
            for (let i = 0; i < dbObject[tableName].length; i++) {
                if (dbObject[tableName][i][compareField] <= compareValue) {
                    for (let j = 0; j < fieldNames.length; j++) {
                        dbObject[tableName][i][fieldNames[j]] = values[j];
                    }
                }
            }
        }
        updateDataDiv();
    }
}

function showTables() {
    let maxLength = 0;
    for (let tableName in dbObject) {
        maxLength = Math.max(maxLength, tableName.length);
    }
    console.log("-".repeat(maxLength))
    console.dir('dbObject');
    console.log("-".repeat(maxLength))
    for (let tableName in dbObject) {
        console.log(tableName);
    }
}

function describe(thisTableName = "") {
    if (thisTableName === "") {
        thisTableName = prompt("enter table name");
    }
    if (thisTableName != null) {
        console.log("-".repeat(32));
        console.log(thisTableName);
        console.log("-".repeat(32));
        if (thisTableName in dbObject) {
            let thisTableRow = dbObject[thisTableName][0];
            for (let key in thisTableRow) {
                console.log("name: " + key + " type: " + typeof(thisTableRow[key]));
            }
        } else {
            console.log(thisTableName + " not found!")
        }
    }
}

function updateDataDiv() {
    spaidDataDiv.innerHTML = JSON.stringify(dbObject);
}

/////// not part of spaid programming  ////
////// just testing functions
function readInUser1() {
    user1TextArea.innerHTML = dbObject.table1[0].firstName;
}

function writeOutUser() {
    dbObject.table1[0].firstName = user1TextArea.value;
    spaidDataDiv.innerHTML = JSON.stringify(dbObject);
}

//create another table
createTable("anotherTable");

//add stuff to it
insertInto("anotherTable", ["name", "age", "date"], ["Adam", 4000, "today"]);
insertInto("anotherTable", ["name", "age", "date"], ["Paisley", 20, "yesteryear"]);

//add more stuff
for (let i = 0; i < 10; i++) {
    insertInto("anotherTable", ["name", "age", "date"], ["Paisley", i, "yesteryear"]);
}

//try update
update("anotherTable", ["name"], ["Eve"], "age", "<", 5);

//try delete
deleteFromTable("anotherTable", "age", "=", 7);
deleteFromTable("anotherTable", "age", "<", 3);
deleteFromTable("anotherTable", "age", ">=", 2000);

//try select all
let atable = select(["*"], "anotherTable");

//checking select all
console.log(atable[0]["name"]);

//try select where
let atable2 = select(['*'], "anotherTable", "where", "name", "=", "Paisley");

//writing spaces
for (let i = 0; i < 10; i++) {
    console.log("----------------");
}

//making sure byval worked rather than byref inside function
console.log(atable);
console.log(atable2);

//trying select only certain columns where
let atable3 = select(['age', 'name', 'primaryKey'], "anotherTable", "where", "primaryKey", "!=", 8);

//try updating
update("anotherTable", ["age", "name"], [73, "Bubbles"], "name", "=", "Paisley");

//checking update
select(['*'], "anotherTable");

//trying another table without primary keys
update("table1", ["firstName"], ["Anise"], "firstName", "=", "Anna");

//checking showtable functions
showTables();

//checking describe with argument;
describe("anotherTable");

//checking describe without arguments;
//describe();
