# projetwebs3-kirperov
projetwebs3-kirperov created by GitHub Classroom

# Application Sport Nation


## How to install this application?
===================================================================

### Prerequisites

* Google Chrome (Disable Web Security in Chrome)
* Text editor exemple (visual Studio Code , Atom ...)
* Nodemon (npm install nodemon -g)

## Installation

1. You need to write command line: git clone <this link reperstory>
2. Unzippe the file
3. Next you need to navigate into reperstory projetwebs3-kirperov
4. Go to folder server and install the module dependencie with run the command "sudo npm install"
4. Open folder client and navigate into folder AngularApp and install the module dependencie with run the command "sudo npm install" and "sudo npm i @angular-devkit/build-angular"
5. Into the terminal to folder server write nodemon server 
6. 
 * For running on Linux desktop , for chrome browser use the following command on terminal: google-chrome --disable-web-security --user-data-dir="/tmp/someFolderName"

* For Windows:  in Properties find the input box with label “Target” in this box the location of chrome is given as follows: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

All we have to do is add few lines to that given location as follows: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="c:/someFolderName"

7.Then into the terminal to folder client write ng serve
8.Open Chrome and write http://localhost:4200/
