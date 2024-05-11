package com.sorsix.eventmanager.config

import com.sorsix.eventmanager.filter.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
data class SecurityConfig (
    val jwtAuthFilter: JwtAuthenticationFilter,
    val authenticationProvider: AuthenticationProvider,


    ){


    @Bean
    fun securityFilterChain(httpSecurity: HttpSecurity) : SecurityFilterChain{

        httpSecurity
            .csrf{ it.disable()}
            .authorizeHttpRequests {
                it
                    .requestMatchers(
                        "/api/events",
                        "/api/auth/**",
                        "/api/events/search",
                        "/api/events/recents",
                        "/api/events/{id}",
                        "/api/events/categories",
                        "/api/events/filteredByCategory",
                        "/api/events/image/{id}",
                        "/api/events/{id}/images/{num}"
                    )
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            }
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)


        return httpSecurity.build()
    }
}