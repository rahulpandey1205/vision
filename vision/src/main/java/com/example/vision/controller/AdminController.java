package com.example.vision.controller;

import com.example.vision.model.*;
import com.example.vision.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final VisitorService visitorService;
    private final UserService userService;
    private final DashboardService dashboardService;
    private final NotificationService notificationService;
    private final AnalyticsService analyticsService;

    @Autowired
    public AdminController(VisitorService visitorService, 
                          UserService userService,
                          DashboardService dashboardService,
                          NotificationService notificationService,
                          AnalyticsService analyticsService) {
        this.visitorService = visitorService;
        this.userService = userService;
        this.dashboardService = dashboardService;
        this.notificationService = notificationService;
        this.analyticsService = analyticsService;
    }

    // Dashboard endpoints
    @GetMapping("/dashboard/metrics")
    public ResponseEntity<DashboardMetrics> getDashboardMetrics() {
        DashboardMetrics metrics = dashboardService.getDashboardMetrics();
        return ResponseEntity.ok(metrics);
    }

    // Visitor endpoints
    @GetMapping("/visitors")
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        return ResponseEntity.ok(visitorService.getAllVisitors());
    }

    @GetMapping("/visitors/recent")
    public ResponseEntity<List<Visitor>> getRecentVisitors(
            @RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(visitorService.getRecentVisitors(limit));
    }

    @GetMapping("/visitors/active")
    public ResponseEntity<List<Visitor>> getActiveVisitors() {
        return ResponseEntity.ok(visitorService.getActiveVisitors());
    }

    @GetMapping("/visitors/date/{date}")
    public ResponseEntity<List<Visitor>> getVisitorsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(visitorService.getVisitorsByDate(date));
    }

    @GetMapping("/visitors/range")
    public ResponseEntity<List<Visitor>> getVisitorsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(visitorService.getVisitorsByDateRange(start, end));
    }

    @PostMapping("/visitors")
    public ResponseEntity<?> createVisitor(@RequestBody Visitor visitor) {
        try {
            Visitor createdVisitor = visitorService.createVisitor(visitor);
            return ResponseEntity.ok(createdVisitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/visitors/{id}")
    public ResponseEntity<?> updateVisitor(@PathVariable Long id, @RequestBody Visitor visitor) {
        try {
            Visitor updatedVisitor = visitorService.updateVisitor(id, visitor);
            return ResponseEntity.ok(updatedVisitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/visitors/{id}/checkout")
    public ResponseEntity<?> checkOutVisitor(@PathVariable Long id) {
        try {
            Visitor checkedOutVisitor = visitorService.checkOutVisitor(id);
            return ResponseEntity.ok(checkedOutVisitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // User management endpoints
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
       return ResponseEntity.badRequest().build(); // works if your method returns `ResponseEntity<?>` or just `ResponseEntity`

    }

    @GetMapping("/users/active-hosts")
    public ResponseEntity<List<User>> getActiveHosts() {
        return ResponseEntity.ok(userService.getActiveHosts());
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Analytics endpoints
    @GetMapping("/analytics/visitors")
    public ResponseEntity<VisitorAnalytics> getVisitorAnalytics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        if (startDate == null) {
            startDate = LocalDate.now().minusDays(30);
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }
        return ResponseEntity.ok(analyticsService.getVisitorAnalytics(startDate, endDate));
    }

    @GetMapping("/analytics/purpose-distribution")
    public ResponseEntity<Map<String, Long>> getPurposeDistribution(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(analyticsService.getPurposeDistribution(date));
    }

    @GetMapping("/analytics/hourly-distribution")
    public ResponseEntity<Map<String, Long>> getHourlyDistribution(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(analyticsService.getHourlyDistribution(date));
    }

    // Notification endpoints
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications(
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        return ResponseEntity.ok(notificationService.getNotifications(unreadOnly));
    }

    @GetMapping("/notifications/count")
    public ResponseEntity<Long> getUnreadNotificationCount() {
        return ResponseEntity.ok(notificationService.getUnreadNotificationCount());
    }

    @PutMapping("/notifications/{id}/mark-read")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @PutMapping("/notifications/mark-all-read")
    public ResponseEntity<Void> markAllNotificationsAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
public ResponseEntity<Map<String, String>> getAdminProfile(@RequestHeader("Authorization") String authHeader) {
    try {
        // Optional: Extract user details from the JWT token if needed
        User currentUser = userService.getCurrentAuthenticatedUser(); // you should define this in your service

        Map<String, String> profile = Map.of(
                "username", currentUser.getUsername(),
                "avatar", currentUser.getAvatarUrl() // make sure your User entity has getAvatarUrl()
        );
        return ResponseEntity.ok(profile);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Unable to fetch admin profile"));
    }
}

}                      