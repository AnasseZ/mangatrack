package com.zan.mangatrack.service;

import com.zan.mangatrack.business.User;
import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.business.UserProfil;
import com.zan.mangatrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrEmail)
            throws UsernameNotFoundException {
        // Let people login with either username or email
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
                );

        return UserPrincipal.create(user);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UserPrincipal.create(user);
    }

    public User updateUser(final Long currentUserId, final UserProfil user) {
        User retrievedUser = userRepository.findById(currentUserId).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + currentUserId)
        );

        retrievedUser.setEmail(user.getEmail());
        retrievedUser.setUsername(user.getUsername());

        if (user.isModifyPassword()) {
            retrievedUser.setPassword(passwordEncoder.encode(user.getNewPassword()));
        }

        return userRepository.save(retrievedUser);
    }
}