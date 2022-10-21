import {LitElement, html} from 'lit';

export class PaymentLink extends LitElement {
    static properties = {
        version: {},
        link : { Object}
    };

//     data class Link(
//         val id: String,
//     val url : String,
//     val amountValue : Long,
//     val amountCurrency: String,
//     val reference : String,
//     val expiresAt : String,
//     val status : String
// )

    constructor() {
        super();
    }

    render() {
        return html`
            ${this.link.id}
    `;
    }

}
customElements.define('payment-link', PaymentLink);
