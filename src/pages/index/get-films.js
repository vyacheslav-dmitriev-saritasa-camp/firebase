/**
 * The function gets array with films from firebase.
 * @returns the function returns an array with films.
 */
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
