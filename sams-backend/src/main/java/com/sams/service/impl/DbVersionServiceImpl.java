package com.sams.service.impl;

import com.sams.dto.DbVersionDTO;
import com.sams.entity.DbVersion;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.DbVersionRepository;
import com.sams.service.DbVersionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DbVersionServiceImpl implements DbVersionService {

    private final DbVersionRepository repository;

    @Override
    @Transactional
    public DbVersionDTO create(DbVersionDTO dto) {
        DbVersion entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public DbVersionDTO getById(Long id) {
        DbVersion entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DbVersion not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<DbVersionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

//    @Override
//    @Transactional
//    public DbVersionDTO update(Long id, DbVersionDTO dto) {
//        DbVersion entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DbVersion not found with ID: " + id));
//        DbVersion mapped = mapToEntity(dto);
//        //mapped.setModuleName(id); 
//        mapped.setId(id);  // ✔ correct (if entity has id field)
//        return mapToDTO(repository.save(mapped));
//    }

    @Override
    @Transactional
    public DbVersionDTO update(Long id, DbVersionDTO dto) {
        DbVersion entity = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("DbVersion not found with ID: " + id));

        entity.setModuleName(dto.getModuleName());
        entity.setModuleDdl(dto.getModuleDdl());
        entity.setModuleDml(dto.getModuleDml());

        return mapToDTO(repository.save(entity));
    }
    
    @Override
    @Transactional
    public void delete(Long id) {
        DbVersion entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("DbVersion not found with ID: " + id));
        repository.delete(entity);
    }

    private DbVersion mapToEntity(DbVersionDTO dto) {
        DbVersion entity = new DbVersion();
        entity.setModuleName(dto.getModuleName());
        entity.setModuleDdl(dto.getModuleDdl());
        entity.setModuleDml(dto.getModuleDml());
        return entity;
    }

    private DbVersionDTO mapToDTO(DbVersion entity) {
        DbVersionDTO dto = new DbVersionDTO();
        dto.setModuleName(entity.getModuleName());
        dto.setModuleDdl(entity.getModuleDdl());
        dto.setModuleDml(entity.getModuleDml());
        return dto;
    }
}