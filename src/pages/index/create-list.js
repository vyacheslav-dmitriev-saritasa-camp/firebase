/**
 * The function creates page with n-elements on 1 page.
 * @param {boolean} isAuth - The param for checking user is auth or isn't.
 * @param {Object[]} films - The array with films.
 * @param {number} films[0] - The number of the film.
 * @param {string} films[1] - The title of the film.
 * @param {string} films[2] - The director of the film.
 * @param {string} films[3] - The producer of the film.
 * @param {string} films[4] - The date of the film.
 * @param {HTMLElement} list - The place in the document for append info about a film.
 * @param {number} countOfElementsOnOnePage  - The number films which can be visible on 1 page.
 * @param {number} pageNow - The number of current page.
 */
function createList(isAuth, films, list, countOfElementsOnOnePage, pageNow) {
	const start = countOfElementsOnOnePage * pageNow;
	const end = start + countOfElementsOnOnePage;

	const paginatedFilms = films.slice(start, end);

	for (let i = 0; i < paginatedFilms.length; i++) {
		let filmObject = paginatedFilms[i];

		const { pk: number } = filmObject;
		const { fields } = filmObject;

		const film = [
			number,
			fields.title,
			fields.director,
			fields.producer,
			fields.edited,
		];

		createListIntoHtml(film, isAuth, list);
	}
}
