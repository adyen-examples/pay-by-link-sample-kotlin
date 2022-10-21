package nl.adyen.devrel

import com.adyen.Client
import com.adyen.enums.Environment
import com.adyen.model.Amount
import com.adyen.model.checkout.CreatePaymentLinkRequest
import com.adyen.model.checkout.PaymentLinkResource
import com.adyen.service.PaymentLinks

class AdyenApiWrapper(private val adyenConfig: AdyenConfig) {

    private var client = Client(adyenConfig.apiKey, Environment.TEST)
    private var paymentLinks = PaymentLinks(client)

    fun createPaymentLink(value : Long, reference : String): PaymentLinkResource {

        val amount = Amount()
        amount.value = value
        amount.currency = "EUR"

        val createPaymentLinkRequest = CreatePaymentLinkRequest()
        createPaymentLinkRequest.merchantAccount(adyenConfig.merchantAccount)
        createPaymentLinkRequest.amount(amount)
        createPaymentLinkRequest.reference(reference)

        return paymentLinks.create(createPaymentLinkRequest)
    }
}