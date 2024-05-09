package com.sorsix.eventmanager.domain.user

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*

@Entity
@Table(name = "app_users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var firstName: String,

    var lastName: String,

    private val email: String,

    private var password: String,

    @Enumerated(EnumType.STRING)
    val role: Role

) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return Collections.emptySet()
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return email
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}
