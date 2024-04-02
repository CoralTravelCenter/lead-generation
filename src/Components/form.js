import {formValidate} from "./validate";
import {departure_JSON} from "../main.js";

export class Form extends HTMLElement {
	constructor(office_obj, search_params) {
		super();
		this.office_obj = office_obj;
		this.searchCriteria = search_params.result.searchCriterias;
		this.depart_from = this.searchCriteria.departureLocations[0].name;
		this.begin_dates = this.searchCriteria.beginDates[0];
		this.passengers = this.searchCriteria.roomCriterias[0].passengers.length;
		// this.nights = this.searchCriteria.nights;
		this.nights = this.searchCriteria.nights.map(n => n.value).join(',');
		this.destination = this.searchCriteria.arrivalLocations[0].parent.name;
		this.hotel_name = this.searchCriteria.arrivalLocations[0].name;
		this.link = location.href;
	}

	render() {
		this.innerHTML = `
			<div id="app-form">
    <a href="#_"></a>
    <div class="popin-container">
        <h4 class="form-heading">Заявка на подбор тура</h4>
        <div class="addressee-grid">
            <div class="heading">Офис:</div>
            <div class="value office-name">${ this.office_obj.office }</div>
            <div class="heading">Адрес:</div>
            <div class="value office-address">${ this.office_obj.addres }</div>
            ${ (this.office_obj.email !== undefined) ? `
                <div class="heading">E-mail:</div>
                <div class="value office-email">${ this.office_obj.email }</div>
            ` : '' }
            ${ (this.office_obj.phone !== undefined) ? `
                <div class="heading">Телефоны</div>
                <div class="value office-phone">${ this.office_obj.phone }</div>
            ` : '' }
        </div>
        <form id="lead-form" autocomplete="off" novalidate method="post">
            <div class="form-field">
                <div class="label">ФИО</div>
                <input name="fio" type="text" required data-pristine-required-message="Это поле обязательно для заполнения"/>
            </div>
            <div class="form-field">
                <div class="label">E-mail</div>
                <input name="email" type="email" data-mail-input required data-pristine-required-message="Это поле обязательно для заполнения"/>
            </div>
            <div class="form-field">
                <div class="label">Номер телефона</div>
                <input name="phone" type="tel" required data-tel-input data-pristine-required-message="Это поле обязательно для заполнения"/>
            </div>
            <div class="form-field">
                <div class="label">Город вылета</div>
                <input name="depart_from" type="text" value="${ this.depart_from }"/>
            </div>
            <div class="form-field">
                <div class="label">Направление</div>
                <input name="destination_country" type="text" value='${ this.destination }'/>
            </div>
            <div class="form-field">
                <div class="label">Название отеля</div>
                <input name="hotel" type="text" value='${ this.hotel_name }'/>
            </div>
            <div class="form-field">
                <div class="label">Желаемая дата вылета</div>
                <input name="tour_date" type="text" value='${ this.begin_dates.split('-').reverse().join('/') }'/>
            </div>
            <div class="form-field">
                <div class="label">Количество ночей</div>
                <input name="tour_nights" type="text" value='${ this.nights }'/>
            </div>
            <div class="form-field">
                <div class="label">Количество взрослых и детей</div>
                <input name="pax" type="text" value='${ this.passengers }'/>
            </div>
            <div class="form-field">
                <div class="label">Комментарий</div>
                <textarea name="comments"></textarea>
			</div>
            <div class="form-field required">
                <div class="labeled-checkbox">
                    <label>
                        <input class="visually-hidden" type="checkbox" name="agreed" id="_agreed" required data-pristine-required-message="Необходимо согласиться с политикой конфеденциальности">
                        <div class="custom-checkbox">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.97953 8.31319C3.17479 8.11793 3.49137 8.11793 3.68664 8.31319L5.99975 10.6263L12.3129 4.31319C12.5081 4.11793 12.8247 4.11793 13.02 4.31319C13.2152 4.50846 13.2152 4.82504 13.02 5.0203L6.3533 11.687C6.15804 11.8822 5.84146 11.8822 5.6462 11.687L2.97953 9.0203C2.78427 8.82504 2.78427 8.50846 2.97953 8.31319Z" fill="white"/>
                            </svg>
                        </div>
                        <span>
                            Нажимая на кнопку, я подтверждаю свое согласие на обработку моих персональных данных
                            в соответствии с ФЗ «О персональных данных» от 27.07.2006г. № 152-ФЗ,
                            с <a>Политикой обработки персональных данных</a> ознакомлен и согласен.
                        </span>
                    </label>
                </div>
            </div>
            <div class="form-field">
                <button type="submit">Отправить</button>
            </div>
        </form>
        <div class="thanks">
            <div class="inhalt">
                <h3>Спасибо!</h3>
                <p>Ваша заявка отправлена.</p>
                <p>Наши сотрудники свяжутся с&nbsp;вами в&nbsp;ближайшее&nbsp;время.</p>
            </div>
        </div>
        <button class="dismiss">
           <svg width="64px" height="64px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"></path> </g></svg>
        </button>
    </div>
</div>
		`;
		document.body.style.overflow = 'hidden';
	}

	closeForm() {
		this.querySelector('.dismiss').addEventListener('click', () => {
			this.remove();
			document.body.style.overflow = 'auto';
		})
		document.addEventListener('keydown', event => {
			if (event.key === "Escape" || event.keyCode === 27) {
				this.remove();
				document.body.style.overflow = 'auto';
			}
		});

		document.body.addEventListener('click', (e) => {
			if (!this.querySelector('.popin-container').contains(e.target)) {
				this.remove();
				document.body.style.overflow = 'auto';
			}
		})
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.form = this.querySelector('#lead-form');
			formValidate(this.form, this.searchCriteria.reservationType, this.office_obj.id, this.link);
			this.closeForm();
			this.rendered = true;
		}
	}
}

customElements.define("leed-form", Form);