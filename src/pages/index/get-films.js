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
