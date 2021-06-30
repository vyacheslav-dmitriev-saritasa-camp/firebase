const wrapper = document.querySelector('.wrapper')
const searchButton = document.querySelector('button#search')
const sortByButton = document.querySelector('button#sortBy')

sortByButton.addEventListener('click', () => {
    const hiddenInput = document.querySelector('input#hiddenInput').value
    const selectSortValue = document.querySelector('#selectSort').value

    const searchInput = document.querySelector('#search').value
    const selectSearchValue = document.querySelector('#selectSearch').value

    if (hiddenInput === '0') {
        sortBy(selectSortValue, hiddenInput, selectSearchValue, searchInput)
        document.querySelector('input#hiddenInput').value = '1'
    } else {
        sortBy(selectSortValue, hiddenInput, selectSearchValue, searchInput)
        document.querySelector('input#hiddenInput').value = '0'
    }
})

const sortBy = (selectSortValue, hiddenInput, selectSearchValue, searchInput) => {
    sortByFilms(selectSortValue, hiddenInput, selectSearchValue, searchInput).then(films => {
        createBlocksIntoHTML(films)
    })
}

const sortByFilms = async (selectSortValue, hiddenInput, selectSearchValue, searchInput) => {
    const films = []
    if (hiddenInput === '0') {
        if (searchInput.length) {
            if (selectSearchValue === selectSortValue) {
                await firebase.firestore().collection('films').where(`fields.${selectSearchValue}`, '==', searchInput).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        films.push(doc.data())
                    })
                })
            } else {
                await firebase.firestore().collection('films').where(`fields.${selectSearchValue}`, '==', searchInput).orderBy(`fields.${selectSortValue}`).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        films.push(doc.data())
                    })
                })
            }
        } else {
            await firebase.firestore().collection('films').orderBy(`fields.${selectSortValue}`).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    films.push(doc.data())
                })
            })
        }

    } else {
        if (searchInput.length) {
            if(selectSearchValue === selectSortValue){
                await firebase.firestore().collection('films').where(`fields.${selectSearchValue}`, '==', searchInput).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        films.push(doc.data())
                    })
                })
            } else{
                await firebase.firestore().collection('films').where(`fields.${selectSearchValue}`, '==', searchInput).orderBy(`fields.${selectSortValue}`, 'desc').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        films.push(doc.data())
                    })
                })
            }

        } else {
            await firebase.firestore().collection('films').orderBy(`fields.${selectSortValue}`, 'desc').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    films.push(doc.data())
                })
            })
        }
    }
    return films
}

searchButton.addEventListener('click', () => {
    const inputSearch = document.querySelector('input#search').value
    const selectValue = document.querySelector('#selectSearch').value
    if (inputSearch.length) {
        searchBy(selectValue, inputSearch)
    } else {
        loadFilms().then(films => {
            createBlocksIntoHTML(films)
        })
    }
})

const searchBy = (type, input) => {
    searchFilms(type, input).then(films => {
        createBlocksIntoHTML(films)
    })
}

const searchFilms = async (type, input) => {
    const films = []
    await firebase.firestore().collection('films').where(`fields.${type}`, '==', input).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            films.push(doc.data())
        })
    })

    return films
}

const createBlocksIntoHTML = (films) => {
    wrapper.innerHTML = ''
    const head = ['title', 'director', 'producer', 'edited']
    head.forEach(el => {
        const div = document.createElement('div')
        div.innerHTML = `<div class='head item'>
        <button id=${el}>${el}</button>
        <input type="hidden" value="0" id="input${el}">
        </div>`
        wrapper.append(div)
    })

    films.forEach(el => {
        const { fields } = el

        const array = [fields.title, fields.director, fields.producer, fields.edited]

        array.forEach(el => {
            const div = document.createElement('div')
            div.innerHTML = `<div class='item'><h3>${el}</h3></div>`
            wrapper.append(div)
        })
    })
}

const loadFilms = async () => {
    const films = []

    await firebase.firestore().collection('films').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            films.push(doc.data())
        })
    })

    return films
}

loadFilms().then(films => {
    createBlocksIntoHTML(films)
})
