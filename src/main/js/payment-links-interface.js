import {LitElement, html} from 'lit';

export class PaymentLinksInterface extends LitElement {
    static properties = {
        version: {},
        links : { Object}
    };

    constructor() {
        super();
        this.version = 'STARTING';
        this.links = [];
    }

    render() {
        return html`
    <p>Welcome to the Lit tutorial!</p>
    <p>This is the ${this.version} code.</p>
    <button @click="${this._reload}">Reload ↺</button>
    <ul>
        ${this.links.map( link =>
                html `<li>LINK</li>`
        )}
    </ul>
    `;
    }

    _reload(){
        this.fetchLinks();
    }

    fetchLinks(){
        fetch("/api/links")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error while fetching the Payment Links');
                }
                response.json()
                    .then(data => {
                        this.links = data
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
    }

}
customElements.define('payment-links-interface', PaymentLinksInterface);
