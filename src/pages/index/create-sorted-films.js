function createSortedFilms(
	selectSortValue,
	inputHidden,
	selectSearchValue,
	inputSearchValue
) {
	sortFilms(
		selectSortValue,
		inputHidden,
		selectSearchValue,
		inputSearchValue
	).then(films => {
		const isAuth = checkAuth()

		createTableHTML(isAuth, films);
	});
}
