/**
 * Create info about film into HTML.
 * @param {Object} film - The object with info about film.
 * @param {number} film.pk - The number of film from collection films.
 * @param {string} film.fields.created - The date when film was created.
 * @param {string} film.fields.director - The name of the director this film.
 * @param {string} film.fields.opening_crawl - The description about this film.
 */
function createFilmInfoHTML(film) {
	const wrapper = document.querySelector(".wrapper");
	const div = document.createElement("div");
	div.innerHTML = `
        <div class='box'>
            <div class='item'>Number: ${film.pk}</div>
            <div class='item'>Created: ${film.fields.created}</div>
            <div class='item'>Director: ${film.fields.director}</div>
            <div class='item'>Description: ${film.fields.opening_crawl}</div>
        </div>
    `;

	wrapper.append(div);
}
