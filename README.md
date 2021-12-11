# spaid
Self-saving PAge Including Data
or
Single Page Application Including Database

### Please note webpages built should be opened directly as a file, not with a live server.

This project has been brewing in the back of my mind for awhile.

The overall purpose of the project is allow one to make programs that
run in a browser locally and contain within the page a database.

Then before closing the page, you can save it and a copy of the page
with the current data is saved.

This solves several problems:
1) It runs basically anywhere a browser is installed, ie cross-platform.
2) Utilizes html/css to make graphical user interfaces, which is quick and looks nice.
3) Allows for data persistence between sessions.
4) Does not require extra dependencies like NodeJS or Electron etc.
5) Does not require any software installation or modifications to OS.
6) Requires no connection to database, database like object is included.

The way I intend to solve these problems is as follows:

A script is included in an html file.
The script does the following:
The script will check to see if a div element is present within
  the document with an id of "spaid-data".
  If that element is not present, it is made.  If it is present do nothing.
A SAVE button is added to the page.
When the save button is clicked, the script makes a copy of the web page including
  the div (with id of "spaid-data"), and saves a copy of the page with the data.
  
When this saved page is opened, it will contain the persistent data.

There are a bunch of functions but they are really intended to be funneled to one central
function sqlQuery.

The function returns a "table" which is an array or objects.  The array is indexed, the 
rows are objects and their column names are the keys, and the values are the cell data.
The metadata about the table like the name, the next primary key value and the column names
and data types.

To use, add the javascript reference before the end of the body and it will insert a fresh
'database' if there isn't one present.

It is essentially not style, but I would exect someone to only display the save and perhaps
save database and load database functions.  This is left up to the user.

Currently, if there is not database present in the webpage, a sample webpage of pet owners and
pets is loaded.

There is a SQL interpreter with visualization of both the tables and the database available
at the top of the web page.
