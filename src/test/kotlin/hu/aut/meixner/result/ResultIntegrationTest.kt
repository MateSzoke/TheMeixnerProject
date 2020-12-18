package hu.aut.meixner.result

import hu.aut.meixner.assertions.equals
import hu.aut.meixner.assertions.isNotNull
import hu.aut.meixner.dto.result.StudentResponse
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.reactive.server.WebTestClient
import java.time.Duration

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension::class)
class ResultIntegrationTest {

    private lateinit var client: WebTestClient

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToServer().baseUrl("https://meixner.herokuapp.com")
                .responseTimeout(Duration.ofMinutes(1))
                .defaultHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2MDkxMDg1Mzl9.cHtNauOiuaE5AwLjgTB5q9NwGLgn5eXYtt93BKWxvWzcV4emGrJJyeVQK4joPwMO2zHl_0vF4VIsJbqTtArpHA")
                .build()
    }

    @Test
    fun `Change class level to a student by user id`() {
        val result = client.post().uri("/results/classLevel/1/3")
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(StudentResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            it.classLevel equals 3
        }
    }

    @Test
    fun `Add exercise to a user by id`() {
        val result = client.post().uri("/results/exercises/1/1")
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(StudentResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            it.exercises.first().id equals 1L
        }
    }
}