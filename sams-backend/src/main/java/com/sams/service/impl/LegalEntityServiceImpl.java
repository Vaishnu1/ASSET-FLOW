package com.sams.service.impl;

import com.sams.dto.LegalEntityDTO;
import com.sams.entity.LegalEntity;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LegalEntityRepository;
import com.sams.service.LegalEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LegalEntityServiceImpl implements LegalEntityService {

    private final LegalEntityRepository repository;

    @Override
    @Transactional
    public LegalEntityDTO create(LegalEntityDTO dto) {
        LegalEntity entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LegalEntityDTO getById(Long id) {
        LegalEntity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LegalEntity not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LegalEntityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LegalEntityDTO update(Long id, LegalEntityDTO dto) {
        LegalEntity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LegalEntity not found with ID: " + id));
        LegalEntity mapped = mapToEntity(dto);
        mapped.setLegalEntityId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LegalEntity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LegalEntity not found with ID: " + id));
        repository.delete(entity);
    }

    private LegalEntity mapToEntity(LegalEntityDTO dto) {
        LegalEntity entity = new LegalEntity();
        entity.setLegalEntityId(dto.getLegalEntityId());
        entity.setOrgId(dto.getOrgId());
        entity.setOrgName(dto.getOrgName());
        entity.setLegalEntityName(dto.getLegalEntityName());
        entity.setLegalEntityCode(dto.getLegalEntityCode());
        entity.setLegalEntityDesc(dto.getLegalEntityDesc());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPostalCd(dto.getPostalCd());
        entity.setEmailId(dto.getEmailId());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setCurCd(dto.getCurCd());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LegalEntityDTO mapToDTO(LegalEntity entity) {
        LegalEntityDTO dto = new LegalEntityDTO();
        dto.setLegalEntityId(entity.getLegalEntityId());
        dto.setOrgId(entity.getOrgId());
        dto.setOrgName(entity.getOrgName());
        dto.setLegalEntityName(entity.getLegalEntityName());
        dto.setLegalEntityCode(entity.getLegalEntityCode());
        dto.setLegalEntityDesc(entity.getLegalEntityDesc());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPostalCd(entity.getPostalCd());
        dto.setEmailId(entity.getEmailId());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setCurCd(entity.getCurCd());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}