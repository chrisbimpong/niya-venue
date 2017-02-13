/*
 * Title:   NiYa | Book Your Perfect Venue - Custom Javascript file
 * Author:  http://github.com/joshuaai
 */
'use strict';

//Initializes Niya Venue
function NiyaVenue() {
    this.checkSetup();

    //Shortcuts to DOM elements
    //this.messageList = document.getElementById('messages');
    //this.messageForm = document.getElementById('message-form');
    //this.messageInput = document.getElementById('message');
    //this.submitButton = document.getElementById('submit');
    //this.submitImageButton = document.getElementById('submitImage');
    //this.imageForm = document.getElementById('image-form');
    //this.mediaCapture = document.getElementById('mediaCapture');
    //this.userPic = document.getElementById('user-pic');
    //this.userName = document.getElementById('user-name');
    this.googleSignInButton = document.getElementById('google-sign-in');
    this.facebookSignInButton = document.getElementById('facebook-sign-in');
    this.emailSignUpButton = document.getElementById('email-sign-up');
    this.emailSignInButton = document.getElementById('email-sign-in');
    //this.signOutButton = document.getElementById('sign-out');

    // Saves message on form submit.
    //this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
    //this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.googleSignInButton.addEventListener('click', this.googleSignIn.bind(this));
    this.facebookSignInButton.addEventListener('click', this.facebookSignIn.bind(this));
    this.emailSignUpButton.addEventListener('click', this.emailSignUp.bind(this));
    this.emailSignInButton.addEventListener('click', this.emailSignIn.bind(this));

    // Toggle for the button.
    //var buttonTogglingHandler = this.toggleButton.bind(this);
    //this.messageInput.addEventListener('keyup', buttonTogglingHandler);
    //this.messageInput.addEventListener('change', buttonTogglingHandler);

    // Events for image upload.
    //this.submitImageButton.addEventListener('click', function() {
        //this.mediaCapture.click();
    //}.bind(this));
    //this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

    this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
NiyaVenue.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    //this.database = firebase.database();
    //this.storage = firebase.storage();

    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

// Signs-in with Google.
NiyaVenue.prototype.googleSignIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(googleProvider);
};

// Signs-in with Facebook
NiyaVenue.prototype.facebookSignIn = function() {
  var facebookProvider = new firebase.auth.FacebookAuthProvider();

  this.auth.signInWithPopup(facebookProvider).then(function(result) {
    // This gives a Facebook Access Token to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var facebookUser = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};

// Signs-up with Email

// Signs-out of Niya Venue.
NiyaVenue.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

NiyaVenue.prototype.onAuthStateChanged = function(user) {
  if (user) {
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var providerData = user.providerData;
    var isAnonymous = user.isAnonymous;

    // Show user's profile
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');

    // Hide sign-in button and show sign-out button.
    this.signInButton.setAttribute('hidden', 'true');
    this.signOutButton.removeAttribute('hidden');

    // Load currently existing chant messages.
    //this.loadMessages();
  } else { //User is signed out
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');

    // Show sign-in button and hide sign-out.
    this.signInButton.removeAttribute('hidden');
    this.signOutButton.setAttribute('hidden', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
NiyaVenue.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('Please check your internet connection!');
  } 
};

window.onload = function() {
  window.niyaVenue = new NiyaVenue();
};