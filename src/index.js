const wrapper = document.querySelector(".wrapper");
const sortByButton = document.querySelector("button#sortBy");
const input = document.querySelector("#search");
const selectSearch = document.querySelector("#selectSearch");

(function initialApp() {
    const isAuth = getLoginStatus();
    const headerLogin = document.querySelector(".header__login");

    if (isAuth) {
        headerLogin.innerHTML = "";
        const a = document.createElement("a");
        a.innerHTML = `<a href='http://127.0.0.1:5500/src/pages/logout/logout.html'>Logout</a>`;
        headerLogin.append(a);

        loadFilms().then(films => {
            createBlocksIntoHTML(isAuth, films);
        });
    } else {
        headerLogin.innerHTML = "";

        const a = document.createElement("a");

        a.innerHTML = `
            <a href="./pages/login/login.html">Login</a>
            <a href="./pages/registration/registration.html">Registration</a>
        `;

        headerLogin.append(a);

        loadFilms().then(films => {
            createBlocksIntoHTML(isAuth, films);
        });
    }
})();

// initialApp();

function debounce(func, wait, immediate) {
    let timeout;

    return function () {
        const context = this,
            args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            timeout = null;

            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) {
            func.apply(context, args);
        }
    };
}

const myEfficientFn = debounce(function () {
    const inputSearch = document.querySelector("input#search").value;
    const selectSearchValue = document.querySelector("#selectSearch").value;

    if (inputSearch.length) {
        searchBy(selectSearchValue, inputSearch);
    } else {
        loadFilms().then(films => {
            const isAuth = getLoginStatus();

            createBlocksIntoHTML(isAuth, films);
        });
    }
}, 250);

selectSearch.addEventListener("change", () => {
    myEfficientFn();
});

input.addEventListener("input", () => {
    myEfficientFn();
});

sortByButton.addEventListener("click", () => {
    const hiddenInput = document.querySelector("input#hiddenInput").value;
    const selectSortValue = document.querySelector("#selectSort").value;

    const searchInput = document.querySelector("#search").value;
    const selectSearchValue = document.querySelector("#selectSearch").value;

    if (hiddenInput === "0") {
        sortBy(selectSortValue, hiddenInput, selectSearchValue, searchInput);
        document.querySelector("input#hiddenInput").value = "1";
    } else {
        sortBy(selectSortValue, hiddenInput, selectSearchValue, searchInput);
        document.querySelector("input#hiddenInput").value = "0";
    }
});

const sortBy = (
    selectSortValue,
    hiddenInput,
    selectSearchValue,
    searchInput
) => {
    sortByFilms(
        selectSortValue,
        hiddenInput,
        selectSearchValue,
        searchInput
    ).then(films => {
        const isAuth = getLoginStatus();

        createBlocksIntoHTML(isAuth, films);
    });
};

const sortByFilms = async (
    selectSortValue,
    hiddenInput,
    selectSearchValue,
    searchInput
) => {
    const films = [];
    if (hiddenInput === "0") {
        if (searchInput.length) {
            if (selectSearchValue === "pk") {
                if (Number.isInteger(+searchInput)) {
                    await firebase
                        .firestore()
                        .collection("films")
                        .where(selectSearchValue, "==", Number(searchInput))
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                films.push(doc.data());
                            });
                        });

                    const sortAr = films.sort((a, b) =>
                        a.selectSortValue > b.selectSortValue ? 1 : -1
                    );

                    return sortAr;
                }
            } else {
                await firebase
                    .firestore()
                    .collection("films")
                    .where(selectSearchValue, ">=", searchInput)
                    .where(selectSearchValue, "<=", searchInput + "\uf8ff")
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            films.push(doc.data());
                        });
                    });

                const sortAr = films.sort((a, b) =>
                    a.selectSortValue > b.selectSortValue ? 1 : -1
                );

                return sortAr;
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
        if (searchInput.length) {
            if (selectSearchValue === "pk") {
                if (Number.isInteger(+searchInput)) {
                    await firebase
                        .firestore()
                        .collection("films")
                        .where(selectSearchValue, "==", Number(searchInput))
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                films.push(doc.data());
                            });
                        });

                    const sortAr = films.sort((a, b) =>
                        a.selectSortValue > b.selectSortValue ? -1 : 1
                    );

                    return sortAr;
                }
            } else {
                await firebase
                    .firestore()
                    .collection("films")
                    .where(selectSearchValue, ">=", searchInput)
                    .where(selectSearchValue, "<=", searchInput + "\uf8ff")
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            films.push(doc.data());
                        });
                    });

                const sortAr = films.sort((a, b) =>
                    a.selectSortValue > b.selectSortValue ? -1 : 1
                );
                return sortAr;
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
};

const searchBy = (selectSearchValue, inputSearch) => {
    searchFilms(selectSearchValue, inputSearch).then(films => {
        const isAuth = getLoginStatus();

        createBlocksIntoHTML(isAuth, films);
    });
};

const searchFilms = async (selectSearchValue, inputSearch) => {
    const films = [];

    if (selectSearchValue === "pk") {
        if (Number.isInteger(+inputSearch)) {
            await firebase
                .firestore()
                .collection("films")
                .where(selectSearchValue, "==", Number(inputSearch))
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
            .where(selectSearchValue, ">=", inputSearch)
            .where(selectSearchValue, "<=", inputSearch + "\uf8ff")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    films.push(doc.data());
                });
            });
    }
    return films;
};

const createBlocksIntoHTML = (isAuth, films) => {
    const list_element = document.querySelector("#list");
    const pagination_element = document.querySelector("#pagination");

    let current_page = 1;
    let rows = 4;

    function DisplayList(isAuth, items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";
        const head = ["number", "title", "director", "producer", "edited"];

        head.forEach(el => {
            const div = document.createElement("div");

            div.innerHTML = `
            <div class='head item'>
                <h2 id=${el}>${el}</h2>
            </div>`;

            wrapper.appendChild(div);
        });

        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];
            console.log(item);

            const { pk: number } = item;
            const { fields } = item;
            const array = [
                number,
                fields.title,
                fields.director,
                fields.producer,
                fields.edited,
            ];
            array.forEach(el => {
                if (isAuth && Number.isInteger(el)) {
                    const div = document.createElement("div");
                    div.innerHTML = `
                <div class='item'>
                    <h3>
                        <a href='http://127.0.0.1:5500/src/pages/authorized/film-info.html?film-number=${el}' target='_blank'>${el}</a>
                    </h3>
                </div>`;
                    wrapper.append(div);
                } else {
                    const div = document.createElement("div");

                    div.innerHTML = `
                    <div class='item'>
                        <h3>${el}</h3>
                    </div>`;
                    wrapper.append(div);
                }
            });
        }
    }

    function SetupPagination(isAuth, items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";

        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(isAuth, i, items);
            wrapper.appendChild(btn);
        }
    }

    function PaginationButton(isAuth, page, items) {
        const button = document.createElement("button");

        button.classList.add("pagination");

        button.innerText = page;

        if (current_page == page) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            current_page = page;
            DisplayList(isAuth, items, list_element, rows, current_page);

            let current_btn = document.querySelector("button.active");
            current_btn.classList.remove("active");

            button.classList.add("active");
        });

        return button;
    }

    DisplayList(isAuth, films, list_element, rows, current_page);
    SetupPagination(isAuth, films, pagination_element, rows);
};

async function loadFilms() {
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
