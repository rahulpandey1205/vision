package com.example.vision.model;

public class DashboardMetrics {
    private long totalVisitors;
    private long activeVisitors;
    private long totalUsers;

    // Getters and setters

    public long getTotalVisitors() {
        return totalVisitors;
    }

    public void setTotalVisitors(long totalVisitors) {
        this.totalVisitors = totalVisitors;
    }

    public long getActiveVisitors() {
        return activeVisitors;
    }

    public void setActiveVisitors(long activeVisitors) {
        this.activeVisitors = activeVisitors;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
}
