package hu.aut.meixner

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource

@Configuration
class DatabaseConfig {
    @Value("\${spring.datasource.url}")
    private val dbUrl: String? = null

    @Bean
    fun dataSource(dataSourceProperties: DataSourceProperties): DataSource {
        val config = HikariConfig()
        config.jdbcUrl = dbUrl
        config.driverClassName = dataSourceProperties.driverClassName
        config.jdbcUrl = dataSourceProperties.url
        config.username = dataSourceProperties.username
        config.password = dataSourceProperties.password
        return HikariDataSource(config)
    }
}