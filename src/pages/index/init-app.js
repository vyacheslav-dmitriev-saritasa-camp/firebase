/**
 * The functions creates header, film's table with pagination. 
 * @param {boolean} isAuth - The param for checking user is auth or isn't. If he is auth - into the header will be text 'Logout' with logic for it.
 *                           If he is not - into the header will be text 'Login' / 'Registration' with logic for it.
 */
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
