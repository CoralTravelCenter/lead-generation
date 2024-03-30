import Pristine from "pristinejs/dist/pristine";
import {inputMask} from "./input-mask";
import {sendFormData} from "./api.js";
import {Thanks, Oops} from "./thanks.js";

const url_1 = 'apishar.coral.school/CoralCustomersInfo/Api/SaveInfoForOffice';
const url_2 = 'https://apishar.coral.school/consents/api/accept';

Pristine.setLocale('ru');

// Переопределяем стандартные сообщения об ошибках
Pristine.addMessages('ru', {
	required: 'Это поле обязательно к заполнению',
	email: 'Введите корректный email',
	checkbox: 'Необходимо согласиться с политикой конфиденциальности'
});

export function formValidate(form, reservationType, id, link) {
	const prestineConfig = {
		classTo: 'form-field', // Элемент, на который будут добавляться классы
		errorClass: 'form-field--invalid', // Класс, обозначающий невалидное поле
		successClass: 'form-field--valid', // Класс, обозначающий валидное поле
		errorTextParent: 'form-field', // Элемент, куда будет выводиться текст с ошибкой
		errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
		errorTextClass: 'form-error', // Класс для элемента с текстом ошибки
	}

	const pristine = new Pristine(form, prestineConfig);

	const tel_field = form.querySelector('input[data-tel-input]');
	inputMask(tel_field);

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const isValide = pristine.validate();
		if (isValide) {
			const required_data = {
				"AgencyLocalName": document.querySelector('.addressee-grid .office-name').textContent,
				"AgencyEmail": document.querySelector('.addressee-grid .office-email').textContent,
				"AgencyPhone": document.querySelector('.addressee-grid .office-phone').textContent,
				"AgencyAddress": document.querySelector('.addressee-grid .office-address').textContent,
				"AgencyEEId": id,
				"FullName": form.querySelector('[name=fio]').value,
				"CityDeparture": form.querySelector('[name=depart_from]').value,
				"Country": form.querySelector('[name=destination_country]').value,
				"HotelName": form.querySelector('[name=hotel]').value,
				"NumberOfNights": form.querySelector('[name=tour_nights]').value,
				"CountPeoples": form.querySelector('[name=pax]').value,
				"Comment": `${form.querySelector('[name=comments]').value}, Ссылка: ${link}`,
				"IsConsent": true,
				"Email": form.querySelector('[name=email]').value,
				"Phone": form.querySelector('[name=phone]').value,
				"TypeReservation": `${(reservationType === 1) ? 'package' : 'onlyhotel'}`,
				"DesiredDepartureDate": form.querySelector('[name=tour_date]').value,
				"SourceLead string": true
			};

			const formData = new FormData();
			Object.entries(required_data).forEach(([key, value]) => {
				formData.append(key, value);
			});

			console.log(formData)

			//            sendFormData(formData, url_1, url_2).then(()=> {
			//                document.querySelector('leed-form').style.display = 'none';
			//                document.getElementById('lead-generation-app').append(new Thanks())
			//            }).catch(err => {
			//                document.querySelector('leed-form').style.display = 'none';
			//                document.getElementById('lead-generation-app').append(new Oops());
			//                console.error(err.message);
			//            })

		} else {
			console.log('Форма не валидна!')
		}
	})
}

