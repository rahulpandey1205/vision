package com.example.vision.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import com.example.vision.repository.RoleRepository;



import com.example.vision.model.ERole;
import com.example.vision.model.Role;
import com.example.vision.model.User;
import com.example.vision.repository.RoleRepository;
import com.example.vision.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public void createAdminUser() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", "admin@visitor.com", 
                encoder.encode("admin123"));
            
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            
            admin.setRoles(roles);
            userRepository.save(admin);
        }
    }

    public User createUser(String username, String email, String password, Set<String> strRoles) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User(username, email, encoder.encode(password));

        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                    break;
                default:
                    Role receptionistRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(receptionistRole);
                }
            });
        }

        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User createUser(User user) {
    user.setPassword(encoder.encode(user.getPassword()));
    return userRepository.save(user);
    }


    public List<User> getActiveHosts() {
    return userRepository.findActiveUsersByRole("HOST");
    }

    public User updateUser(Long id, User updatedUser) {
    User existingUser = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: User not found."));

    existingUser.setUsername(updatedUser.getUsername());
    existingUser.setEmail(updatedUser.getEmail());
    existingUser.setPhone(updatedUser.getPhone());
    existingUser.setRoles(updatedUser.getRoles());
    existingUser.setActive(updatedUser.isActive()); // or `getActive()` if using wrapper type

    return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
    if (!userRepository.existsById(id)) {
        throw new RuntimeException("Error: User not found.");
    }
    userRepository.deleteById(id);
    }

    public User getCurrentAuthenticatedUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String username = auth.getName();
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
