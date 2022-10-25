import {LitElement, html} from 'lit';

import '@vaadin/vertical-layout';
import '@vaadin/horizontal-layout';

import { badge } from '@vaadin/vaadin-lumo-styles/badge.js';

export class PaymentLink extends LitElement {
    static properties = {
        version: {},
        link : { Object}
    };

    static get styles(){
        return [badge]
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <vaadin-vertical-layout>
                <vaadin-horizontal-layout>
                    <a href="${this.link.url}">${this.link.id}</a> - ${this.link.amountValue} ${this.link.amountCurrency} <span theme="badge">${this.link.status}</span>
                </vaadin-horizontal-layout>
                <vaadin-horizontal-layout>
                    <p>Expiration date : ${this.link.expiresAt} </p> 
                </vaadin-horizontal-layout>
            <vaadin-vertical-layout>

        `;
    }

}
customElements.define('payment-link', PaymentLink);
