const wrapper = document.querySelector('.wrapper')
const searchButton = document.querySelector('button#search')
const sortButton = document.querySelector('button#sort')
const db = firebase.firestore()

searchButton.addEventListener('click', () => {
    const inputSearch = document.querySelector('input.search')
    const input = inputSearch.value

    if (input.length) {
        searchByProducer(input)
    } else {
        loadFilms().then(films => {
            createBlocksIntoHTML(films)
        })
    }
})

const searchByProducer = (input) => {
    searchFilms(input).then(films => {
        createBlocksIntoHTML(films)
    })
}

const searchFilms = async (input) => {
    const films = []
    await db.collection('films').where('fields.producer', '==', input).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            films.push(doc.data())
        })
    })

    return films
}

sortButton.addEventListener('click', () => {
    const hiddenInput = document.querySelector('input#hiddenInput')
    const input = hiddenInput.value

    if (input === '0') {
        sortByProducer(input)
        document.querySelector('input#hiddenInput').value = '1'
    } else {
        sortByProducer(input)
        document.querySelector('input#hiddenInput').value = '0'
    }
})

const sortByProducer = (input) => {
    sortFilms(input).then(films => {
        createBlocksIntoHTML(films)
    })
}

const sortFilms = async (input) => {
    const films = []
    if (input === '0') {
        await db.collection('films').orderBy('fields.producer').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                films.push(doc.data())
            })
        })
    } else {
        await db.collection('films').orderBy('fields.producer', 'desc').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                films.push(doc.data())
            })
        })
    }

    return films
}

const isAuth = localStorage.getItem('auth') || false

if (isAuth) {
    window.location.href = './authorized.html'
}

const createBlocksIntoHTML = (films) => {
    wrapper.innerHTML = ''

    films.forEach(el => {
        const { fields } = el

        const div = document.createElement('div')
        div.className = 'film'
        div.innerHTML = `
        <div class='d-flex text'><h2>Title:</h2>${fields.title}</div>
        <div class='d-flex text'><h2>Director:</h2> ${fields.director}</div>
        <div class='d-flex text'><h2>Producer:</h2>${fields.producer}</div>
        <div class='d-flex text'><h2>Edited:</h2>${fields.edited}</div>
        `
        wrapper.append(div)
    })
}

const loadFilms = async () => {
    const films = []

    await db.collection('films').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            films.push(doc.data())
        })
    })

    return films
}

loadFilms().then(films => {
    createBlocksIntoHTML(films)
})
