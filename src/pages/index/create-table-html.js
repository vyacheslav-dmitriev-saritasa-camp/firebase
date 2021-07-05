/**
 * The function creates films with pagination.
 * @param {boolean} isAuth - The param for checking user is auth or isn't.
 * @param {Object[]} films - The array with films.
 */
function createTableHTML(isAuth, films) {
	const list = document.querySelector("#list");
	const pagination = document.querySelector("#pagination");

	let countOfElementsOnOnePage = 2;
	let pageNow = 1;

	DisplayList(isAuth, films, list, countOfElementsOnOnePage, pageNow);
	SetupPagination(
		isAuth,
		films,
		pagination,
		countOfElementsOnOnePage,
		pageNow,
		list
	);
}
