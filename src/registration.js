console.log(firebase)
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signUpWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
});


console.log(user)