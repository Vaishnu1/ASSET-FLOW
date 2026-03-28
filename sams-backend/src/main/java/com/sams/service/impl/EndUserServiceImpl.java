package com.sams.service.impl;

import com.sams.dto.EndUserDTO;
import com.sams.entity.EndUser;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EndUserRepository;
import com.sams.service.EndUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EndUserServiceImpl implements EndUserService {

    private final EndUserRepository repository;

    @Override
    @Transactional
    public EndUserDTO create(EndUserDTO dto) {
        EndUser entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EndUserDTO getById(Long id) {
        EndUser entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EndUser not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EndUserDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EndUserDTO update(Long id, EndUserDTO dto) {
        EndUser entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EndUser not found with ID: " + id));
        EndUser mapped = mapToEntity(dto);
        mapped.setEndUserId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EndUser entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EndUser not found with ID: " + id));
        repository.delete(entity);
    }

    private EndUser mapToEntity(EndUserDTO dto) {
        EndUser entity = new EndUser();
        entity.setEndUserId(dto.getEndUserId());
        entity.setOrgId(dto.getOrgId());
        entity.setEndUserName(dto.getEndUserName());
        entity.setMobileNumber(dto.getMobileNumber());
        entity.setUserVerificationOtp(dto.getUserVerificationOtp());
        entity.setUserVerified(dto.getUserVerified());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private EndUserDTO mapToDTO(EndUser entity) {
        EndUserDTO dto = new EndUserDTO();
        dto.setEndUserId(entity.getEndUserId());
        dto.setOrgId(entity.getOrgId());
        dto.setEndUserName(entity.getEndUserName());
        dto.setMobileNumber(entity.getMobileNumber());
        dto.setUserVerificationOtp(entity.getUserVerificationOtp());
        dto.setUserVerified(entity.getUserVerified());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}