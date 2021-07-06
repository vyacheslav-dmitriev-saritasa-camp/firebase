const buttonSort = document.querySelector("#buttonSort");
const inputSearch = document.querySelector("#inputSearch");
const selectSearch = document.querySelector("#selectSearch");

/**
 * The function which will be called after n-time
 */
const startDebounce = debounce(searchBySearchedValue, 250);

/**
 * The function checks is auth user or is not and call the function initApp with difference values = true or false
 */
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
	const inputHiddenValue = +document.querySelector("#inputHidden").value;
	const selectSortValue = document.querySelector("#selectSort").value;

	const inputSearchValue = document.querySelector("#inputSearch").value;
	const selectSearchValue = document.querySelector("#selectSearch").value;

	if (inputHiddenValue === 0) {
		createSortedFilms(
			selectSortValue,
			inputHiddenValue,
			selectSearchValue,
			inputSearchValue
		);

		document.querySelector("#inputHidden").value = 1;
	} else {
		createSortedFilms(
			selectSortValue,
			inputHiddenValue,
			selectSearchValue,
			inputSearchValue
		);

		document.querySelector("#inputHidden").value = 0;
	}
});
