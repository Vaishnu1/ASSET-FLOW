package com.sams.service.impl;

import com.sams.dto.InstallHandoverInfoDTO;
import com.sams.entity.InstallHandoverInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.InstallHandoverInfoRepository;
import com.sams.service.InstallHandoverInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstallHandoverInfoServiceImpl implements InstallHandoverInfoService {

    private final InstallHandoverInfoRepository repository;

    @Override
    @Transactional
    public InstallHandoverInfoDTO create(InstallHandoverInfoDTO dto) {
        InstallHandoverInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public InstallHandoverInfoDTO getById(Long id) {
        InstallHandoverInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstallHandoverInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<InstallHandoverInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InstallHandoverInfoDTO update(Long id, InstallHandoverInfoDTO dto) {
        InstallHandoverInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstallHandoverInfo not found with ID: " + id));
        InstallHandoverInfo mapped = mapToEntity(dto);
        mapped.setInstallHandoverId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        InstallHandoverInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InstallHandoverInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private InstallHandoverInfo mapToEntity(InstallHandoverInfoDTO dto) {
        InstallHandoverInfo entity = new InstallHandoverInfo();
        entity.setInstallHandoverId(dto.getInstallHandoverId());
        entity.setOrgId(dto.getOrgId());
        entity.setHandoverItemType(dto.getHandoverItemType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private InstallHandoverInfoDTO mapToDTO(InstallHandoverInfo entity) {
        InstallHandoverInfoDTO dto = new InstallHandoverInfoDTO();
        dto.setInstallHandoverId(entity.getInstallHandoverId());
        dto.setOrgId(entity.getOrgId());
        dto.setHandoverItemType(entity.getHandoverItemType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}