package nl.adyen.devrel

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

    fun getLinks(): List<Link> {
        return links.entries.toList().map { it.value }
    }

    fun getLink(id: String?) : Link? {
        return links[id]
    }

    fun addLink(request: NewLinkRequest) : Link{

        val reference = UUID.randomUUID().toString()
        val paymentLinkResource = adyenApiWrapper.createPaymentLink(request.amount, reference)

        val newLink = Link(
            id = paymentLinkResource.id,
            url = paymentLinkResource.url,
            amountValue = paymentLinkResource.amount.value,
            amountCurrency = paymentLinkResource.amount.currency,
            reference = paymentLinkResource.reference,
            expiresAt = paymentLinkResource.expiresAt,
            status = paymentLinkResource.status.value
        )

        links[paymentLinkResource.id] = newLink

        return newLink
    }
}