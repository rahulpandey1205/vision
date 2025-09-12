package com.example.vision.service;

import com.example.vision.model.VisitorAnalytics;

import java.time.LocalDate;
import java.util.Map;

public interface AnalyticsService {
    VisitorAnalytics getVisitorAnalytics(LocalDate startDate, LocalDate endDate);
    Map<String, Long> getPurposeDistribution(LocalDate date);
    Map<String, Long> getHourlyDistribution(LocalDate date);
}