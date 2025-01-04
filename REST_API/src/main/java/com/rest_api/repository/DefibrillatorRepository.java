package com.rest_api.repository;

import com.rest_api.entity.Defibrillator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DefibrillatorRepository extends JpaRepository<Defibrillator, Long> {
}
