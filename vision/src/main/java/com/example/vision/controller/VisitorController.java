package com.example.vision.controller;

import java.security.Principal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vision.model.User;
import com.example.vision.model.Visitor;
import com.example.vision.repository.UserRepository;
import com.example.vision.repository.VisitorRepository;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "*")
public class VisitorController {

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> registerVisitor(@RequestBody Visitor visitor, Principal principal) {
        // Set check-in time if not provided
        if (visitor.getCheckin() == null) {
            visitor.setCheckin(LocalDateTime.now());
        }

        // Default status to "inside"
        if (visitor.getStatus() == null || visitor.getStatus().isBlank()) {
            visitor.setStatus("inside");
        }

        // Set currently logged-in receptionist
        String receptionistName = principal.getName(); // username from token
        User receptionist = userRepository.findByUsername(receptionistName)
                .orElseThrow(() -> new RuntimeException("Receptionist not found"));
        visitor.setReceptionist(receptionist);

        Visitor saved = visitorRepository.save(visitor);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/checkout")
    public ResponseEntity<?> checkOutVisitor(@PathVariable Long id) {
    Visitor visitor = visitorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Visitor not found"));

    visitor.setCheckOut(LocalDateTime.now());
    visitor.setStatus("checked-out");

    Visitor updated = visitorRepository.save(visitor);
    return ResponseEntity.ok(updated);
    }    
}
