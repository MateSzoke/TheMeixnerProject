package hu.aut.meixner.util.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm.HMAC512
import com.fasterxml.jackson.databind.ObjectMapper
import hu.aut.meixner.entity.auth.UserEntity
import hu.aut.meixner.util.security.SecurityConstants.EXPIRATION_TIME
import hu.aut.meixner.util.security.SecurityConstants.HEADER_STRING
import hu.aut.meixner.util.security.SecurityConstants.SECRET
import hu.aut.meixner.util.security.SecurityConstants.TOKEN_PREFIX
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthenticationFilter(private val mAuthenticationManager: AuthenticationManager) : UsernamePasswordAuthenticationFilter() {

    override fun attemptAuthentication(req: HttpServletRequest, res: HttpServletResponse): Authentication {
        return try {
            val creds: UserEntity = ObjectMapper()
                    .readValue(req.inputStream, UserEntity::class.java)
            mAuthenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            creds.username,
                            creds.password,
                            ArrayList())
            )
        } catch (e: IOException) {
            throw RuntimeException(e)
        }
    }

    override fun successfulAuthentication(
            req: HttpServletRequest,
            res: HttpServletResponse,
            chain: FilterChain,
            auth: Authentication
    ) {
        res.addHeader("Access-Control-Expose-Headers", "Authorization")
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "accept, content-type, Authorization, X-Requested-With, x-uw-act-as")
        val token = JWT.create()
                .withSubject((auth.principal as User).username)
                .withExpiresAt(Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.toByteArray()))
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token)
    }

}
