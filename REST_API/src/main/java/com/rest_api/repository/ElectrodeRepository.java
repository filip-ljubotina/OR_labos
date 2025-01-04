package com.rest_api.repository;

import com.rest_api.entity.Electrode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectrodeRepository extends JpaRepository<Electrode, Long> {
}