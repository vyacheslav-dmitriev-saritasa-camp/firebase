const logOut = document.querySelector('#logOut')

logOut.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        window.location.assign('http://127.0.0.1:5500/src/pages/login/login.html');
    })
});

(() => {
    let count = 0
    let waitForCurrentUser = setInterval(() => {
        if (count > 10) {
            clearInterval(waitForCurrentUser)
            window.location.assign('http://127.0.0.1:5500/src/pages/login/login.html');
        }
        else if (firebase.auth().currentUser !== null && firebase.auth().currentUser !== undefined) {
            clearInterval(waitForCurrentUser)
            let uid = firebase.auth().currentUser.uid;
            if (uid) {
                document.body.style.display = 'block'
            }
        } else {
            count++
        }
    }, 500);
})();
