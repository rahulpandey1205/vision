package com.example.vision.service;

import java.util.List;

import com.example.vision.model.Notification;

public interface NotificationService {
    List<Notification> getNotifications(boolean unreadOnly);
    long getUnreadNotificationCount();
    Notification markAsRead(Long id);
    void markAllAsRead();
    void createNotification(String title, String message, String icon, Long userId);
}