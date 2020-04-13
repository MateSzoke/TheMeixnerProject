package hu.aut.meixner.util.swagger

import com.fasterxml.classmate.TypeResolver
import com.google.common.collect.Multimap
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpMethod
import springfox.documentation.builders.ApiListingBuilder
import springfox.documentation.builders.OperationBuilder
import springfox.documentation.builders.ParameterBuilder
import springfox.documentation.schema.ModelRef
import springfox.documentation.service.ApiDescription
import springfox.documentation.service.ApiListing
import springfox.documentation.spring.web.plugins.DocumentationPluginsManager
import springfox.documentation.spring.web.readers.operation.CachingOperationNameGenerator
import springfox.documentation.spring.web.scanners.ApiDescriptionReader
import springfox.documentation.spring.web.scanners.ApiListingScanner
import springfox.documentation.spring.web.scanners.ApiListingScanningContext
import springfox.documentation.spring.web.scanners.ApiModelReader


class FormLoginOperations @Autowired constructor(
        apiDescriptionReader: ApiDescriptionReader?,
        apiModelReader: ApiModelReader?,
        pluginsManager: DocumentationPluginsManager?
) : ApiListingScanner(apiDescriptionReader, apiModelReader, pluginsManager) {

    override fun scan(context: ApiListingScanningContext): Multimap<String, ApiListing>? {
        val def = super.scan(context)
        val operations = listOf(OperationBuilder(CachingOperationNameGenerator())
                .method(HttpMethod.POST)
                .uniqueId("login")
                .parameters(listOf(ParameterBuilder()
                        .name("body")
                        .required(true)
                        .description("The body of request. Example: {\"username\":\"admin\",\"password\":\"admin\"}")
                        .parameterType("body")
                        .type(TypeResolver().resolve(String::class.java))
                        .modelRef(ModelRef("string"))
                        .build()))
                .summary("Log in") //
                .notes("Here you can log in. Please use browser developer tools for getting Authorization token from header response.")
                .build())
        val apis = listOf(ApiDescription("Account", "/login", "Authentication documentation", operations, false))
        def.put("authentication", ApiListingBuilder(context.documentationContext.apiDescriptionOrdering)
                .apis(apis)
                .description("Custom authentication")
                .build())
        return def
    }
}