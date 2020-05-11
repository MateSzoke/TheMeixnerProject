package hu.aut.meixner.util.security

import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter


@Configuration
@ComponentScan
@EnableWebMvc
class ApplicationConfig : WebMvcConfigurerAdapter() {
    override fun addCorsMappings(registry: CorsRegistry) {
        // Can just allow `methods` that you need.
        registry.addMapping("/**").allowedMethods("PUT", "GET", "DELETE", "OPTIONS", "PATCH", "POST")
                .allowedHeaders("Access-Control-Allow-Origin", "Content-Type", "Accept", "Accept-Language", "Origin"
                        , "User-Agent", "Authorization")
    }
}