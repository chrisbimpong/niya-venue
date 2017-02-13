/*
 * Title:   NiYa | Book Your Perfect Venue - Custom Javascript file
 * Author:  http://github.com/joshuaai
 */
'use strict';

//Initializes Niya Venue
function NiyaVenue() {

    this.checkSetup();

    this.googleSignInButton = document.getElementById('google-sign-in');
    this.facebookSignInButton = document.getElementById('facebook-sign-in');
    this.emailSignUpButton = document.getElementById('email-sign-up');
    this.emailSignInButton = document.getElementById('email-sign-in');
    this.signInButton = document.getElementById('sign-in')
    this.signUpButton = document.getElementById('sign-up');
    this.signOutButton = document.getElementById('sign-out');
    this.welcomeName = document.getElementById('welcome-name');
    this.popupBox = document.getElementById('travelo-signup');

    this.googleSignInButton.addEventListener('click', this.googleSignIn.bind(this));
    this.facebookSignInButton.addEventListener('click', this.facebookSignIn.bind(this));
    this.emailSignUpButton.addEventListener('click', this.emailSignUp.bind(this));
  
    this.signOutButton.addEventListener('click', this.signOut.bind(this));

    this.initFirebase();
};

// Sets up shortcuts to Firebase features and initiate firebase auth.
NiyaVenue.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();

    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in with Google.
NiyaVenue.prototype.googleSignIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(googleProvider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token);
      console.log(user);
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code);
      console.log(error.message);
   });
};

//Signs-in with facebook
NiyaVenue.prototype.facebookSignIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var googleProvider = new firebase.auth.FacebookAuthProvider();
  this.auth.signInWithPopup(googleProvider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token);
      console.log(user);
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code);
      console.log(error.message);
   });
};

// Signs-up with email
NiyaVenue.prototype.emailSignUp = function() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var firstName = document.getElementById('first-name').value;
  var lastName = document.getElementById('last-name').value;

  if (email.length < 4) {
    alert('Please enter an email adderess.')
  } else if (password.length < 6) {
    alert('Password must be at least 6 characters')
  } else if (lastName < 2 || firstName < 2) {
    alert('Enter correcet names.');
  } else {
    this.sendEmailVerification();
  }
  // Sign in with email and pass.
  // [START createwithemail]
  this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
};

/**
  * Sends an email verification to the user.
  */
NiyaVenue.prototype.sendEmailVerification = function() {
    // [START sendemailverification]
    this.auth.currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
}

NiyaVenue.prototype.sendPasswordReset = function() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    this.auth.sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
      // [END sendpasswordemail];
}

// Signs-out of Niya Venue.
NiyaVenue.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
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
    //this.userName.removeAttribute('hidden');
    //this.userPic.removeAttribute('hidden');

    // Hide sign-in button and show sign-out button.
    this.signInButton.setAttribute('hidden', 'true');
    this.signUpButton.setAttribute('hidden', 'true')

    this.signOutButton.removeAttribute('hidden');
    this.welcomeName.removeAttribute('hidden');
    this.popupBox.setAttribute('hidden', 'true');

    // Load currently existing chant messages.
    //this.loadMessages();
  } else { //User is signed out
    //this.userName.setAttribute('hidden', 'true');
    //this.userPic.setAttribute('hidden', 'true');

    // Show sign-in button and hide sign-out.
    this.signInButton.removeAttribute('hidden');
    this.signUpButton.removeAttribute('hidden');
    this.signOutButton.setAttribute('hidden', 'true');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
NiyaVenue.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  } else {
    // Display a message to the user using an alert.
    var data = {
      message: 'You must sign-in first',
      timeout: 2000
    };
    window.alert(data);
    return false;
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
NiyaVenue.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('Please check your internet connection!');
  } else {
    window.alert('Connected Successfully!');
  } 
};

window.onload = function() {
  window.niyaVenue = new NiyaVenue();
};