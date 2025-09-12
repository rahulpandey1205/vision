package com.example.vision.dto;

import java.time.LocalDateTime;

import com.example.vision.model.Visitor;

public class VisitorDTO {
    private Long id;
    private String fullName;
    private String hostEmployee;
    private String purpose;
    private LocalDateTime checkin;
    private String status;

    public VisitorDTO(Visitor v) {
        this.id = v.getId();
        this.fullName = v.getFullName();
        this.hostEmployee = v.getHostEmployee();
        this.purpose = v.getPurpose();
        this.checkin = v.getCheckin();
        this.status = v.getStatus();
    }

        
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getHostEmployee() { return hostEmployee; }
    public String getPurpose() { return purpose; }
    public LocalDateTime getCheckin() { return checkin; }
    public String getStatus() { return status; }

}
