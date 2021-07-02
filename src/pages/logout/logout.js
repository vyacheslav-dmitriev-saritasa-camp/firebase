firebase
    .auth()
    .signOut()
    .then(() => {
        localStorage.setItem("auth", false);
        window.location.assign("http://127.0.0.1:5500/src/index.html");
    });
