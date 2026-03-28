package com.sams.service.impl;

import com.sams.dto.AssetSwDtlDTO;
import com.sams.entity.AssetSwDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetSwDtlRepository;
import com.sams.service.AssetSwDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetSwDtlServiceImpl implements AssetSwDtlService {

    private final AssetSwDtlRepository repository;

    @Override
    @Transactional
    public AssetSwDtlDTO create(AssetSwDtlDTO dto) {
        AssetSwDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetSwDtlDTO getById(Long id) {
        AssetSwDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetSwDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetSwDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetSwDtlDTO update(Long id, AssetSwDtlDTO dto) {
        AssetSwDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetSwDtl not found with ID: " + id));
        AssetSwDtl mapped = mapToEntity(dto);
        mapped.setAssetSwDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetSwDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetSwDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetSwDtl mapToEntity(AssetSwDtlDTO dto) {
        AssetSwDtl entity = new AssetSwDtl();
        entity.setAssetSwDtlId(dto.getAssetSwDtlId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setSoftwareName(dto.getSoftwareName());
        entity.setVersion(dto.getVersion());
        entity.setLicenceKey(dto.getLicenceKey());
        entity.setNoOfLicence(dto.getNoOfLicence());
        entity.setActivationDt(dto.getActivationDt());
        entity.setExpiryDt(dto.getExpiryDt());
        entity.setActive(dto.getActive());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetSwDtlDTO mapToDTO(AssetSwDtl entity) {
        AssetSwDtlDTO dto = new AssetSwDtlDTO();
        dto.setAssetSwDtlId(entity.getAssetSwDtlId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setSoftwareName(entity.getSoftwareName());
        dto.setVersion(entity.getVersion());
        dto.setLicenceKey(entity.getLicenceKey());
        dto.setNoOfLicence(entity.getNoOfLicence());
        dto.setActivationDt(entity.getActivationDt());
        dto.setExpiryDt(entity.getExpiryDt());
        dto.setActive(entity.getActive());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}