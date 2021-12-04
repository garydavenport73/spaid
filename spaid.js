dbObject = {};

if (document.getElementById('spaid-data') == null) {
    alert('no spaid-data div found, creating it!');

    spaidDataDiv = document.createElement('div');
    spaidDataDiv.setAttribute('id', 'spaid-data');
    spaidDataDiv.innerHTML = '{ "table1": [{ "userID": 1, "firstName": "John", "lastName": "Doe" }, { "userID": 2, "firstName": "Anna", "lastName": "Smith" }, { "userID": 3, "firstName": "Oliver", "lastName": "Jones"} ], "table2Ages": [{ "userID": 1, "Age": 40 }, { "userID": 2, "Age": 40 }, { "userID": 3, "Age": 40 } ] }';

    spaidButtonsDiv = document.createElement('div');
    spaidButtonsDiv.setAttribute('id', 'spaid-buttons');

    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'spaid-save');
    saveButton.innerHTML = 'save';

    showButton = document.createElement('button');
    showButton.setAttribute('id', 'spaid-show');
    showButton.innerHTML = 'show/hide'

    document.body.prepend(spaidDataDiv);
    spaidButtonsDiv.appendChild(saveButton);
    spaidButtonsDiv.appendChild(showButton);
    document.body.prepend(spaidButtonsDiv);

    saveButton.addEventListener('click', savePage);

} else {

    spaidDataDiv = document.getElementById('spaid-data');
    saveButton = document.getElementById('spaid-save');
    showButton = document.getElementById('spaid-show');
}

saveButton.addEventListener('click', savePage);
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
    saveStringToTextFile(thisDocument);
}

function saveStringToTextFile(str1) {
    let saveFileName = "spaid";
    let datetime = new Date();
    saveFileName = saveFileName.concat("_", (datetime.getMonth() + 1).toString(), "_", (datetime.getDate()).toString(), "_",
        datetime.getFullYear().toString(), "_", datetime.getHours().toString(), datetime.getMinutes().toString(),
        datetime.getMinutes().toString(), datetime.getSeconds().toString(), ".html");
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

/////// not part of spaid programming  //// these are for web page functions
function readInUser1() {
    user1TextArea.innerHTML = dbObject.table1[0].firstName;
}

function writeOutUser() {
    dbObject.table1[0].firstName = user1TextArea.value;
    spaidDataDiv.innerHTML = JSON.stringify(dbObject);
}