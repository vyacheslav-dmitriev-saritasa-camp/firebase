function check() {
	let count = 0;
	let waitForCurrentUser = setInterval(() => {
		if (count > 10) {
			clearInterval(waitForCurrentUser);
			localStorage.setItem("auth", false);
		} else if (
			firebase.auth().currentUser !== null &&
			firebase.auth().currentUser !== undefined
		) {
			clearInterval(waitForCurrentUser);
			let uid = firebase.auth().currentUser.uid;
			if (uid) {
				localStorage.setItem("auth", true);
			}
		} else {
			count++;
		}
	}, 500);
}
check();
