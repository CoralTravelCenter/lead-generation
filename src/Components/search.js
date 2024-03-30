import {debounce, deleteAllWhiteSpace} from './utils';
import {getData} from "./api.js";
import {API_URL_WHERE_TO_BUY} from "../main.js";
import {LeadModule} from "./lead-list.js";
import {YandexMap} from "./yamaps.js";
import {takeDataFromOffice} from "../main.js";

export class Search extends HTMLElement {
	constructor(API_data) {
		super();
		this.classList.add('search');
		this.data = API_data;
		this.name = this.data.result.cityLookup[0].name;
		this.area = this.data.result.areaLookup;
		this.agency = this.data.result.items;
		this.metroStation = this.data.result.metroStationsLookup;
		this.new_id = null;
	}

	suggestGeneration() {
		return this.area.map(area => {
			return `
                   <li data-id='${area.id}'>
                    ${area.name}
                   </li>
               `;
		}).join('');
	}

	render() {
		this.innerHTML = `
			<div class="lead-generator-wrapper">
				<div class="lead-generator-select">
					<label class="lead-generator-input">
						<input type="text" id="lead-serch-input" value="${this.name}" placeholder='Введите город'>
					</label>
					<div class="lead-generator-list">
						<div>
							<ul>
							${this.suggestGeneration()}
							</ul>
						</div>
					</div>
				</div>
			</div>    
    `;
	}


	serch() {
		const suggestionList = this.querySelector('.lead-generator-list ul');
		const input = this.querySelector('.lead-generator-input input');
		const citysArr = this.area.map(area => {
			return {
				name: area.name,
				id: area.id
			}
		})

		function handleInput() {
			let serchArr = [];
			let searchVal = input.value.toLowerCase();
			serchArr = citysArr.filter(city => {
				return city.name.toLowerCase().startsWith(searchVal)
			}).map(item => {
				return `<li data-id=${item.id}>${item.name}</li>`
			}).join('')
			suggestionList.innerHTML = serchArr ? serchArr : `<p>Вашего города нет в списке(((</p>`;
			suggestionList.closest('.lead-generator-list').classList.add('js-show');
		}

		const debouncedHandle = debounce(handleInput, 250);
		input.addEventListener('click', e => e.target.value = '')
		input.addEventListener('input', debouncedHandle);
		document.body.addEventListener('click', (e) => {
			if (e.target.id === 'lead-serch-input') {
				suggestionList.closest('.lead-generator-list').classList.add('js-show');
			} else {
				suggestionList.closest('.lead-generator-list').classList.remove('js-show');
			}
		})

		document.querySelector('#lead-generation-app').addEventListener('click', (e) => {
			if (e.target.hasAttribute('data-id')) {
				input.value = deleteAllWhiteSpace(e.target.textContent);
				console.log(input.value)
				this.new_id = e.target.getAttribute('data-id');
				this.updateMapAndLead(this.new_id);
			}
		})
	}

	updateMapAndLead() {
		if (this.new_id) {
			getData(API_URL_WHERE_TO_BUY, {
				departureId: this.new_id,
			}).then((new_data) => {
				document.querySelector(".search-result").replaceWith(new LeadModule(new_data))
				document.querySelector(".yamap").replaceWith(new YandexMap(new_data))
				takeDataFromOffice();
			});
		}
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.serch();
			this.rendered = true;
		}
	}
}

customElements.define("city-search", Search);
