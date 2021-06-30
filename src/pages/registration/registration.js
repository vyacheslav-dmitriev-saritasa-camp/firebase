const sendRegistration = document.querySelector('#sendRegistration')

sendRegistration.addEventListener('click', () => {
    const login = document.querySelector('#login').value
    const password = document.querySelector('#password').value
    reg(login, password)
})


const reg = async (login, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(() => {
                window.location.assign('http://127.0.0.1:5500/src/pages/authorized/authorized.html');
            })
            .catch((e) => {
                console.log(e)
                document.querySelector('#login').value = ''
                document.querySelector('#password').value = ''
            })
    }
    catch (err) {
        console.log(err)
    }
}
