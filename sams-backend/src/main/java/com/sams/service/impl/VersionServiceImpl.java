package com.sams.service.impl;

import com.sams.dto.VersionDTO;
import com.sams.entity.Version;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.VersionRepository;
import com.sams.service.VersionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VersionServiceImpl implements VersionService {

    private final VersionRepository repository;

    @Override
    @Transactional
    public VersionDTO create(VersionDTO dto) {
        Version entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public VersionDTO getById(Long id) {
        Version entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Version not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<VersionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public VersionDTO update(Long id, VersionDTO dto) {
        Version entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Version not found with ID: " + id));
        Version mapped = mapToEntity(dto);
        mapped.setVersionSeqNo(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Version entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Version not found with ID: " + id));
        repository.delete(entity);
    }

    private Version mapToEntity(VersionDTO dto) {
        Version entity = new Version();
        entity.setVersionSeqNo(dto.getVersionSeqNo());
        entity.setVersionName(dto.getVersionName());
        entity.setReleaseDt(dto.getReleaseDt());
        entity.setRemarks(dto.getRemarks());
        return entity;
    }

    private VersionDTO mapToDTO(Version entity) {
        VersionDTO dto = new VersionDTO();
        dto.setVersionSeqNo(entity.getVersionSeqNo());
        dto.setVersionName(entity.getVersionName());
        dto.setReleaseDt(entity.getReleaseDt());
        dto.setRemarks(entity.getRemarks());
        return dto;
    }
}