const sendRegistration = document.querySelector("#sendRegistrationButton");

firebase.auth().onAuthStateChanged(user => {
	if (user) {
        window.location.assign("../index/index.html");
	} 
});

sendRegistration.addEventListener("click", () => {
	const login = document.querySelector("#login").value;
	const password = document.querySelector("#password").value;

	registration(login, password);
});

const registration = async (login, password) => {
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
		console.log(e)
	}
};
