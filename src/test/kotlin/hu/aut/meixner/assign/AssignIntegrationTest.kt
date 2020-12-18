package hu.aut.meixner.assign

import hu.aut.meixner.assertions.equals
import hu.aut.meixner.assertions.isNotNull
import hu.aut.meixner.dto.task.student.AssignTask
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
class AssignIntegrationTest {

    private lateinit var client: WebTestClient

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToServer().baseUrl("https://meixner.herokuapp.com")
                .responseTimeout(Duration.ofMinutes(1))
                .defaultHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2MDkxMDg1Mzl9.cHtNauOiuaE5AwLjgTB5q9NwGLgn5eXYtt93BKWxvWzcV4emGrJJyeVQK4joPwMO2zHl_0vF4VIsJbqTtArpHA")
                .build()
    }

    @Test
    fun `Get assign task by exercise`() {
        val result = client.post().uri("/assign/1")
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(AssignTask::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
    }
}