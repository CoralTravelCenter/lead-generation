import {active_departure_id} from "../main.js";

const map_init_props = {
	zoom: 10,
	controls: ['zoomControl'],
};

const placemark_options = {
	iconLayout: 'default#image',
	iconImageHref: 'https://b2ccdn.coral.ru/content/landing-pages/leed-generation/coral-globe.svg',
	iconImageSize: [25, 35],
	iconImageOffset: [0, -35]
};

const map_options = {
	suppressMapOpenBlock: true,
	maxZoom: 18
};

export class YandexMap extends HTMLElement {
	constructor(API_data) {
		super();
		this.classList.add('yamap');
		this.data = API_data;
		this.agency = this.data.result.items;
		this.active_departure = this.data.result.cityLookup[0].name;
	}

	initMap() {
		let my_map;

		function updateLocation(res) {
			const geoObject = res.geoObjects.get(0);
			map_init_props.center = geoObject.geometry._coordinates;
			my_map = new ymaps.Map('map', map_init_props, map_options);
		}

		ymaps.geocode(this.active_departure, {results: 1}).then(res => {
			updateLocation(res);
			addOfficeMarkersWithClustering(this.agency);
		});


		const addOfficeMarkersWithClustering = (offices) => {
			const customClusterIconLayout = ymaps.templateLayoutFactory.createClass(
				`<div class="clusterer__icon">
				<span>$[properties.geoObjects.length]</span>
				</div>`
			);

			const сluster_options = {
				clusterIcons: [
					{
						size: [40, 40],
						offset: [-20, -20]
					}
				],
				clusterNumbers: [100],
				clusterIconContentLayout: customClusterIconLayout
			};

			const clusterer = new ymaps.Clusterer({
				clusterDisableClickZoom: true,
				clusterBalloonPanelMaxMapArea: 0,
				hasBalloon: false,
				clusterIconColor: '#ff8663',
				...сluster_options
			});

			clusterer.events.add('click', (e) => {
				const cluster = e.get('target');
				const bounds = cluster.getBounds();

				if (bounds) {
					my_map.setBounds(bounds, {
						checkZoomRange: true,
						zoomMargin: [20, 20, 20, 20]
					});
				}
			})

			const placemarks = offices.map(office => {
				const coral_placemark =
					new ymaps.Placemark(
						[office.latitude, office.longitude],
						{id: office.id},
						placemark_options
					);

				coral_placemark.events.add('click', function (e) {
					const target = e.get('target');
					const target_element = document.getElementById(`${target.properties.get('id')}`);
					if (document.querySelectorAll('.offices-list').length > 1) {
						target_element.scrollIntoView({
							behavior: "smooth",
							block: "center",
							inline: "start"
						});
					}
					target_element.querySelector('[data-form]').click();
				});

				return coral_placemark;
			});

			clusterer.add(placemarks);
			my_map.geoObjects.add(clusterer);
		};
	}

	render() {
		this.innerHTML = '<div id="map"></div>';
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			ymaps.ready(() => {
				this.initMap();
			})
			this.rendered = true;
		}
	}
}

customElements.define("offices-map", YandexMap);