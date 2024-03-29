import Cookies from 'js-cookie';

(() => {
	async function docReady(callback) {
		return new Promise(resolve => {
			if (document.readyState === 'complete') {
				if (callback) callback();
			} else {
				document.addEventListener('readystatechange', () => {
					if (document.readyState === 'complete' && callback) callback();
				});
			}
			resolve();
		});
	}

	docReady(() => {
		setTimeout(() => {
			Cookies.set('Lead', true);
		});
	});
})();
