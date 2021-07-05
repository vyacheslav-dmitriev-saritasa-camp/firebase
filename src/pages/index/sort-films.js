async function sortFilms(
	selectSortValue,
	inputHidden,
	selectSearchValue,
	inputSearchValue
) {
	const films = [];
	if (inputHidden === 0) {
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
