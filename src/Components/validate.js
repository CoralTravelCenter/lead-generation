import Pristine from "pristinejs/dist/pristine";
import { removeTabs } from "./utils.js";
// import {inputMask} from "./input-mask";
// import {sendFormData} from "./api.js";
// import {Thanks, Oops} from "./thanks.js";

// const app_endpoint = '//apishar.coral.school/CoralCustomersInfo/Api/SaveInfoForOffice';
// const agreement_endpoint = '//apishar.coral.school/consents/api/accept';

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
	// inputMask(tel_field);
	$(tel_field).inputmask({ "mask": "+7 (999) 999-99-99", clearMaskOnLostFocus: false });
	const tour_date_field = form.querySelector('[name="tour_date"]');
	$(tour_date_field).inputmask({ mask: "99/99/9999", clearIncomplete: true, clearMaskOnLostFocus: false });


	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const isValide = pristine.validate();
		if (isValide) {
			let phone_digits = form.querySelector('[name=phone]').value.replace(/\D/g,'');
			let user_comment = form.querySelector('[name=comments]').value;
			const comments = [];
			if (user_comment) comments.push(user_comment);
			comments.push(`Ссылка: ${ link }`);
			let tour_date = $(tour_date_field).inputmask('unmaskedvalue');
			if (tour_date) {
				tour_date = tour_date.match(/(\d\d)(\d\d)(\d\d\d\d)/).slice(1, 4).reverse().join('-');
			}

			const app_req_params = {
				"AgencyLocalName": document.querySelector('.addressee-grid .office-name').textContent,
				"AgencyEmail": removeTabs(document.querySelector('.addressee-grid .office-email').textContent),
				"AgencyPhone": removeTabs(document.querySelector('.addressee-grid .office-phone').textContent),
				"AgencyAddress": removeTabs(document.querySelector('.addressee-grid .office-address').textContent),
				"AgencyEEId": parseInt(id, 10),
				"FullName": form.querySelector('[name=fio]').value,
				"CityDeparture": form.querySelector('[name=depart_from]').value,
				"Country": form.querySelector('[name=destination_country]').value,
				"HotelName": form.querySelector('[name=hotel]').value,
				"NumberOfNights": form.querySelector('[name=tour_nights]').value,
				"CountPeoples": form.querySelector('[name=pax]').value,
				"Comment": comments.join('; '),
				"IsConsent": true,
				"Email": removeTabs(form.querySelector('[name=email]').value),
				// "Phone": removeTabs(form.querySelector('[name=phone]').value),
				// "Phone": [...phone_digits].slice(-10).join(''),
				"Phone": $(tel_field).inputmask('unmaskedvalue'),
				"TypeReservation": `${ (reservationType === 1) ? 'package' : 'hotel' }`,
				"DesiredDepartureDate": tour_date,
				"SourceLead": true
			};
			var agreement_req_params = {
				FName: 		 form.querySelector('[name=fio]').value,
				PhoneNumber: $(tel_field).inputmask('unmaskedvalue'),
				Email:       removeTabs(form.querySelector('[name=email]').value),
				IPLocation:  '',
				FUrl:        "https://new.coral.ru/",
				ProjectId:   13,
				DocumentId:  42,
				Confirm:     true,
				FormPage:   "https://new.coral.ru/buy-in-office/"
			};
			console.log('+++ app_req_params: %o', app_req_params);
			console.log('+++ agreement_req_params: %o', agreement_req_params);

			form.classList.add('in-progress');

			var $SaveInfoForOffice = $.ajax('//apishar.coral.school/CoralCustomersInfo/Api/SaveInfoForOffice', {
				method: 'POST',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(app_req_params)
			});
			var $consentAccept = $.ajax('//apishar.coral.school/consents/api/accept', {
				method: 'POST',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(agreement_req_params)
			});
			$.when($SaveInfoForOffice, $consentAccept).done(function () {
				$(form).slideUp().siblings('.thanks').slideDown();
				form.classList.remove('in-progress');
			}).fail(function () {
				console.log(arguments);
				alert("Что-то пошло не так ;(\nПожалуста, попробуйте позже...");
				form.classList.remove('in-progress');
				// location.hash = '#_';
			});


		} else {
			console.log('Форма не валидна!')
		}
	})
}

