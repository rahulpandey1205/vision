package com.example.vision.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vision.dto.JwtResponse;
import com.example.vision.dto.LoginRequest;
import com.example.vision.dto.SignupRequest;
import com.example.vision.dto.UserInfoResponse;
import com.example.vision.model.ERole;
import com.example.vision.model.Role;
import com.example.vision.model.User;
import com.example.vision.repository.RoleRepository;
import com.example.vision.repository.UserRepository;
import com.example.vision.security.JwtUtils;
import com.example.vision.security.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();        
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));
        user.setPhone(signUpRequest.getPhone()); // Set phone number if provided
        Set<String> strRoles = signUpRequest.getRoles(); // <-- from frontend
Set<Role> roles = new HashSet<>();

if (strRoles == null) {
    Role userRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    roles.add(userRole);
} else {
    strRoles.forEach(role -> {
        switch (role) {
            case "ROLE_ADMIN":
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
                break;
            case "ROLE_RECEPTIONIST":
                Role recRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(recRole);
                break;
            default:
                throw new RuntimeException("Invalid role: " + role);
        }
    });
}
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new UserInfoResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                roles.stream().map(role -> role.getName().name()).collect(Collectors.toList())));
    }
}