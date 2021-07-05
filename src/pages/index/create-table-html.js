const createTableHTML = (isAuth, films) => {
	const list_element = document.querySelector("#list");
	const pagination_element = document.querySelector("#pagination");

	let rows = 2;
	let pageNow = 1;

	function DisplayList(isAuth, items, wrapper, rows_per_page, page) {
		wrapper.innerHTML = "";
		const head = ["number", "title", "director", "producer", "edited"];

		const listHead = document.createElement("div");
		listHead.classList.add("list__heads");

		head.forEach(el => {
			const div = document.createElement("div");
			div.classList.add("head-item");

			div.innerHTML = `
                <h2 id=${el}>${el}</h2>
            `;

			listHead.append(div);
		});

		wrapper.append(listHead);

		page--;

		const start = rows_per_page * page;
		const end = start + rows_per_page;

		const paginatedItems = items.slice(start, end);

		for (let i = 0; i < paginatedItems.length; i++) {
			let item = paginatedItems[i];

			const { pk: number } = item;
			const { fields } = item;

			const array = [
				number,
				fields.title,
				fields.director,
				fields.producer,
				fields.edited,
			];
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
			wrapper.append(listItems);
		}
	}

	function SetupPagination(isAuth, items, wrapper, rows_per_page) {
		wrapper.innerHTML = "";

		let page_count = Math.ceil(items.length / rows_per_page);

		const prevButton = document.createElement("button");
		const nextButton = document.createElement("button");

		if (pageNow === 1) {
			prevButton.disabled = true;
		}

		if (pageNow >= page_count) {
			nextButton.disabled = true;
		}

		prevButton.addEventListener("click", () => {
			if (pageNow > 1) {
				pageNow--;

				if (pageNow !== page_count) {
					nextButton.disabled = false;
				}

				DisplayList(isAuth, films, list_element, rows, pageNow);

				if (pageNow === 1) {
					prevButton.disabled = true;
				}
			}
		});

		prevButton.innerText = "Prev";
		prevButton.classList.add("pagination");

		wrapper.append(prevButton);

		nextButton.addEventListener("click", () => {
			if (pageNow < page_count) {
				if (pageNow === 1) {
					prevButton.disabled = false;
				}

				pageNow++;

				DisplayList(isAuth, films, list_element, rows, pageNow);
				if (pageNow === page_count) {
					nextButton.disabled = true;
				}
			}
		});

		nextButton.classList.add("pagination");
		nextButton.innerText = "Next";

		wrapper.append(nextButton);
	}

	DisplayList(isAuth, films, list_element, rows, pageNow);
	SetupPagination(isAuth, films, pagination_element, rows);
};
