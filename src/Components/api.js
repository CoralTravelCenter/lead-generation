const url_1 = 'apishar.coral.school/CoralCustomersInfo/Api/SaveInfoForOffice';
const url_2 = 'https://apishar.coral.school/consents/api/accept';

export async function getData(URL, body) {
	try {
		const response = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (err) {
		console.error('Произошла ошибка!', err);
	}
}

export const sendFormData = async (formData, url1, url2) => {
	try {
		// Создаем массив промисов для отправки данных на оба адреса
		const requests = [fetch(url1, {
			method: 'POST',
			body: formData
		}), fetch(url2, {
			method: 'POST',
			body: formData
		})];

		// Используем Promise.all для одновременной отправки данных
		const responses = await Promise.all(requests);

		// Обработка ответов от обоих запросов
		const results = await Promise.all(responses.map(r => r.json()));

		console.log('Данные успешно отправлены на оба адреса:', results);
		return results;
	} catch (error) {
		console.error('Ошибка при отправке данных:', error);
		throw error;
	}
};
