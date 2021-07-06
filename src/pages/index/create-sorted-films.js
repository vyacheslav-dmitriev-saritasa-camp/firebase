/**
 * The function creates sorted films with pagination.
 * @param {string} selectSortValue - The data from the selectSort.
 * @param {number} inputHiddenValue - The data from the inputHidden.
 * @param {string} selectSearchValue - The data from the selectSearch.
 * @param {string} inputSearchValue - The data from the inputSearch.
 */
function createSortedFilms(
	selectSortValue,
	inputHiddenValue,
	selectSearchValue,
	inputSearchValue
) {
	sortFilms(
		selectSortValue,
		inputHiddenValue,
		selectSearchValue,
		inputSearchValue
	).then(films => {
		const isAuth = checkAuth();

		createTableHTML(isAuth, films);
	});
}
