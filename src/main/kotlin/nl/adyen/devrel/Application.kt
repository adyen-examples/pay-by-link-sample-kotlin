package nl.adyen.devrel

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.config.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.callloging.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.slf4j.event.Level
import kotlin.system.exitProcess

@Serializable
data class NewLinkRequest(
    val amount : Long
)

data class AdyenConfig (
    val apiKey : String,
    val merchantAccount : String)

fun Application.module() {
    install(CallLogging) {
        level = Level.INFO
        filter { call -> call.request.path().startsWith("/") }
    }

    install(ContentNegotiation) {
        json()
    }

    val adyenConfig = checkAdyenConfig(environment)
    val linkController = LinkController(adyenConfig)

    routing {

        get("/api/links"){
            call.respond(linkController.getLinks())
        }

        get("/api/links/{id}"){
            call.respond(linkController.getLink(call.parameters["id"])?:"{}")
        }

        post("/api/links"){
            val newLinkRequest = call.receive<NewLinkRequest>()
            call.respond(linkController.addLink(newLinkRequest))
        }

        static("/") {
            staticBasePackage = "dist"
            defaultResource("index.html")
            resources(".")
        }
    }
}

fun checkAdyenConfig(environment: ApplicationEnvironment): AdyenConfig {
    try {
        return AdyenConfig(
            apiKey = environment.config.property("ktor.adyen.apiKey").getString(),
            merchantAccount = environment.config.property("ktor.adyen.merchantAccount").getString())
    }
    catch( e: ApplicationConfigurationException){
        environment.log.error("One or more environment variable wasn't detected. " +
                "The application needs ADYEN_API_KEY, ADYEN_CLIENT_KEY and ADYEN_MERCHANT_ACCOUNT to run.")
        exitProcess(-1)
    }
}

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)
