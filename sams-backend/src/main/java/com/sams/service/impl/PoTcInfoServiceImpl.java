package com.sams.service.impl;

import com.sams.dto.PoTcInfoDTO;
import com.sams.entity.PoTcInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoTcInfoRepository;
import com.sams.service.PoTcInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoTcInfoServiceImpl implements PoTcInfoService {

    private final PoTcInfoRepository repository;

    @Override
    @Transactional
    public PoTcInfoDTO create(PoTcInfoDTO dto) {
        PoTcInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoTcInfoDTO getById(Long id) {
        PoTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTcInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoTcInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoTcInfoDTO update(Long id, PoTcInfoDTO dto) {
        PoTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTcInfo not found with ID: " + id));
        PoTcInfo mapped = mapToEntity(dto);
        mapped.setPoTcInfoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoTcInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTcInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private PoTcInfo mapToEntity(PoTcInfoDTO dto) {
        PoTcInfo entity = new PoTcInfo();
        entity.setPoTcInfoId(dto.getPoTcInfoId());
        entity.setPoHdrId(dto.getPoHdrId());
        entity.setTcTemplateHdrId(dto.getTcTemplateHdrId());
        entity.setTcParameterId(dto.getTcParameterId());
        entity.setTcParameterName(dto.getTcParameterName());
        entity.setDisplaySequenceNo(dto.getDisplaySequenceNo());
        entity.setTcParameterChildId(dto.getTcParameterChildId());
        entity.setTcParameterChildName(dto.getTcParameterChildName());
        entity.setSelEnteredValues(dto.getSelEnteredValues());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setSelEnteredValuesChild(dto.getSelEnteredValuesChild());
        entity.setTcParameterChildId2(dto.getTcParameterChildId2());
        entity.setTcParameterChildName2(dto.getTcParameterChildName2());
        entity.setSelEnteredValuesChild2(dto.getSelEnteredValuesChild2());
        entity.setIsEditable(dto.getIsEditable());
        entity.setTcParameterEditable(dto.getTcParameterEditable());
        entity.setTcParameterChildEditable(dto.getTcParameterChildEditable());
        return entity;
    }

    private PoTcInfoDTO mapToDTO(PoTcInfo entity) {
        PoTcInfoDTO dto = new PoTcInfoDTO();
        dto.setPoTcInfoId(entity.getPoTcInfoId());
        dto.setPoHdrId(entity.getPoHdrId());
        dto.setTcTemplateHdrId(entity.getTcTemplateHdrId());
        dto.setTcParameterId(entity.getTcParameterId());
        dto.setTcParameterName(entity.getTcParameterName());
        dto.setDisplaySequenceNo(entity.getDisplaySequenceNo());
        dto.setTcParameterChildId(entity.getTcParameterChildId());
        dto.setTcParameterChildName(entity.getTcParameterChildName());
        dto.setSelEnteredValues(entity.getSelEnteredValues());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setSelEnteredValuesChild(entity.getSelEnteredValuesChild());
        dto.setTcParameterChildId2(entity.getTcParameterChildId2());
        dto.setTcParameterChildName2(entity.getTcParameterChildName2());
        dto.setSelEnteredValuesChild2(entity.getSelEnteredValuesChild2());
        dto.setIsEditable(entity.getIsEditable());
        dto.setTcParameterEditable(entity.getTcParameterEditable());
        dto.setTcParameterChildEditable(entity.getTcParameterChildEditable());
        return dto;
    }
}