package com.example.vision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vision.model.Visitor;
import com.example.vision.service.VisitorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/receptionist")
@PreAuthorize("hasRole('RECEPTIONIST') or hasRole('ADMIN')")
public class ReceptionistController {
    @Autowired
    private VisitorService visitorService;

    @PostMapping("/visitors/check-in")
    public ResponseEntity<?> checkInVisitor(
            @RequestParam String fullName,
            @RequestParam(required = false) String email,
            @RequestParam String phone,
            @RequestParam String purpose,
            @RequestParam String hostEmployee,
            @RequestParam Long receptionistId) {
        try {
            Visitor visitor = visitorService.checkInVisitor(
                    fullName, email, phone, purpose, hostEmployee, receptionistId);
            return ResponseEntity.ok(visitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/visitors/{id}/check-out")
    public ResponseEntity<?> checkOutVisitor(@PathVariable Long id) {
        try {
            Visitor visitor = visitorService.checkOutVisitor(id);
            return ResponseEntity.ok(visitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/visitors/current")
    public ResponseEntity<List<Visitor>> getCurrentVisitors() {
        return ResponseEntity.ok(visitorService.getCurrentVisitors());
    }

    @GetMapping("/visitors/checked-out")
    public ResponseEntity<List<Visitor>> getCheckedOutVisitors() {
        return ResponseEntity.ok(visitorService.getCheckedOutVisitors());
    }

    @GetMapping("/visitors/my-visitors")
    public ResponseEntity<List<Visitor>> getVisitorsByReceptionist(@RequestParam Long receptionistId) {
        return ResponseEntity.ok(visitorService.getVisitorsByReceptionist(receptionistId));
    }
}