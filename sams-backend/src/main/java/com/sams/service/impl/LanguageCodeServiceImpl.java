package com.sams.service.impl;

import com.sams.dto.LanguageCodeDTO;
import com.sams.entity.LanguageCode;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LanguageCodeRepository;
import com.sams.service.LanguageCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LanguageCodeServiceImpl implements LanguageCodeService {

    private final LanguageCodeRepository repository;

    @Override
    @Transactional
    public LanguageCodeDTO create(LanguageCodeDTO dto) {
        LanguageCode entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LanguageCodeDTO getById(Long id) {
        LanguageCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LanguageCode not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LanguageCodeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LanguageCodeDTO update(Long id, LanguageCodeDTO dto) {
        LanguageCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LanguageCode not found with ID: " + id));
        LanguageCode mapped = mapToEntity(dto);
        mapped.setLanguageId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LanguageCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LanguageCode not found with ID: " + id));
        repository.delete(entity);
    }

    private LanguageCode mapToEntity(LanguageCodeDTO dto) {
        LanguageCode entity = new LanguageCode();
        entity.setLanguageId(dto.getLanguageId());
        entity.setLanguageName(dto.getLanguageName());
        return entity;
    }

    private LanguageCodeDTO mapToDTO(LanguageCode entity) {
        LanguageCodeDTO dto = new LanguageCodeDTO();
        dto.setLanguageId(entity.getLanguageId());
        dto.setLanguageName(entity.getLanguageName());
        return dto;
    }
}