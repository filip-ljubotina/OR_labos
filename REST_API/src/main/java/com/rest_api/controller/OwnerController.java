package com.rest_api.controller;


import com.rest_api.entity.Defibrillator;
import com.rest_api.entity.Owner;
import com.rest_api.repository.DefibrillatorRepository;
import com.rest_api.repository.OwnerRepository;
import com.rest_api.wrapper.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/owners")
public class OwnerController {

    private final OwnerRepository ownerRepository;
    private final DefibrillatorRepository defibrillatorRepository;

    public OwnerController(OwnerRepository ownerRepository, DefibrillatorRepository defibrillatorRepository) {
        this.ownerRepository = ownerRepository;
        this.defibrillatorRepository = defibrillatorRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Owner>>> getAllOwners() {
        List<Owner> owners = ownerRepository.findAll();
        ApiResponse<List<Owner>> response = new ApiResponse<>("OK", "Fetched all owners", owners);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Owner>> getOwnerById(@PathVariable Long id) {
        return ownerRepository.findById(id)
                .map(owner -> new ResponseEntity<>(
                        new ApiResponse<>("OK", "Fetched owner with ID " + id, owner),
                        HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(
                        new ApiResponse<>("Not Found", "Owner with ID " + id + " doesn't exist", null),
                        HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Owner>> createOwner(@RequestBody Owner owner) {
        Owner saved = ownerRepository.save(owner);
        ApiResponse<Owner> response = new ApiResponse<>("OK", "Created new owner", saved);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Owner>> updateOwner(@PathVariable Long id, @RequestBody Owner ownerDetails) {
        return ownerRepository.findById(id)
                .map(owner -> {
                    owner.setName(ownerDetails.getName());
                    owner.setAddress(ownerDetails.getAddress());
                    Owner updated = ownerRepository.save(owner);
                    return new ResponseEntity<>(
                            new ApiResponse<>("OK", "Updated owner with ID " + id, updated),
                            HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(
                        new ApiResponse<>("Not Found", "Owner with ID " + id + " doesn't exist", null),
                        HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteOwner(@PathVariable Long id) {
        return ownerRepository.findById(id)
                .map(owner -> {
                    ownerRepository.delete(owner);
                    return new ResponseEntity<>(
                            new ApiResponse<>("OK", "Owner deleted successfully", null),
                            HttpStatus.NO_CONTENT);
                })
                .orElseGet(() -> new ResponseEntity<>(
                        new ApiResponse<>("Not Found", "Owner with ID " + id + " doesn't exist", null),
                        HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{ownerId}/defibrillators")
    public ResponseEntity<ApiResponse<List<Defibrillator>>> getDefibsByOwner(@PathVariable Long ownerId) {
        List<Defibrillator> defibs = defibrillatorRepository.findAll()
                .stream()
                .filter(d -> d.getOwner().getId().equals(ownerId))
                .collect(Collectors.toList());

        if (defibs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>("Not Found", "No defibrillators for owner " + ownerId, null));
        }

        return ResponseEntity.ok(new ApiResponse<>("OK", "Fetched all defibrillators for owner " + ownerId, defibs));
    }
}
