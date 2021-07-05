/**
 * The function sorts films by data and return the array with films.
 * @param {string} selectSortValue - The data from the selectSort.
 * @param {number} inputHiddenValue - The data from the inputHidden.
 * @param {string} selectSearchValue - The data from the selectSearch.
 * @param {string} inputSearchValue - The data from the inputSearch.
 * @returns array with sortedFilms or just films if data is not valid.
 */
async function sortFilms(
	selectSortValue,
	inputHiddenValue,
	selectSearchValue,
	inputSearchValue
) {
	const films = [];
	if (inputHiddenValue === 0) {
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
						a[`${selectSortValue}`] > b[`${selectSortValue}`]
							? 1
							: -1
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
					a[`${selectSortValue}`] > b[`${selectSortValue}`] ? 1 : -1
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
						a[`${selectSortValue}`] > b[`${selectSortValue}`]
							? -1
							: 1
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
					a[`${selectSortValue}`] > b[`${selectSortValue}`] ? -1 : 1
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
}
