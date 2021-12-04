# spaid
Self-saving PAge Including Data

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
The script will check to see if a div or maybe a pre element is present within
  the document with an id of "spaid-data".
  If that element is not present, it is made.  If it is present do nothing.
A SAVE button is added to the page.
When the save button is clicked, the script makes a copy of the web page including
  the div (with id of "spaid-data"), and saves a copy of the page with the data.
  
When this saved page is opened, it will contain the persistent data.

Now I plan to place in this div a large database like object probably in 
JSON format and write a series of functions to write in and out of the "database".
Upon loading I will have the script read in the JSON and make a javascript object
out of it.

I will likely write the basic functions for parsing SQL statements so basically
adding this script will give you a "database" with SQL ability and this database will
save by hitting the save button.

I think I may alert the user to save with a different filename at least for the 
first load, so that the new copy does not overrwrite the original.

I may put a 'show' button to show what's going on in the database div by displaying it.
