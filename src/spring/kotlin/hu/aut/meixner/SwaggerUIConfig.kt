package hu.aut.meixner

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import springfox.documentation.service.ApiInfo
import springfox.documentation.service.Contact
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

@Configuration
@EnableSwagger2
class SwaggerUIConfig {

    @Bean
    fun api(): Docket? {
        return Docket(DocumentationType.SWAGGER_2)
                .select()
                .build()
                .apiInfo(apiInfo)
    }

    private val apiInfo = ApiInfo(
            "The Meixner Project",
            "The REST API of the Meixner education project",
            "1.0",
            null,
            Contact("Mate Szoke", null, "mate.szoke2@gmail.com"),
            null,
            null,
            emptyList()
    )

}