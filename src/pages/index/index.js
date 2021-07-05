const buttonSort = document.querySelector("#buttonSort");
const inputSearch = document.querySelector("#inputSearch");
const selectSearch = document.querySelector("#selectSearch");

const startDebounce = debounce(searchBySearchedValue, 250);

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		initApp(true);
	} else {
		initApp(false);
	}
});

selectSearch.addEventListener("change", () => {
	searchBySearchedValue();
});

inputSearch.addEventListener("input", () => {
	startDebounce();
});

buttonSort.addEventListener("click", () => {
	const inputHidden = +document.querySelector("#inputHidden").value;
	const selectSortValue = document.querySelector("#selectSort").value;

	const inputSearchValue = document.querySelector("#inputSearch").value;
	const selectSearchValue = document.querySelector("#selectSearch").value;

	if (inputHidden === 0) {
		createSortedFilms(
			selectSortValue,
			inputHidden,
			selectSearchValue,
			inputSearchValue
		);

		document.querySelector("#inputHidden").value = 1;
	} else {
		createSortedFilms(
			selectSortValue,
			inputHidden,
			selectSearchValue,
			inputSearchValue
		);

		document.querySelector("#inputHidden").value = 0;
	}
});

