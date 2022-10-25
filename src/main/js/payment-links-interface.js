import {LitElement, html} from 'lit';
import './payment-link.js';

import '@vaadin/button';
import '@vaadin/number-field';
import '@vaadin/vertical-layout';

export class PaymentLinksInterface extends LitElement {
    static properties = {
        links : { Object},
        amount : {Number},

    };

    constructor() {
        super();
        this.links = [];
        this.amount = "";

        this._reload();
    }

    render() {
        return html`
    <h1>Payment Link interface!</h1>

    <vaadin-vertical-layout theme="spacing padding">
    <div>
        <p>Create a new link:</p>
        <vaadin-number-field
            .value = "${this.amount}"
            @input="${e => {this.amount = e.target.value;}}"
        >
            <div slot="suffix">€</div>
        </vaadin-number-field>

        <vaadin-button theme="primary" design="Emphasized" @click="${this._create}">Create!</vaadin-button>
    </div>


        <vaadin-vertical-layout theme="spacing padding">
            <vaadin-button theme="primary" @click="${this._reload}">Reload links ↺</vaadin-button>
            ${this.links.map( link => html `<payment-link .link=${link}></payment-link>`)}
        </vaadin-vertical-layout>
        
    </vaadin-vertical-layout>

    `;
    }

    _create(){
        fetch("/api/links", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"amount": this.amount}) // body data type must match "Content-Type" header
        })
            .then(r =>{
                this.amount = "";
                this._reload();
            })
            .catch(error => "Error: " + error);
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
