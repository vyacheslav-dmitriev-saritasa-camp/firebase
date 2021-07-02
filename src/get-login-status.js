function getLoginStatus() {
	return JSON.parse(localStorage.getItem("auth")) || false;
}
