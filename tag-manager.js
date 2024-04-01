(function () {
	async function docReady(callback) {
		return new Promise(function (resolve) {
			if (document.readyState === "complete") {
				if (callback) callback();
				resolve();
			} else {
				document.addEventListener('readystatechange', function () {
					if (document.readyState === "complete") {
						if (callback) callback();
					}
				});

				resolve();
			}
		});
	}

	function loadScript(url) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			script.onload = () => resolve(`Скрипт успешно загружен: ${url}`);
			script.onerror = () => reject(new Error(`Не удалось загрузить скрипт: ${url}`));
			document.head.appendChild(script);
		});
	}

	docReady(() => {
		setTimeout(() => {
			if (Cookies.get('Lead')) {
				async function loadYandexMapsScript(yandexMapsUrl, anotherScriptUrl) {
					try {
						await loadScript(yandexMapsUrl);
						console.log('Скрипт Яндекс Карт загружен.');
						await loadScript(anotherScriptUrl);
						console.log('Скрипт приложения загружен');
					} catch (error) {
						console.error(error);
					}
				}

				const yandexMapsUrl = 'https://api-maps.yandex.ru/2.1.64/?apikey=49de5080-fb39-46f1-924b-dee5ddbad2f1&lang=ru-RU';
				const anotherScriptUrl = 'https://b2ccdn.coral.ru/content/user-scripts/lead-generation/lead_generation_user_3.js';
				loadYandexMapsScript(yandexMapsUrl, anotherScriptUrl);
			}
		});
	});
})();


// Убрать когда будет билд

//function loadScript(url) {
//	return new Promise((resolve, reject) => {
//		const script = document.createElement('script');
//		script.type = 'text/javascript';
//		script.src = url;
//		script.onload = () => resolve(`Скрипт успешно загружен: ${url}`);
//		script.onerror = () => reject(new Error(`Не удалось загрузить скрипт: ${url}`));
//		document.head.appendChild(script);
//	});
//}
//
//async function loadYandexMapsScript(yandexMapsUrl, anotherScriptUrl) {
//	try {
//		await loadScript(yandexMapsUrl);
//		console.log('Скрипт Яндекс Карт загружен.');
//	} catch (error) {
//		console.error(error);
//	}
//}
//
//const yandexMapsUrl = 'https://api-maps.yandex.ru/2.1.64/?apikey=49de5080-fb39-46f1-924b-dee5ddbad2f1&lang=ru-RU';
//loadYandexMapsScript(yandexMapsUrl);