export class Thanks extends HTMLElement {
    constructor() {
        super();
    }
    
    render() {
        this.innerHTML = `
			<div class="thanks-wrapper">
                <h3>Спасибо за вашу заяку!</h3>
                <p>Пожалуйста проверьте вашу почту</p>
            </div>
        `;
    }
    
    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }
}

customElements.define("thanks-block", Thanks);

export class Oops extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        this.innerHTML = `
			<div class="oops-wrapper">
                <h3>Что-то пошло не так!</h3>
                <p>Пожалуйста перезагрузите страницу или попробуйте позже</p>
            </div>
        `;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }
}

customElements.define("oops-block", Oops);