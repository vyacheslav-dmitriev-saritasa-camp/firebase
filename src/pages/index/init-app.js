function initApp(isAuth) {
	const headerList = document.querySelector(".header__list");

	headerList.innerHTML = "";

	if (isAuth) {
		const div = document.createElement("div");
		div.innerHTML = `<div>Logout</div>`;
		div.addEventListener("click", () => {
			firebase
				.auth()
				.signOut()
				.then(() => {
					window.location.assign("./index.html");
				});
		});

		headerList.append(div);
	} else {
		const a = document.createElement("a");
		a.innerHTML = `
            <a href="../login/login.html">Login</a>
            <a href="../registration/registration.html">Registration</a>
        `;

		headerList.append(a);
	}

	getFilms().then(films => {
		createTableHTML(isAuth, films);
	});
}