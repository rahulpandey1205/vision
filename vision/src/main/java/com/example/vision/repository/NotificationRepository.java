package com.example.vision.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vision.model.Notification;
import com.example.vision.model.User;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Find all notifications ordered by creation time (newest first)
    List<Notification> findAllByOrderByCreatedAtDesc();

    // Find unread notifications
    List<Notification> findByReadFalse();

    // Find unread notifications ordered by creation time
    List<Notification> findByReadFalseOrderByCreatedAtDesc();

    // Count how many are unread
    long countByReadFalse();

    // Get notifications for a specific user
    List<Notification> findByUser(User user);

    // Get unread notifications for a specific user
    List<Notification> findByUserAndReadFalse(User user);
}

