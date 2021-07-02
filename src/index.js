const buttonSort = document.querySelector("#buttonSort");
const inputSearch = document.querySelector("#inputSearch");
const selectSearch = document.querySelector("#selectSearch");

(() => {
	const isAuth = getLoginStatus();
	const headerLogin = document.querySelector(".header__login");

	if (isAuth) {
		headerLogin.innerHTML = "";

		const a = document.createElement("a");
		a.innerHTML = `<a href='http://127.0.0.1:5500/src/pages/logout/logout.html'>Logout</a>`;

		headerLogin.append(a);

		getFilms().then(films => {
			createBlocksIntoHTML(isAuth, films);
		});
	} else {
		headerLogin.innerHTML = "";

		const a = document.createElement("a");
		a.innerHTML = `
            <a href="./pages/login/login.html">Login</a>
            <a href="./pages/registration/registration.html">Registration</a>
        `;

		headerLogin.append(a);

		getFilms().then(films => {
			createBlocksIntoHTML(isAuth, films);
		});
	}
})();

function debounce(func, wait, immediate) {
	let timeout;

	return function () {
		const context = this;
		const args = arguments;

		clearTimeout(timeout);

		timeout = setTimeout(function () {
			timeout = null;

			if (!immediate) {
				func.apply(context, args);
			}
		}, wait);
		if (immediate && !timeout) {
			func.apply(context, args);
		}
	};
}

const myEfficientFn = debounce(function () {
	const inputSearchValue = document.querySelector("#inputSearch").value;
	const selectSearchValue = document.querySelector("#selectSearch").value;

	if (inputSearchValue.length) {
		searchBy(selectSearchValue, inputSearchValue);
	} else {
		getFilms().then(films => {
			const isAuth = getLoginStatus();

			createBlocksIntoHTML(isAuth, films);
		});
	}
}, 250);

selectSearch.addEventListener("change", () => {
	myEfficientFn();
});

inputSearch.addEventListener("input", () => {
	myEfficientFn();
});

buttonSort.addEventListener("click", () => {
	const hiddenInput = document.querySelector("#hiddenInput").value;
	const selectSortValue = document.querySelector("#selectSort").value;

	const inputSearchValue = document.querySelector("#inputSearch").value;
	const selectSearchValue = document.querySelector("#selectSearch").value;

	if (hiddenInput === "0") {
		sortBy(
			selectSortValue,
			hiddenInput,
			selectSearchValue,
			inputSearchValue
		);

		document.querySelector("#hiddenInput").value = "1";
	} else {
		sortBy(
			selectSortValue,
			hiddenInput,
			selectSearchValue,
			inputSearchValue
		);

		document.querySelector("#hiddenInput").value = "0";
	}
});

const sortBy = (
	selectSortValue,
	hiddenInput,
	selectSearchValue,
	inputSearchValue
) => {
	sortByFilms(
		selectSortValue,
		hiddenInput,
		selectSearchValue,
		inputSearchValue
	).then(films => {
		const isAuth = getLoginStatus();

		createBlocksIntoHTML(isAuth, films);
	});
};

const sortByFilms = async (
	selectSortValue,
	hiddenInput,
	selectSearchValue,
	inputSearchValue
) => {
	const films = [];
	if (hiddenInput === "0") {
		if (inputSearchValue.length) {
			if (selectSearchValue === "pk") {
				if (Number.isInteger(+inputSearchValue)) {
					await firebase
						.firestore()
						.collection("films")
						.where(
							selectSearchValue,
							"==",
							Number(inputSearchValue)
						)
						.get()
						.then(querySnapshot => {
							querySnapshot.forEach(doc => {
								films.push(doc.data());
							});
						});

					const sortedFilms = films.sort((a, b) =>
						a.selectSortValue > b.selectSortValue ? 1 : -1
					);

					return sortedFilms;
				}
			} else {
				await firebase
					.firestore()
					.collection("films")
					.where(selectSearchValue, ">=", inputSearchValue)
					.where(selectSearchValue, "<=", inputSearchValue + "\uf8ff")
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							films.push(doc.data());
						});
					});

				const sortedFilms = films.sort((a, b) =>
					a.selectSortValue > b.selectSortValue ? 1 : -1
				);

				return sortedFilms;
			}
		} else {
			await firebase
				.firestore()
				.collection("films")
				.orderBy(selectSortValue)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						films.push(doc.data());
					});
				});

			return films;
		}
	} else {
		if (inputSearchValue.length) {
			if (selectSearchValue === "pk") {
				if (Number.isInteger(+inputSearchValue)) {
					await firebase
						.firestore()
						.collection("films")
						.where(
							selectSearchValue,
							"==",
							Number(inputSearchValue)
						)
						.get()
						.then(querySnapshot => {
							querySnapshot.forEach(doc => {
								films.push(doc.data());
							});
						});

					const sortedFilms = films.sort((a, b) =>
						a.selectSortValue > b.selectSortValue ? -1 : 1
					);

					return sortedFilms;
				}
			} else {
				await firebase
					.firestore()
					.collection("films")
					.where(selectSearchValue, ">=", inputSearchValue)
					.where(selectSearchValue, "<=", inputSearchValue + "\uf8ff")
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							films.push(doc.data());
						});
					});

				const sortedFilms = films.sort((a, b) =>
					a.selectSortValue > b.selectSortValue ? -1 : 1
				);
				return sortedFilms;
			}
		} else {
			await firebase
				.firestore()
				.collection("films")
				.orderBy(selectSortValue, "desc")
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						films.push(doc.data());
					});
				});
			return films;
		}
	}
};

const searchBy = (selectSearchValue, inputSearchValue) => {
	searchFilms(selectSearchValue, inputSearchValue).then(films => {
		const isAuth = getLoginStatus();

		createBlocksIntoHTML(isAuth, films);
	});
};

const searchFilms = async (selectSearchValue, inputSearchValue) => {
	const films = [];

	if (selectSearchValue === "pk") {
		if (Number.isInteger(+inputSearchValue)) {
			await firebase
				.firestore()
				.collection("films")
				.where(selectSearchValue, "==", Number(inputSearchValue))
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						films.push(doc.data());
					});
				});
		}
	} else {
		await firebase
			.firestore()
			.collection("films")
			.where(selectSearchValue, ">=", inputSearchValue)
			.where(selectSearchValue, "<=", inputSearchValue + "\uf8ff")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					films.push(doc.data());
				});
			});
	}
	return films;
};

const createBlocksIntoHTML = (isAuth, films) => {
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

		let start = rows_per_page * page;
		let end = start + rows_per_page;
		let paginatedItems = items.slice(start, end);

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
                            <a href='http://127.0.0.1:5500/src/pages/authorized/film-info.html?film-number=${el}' target='_blank'>${el}</a>
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

async function getFilms() {
	const films = [];

	await firebase
		.firestore()
		.collection("films")
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				films.push(doc.data());
			});
		});

	return films;
}
