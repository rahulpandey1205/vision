package com.example.vision.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class VisitorAnalytics {
    private List<String> purposeLabels;
    private List<Long> purposeData;
    private List<String> timeLabels;
    private List<Long> timeData;
    private Map<String, Long> dailyVisitors;
}
