(() => {
    let count = 0
    let waitForCurrentUser = setInterval(() => {
        if (count > 10) {
            clearInterval(waitForCurrentUser)
        }
        else if (firebase.auth().currentUser !== null && firebase.auth().currentUser !== undefined) {
            clearInterval(waitForCurrentUser)
            let uid = firebase.auth().currentUser.uid;
            if (uid) {
                window.location.assign('http://127.0.0.1:5500/src/pages/authorized/authorized.html');
            }
        } else {
            count++
        }
    }, 500);
})();
