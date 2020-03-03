package hu.aut.meixner

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MeixnerApplication

fun main(args: Array<String>) {
    runApplication<MeixnerApplication>(*args)
}
