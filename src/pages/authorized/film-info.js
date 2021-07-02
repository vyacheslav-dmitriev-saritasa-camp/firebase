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

function initApp() {
    const isAuth = JSON.parse(localStorage.getItem("auth")) || false;
    if (isAuth) {
        getFilmInfo();
    } else {
        window.location.assign(
            "http://127.0.0.1:5500/src/pages/login/login.html"
        );
    }
}
initApp();
