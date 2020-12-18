package hu.aut.meixner.task

import hu.aut.meixner.assertions.equals
import hu.aut.meixner.assertions.isNotNull
import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.easy.*
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
class EasyTaskIntegrationTest {

    private lateinit var client: WebTestClient

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToServer().baseUrl("https://meixner.herokuapp.com")
                .responseTimeout(Duration.ofMinutes(1))
                .defaultHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2MDkxMDg1Mzl9.cHtNauOiuaE5AwLjgTB5q9NwGLgn5eXYtt93BKWxvWzcV4emGrJJyeVQK4joPwMO2zHl_0vF4VIsJbqTtArpHA")
                .build()
    }

    @Test
    fun `Create valid pairing task`() {
        val task = PairingRequest(
                title = "Title",
                difficulty = 45,
                subject = SubjectEnum.Biology,
                recommendedMinClass = 2,
                recommendedMaxClass = 4,
                pairs = listOf(
                        PairElementRequest(listOf(MediaItemRequest(content = "pair1A"), MediaItemRequest(content = "pair1B"))),
                        PairElementRequest(listOf(MediaItemRequest(content = "pair2A"), MediaItemRequest(content = "pair2B")))
                )
        )

        val result = client.post().uri("/tasks/pairing").syncBody(task)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(PairingResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            task.title equals it.title
            task.difficulty equals it.difficulty
            task.subject.toString() equals it.subject.toString()
            task.recommendedMaxClass equals it.recommendedMaxClass
            task.recommendedMinClass equals it.recommendedMinClass
            task.pairs.first().pair.first().content equals it.pairs.first().pair.first().content
        }
    }

    @Test
    fun `Create valid grouping task`() {
        val task = GroupingRequest(
                title = "Title",
                difficulty = 45,
                subject = SubjectEnum.Biology,
                recommendedMinClass = 2,
                recommendedMaxClass = 4,
                groups = listOf(
                        GroupRequest(name = "group1", elements = listOf(MediaItemRequest(content = "pair1A"), MediaItemRequest(content = "pair1B"))),
                        GroupRequest(name = "group1", elements = listOf(MediaItemRequest(content = "pair2A"), MediaItemRequest(content = "pair2B")))
                )
        )

        val result = client.post().uri("/tasks/grouping").syncBody(task)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(GroupingResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            task.title equals it.title
            task.difficulty equals it.difficulty
            task.subject.toString() equals it.subject.toString()
            task.recommendedMaxClass equals it.recommendedMaxClass
            task.recommendedMinClass equals it.recommendedMinClass
            task.groups.first().elements.first().content equals it.groups.first().elements.first().content
        }
    }

    @Test
    fun `Create valid sorting task`() {
        val task = SortingRequest(
                title = "Title",
                difficulty = 45,
                subject = SubjectEnum.Biology,
                recommendedMinClass = 2,
                recommendedMaxClass = 4,
                elements = listOf(MediaItemRequest(content = "element1"), MediaItemRequest(content = "element2"))
        )

        val result = client.post().uri("/tasks/sorting").syncBody(task)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(SortingResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            task.title equals it.title
            task.difficulty equals it.difficulty
            task.subject.toString() equals it.subject.toString()
            task.recommendedMaxClass equals it.recommendedMaxClass
            task.recommendedMinClass equals it.recommendedMinClass
            task.elements.first().content equals it.elements.first().content
        }
    }

    @Test
    fun `Create valid memory game task`() {
        val task = MemoryGameRequest(
                title = "Title",
                difficulty = 45,
                subject = SubjectEnum.Biology,
                recommendedMinClass = 2,
                recommendedMaxClass = 4,
                pairs = listOf(
                        PairElementRequest(listOf(MediaItemRequest(content = "pair1A"), MediaItemRequest(content = "pair1B"))),
                        PairElementRequest(listOf(MediaItemRequest(content = "pair2A"), MediaItemRequest(content = "pair2B")))
                )
        )

        val result = client.post().uri("/tasks/memoryGame").syncBody(task)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(MemoryGameResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            task.title equals it.title
            task.difficulty equals it.difficulty
            task.subject.toString() equals it.subject.toString()
            task.recommendedMaxClass equals it.recommendedMaxClass
            task.recommendedMinClass equals it.recommendedMinClass
            task.pairs.first().pair.first().content equals it.pairs.first().pair.first().content
        }
    }

    @Test
    fun `Create valid sentence creation task`() {
        val task = SentenceCreationRequest(
                title = "Title",
                difficulty = 45,
                subject = SubjectEnum.Biology,
                recommendedMinClass = 2,
                recommendedMaxClass = 4,
                sentences = listOf(Sentence("mondatcím", listOf("Ez ", "egy ", "mondat")))
        )

        val result = client.post().uri("/tasks/sentenceCreation").syncBody(task)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(SentenceCreationResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            task.title equals it.title
            task.difficulty equals it.difficulty
            task.subject.toString() equals it.subject.toString()
            task.recommendedMaxClass equals it.recommendedMaxClass
            task.recommendedMinClass equals it.recommendedMinClass
            task.sentences.first().sentenceTitle equals it.sentences.first().sentenceTitle
        }
    }

    @Test
    fun `Create valid sentence completion task`() {
        val task = SentenceCompletionRequest(
                title = "Title",
                difficulty = 45,
                subject = SubjectEnum.Biology,
                recommendedMinClass = 2,
                recommendedMaxClass = 4,
                sentence = listOf("Ez ", "mondat"),
                options = listOf("egy ")
        )

        val result = client.post().uri("/tasks/sentenceCompletion").syncBody(task)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBody(SentenceCompletionResponse::class.java)
                .returnResult().responseBody

        result.isNotNull() equals true
        result?.let {
            task.title equals it.title
            task.difficulty equals it.difficulty
            task.subject.toString() equals it.subject.toString()
            task.recommendedMaxClass equals it.recommendedMaxClass
            task.recommendedMinClass equals it.recommendedMinClass
            task.options.first() equals it.options.first()
        }
    }
}