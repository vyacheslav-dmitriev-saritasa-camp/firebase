function checkAuth() {
	return firebase.auth().currentUser ? true : false;
}
