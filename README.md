# Pokemon Local Storage Proto

## Node Installed
Make sure node is installed
https://nodejs.org/en/

## Angular Installed
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0. Older/new versions should be fine
run: 'npm install -g @angular/cli'

## Run NPM Install on Project
Goto under level directory where packages.json file resides (base directory)
and run: 'npm install'

## Development server

From same directory run: 'ng serve' for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Launch in browser

http://localhost:4200

Use Cases:
- user enters a letter to start the auto complete function pop down
- On selection of an item from this drop down auto complete list it will be added to the Selected Pokemon list below
- User can favorite any item that is added to the list by checking the favorite checkbox and hitting the 'Set Favorites' button. These favorited items will be the only ones saved to locall storage and rendered on broswer refresh/new session. 
- You can add or remove from the favorite list by clicking on additional item's checkbox (enable/disable) and clicking 'Set Favorites' button
- User can opt to remove all local storage by clicking on the 'Clear Local Storage' button. On browser refresh/new session there will nothing presented in list
- Images are clickable but will not render page views/content..  JS alert is a placeholder.


Assumptions made: (due to 4hr time limits)

Used Ang Material auto complete popdown to search all pokemon names. You can start by typing in the names and they will populate all names from the Pokemon API. Types were not added at this time. 

Favorites are made by clicking on checkbox next to item in the Selected Pokemon List and then clicking on Set Favorite button to save items to local storage. This could have be done automatically each time a user selects/deselects an pokemon favorite.

The Clear Local Storage button is just there for convenience and was used as part of my testing. 

Did not flesh out detail page/view for each pokemon image selected. All data on each pokemon from the API is stored in local storage for this name/id poken search

Responsivenes via bootstrap4 is not 100%

Any questions please email me susack@optonline.net TY!

