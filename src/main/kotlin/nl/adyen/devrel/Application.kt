package nl.adyen.devrel

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.callloging.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.slf4j.event.Level

fun Application.module() {
    install(CallLogging) {
        level = Level.INFO
        filter { call -> call.request.path().startsWith("/") }
    }

    install(ContentNegotiation) {
        json()
    }

    routing {
        get("/api/hello") {
            call.respondText("Hello World!")
        }

        static("/") {
            staticBasePackage = "dist"
            defaultResource("index.html")
            resources(".")
        }
    }

}

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)
