import {LitElement, html, css} from 'lit';

import { badge } from '@vaadin/vaadin-lumo-styles/badge.js';

export class PaymentLink extends LitElement {
    static properties = {
        version: {},
        link : { Object}
    };

    static get styles(){
        return [badge,
        css`
            :host{
              background-color: #eeeeee;
              //margin: 10px;
            }
          
            .shell{
              display: flex;
              justify-content: space-between;
              padding: 10px;              
              border-radius: 25px;
              background-color: #eeeeee;
              align-items: center;
            }
          
          a{
          padding-left: 5px;  
          }
          
        `]
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="shell">
                <div><a href="${this.link.url}">${this.link.id}</a> </div>
                <div><p>${this.link.amountValue} ${this.link.amountCurrency} </p></div>
                <div><p class="expiration">Expires : ${new Date(this.link.expiresAt).toLocaleString()} </p></div>
                <div class="badge"><span theme="badge">${this.link.status}</span></div>
            </div>
        `;
    }

}
customElements.define('payment-link', PaymentLink);
