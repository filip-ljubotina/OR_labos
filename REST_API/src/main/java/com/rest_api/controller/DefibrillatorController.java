package com.rest_api.controller;

import com.rest_api.entity.Defibrillator;
import com.rest_api.entity.Electrode;
import com.rest_api.repository.DefibrillatorRepository;
import com.rest_api.repository.ElectrodeRepository;
import com.rest_api.wrapper.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/defibrillators")
public class DefibrillatorController {

    private final DefibrillatorRepository defibrillatorRepository;
    private final ElectrodeRepository electrodeRepository;

    public DefibrillatorController(DefibrillatorRepository defibrillatorRepository,
                                   ElectrodeRepository electrodeRepository) {
        this.defibrillatorRepository = defibrillatorRepository;
        this.electrodeRepository = electrodeRepository;
    }

    @GetMapping("/{defibId}/electrodes")
    public ResponseEntity<ApiResponse<List<Electrode>>> getElectrodesByDefibrillator(@PathVariable Long defibId) {
        List<Electrode> electrodes = electrodeRepository.findAll()
                .stream()
                .filter(e -> e.getDefibrillator().getId().equals(defibId))
                .collect(Collectors.toList());

        if (electrodes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>("Not Found", "No electrodes for defibrillator " + defibId, null));
        }

        return ResponseEntity.ok(new ApiResponse<>("OK", "Fetched all electrodes for defibrillator " + defibId, electrodes));
    }

    @GetMapping("/connected")
    public ResponseEntity<ApiResponse<List<Defibrillator>>> getConnectedDefibrillators() {
        List<Defibrillator> connected = defibrillatorRepository.findAll()
                .stream()
                .filter(Defibrillator::getConnectedToEms)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse<>("OK", "All defibrillators connected to EMS", connected)
        );
    }

}

