/**
 * The function checks an user is auth or isn't.
 * If an user is auth he gets info about selected film,
 * and if he is not he redirect to login page.
 */
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		getFilmInfo();
	} else {
		window.location.assign("../login/login.html");
	}
});
