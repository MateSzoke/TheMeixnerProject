package hu.aut.meixner.account

import hu.aut.meixner.assertions.equals
import hu.aut.meixner.assertions.isNotNull
import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.auth.UserRole
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType.APPLICATION_JSON_UTF8
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.reactive.server.WebTestClient
import java.time.Duration

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension::class)
class AccountIntegrationTest {

    private lateinit var client: WebTestClient

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToServer().baseUrl("https://meixner.herokuapp.com")
                .responseTimeout(Duration.ofMinutes(1))
                .defaultHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2MDkxMDg1Mzl9.cHtNauOiuaE5AwLjgTB5q9NwGLgn5eXYtt93BKWxvWzcV4emGrJJyeVQK4joPwMO2zHl_0vF4VIsJbqTtArpHA")
                .build()
    }

    @Test
    fun `Register a valid student`() {
        val student = UserRequest(username = "Anna123", password = "cica", role = UserRole.STUDENT)

        val result = client.post().uri("/account/register").syncBody(student)
                .accept(APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody(UserResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            student.username equals it.username
            student.role.toString() equals it.role.toString()
        }
    }

    @Test
    fun `Login a valid student returns ok`() {
        val student = UserRequest(username = "admin", password = "admin", role = UserRole.STUDENT)

        client.post().uri("/login").syncBody(student)
                .accept(APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
    }

    @Test
    fun `Login an invalid student returns forbidden`() {
        val student = UserRequest(username = "admin", password = "admin11", role = UserRole.STUDENT)

        client.post().uri("/login").syncBody(student)
                .accept(APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isForbidden
    }

}