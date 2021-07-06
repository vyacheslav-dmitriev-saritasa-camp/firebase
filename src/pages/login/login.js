const sendLoginButton = document.querySelector("#sendLoginButton");

/**
 * The function checks is auth user or is not. if he is - he is redirecting to home page.
 */
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		window.location.assign("../index/index.html");
	}
});

sendLoginButton.addEventListener("click", () => {
	const login = document.querySelector("#login").value;
	const password = document.querySelector("#password").value;

	loginForm(login, password);
});
