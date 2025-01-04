package com.rest_api.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "electrodes")
public class Electrode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "defibrillator_id", nullable = false)
    private Defibrillator defibrillator;

    @Column(name = "serial_number")
    private String serialNumber;

    private String type;
    private LocalDate expirationDate;

    public Electrode() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Defibrillator getDefibrillator() {
        return defibrillator;
    }

    public void setDefibrillator(Defibrillator defibrillator) {
        this.defibrillator = defibrillator;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}

