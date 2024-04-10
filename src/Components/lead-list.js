export class LeadModule extends HTMLElement {
	constructor(API_data) {
		super();
		this.classList.add('search-result');
		this.area = API_data.result.areaLookup;
		this.agency = API_data.result.items;
		this.metroStation = API_data.result.metroStationsLookup;
		this.officeWithoutMetro = [];
	}

	groupedOfficeByAdress() {
		return this.metroStation.map(station => {
			return this.agency.filter(item => {
				if (item.metroName === station) {
					return item;
				}
			})
		})
	}

	officeWithOutMetro() {
		return this.agency.filter(item => {
			if (item.metroStation.length === 0) {
				return item;
			}
		})
	}

	officeGeneration() {
		if (this.metroStation.length > 0) {
			return this.groupedOfficeByAdress().map((office, idx) => {
				return `
				<p>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C7.99594 2.75 4.75 5.99594 4.75 10C4.75 10.9073 5.17155 12.0709 5.90354 13.371C6.6242 14.651 7.59493 15.9758 8.58078 17.1823C9.56431 18.386 10.5499 19.4563 11.2906 20.2264C11.5656 20.5124 11.8063 20.7564 12 20.9499C12.1937 20.7564 12.4344 20.5124 12.7094 20.2264C13.4501 19.4563 14.4357 18.386 15.4192 17.1823C16.4051 15.9758 17.3758 14.651 18.0965 13.371C18.8284 12.0709 19.25 10.9073 19.25 10C19.25 5.99594 16.0041 2.75 12 2.75ZM12 22C11.4841 22.5444 11.484 22.5443 11.4838 22.5441L11.477 22.5377L11.4586 22.5201L11.389 22.4532C11.3286 22.3948 11.2408 22.3093 11.1294 22.1993C10.9066 21.9794 10.5895 21.6614 10.2094 21.2662C9.45014 20.4767 8.43569 19.3754 7.41922 18.1314C6.40507 16.8902 5.3758 15.4911 4.59646 14.1069C3.82845 12.7428 3.25 11.3018 3.25 10C3.25 5.16751 7.16751 1.25 12 1.25C16.8325 1.25 20.75 5.16751 20.75 10C20.75 11.3018 20.1716 12.7428 19.4035 14.1069C18.6242 15.4911 17.5949 16.8902 16.5808 18.1314C15.5643 19.3754 14.5499 20.4767 13.7906 21.2662C13.4105 21.6614 13.0934 21.9794 12.8706 22.1993C12.7592 22.3093 12.6714 22.3948 12.611 22.4532L12.5414 22.5201L12.523 22.5377L12.518 22.5424L12.5166 22.5437C12.5164 22.5439 12.5159 22.5444 12 22ZM12 22L12.5166 22.5437L12 23.0333L11.4838 22.5441L12 22Z" fill="#535353"></path><path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#535353"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 9.75C11.8619 9.75 11.75 9.86193 11.75 10C11.75 10.1381 11.8619 10.25 12 10.25C12.1381 10.25 12.25 10.1381 12.25 10C12.25 9.86193 12.1381 9.75 12 9.75ZM10.25 10C10.25 9.0335 11.0335 8.25 12 8.25C12.9665 8.25 13.75 9.0335 13.75 10C13.75 10.9665 12.9665 11.75 12 11.75C11.0335 11.75 10.25 10.9665 10.25 10Z" fill="#535353"></path></svg>
					${this.metroStation[idx]}
				</p>
				<ul class="offices-list">
					${office.map(item => {
					return `
							<li class="office" id='${item.id}'>
								<div>
									<h4 data-office-name>${item.lname}</h4>
									${(item.addres !== '') ? `
										<p data-office-addres>
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5L7.5 3L12.5 5L17.5 3L22.5 5V21L17.5 19L12.5 21L7.5 19L2.5 21V5Z" stroke="#0092D0" stroke-linejoin="round"></path><path d="M7.5 3V19" stroke="#0092D0"></path><path d="M17.5 3.5V19" stroke="#0092D0"></path><path d="M12.5 5V20.5" stroke="#0092D0"></path></svg>
										${item.address}
									</p>
									` : ''}
										<p data-office-phone>
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 5.5C2 3.29086 3.79086 1.5 6 1.5H19C21.2091 1.5 23 3.29086 23 5.5V8C23 8.27614 22.7761 8.5 22.5 8.5H17.5C17.2239 8.5 17 8.27614 17 8V7C17 6.17157 16.3284 5.5 15.5 5.5H9.5C8.67157 5.5 8 6.17157 8 7V8C8 8.27614 7.77614 8.5 7.5 8.5H2.5C2.22386 8.5 2 8.27614 2 8V5.5ZM6 2.5C4.34315 2.5 3 3.84315 3 5.5V7.5H7V7C7 5.61929 8.11929 4.5 9.5 4.5H15.5C16.8807 4.5 18 5.61929 18 7V7.5H22V5.5C22 3.84315 20.6569 2.5 19 2.5H6Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.0301 10.8291C6.10196 10.6315 6.28975 10.5 6.5 10.5H18.5C18.7103 10.5 18.898 10.6315 18.9699 10.8291L20.9699 16.3291C20.9898 16.3839 21 16.4417 21 16.5V22C21 22.2761 20.7761 22.5 20.5 22.5H4.5C4.22386 22.5 4 22.2761 4 22V16.5C4 16.4417 4.01019 16.3839 4.0301 16.3291L6.0301 10.8291ZM6.85021 11.5L5 16.5881V21.5H20V16.5881L18.1498 11.5H6.85021Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 8V11H10V8H11Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8V11H14V8H15Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 14.5C11.3954 14.5 10.5 15.3954 10.5 16.5C10.5 17.6046 11.3954 18.5 12.5 18.5C13.6046 18.5 14.5 17.6046 14.5 16.5C14.5 15.3954 13.6046 14.5 12.5 14.5ZM9.5 16.5C9.5 14.8431 10.8431 13.5 12.5 13.5C14.1569 13.5 15.5 14.8431 15.5 16.5C15.5 18.1569 14.1569 19.5 12.5 19.5C10.8431 19.5 9.5 18.1569 9.5 16.5Z" fill="#0092D0"></path></svg>
										${

						[item.phone1, item.phone2, item.phone3].filter(value => value !== '').join(',')
					}
									</p>
									${(item.email1 !== '') ? `
										<p data-office-mail>
											<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.50024 7.5C3.2241 7.5 3.00024 7.72386 3.00024 8V18C3.00024 18.2761 3.2241 18.5 3.50024 18.5H19.9618C20.2379 18.5 20.4618 18.2761 20.4618 18V9.5H21.4618V18C21.4618 18.8284 20.7902 19.5 19.9618 19.5H3.50024C2.67182 19.5 2.00024 18.8284 2.00024 18V8C2.00024 7.17157 2.67182 6.5 3.50024 6.5H16.5002V7.5H3.50024Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.449 13.8761L2.67981 7.87609L3.24449 7.05078L11.7314 12.8576L17.424 8.96263L17.9887 9.78794L12.0137 13.8761C11.8435 13.9926 11.6193 13.9926 11.449 13.8761Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3919 11.7227L21.315 18.6457L20.6079 19.3528L13.6848 12.4298L14.3919 11.7227Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.0695 11.7227L2.14643 18.6457L2.85353 19.3528L9.77661 12.4298L9.0695 11.7227Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5002 4.5C18.1195 4.5 17.0002 5.61929 17.0002 7C17.0002 8.38071 18.1195 9.5 19.5002 9.5C20.881 9.5 22.0002 8.38071 22.0002 7C22.0002 5.61929 20.881 4.5 19.5002 4.5ZM16.0002 7C16.0002 5.067 17.5672 3.5 19.5002 3.5C21.4332 3.5 23.0002 5.067 23.0002 7C23.0002 8.933 21.4332 10.5 19.5002 10.5C17.5672 10.5 16.0002 8.933 16.0002 7Z" fill="#0092D0"></path></svg>
											${item.email1}
										</p>
									` : ''}
									<button data-form="">Выбрать офис</button>
								</div>
							</li>
						`
				}).join(' ')}
				</ul>
			`;
			}).join(' ')
		} else {
			return null;
		}
	}

	render() {
		if (this.officeGeneration()) {
			this.innerHTML = `
            <div class="lead-generator-result">
                    ${this.officeGeneration()}
										<p>Оффисы без станций метро</p>
				<ul class="offices-list">
				${this.officeWithOutMetro().map(no_metro_item => {
				return `
												<li class="office" id='${no_metro_item.id}'>
								<div>
									<h4 data-office-name>${no_metro_item.lname}</h4>
									${(no_metro_item.addres !== '') ? `
										<p data-office-addres>
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5L7.5 3L12.5 5L17.5 3L22.5 5V21L17.5 19L12.5 21L7.5 19L2.5 21V5Z" stroke="#0092D0" stroke-linejoin="round"></path><path d="M7.5 3V19" stroke="#0092D0"></path><path d="M17.5 3.5V19" stroke="#0092D0"></path><path d="M12.5 5V20.5" stroke="#0092D0"></path></svg>
										${no_metro_item.address}
									</p>
									` : ''}
										<p data-office-phone>
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 5.5C2 3.29086 3.79086 1.5 6 1.5H19C21.2091 1.5 23 3.29086 23 5.5V8C23 8.27614 22.7761 8.5 22.5 8.5H17.5C17.2239 8.5 17 8.27614 17 8V7C17 6.17157 16.3284 5.5 15.5 5.5H9.5C8.67157 5.5 8 6.17157 8 7V8C8 8.27614 7.77614 8.5 7.5 8.5H2.5C2.22386 8.5 2 8.27614 2 8V5.5ZM6 2.5C4.34315 2.5 3 3.84315 3 5.5V7.5H7V7C7 5.61929 8.11929 4.5 9.5 4.5H15.5C16.8807 4.5 18 5.61929 18 7V7.5H22V5.5C22 3.84315 20.6569 2.5 19 2.5H6Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.0301 10.8291C6.10196 10.6315 6.28975 10.5 6.5 10.5H18.5C18.7103 10.5 18.898 10.6315 18.9699 10.8291L20.9699 16.3291C20.9898 16.3839 21 16.4417 21 16.5V22C21 22.2761 20.7761 22.5 20.5 22.5H4.5C4.22386 22.5 4 22.2761 4 22V16.5C4 16.4417 4.01019 16.3839 4.0301 16.3291L6.0301 10.8291ZM6.85021 11.5L5 16.5881V21.5H20V16.5881L18.1498 11.5H6.85021Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 8V11H10V8H11Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8V11H14V8H15Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 14.5C11.3954 14.5 10.5 15.3954 10.5 16.5C10.5 17.6046 11.3954 18.5 12.5 18.5C13.6046 18.5 14.5 17.6046 14.5 16.5C14.5 15.3954 13.6046 14.5 12.5 14.5ZM9.5 16.5C9.5 14.8431 10.8431 13.5 12.5 13.5C14.1569 13.5 15.5 14.8431 15.5 16.5C15.5 18.1569 14.1569 19.5 12.5 19.5C10.8431 19.5 9.5 18.1569 9.5 16.5Z" fill="#0092D0"></path></svg>
										${

					[no_metro_item.phone1, no_metro_item.phone2, no_metro_item.phone3].filter(value => value !== '').join(',')
				}
									</p>
									${(no_metro_item.email1 !== '') ? `
										<p data-office-mail>
											<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.50024 7.5C3.2241 7.5 3.00024 7.72386 3.00024 8V18C3.00024 18.2761 3.2241 18.5 3.50024 18.5H19.9618C20.2379 18.5 20.4618 18.2761 20.4618 18V9.5H21.4618V18C21.4618 18.8284 20.7902 19.5 19.9618 19.5H3.50024C2.67182 19.5 2.00024 18.8284 2.00024 18V8C2.00024 7.17157 2.67182 6.5 3.50024 6.5H16.5002V7.5H3.50024Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.449 13.8761L2.67981 7.87609L3.24449 7.05078L11.7314 12.8576L17.424 8.96263L17.9887 9.78794L12.0137 13.8761C11.8435 13.9926 11.6193 13.9926 11.449 13.8761Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3919 11.7227L21.315 18.6457L20.6079 19.3528L13.6848 12.4298L14.3919 11.7227Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.0695 11.7227L2.14643 18.6457L2.85353 19.3528L9.77661 12.4298L9.0695 11.7227Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5002 4.5C18.1195 4.5 17.0002 5.61929 17.0002 7C17.0002 8.38071 18.1195 9.5 19.5002 9.5C20.881 9.5 22.0002 8.38071 22.0002 7C22.0002 5.61929 20.881 4.5 19.5002 4.5ZM16.0002 7C16.0002 5.067 17.5672 3.5 19.5002 3.5C21.4332 3.5 23.0002 5.067 23.0002 7C23.0002 8.933 21.4332 10.5 19.5002 10.5C17.5672 10.5 16.0002 8.933 16.0002 7Z" fill="#0092D0"></path></svg>
											${no_metro_item.email1}
										</p>
									` : ''}
									<button data-form="">Выбрать офис</button>
								</div>
							</li>
						`
			}).join('')}
				</ul>
            </div>
        `;
		} else {
			this.innerHTML = `
	<div class="lead-generator-result">
															<p>Оффисы без станций метро</p>
				<ul class="offices-list">
				${this.officeWithOutMetro().map(no_metro_item => {
				return `
												<li class="office" id='${no_metro_item.id}'>
								<div>
									<h4 data-office-name>${no_metro_item.lname}</h4>
									${(no_metro_item.addres !== '') ? `
										<p data-office-addres>
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5L7.5 3L12.5 5L17.5 3L22.5 5V21L17.5 19L12.5 21L7.5 19L2.5 21V5Z" stroke="#0092D0" stroke-linejoin="round"></path><path d="M7.5 3V19" stroke="#0092D0"></path><path d="M17.5 3.5V19" stroke="#0092D0"></path><path d="M12.5 5V20.5" stroke="#0092D0"></path></svg>
										${no_metro_item.address}
									</p>
									` : ''}
										<p data-office-phone>
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 5.5C2 3.29086 3.79086 1.5 6 1.5H19C21.2091 1.5 23 3.29086 23 5.5V8C23 8.27614 22.7761 8.5 22.5 8.5H17.5C17.2239 8.5 17 8.27614 17 8V7C17 6.17157 16.3284 5.5 15.5 5.5H9.5C8.67157 5.5 8 6.17157 8 7V8C8 8.27614 7.77614 8.5 7.5 8.5H2.5C2.22386 8.5 2 8.27614 2 8V5.5ZM6 2.5C4.34315 2.5 3 3.84315 3 5.5V7.5H7V7C7 5.61929 8.11929 4.5 9.5 4.5H15.5C16.8807 4.5 18 5.61929 18 7V7.5H22V5.5C22 3.84315 20.6569 2.5 19 2.5H6Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.0301 10.8291C6.10196 10.6315 6.28975 10.5 6.5 10.5H18.5C18.7103 10.5 18.898 10.6315 18.9699 10.8291L20.9699 16.3291C20.9898 16.3839 21 16.4417 21 16.5V22C21 22.2761 20.7761 22.5 20.5 22.5H4.5C4.22386 22.5 4 22.2761 4 22V16.5C4 16.4417 4.01019 16.3839 4.0301 16.3291L6.0301 10.8291ZM6.85021 11.5L5 16.5881V21.5H20V16.5881L18.1498 11.5H6.85021Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 8V11H10V8H11Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8V11H14V8H15Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 14.5C11.3954 14.5 10.5 15.3954 10.5 16.5C10.5 17.6046 11.3954 18.5 12.5 18.5C13.6046 18.5 14.5 17.6046 14.5 16.5C14.5 15.3954 13.6046 14.5 12.5 14.5ZM9.5 16.5C9.5 14.8431 10.8431 13.5 12.5 13.5C14.1569 13.5 15.5 14.8431 15.5 16.5C15.5 18.1569 14.1569 19.5 12.5 19.5C10.8431 19.5 9.5 18.1569 9.5 16.5Z" fill="#0092D0"></path></svg>
										${

					[no_metro_item.phone1, no_metro_item.phone2, no_metro_item.phone3].filter(value => value !== '').join(',')
				}
									</p>
									${(no_metro_item.email1 !== '') ? `
										<p data-office-mail>
											<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.50024 7.5C3.2241 7.5 3.00024 7.72386 3.00024 8V18C3.00024 18.2761 3.2241 18.5 3.50024 18.5H19.9618C20.2379 18.5 20.4618 18.2761 20.4618 18V9.5H21.4618V18C21.4618 18.8284 20.7902 19.5 19.9618 19.5H3.50024C2.67182 19.5 2.00024 18.8284 2.00024 18V8C2.00024 7.17157 2.67182 6.5 3.50024 6.5H16.5002V7.5H3.50024Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.449 13.8761L2.67981 7.87609L3.24449 7.05078L11.7314 12.8576L17.424 8.96263L17.9887 9.78794L12.0137 13.8761C11.8435 13.9926 11.6193 13.9926 11.449 13.8761Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3919 11.7227L21.315 18.6457L20.6079 19.3528L13.6848 12.4298L14.3919 11.7227Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.0695 11.7227L2.14643 18.6457L2.85353 19.3528L9.77661 12.4298L9.0695 11.7227Z" fill="#0092D0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5002 4.5C18.1195 4.5 17.0002 5.61929 17.0002 7C17.0002 8.38071 18.1195 9.5 19.5002 9.5C20.881 9.5 22.0002 8.38071 22.0002 7C22.0002 5.61929 20.881 4.5 19.5002 4.5ZM16.0002 7C16.0002 5.067 17.5672 3.5 19.5002 3.5C21.4332 3.5 23.0002 5.067 23.0002 7C23.0002 8.933 21.4332 10.5 19.5002 10.5C17.5672 10.5 16.0002 8.933 16.0002 7Z" fill="#0092D0"></path></svg>
											${no_metro_item.email1}
										</p>
									` : ''}
									<button data-form="">Выбрать офис</button>
								</div>
							</li>
						`
			}).join('')}
				</ul>
			</div>
			`;
		}
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}
}

customElements.define("coral-lead-generator", LeadModule);
