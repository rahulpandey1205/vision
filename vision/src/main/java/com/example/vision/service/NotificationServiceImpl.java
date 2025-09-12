package com.example.vision.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vision.model.Notification;
import com.example.vision.repository.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Notification> getNotifications(boolean unreadOnly) {
        if (unreadOnly) {
            return notificationRepository.findByReadFalseOrderByCreatedAtDesc();
        } else {
            return notificationRepository.findAllByOrderByCreatedAtDesc();
        }
    }

    @Override
    public long getUnreadNotificationCount() {
        return notificationRepository.countByReadFalse();
    }

    @Override
    public Notification markAsRead(Long id) {
        Optional<Notification> optional = notificationRepository.findById(id);
        if (optional.isPresent()) {
            Notification notification = optional.get();
            notification.setRead(true);
            return notificationRepository.save(notification);
        }
        return null;
    }

    @Override
    public void markAllAsRead() {
        List<Notification> unreadNotifications = notificationRepository.findByReadFalse();
        for (Notification n : unreadNotifications) {
            n.setRead(true);
        }
        notificationRepository.saveAll(unreadNotifications);
    }

    @Override
    public void createNotification(String title, String message, String icon, Long userId) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setIcon(icon);
        notification.setId(userId);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }
}



