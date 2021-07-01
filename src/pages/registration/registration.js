const sendRegistration = document.querySelector('#sendRegistration');

function initialApp(){
    const isAuth = getLoginStatus();

    if(isAuth){
        window.location.assign('http://127.0.0.1:5500/src/');
    }
}

initialApp();

sendRegistration.addEventListener('click', () => {
    const login = document.querySelector('#login').value;
    const password = document.querySelector('#password').value;

    reg(login, password);
})

const reg = async (login, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(() => {
                localStorage.setItem('auth', true);

                window.location.assign('http://127.0.0.1:5500/src/');
            })
            .catch((e) => {
                localStorage.setItem('auth', false);

                document.querySelector('#login').value = '';
                document.querySelector('#password').value = '';
            })
    }
    catch (err) {
        localStorage.setItem('auth', false);
    }
}
