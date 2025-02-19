package hu.aut.meixner.util.swagger

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import springfox.documentation.builders.PathSelectors
import springfox.documentation.service.*
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spi.service.contexts.SecurityContext
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.spring.web.plugins.DocumentationPluginsManager
import springfox.documentation.spring.web.scanners.ApiDescriptionReader
import springfox.documentation.spring.web.scanners.ApiListingScanner
import springfox.documentation.spring.web.scanners.ApiModelReader
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
                .securitySchemes(listOf(ApiKey("apiKey", "Authorization", "header")))
                .securityContexts(listOf(securityContext))
    }

    @Primary
    @Bean
    fun addExtraOperations(apiDescriptionReader: ApiDescriptionReader?, apiModelReader: ApiModelReader?, pluginsManager: DocumentationPluginsManager?): ApiListingScanner? {
        return FormLoginOperations(apiDescriptionReader, apiModelReader, pluginsManager)
    }

    private fun defaultAuth(): List<SecurityReference?>? {
        val authorizationScopes = arrayOf(AuthorizationScope(
                "global", "accessEverything"))
        return listOf(SecurityReference("apiKey",
                authorizationScopes))
    }

    private val securityContext = SecurityContext.builder().securityReferences(defaultAuth())
            .forPaths(PathSelectors.any()).build()

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
