const sendLogin = document.querySelector("#sendLogin");

(() => {
	const isAuth = getLoginStatus();
	if (isAuth) {
		window.location.assign("http://127.0.0.1:5500/src/");
	}
})();

sendLogin.addEventListener("click", async () => {
	const login = document.querySelector("#login").value;
	const password = document.querySelector("#password").value;

	try {
		await firebase
			.auth()
			.signInWithEmailAndPassword(login, password)
			.then(() => {
				localStorage.setItem("auth", true);
				window.location.assign("http://127.0.0.1:5500/src/");
			})
			.catch(e => {
				localStorage.setItem("auth", false);
				document.querySelector("#login").value = "";
				document.querySelector("#password").value = "";
			});
	} catch (e) {
		localStorage.setItem("auth", false);
	}
});
