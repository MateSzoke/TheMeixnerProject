package hu.aut.meixner.security

object SecurityConstants {
    const val SECRET = "SecretKeyToGenJWTs"
    const val EXPIRATION_TIME = 864_000_000 // 10 days
    const val TOKEN_PREFIX = "Bearer "
    const val HEADER_STRING = "Authorization"
    const val REGISTER_URL = "/users/register"

    val AUTH_WHITELIST = arrayOf(
            // -- swagger ui
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/v2/api-docs",
            "/webjars/**"
    )
}