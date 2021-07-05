const sendLogin = document.querySelector("#sendLoginButton");

firebase.auth().onAuthStateChanged(user => {
	if (user) {
        window.location.assign("../index/index.html");
	}
});

sendLogin.addEventListener("click", async () => {
	const login = document.querySelector("#login").value;
	const password = document.querySelector("#password").value;

	try {
		await firebase
			.auth()
			.signInWithEmailAndPassword(login, password)
			.then(() => {
				window.location.assign("../index/index.html");
			})
			.catch(e => {
				document.querySelector("#login").value = "";
				document.querySelector("#password").value = "";
			});
	} catch (e) {
		console.log(e)
	}
});
