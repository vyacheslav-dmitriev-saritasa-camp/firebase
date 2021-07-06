/**
 * The function auth an user by login and password and after success redirect him on the main page.
 * @param {string} login - The data for login.
 * @param {string} password - The data for login.
 */
async function loginForm(login, password) {
	try {
		await firebase
			.auth()
			.signInWithEmailAndPassword(login, password)
			.then(() => {
				console.log("here");
				window.location.assign("../index/index.html");
			})
			.catch(_ => {
				document.querySelector("#login").value = "";
				document.querySelector("#password").value = "";
			});
	} catch (e) {
		console.log(e);
	}
}
