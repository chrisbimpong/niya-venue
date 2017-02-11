/*
 * Title:   NiYa | Book Your Perfect Venue - Custom Javascript file
 * Author:  http://github.com/joshuaai
 */

tjq(document).ready(function() {
    // UI Form Element
});

//Initializes Niya Venue
function NiyaVenue() {
    this.checkSetup();

    //Shortcuts to DOM elements
    this.messageList = document.getElementById('messages');
    this.messageForm = document.getElementById('message-form');
    this.messageInput = document.getElementById('message');
    this.submitButton = document.getElementById('submit');
    this.submitImageButton = document.getElementById('submitImage');
    this.imageForm = document.getElementById('image-form');
    this.mediaCapture = document.getElementById('mediaCapture');
    this.userPic = document.getElementById('user-pic');
    this.userName = document.getElementById('user-name');
    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');

}