package com.project.algowealth.service;

import com.project.algowealth.exception.ResourceNotFoundException;
import com.project.algowealth.model.AuthProvider;
import com.project.algowealth.model.Role;
import com.project.algowealth.model.User;
import com.project.algowealth.repository.RoleRepository;
import com.project.algowealth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exist");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProvider(AuthProvider.LOCAL);

        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER missing in DB"));
        user.getRoles().add(roleUser);

        return userRepository.save(user);
    }

    public User registerUserOauth2(String email) {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) return existing.get();

        User user = new User();
        user.setEmail(email);
        user.setProvider(AuthProvider.GOOGLE);

        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER missing in DB"));
        user.getRoles().add(roleUser);

        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }
}
