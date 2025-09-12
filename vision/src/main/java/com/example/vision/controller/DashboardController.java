package com.example.vision.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vision.dto.VisitorDTO;
import com.example.vision.repository.VisitorRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final VisitorRepository visitorRepository;

    public DashboardController(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        long visitorsToday = visitorRepository.findTodaysVisitors(startOfDay, endOfDay).size();
        long activeVisitors = visitorRepository.findActiveVisitors().size();
        long hostsOnDuty = visitorRepository.findHostsOnDuty(startOfDay, endOfDay).size();
        long preRegistrations = visitorRepository.findPreRegistrations().size();

       List<VisitorDTO> recentVisitors = visitorRepository.findRecentVisitors(PageRequest.of(0, 5))
                .stream()
                .map(VisitorDTO::new)
                .toList();
        stats.put("visitorsToday", visitorsToday);
        stats.put("activeVisitors", activeVisitors);
        stats.put("hostsOnDuty", hostsOnDuty);
        stats.put("preRegistrationsToday", preRegistrations);
        stats.put("recentVisitors", recentVisitors);

        return stats;
    }
}
