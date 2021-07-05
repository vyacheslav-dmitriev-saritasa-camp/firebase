/**
 * The function checks is auth user or isn't.
 * @returns true or false state of the user's auth.
 */
function checkAuth() {
	return firebase.auth().currentUser ? true : false;
}
