package com.example.vision.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.vision.model.User;
import com.example.vision.model.Visitor;
import com.example.vision.repository.UserRepository;
import com.example.vision.repository.VisitorRepository;

@Service
public class VisitorService {
    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private UserRepository userRepository;

    public Visitor checkInVisitor(String fullName, String email, String phone, 
                                String purpose, String hostEmployee, Long receptionistId) {
        User receptionist = userRepository.findById(receptionistId)
            .orElseThrow(() -> new RuntimeException("Error: Receptionist not found."));

        Visitor visitor = new Visitor();
        visitor.setFullName(fullName);
        visitor.setEmail(email);
        visitor.setPhone(phone);
        visitor.setPurpose(purpose);
        visitor.setHostEmployee(hostEmployee);
        visitor.setCheckin(LocalDateTime.now());
        visitor.setReceptionist(receptionist);

        return visitorRepository.save(visitor);
    }

    public Visitor checkOutVisitor(Long visitorId) {
        Visitor visitor = visitorRepository.findById(visitorId)
            .orElseThrow(() -> new RuntimeException("Error: Visitor not found."));

        visitor.setCheckOut(LocalDateTime.now());
        return visitorRepository.save(visitor);
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    public List<Visitor> getCurrentVisitors() {
        return visitorRepository.findByCheckOutIsNull();
    }

    public List<Visitor> getCheckedOutVisitors() {
        return visitorRepository.findByCheckOutIsNotNull();
    }

    public List<Visitor> getVisitorsByReceptionist(Long receptionistId) {
        return visitorRepository.findByReceptionistId(receptionistId);
    }

    public List<Visitor> getRecentVisitors(int limit) {
    return visitorRepository.findRecentVisitors(PageRequest.of(0, limit));
    }

    public List<Visitor> getActiveVisitors() {
    return visitorRepository.findByCheckOutIsNull();
    }

   public List<Visitor> getVisitorsByDate(LocalDate date) {
    return visitorRepository.findByCheckinBetween(
        date.atStartOfDay(),
        date.plusDays(1).atStartOfDay()
    );
    }

    public List<Visitor> getVisitorsByDateRange(LocalDate start, LocalDate end) {
    LocalDateTime startDateTime = start.atStartOfDay();
    LocalDateTime endDateTime = end.plusDays(1).atStartOfDay(); // include the end date
    return visitorRepository.findByCheckinBetween(startDateTime, endDateTime);
    }

    public Visitor createVisitor(Visitor visitor) {
    return visitorRepository.save(visitor);
    }

    public Visitor updateVisitor(Long id, Visitor updatedVisitor) {
    Visitor existingVisitor = visitorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Error: Visitor not found."));

    existingVisitor.setFullName(updatedVisitor.getFullName());
    existingVisitor.setEmail(updatedVisitor.getEmail());
    existingVisitor.setPhone(updatedVisitor.getPhone());
    existingVisitor.setPurpose(updatedVisitor.getPurpose());
    existingVisitor.setHostEmployee(updatedVisitor.getHostEmployee());
    existingVisitor.setCheckin(updatedVisitor.getCheckin());
    existingVisitor.setCheckOut(updatedVisitor.getCheckOut());
    // optionally: existingVisitor.setReceptionist(updatedVisitor.getReceptionist());

    return visitorRepository.save(existingVisitor);
    }
}