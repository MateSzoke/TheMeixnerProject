package hu.aut.meixner.exercises

import hu.aut.meixner.assertions.equals
import hu.aut.meixner.assertions.isNotNull
import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
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
class ExercisesIntegrationTest {

    private lateinit var client: WebTestClient

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToServer().baseUrl("https://meixner.herokuapp.com")
                .responseTimeout(Duration.ofMinutes(1))
                .defaultHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2MDkxMDg1Mzl9.cHtNauOiuaE5AwLjgTB5q9NwGLgn5eXYtt93BKWxvWzcV4emGrJJyeVQK4joPwMO2zHl_0vF4VIsJbqTtArpHA")
                .build()
    }

    @Test
    fun `Create valid exercise`() {
        val exercise = ExerciseRequest(
                name = "exercise",
                subject = SubjectEnum.Biology,
                classLevel = 4,
                comment = "comment"
        )

        val result = client.post().uri("/exercises/create").syncBody(exercise)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(ExercisesResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            exercise.name equals it.name
            exercise.subject.toString() equals it.subject.toString()
            exercise.classLevel equals it.classLevel
            exercise.comment equals it.comment
            0 equals it.averageDifficulty
        }
    }

    @Test
    fun `Add task to a exercise`() {
        val result = client.post().uri("/exercises/1/1")
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(ExercisesResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
    }

    @Test
    fun `Delete task from a exercise`() {
        val result = client.delete().uri("/exercises/1/1")
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(ExercisesResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
    }
}