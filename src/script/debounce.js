/**
 * The function which waits n-time for call main function.
 * @param {function} func - The function for calling after wait-ms.
 * @param {number} wait - The time after which the function will be called.
 * @returns function which is ready to call.
 */
function debounce(func, wait) {
	let timeout;

	return function () {
		const context = this;
		const args = arguments;

		clearTimeout(timeout);

		timeout = setTimeout(function () {
			timeout = null;

			func.apply(context, args);
		}, wait);
	};
}
