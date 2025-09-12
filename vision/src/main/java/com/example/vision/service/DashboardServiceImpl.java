package com.example.vision.service;

import com.example.vision.model.DashboardMetrics;
import com.example.vision.repository.VisitorRepository;
import com.example.vision.repository.UserRepository;
import com.example.vision.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final VisitorRepository visitorRepository;
    private final UserRepository userRepository;

    @Autowired
    public DashboardServiceImpl(VisitorRepository visitorRepository, UserRepository userRepository) {
        this.visitorRepository = visitorRepository;
        this.userRepository = userRepository;
    }

    @Override
    public DashboardMetrics getDashboardMetrics() {
        DashboardMetrics metrics = new DashboardMetrics();

        metrics.setTotalVisitors(visitorRepository.count());
        metrics.setActiveVisitors(visitorRepository.countActiveVisitors()); // You'll need this method in your repository
        metrics.setTotalUsers(userRepository.count());

        return metrics;
    }
}

