import {LitElement, html} from 'lit';
import './payment-link.js';

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
    
    <div>
        <p>Create a new link:</p>
        <input
            .value = "${this.amount}"
            type="number"
            @input="${e => {this.amount = e.target.value;}}"
        />(€)
        <input type="submit" value="Create!" @click="${this._create}">
    </div>
    
    <button @click="${this._reload}">Reload links ↺</button>
    
    <div>
        ${this.links.map( link => html `<payment-link .link=${link}></payment-link>`)}
    </div>
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
