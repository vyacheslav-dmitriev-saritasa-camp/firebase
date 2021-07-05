const createSearchedFilms = (selectSearchValue, inputSearchValue) => {
	searchFilms(selectSearchValue, inputSearchValue).then(films => {
		const isAuth = checkAuth();

		createTableHTML(isAuth, films);
	});
};
