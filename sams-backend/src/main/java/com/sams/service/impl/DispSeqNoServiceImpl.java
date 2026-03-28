package com.sams.service.impl;

import com.sams.dto.DispSeqNoDTO;
import com.sams.entity.DispSeqNo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.DispSeqNoRepository;
import com.sams.service.DispSeqNoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DispSeqNoServiceImpl implements DispSeqNoService {

    private final DispSeqNoRepository repository;

    @Override
    @Transactional
    public DispSeqNoDTO create(DispSeqNoDTO dto) {
        DispSeqNo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public DispSeqNoDTO getById(Long id) {
        DispSeqNo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DispSeqNo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<DispSeqNoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DispSeqNoDTO update(Long id, DispSeqNoDTO dto) {
        DispSeqNo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DispSeqNo not found with ID: " + id));
        DispSeqNo mapped = mapToEntity(dto);
        mapped.setDispSeqNoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        DispSeqNo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DispSeqNo not found with ID: " + id));
        repository.delete(entity);
    }

    private DispSeqNo mapToEntity(DispSeqNoDTO dto) {
        DispSeqNo entity = new DispSeqNo();
        entity.setDispSeqNoId(dto.getDispSeqNoId());
        entity.setOrgId(dto.getOrgId());
        entity.setSeqNo(dto.getSeqNo());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private DispSeqNoDTO mapToDTO(DispSeqNo entity) {
        DispSeqNoDTO dto = new DispSeqNoDTO();
        dto.setDispSeqNoId(entity.getDispSeqNoId());
        dto.setOrgId(entity.getOrgId());
        dto.setSeqNo(entity.getSeqNo());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}