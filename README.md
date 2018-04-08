# green_team
Green Team Project: Common Culture

Our project connects international students to local studetns at the university they will be attending on an exchange program.

Providing conversation topics based on common interests and a local translator module to help with communication, our webapp helps international students assimilate quicker, and helps local studetns learn about foreign cultures, and possibly enhance their foreign language capabilities. 


Satisfy requirements:
node -v
v8.9.3
npm -v
5.5.1
ionic -v
3.19.0
cordova -v
7.1.0

if you need the versions of Node.js and cordova, run these
sudo npm i -D -E ionic@latest
sudo npm i -g cordova

if you want to run locally, make sure u have firebase module installed...
npm install --save firebase@latest

you also might neeed 
npm install angularfire2@4.0.0-rc0 firebase --save

following these two tutorials:
https://www.djamware.com/post/5a629d9880aca7059c142976/build-ionic-3-angular-5-and-firebase-simple-chat-app

https://devdactic.com/ionic-firebase-angularfire/

To make a build on iOS:
- run the command 
'ionic cordova build --release iOS'
- then change developer team to your personal team 
- may have to change bundle identifier
