/**
 * The function setups the pagination from the films. Create buttons for switching prev/next by films.
 * @param {boolean} isAuth - The param for checking user is auth or isn't.
 * @param {Object[]} films - The array with films.
 * @param {HTMLElement} pagination - The place in the document for append info about a film.
 * @param {number} countOfElementsOnOnePage - The number films which can be visible on 1 page.
 * @param {number} pageNow - The number of current page.
 * @param {HTMLElement} list - The place in the document for append info about a film.
 */
function SetupPagination(
	isAuth,
	films,
	pagination,
	countOfElementsOnOnePage,
	pageNow,
	list
) {
	pagination.innerHTML = "";

	let countOfThePages = Math.ceil(films.length / countOfElementsOnOnePage);

	const prevButton = document.createElement("button");
	const nextButton = document.createElement("button");

	if (pageNow === 1) {
		prevButton.disabled = true;
	}

	if (pageNow >= countOfThePages) {
		nextButton.disabled = true;
	}

	prevButton.addEventListener("click", () => {
		if (pageNow > 1) {
			pageNow--;

			if (pageNow !== countOfThePages) {
				nextButton.disabled = false;
			}

			DisplayList(isAuth, films, list, countOfElementsOnOnePage, pageNow);

			if (pageNow === 1) {
				prevButton.disabled = true;
			}
		}
	});

	prevButton.innerText = "Prev";
	prevButton.classList.add("pagination");

	pagination.append(prevButton);

	nextButton.addEventListener("click", () => {
		if (pageNow < countOfThePages) {
			if (pageNow === 1) {
				prevButton.disabled = false;
			}

			pageNow++;

			DisplayList(isAuth, films, list, countOfElementsOnOnePage, pageNow);
			if (pageNow === countOfThePages) {
				nextButton.disabled = true;
			}
		}
	});

	nextButton.classList.add("pagination");
	nextButton.innerText = "Next";

	pagination.append(nextButton);
}
