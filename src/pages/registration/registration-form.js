/**
 * The function auth an user by login and password and after success redirect him on the main page.
 * @param {string} login - The data for registration.
 * @param {string} password - The data for registration.
 */
async function registrationForm(login, password) {
	try {
		await firebase
			.auth()
			.createUserWithEmailAndPassword(login, password)
			.then(() => {
				window.location.assign("../index/index.html");
			})
			.catch(e => {
				document.querySelector("#login").value = "";
				document.querySelector("#password").value = "";
			});
	} catch (err) {
		console.log(e);
	}
}
