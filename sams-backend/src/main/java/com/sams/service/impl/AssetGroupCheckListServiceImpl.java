package com.sams.service.impl;

import com.sams.dto.AssetGroupCheckListDTO;
import com.sams.entity.AssetGroupCheckList;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetGroupCheckListRepository;
import com.sams.service.AssetGroupCheckListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetGroupCheckListServiceImpl implements AssetGroupCheckListService {

    private final AssetGroupCheckListRepository repository;

    @Override
    @Transactional
    public AssetGroupCheckListDTO createAssetGroupCheckList(AssetGroupCheckListDTO dto) {
        AssetGroupCheckList entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetGroupCheckListDTO getAssetGroupCheckListById(Long id) {
        AssetGroupCheckList entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupCheckList not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetGroupCheckListDTO> getAllAssetGroupCheckLists() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetGroupCheckListDTO updateAssetGroupCheckList(Long id, AssetGroupCheckListDTO dto) {
        AssetGroupCheckList entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupCheckList not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetGroupCheckList mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetGroupCheckList(Long id) {
        AssetGroupCheckList entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupCheckList not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetGroupCheckList mapToEntity(AssetGroupCheckListDTO dto) {
        AssetGroupCheckList entity = new AssetGroupCheckList();
        entity.setCheckListId(dto.getCheckListId());
        entity.setParameterName(dto.getParameterName());
        entity.setParameterType(dto.getParameterType());
        entity.setInputType(dto.getInputType());
        entity.setOption1(dto.getOption1());
        entity.setOption2(dto.getOption2());
        entity.setOption3(dto.getOption3());
        entity.setNoOfOptions(dto.getNoOfOptions());
        entity.setComboValues(dto.getComboValues());
        entity.setMinValue(dto.getMinValue());
        entity.setMaxValue(dto.getMaxValue());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setDirection(dto.getDirection());
        entity.setColumnName(dto.getColumnName());
        return entity;
    }

    private AssetGroupCheckListDTO mapToDTO(AssetGroupCheckList entity) {
        AssetGroupCheckListDTO dto = new AssetGroupCheckListDTO();
        dto.setId(entity.getId());
        dto.setCheckListId(entity.getCheckListId());
        dto.setParameterName(entity.getParameterName());
        dto.setParameterType(entity.getParameterType());
        dto.setInputType(entity.getInputType());
        dto.setOption1(entity.getOption1());
        dto.setOption2(entity.getOption2());
        dto.setOption3(entity.getOption3());
        dto.setNoOfOptions(entity.getNoOfOptions());
        dto.setComboValues(entity.getComboValues());
        dto.setMinValue(entity.getMinValue());
        dto.setMaxValue(entity.getMaxValue());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setDirection(entity.getDirection());
        dto.setColumnName(entity.getColumnName());
        return dto;
    }
}