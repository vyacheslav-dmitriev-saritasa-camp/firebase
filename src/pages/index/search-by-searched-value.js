function searchBySearchedValue() {
	const inputSearchValue = document.querySelector("#inputSearch").value;
	const selectSearchValue = document.querySelector("#selectSearch").value;

	if (inputSearchValue.length) {
		createSearchedFilms(selectSearchValue, inputSearchValue);
	} else {
		getFilms().then(films => {
			const isAuth = checkAuth();

			createTableHTML(isAuth, films);
		});
	}
}
