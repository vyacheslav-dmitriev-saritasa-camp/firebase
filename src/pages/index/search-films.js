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