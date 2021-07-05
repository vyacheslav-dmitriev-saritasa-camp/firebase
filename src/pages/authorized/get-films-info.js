/**
 * The function gets URL params of number of the film for creating html page,
 * and gets data about film by number from firebase.
 */
async function getFilmInfo() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());

	const film = [];

	await firebase
		.firestore()
		.collection("films")
		.where("pk", "==", +params["film-number"])
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				film.push(doc.data());
			});
		});

	createFilmInfoHTML(film[0]);
}
