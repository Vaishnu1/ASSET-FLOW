package com.sams.service.impl;

import com.sams.dto.TransactionActivityDTO;
import com.sams.entity.TransactionActivity;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.TransactionActivityRepository;
import com.sams.service.TransactionActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionActivityServiceImpl implements TransactionActivityService {

    private final TransactionActivityRepository repository;

    @Override
    @Transactional
    public TransactionActivityDTO create(TransactionActivityDTO dto) {
        TransactionActivity entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public TransactionActivityDTO getById(Long id) {
        TransactionActivity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransactionActivity not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<TransactionActivityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TransactionActivityDTO update(Long id, TransactionActivityDTO dto) {
        TransactionActivity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransactionActivity not found with ID: " + id));
        TransactionActivity mapped = mapToEntity(dto);
        mapped.setTransactionActivityId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        TransactionActivity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TransactionActivity not found with ID: " + id));
        repository.delete(entity);
    }

    private TransactionActivity mapToEntity(TransactionActivityDTO dto) {
        TransactionActivity entity = new TransactionActivity();
        entity.setTransactionActivityId(dto.getTransactionActivityId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionName(dto.getTransactionName());
        entity.setTransactionSource(dto.getTransactionSource());
        entity.setTransactionDoneBy(dto.getTransactionDoneBy());
        entity.setActivityName(dto.getActivityName());
        entity.setActivityDesc(dto.getActivityDesc());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private TransactionActivityDTO mapToDTO(TransactionActivity entity) {
        TransactionActivityDTO dto = new TransactionActivityDTO();
        dto.setTransactionActivityId(entity.getTransactionActivityId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionName(entity.getTransactionName());
        dto.setTransactionSource(entity.getTransactionSource());
        dto.setTransactionDoneBy(entity.getTransactionDoneBy());
        dto.setActivityName(entity.getActivityName());
        dto.setActivityDesc(entity.getActivityDesc());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}