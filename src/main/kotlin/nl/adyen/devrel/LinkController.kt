package nl.adyen.devrel

import com.adyen.model.checkout.PaymentLinkResource
import kotlinx.serialization.Serializable
import java.util.UUID


// TODO : Should I directly serialize the resource?
@Serializable
data class Link(
    val id: String,
    val url : String,
    val amountValue : Long,
    val amountCurrency: String,
    val reference : String,
    val expiresAt : String,
    val status : String
)

val links = HashMap<String, Link>()

class LinkController(adyenConfig: AdyenConfig) {

    private val adyenApiWrapper = AdyenApiWrapper(adyenConfig)

    /*
    We do this before every request for simplicity, but for scalability it should be done in the background
     */
    private fun updateAllLinks(){
        links.keys.forEach { updateLink(it) }
    }

    /*
    We do this before every request for simplicity, but for scalability it should be done in the background
     */
    private fun updateLink(id: String) {
        val updatedLink = adyenApiWrapper.getPaymentLink(id)?.toLink()
        if(updatedLink != null){
            links[id] = updatedLink
        }
    }

    fun getLinks(): List<Link> {
        updateAllLinks()

        return links.entries.toList().map { it.value }
    }

    fun getLink(id: String?) : Link? {
        if( id != null) { updateLink(id) }
        return links[id]
    }

    fun addLink(request: NewLinkRequest) : Link{

        val reference = UUID.randomUUID().toString()
        val newLink = adyenApiWrapper.createPaymentLink(request.amount, UUID.randomUUID().toString()).toLink()
        links[newLink.id] = newLink

        return newLink
    }
}

fun PaymentLinkResource.toLink() = Link(
    id = this.id,
    url = this.url,
    amountValue = this.amount.value,
    amountCurrency = this.amount.currency,
    reference = this.reference,
    expiresAt = this.expiresAt,
    status = this.status.value
)