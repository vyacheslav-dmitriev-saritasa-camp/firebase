/**
 * The function creates a title of the table and append it into HTML.
 */
function createHead() {
	const head = ["number", "title", "director", "producer", "edited"];

	const listHeads = document.createElement("div");
	listHeads.classList.add("list__heads");

	head.forEach(el => {
		const div = document.createElement("div");
		div.classList.add("head-item");

		div.innerHTML = `
                <h2 id=${el}>${el}</h2>
            `;

		listHeads.append(div);
	});

	list.append(listHeads);
}
