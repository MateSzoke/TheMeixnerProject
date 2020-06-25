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
    @Override
    override fun addCorsMappings(registry: CorsRegistry) {
        // Can just allow `methods` that you need.
        registry.addMapping("/**")
    }
}