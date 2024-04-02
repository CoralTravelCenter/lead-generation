import './style.scss';

import { getData } from "./Components/api.js";
import { LeadModule } from "./Components/lead-list.js";
import { YandexMap } from "./Components/yamaps.js";
import { Search } from "./Components/search.js";
import { Form } from "./Components/form.js";
import { jentelDeleteWhiteSpace } from "./Components/utils.js";

export const API_URL_WHERE_TO_BUY = 'https://b2capi.coral.ru/Agency/ListWhereToBuy';
export const API_URL_PACKAGE = 'https://b2capi.coral.ru/PackageTourHotelProduct/PriceSearchDecrypt';
const searchParams = encodeURIComponent(new URLSearchParams(window.location.search).get('qp'));

let serch_module, lead_module, yandex_module;

export const departure_JSON =
    document.getElementById("__NEXT_DATA__").textContent;
export const active_departure_id = JSON.parse(
    departure_JSON,
).props.pageProps.meta.departure.slice(0, 4);
export const active_departure_name = JSON.parse(
    departure_JSON,
).props.pageProps.meta.departures.find((dep) => {
    if (dep.isCurrent === true) {
        return dep;
    }
}).name;


function createAnchor() {
    const anchor_link = document.querySelector('[name="selectButton"]');
    const new_anchor_link = document.createElement('button');
    new_anchor_link.className = 'anchor-to-lead-module';
    new_anchor_link.textContent = 'Оставить заявку';
    new_anchor_link.addEventListener('click', () => {
        document.querySelector('#lead-generation-app').scrollIntoView(true);
    })
    if (anchor_link) anchor_link.replaceWith(new_anchor_link);
}

createAnchor()

const APP_WRAPPER = document.createElement("div");
const H2 = document.createElement('h2');
H2.className = 'B2CHeading where-to-buy';
H2.textContent = 'Где купить?';
APP_WRAPPER.id = "lead-generation-app";

export function takeDataFromOffice() {
    const offices = document.querySelectorAll("[data-form]");
    let office_data = {};
    offices.forEach((item) => {
        item.addEventListener("click", (e) => {
            const parent = e.target.closest(".office");
            let office, addres, email, phone;
            office = parent.querySelector("[data-office-name]");
            addres = parent.querySelector("[data-office-addres]");
            email = parent.querySelector("[data-office-mail]");
            phone = parent.querySelector("[data-office-phone]");
            if (office) office_data.office = office.textContent;
            if (addres)
                office_data.addres = jentelDeleteWhiteSpace(addres.textContent);
            if (email) office_data.email = jentelDeleteWhiteSpace(email.textContent);
            if (phone) office_data.phone = jentelDeleteWhiteSpace(phone.textContent);
            office_data.id = parent.id;
            getData(API_URL_PACKAGE, {
                queryParam: searchParams,
            }).then(data => {
                if (!document.querySelector('leed-form')) document.body.append(new Form(office_data, data));
            })
        });
    });
}

function generateModule(data) {
    serch_module = new Search(data, active_departure_name);
    lead_module = new LeadModule(data);
    yandex_module = new YandexMap(data);
    APP_WRAPPER.insertAdjacentElement('afterbegin', H2);
    APP_WRAPPER.append(serch_module, lead_module, yandex_module);

    if (!document.getElementById('lead-generation-app')) {
        document
            .getElementById("hotelDetailSelectRoom")
            .insertAdjacentElement("beforebegin", APP_WRAPPER);
    }

    takeDataFromOffice();
}


getData(API_URL_WHERE_TO_BUY, {
    departureId: active_departure_id,
}).then((data) => {
    if (data.result.items.length === 0) {
        getData(API_URL_WHERE_TO_BUY, {
            departureId: '2671',
        }).then((moscow_data) => {
            console.log(moscow_data)
            generateModule(moscow_data)
        })
    } else {
        generateModule(data)
    }
});

// jquery.inputmask
if (!window.Inputmask) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/4.0.9/min/jquery.inputmask.bundle.min.js';
    $('head').append(s);
}




