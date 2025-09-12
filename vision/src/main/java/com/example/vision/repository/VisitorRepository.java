package com.example.vision.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.vision.model.Visitor;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByReceptionistId(Long receptionistId);
    List<Visitor> findByCheckOutIsNull();
    List<Visitor> findByCheckOutIsNotNull();

    @Query("SELECT v FROM Visitor v ORDER BY v.checkin DESC")
    List<Visitor> findRecentVisitors(Pageable pageable);
    List<Visitor> findByCheckinBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(v) FROM Visitor v WHERE v.checkOut IS NULL")
    long countActiveVisitors();

    @Query("SELECT v FROM Visitor v WHERE v.checkin BETWEEN :start AND :end")
    List<Visitor> findTodaysVisitors(LocalDateTime start, LocalDateTime end);

     @Query("SELECT DISTINCT v.hostEmployee FROM Visitor v WHERE v.checkin BETWEEN :start AND :end")
     List<String> findHostsOnDuty(LocalDateTime start, LocalDateTime end);

    @Query("SELECT v FROM Visitor v WHERE v.status = 'inside'")
    List<Visitor> findActiveVisitors();

    @Query("SELECT v FROM Visitor v WHERE v.status = 'pre-registered'")
    List<Visitor> findPreRegistrations();
}