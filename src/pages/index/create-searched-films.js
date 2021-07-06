/**
 * The function creates page with pagination.
 * @param {string} selectSearchValue - The data from the selectSearch.
 * @param {string} inputSearchValue - The data from the inputSearch.
 */
const createSearchedFilms = (selectSearchValue, inputSearchValue) => {
	searchFilms(selectSearchValue, inputSearchValue).then(films => {
		const isAuth = checkAuth();

		createTableHTML(isAuth, films);
	});
};
