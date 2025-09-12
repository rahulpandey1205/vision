package com.example.vision.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vision.model.Visitor;
import com.example.vision.model.VisitorAnalytics;
import com.example.vision.repository.VisitorRepository;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private VisitorRepository visitorRepository;

    @Override
    public VisitorAnalytics getVisitorAnalytics(LocalDate startDate, LocalDate endDate) {
        // Validate dates
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start date and end date cannot be null");
        }
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date must be before or equal to end date");
        }

        List<Visitor> visitors = visitorRepository.findByCheckinBetween(
                startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay());

        if (visitors == null) {
            visitors = Collections.emptyList();
        }

        VisitorAnalytics analytics = new VisitorAnalytics();

        // Purpose Distribution
        Map<String, Long> purposeMap = visitors.stream()
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(
                        v -> v.getPurpose() != null ? String.valueOf(v.getPurpose()) : "Unknown",
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
        analytics.setPurposeLabels(new ArrayList<>(purposeMap.keySet()));
        analytics.setPurposeData(new ArrayList<>(purposeMap.values()));

        // Time Distribution (hourly)
        Map<String, Long> timeMap = visitors.stream()
                .filter(Objects::nonNull)
                .filter(v -> v.getCheckin() != null)
                .collect(Collectors.groupingBy(
                        v -> String.format("%02d:00", v.getCheckin().getHour()),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
        analytics.setTimeLabels(new ArrayList<>(timeMap.keySet()));
        analytics.setTimeData(new ArrayList<>(timeMap.values()));

        // Daily Visitors
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Map<String, Long> dailyMap = visitors.stream()
                .filter(Objects::nonNull)
                .filter(v -> v.getCheckin() != null)
                .collect(Collectors.groupingBy(
                        v -> v.getCheckin().toLocalDate().toString(),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
        analytics.setDailyVisitors(dailyMap);

        return analytics;
    }

    @Override
    public Map<String, Long> getPurposeDistribution(LocalDate date) {
        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        List<Visitor> visitors = visitorRepository.findByCheckinBetween(start, end);

        return visitors.stream()
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(
                        v -> v.getPurpose() != null ? String.valueOf(v.getPurpose()) : "Unknown",
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
    }

    @Override
    public Map<String, Long> getHourlyDistribution(LocalDate date) {
        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        List<Visitor> visitors = visitorRepository.findByCheckinBetween(start, end);

        return visitors.stream()
                .filter(Objects::nonNull)
                .filter(v -> v.getCheckin() != null)
                .collect(Collectors.groupingBy(
                        v -> String.format("%02d:00", v.getCheckin().getHour()),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
    }
}