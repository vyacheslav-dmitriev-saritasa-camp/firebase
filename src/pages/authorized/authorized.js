const logOut = document.querySelector('#logOut')

logOut.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        localStorage.setItem('auth', false)
        window.location.assign('http://127.0.0.1:5500/src/pages/login/login.html');
    })
});

function getLoginStatus() {
    const isAuth = JSON.parse(localStorage.getItem('auth')) || false
    if(isAuth){
        console.log('u r authorized')
    } else{
        window.location.assign('http://127.0.0.1:5500/src/pages/login/login.html');
    }
}
