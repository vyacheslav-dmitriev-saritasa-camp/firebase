/**
 * The function prints n-elements on 1 page.
 * @param {boolean} isAuth - The param for checking user is auth or isn't.
 * @param {object[]} films - The array with films.
 * @param {HTMLElement} list - The place in the document for append info about a film.
 * @param {number} countOfElementsOnOnePage - The number films which can be visible on 1 page.
 * @param {number} pageNow - The number of current page.
 */
function DisplayList(isAuth, films, list, countOfElementsOnOnePage, pageNow) {
	list.innerHTML = "";

	createHead();

	pageNow--;

	createList(isAuth, films, list, countOfElementsOnOnePage, pageNow);
}
