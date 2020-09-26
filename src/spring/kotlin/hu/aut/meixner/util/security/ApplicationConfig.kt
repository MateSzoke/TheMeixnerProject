package hu.aut.meixner.util.security

import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.*


@Configuration
@ComponentScan
@EnableWebMvc
class ApplicationConfig : WebMvcConfigurerAdapter() {
    @Override
    override fun addCorsMappings(registry: CorsRegistry) {
        // Can just allow `methods` that you need.
        registry.addMapping("/**")
    }

    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addRedirectViewController("/v2/api-docs", "/v2/api-docs")
        registry.addRedirectViewController("/swagger-resources/configuration/ui", "/swagger-resources/configuration/ui")
        registry.addRedirectViewController("/swagger-resources/configuration/security", "/swagger-resources/configuration/security")
        registry.addRedirectViewController("/swagger-resources", "/swagger-resources")
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/swagger-ui.html**").addResourceLocations("classpath:/META-INF/resources/swagger-ui.html")
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/")
    }
}