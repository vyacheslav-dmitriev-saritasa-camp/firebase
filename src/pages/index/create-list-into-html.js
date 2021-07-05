/**
 * The function creates blocks with film's info.
 * @param {Object[]} array - The array with info about a film.
 * @param {boolean} isAuth - The param for checking user is auth or isn't.
 *                           If user is auth - he can presses on the number of film and visits detail page about film.
 * @param {HTMLElement} list - The place in the document for append info about a film.
 */
function createListIntoHtml(array, isAuth, list) {
	const listItems = document.createElement("div");
	listItems.classList.add("list__items");

	array.forEach(el => {
		if (isAuth && Number.isInteger(el)) {
			const div = document.createElement("div");
			div.classList.add("item");
			div.innerHTML = `
                    <h3>
                        <a href='../authorized/film-info.html?film-number=${el}' target='_blank'>${el}</a>
                    </h3>
                `;

			listItems.append(div);
		} else {
			const div = document.createElement("div");
			div.classList.add("item");
			div.innerHTML = `
                    <h3>${el}</h3>
                `;

			listItems.append(div);
		}
	});

	list.append(listItems);
}
