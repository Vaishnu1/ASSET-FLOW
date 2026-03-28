package com.sams.service.impl;

import com.sams.dto.OrgDTO;
import com.sams.entity.Org;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.OrgRepository;
import com.sams.service.OrgService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrgServiceImpl implements OrgService {

    private final OrgRepository repository;

    @Override
    @Transactional
    public OrgDTO create(OrgDTO dto) {
        Org entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public OrgDTO getById(Long id) {
        Org entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Org not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<OrgDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrgDTO update(Long id, OrgDTO dto) {
        Org entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Org not found with ID: " + id));
        Org mapped = mapToEntity(dto);
        mapped.setOrgId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Org entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Org not found with ID: " + id));
        repository.delete(entity);
    }

    private Org mapToEntity(OrgDTO dto) {
        Org entity = new Org();
        entity.setOrgId(dto.getOrgId());
        entity.setOrgName(dto.getOrgName());
        entity.setOrgCode(dto.getOrgCode());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setAltPhoneNumber(dto.getAltPhoneNumber());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPincode(dto.getPincode());
        entity.setEmailId(dto.getEmailId());
        entity.setWebUrl(dto.getWebUrl());
        entity.setCurCd(dto.getCurCd());
        entity.setCountryCode(dto.getCountryCode());
        entity.setDateFormat(dto.getDateFormat());
        entity.setActive(dto.getActive());
        entity.setLogoPath(dto.getLogoPath());
        entity.setSmsSenderUserName(dto.getSmsSenderUserName());
        entity.setSmsSenderPassword(dto.getSmsSenderPassword());
        entity.setSmsSenderId(dto.getSmsSenderId());
        entity.setSmsSenderUrl(dto.getSmsSenderUrl());
        entity.setSmtpPortNumber(dto.getSmtpPortNumber());
        entity.setSmtpServerName(dto.getSmtpServerName());
        entity.setPopServerName(dto.getPopServerName());
        entity.setPopAccountId(dto.getPopAccountId());
        entity.setPopAccountPwd(dto.getPopAccountPwd());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setFirebaseAccessToken(dto.getFirebaseAccessToken());
        return entity;
    }

    private OrgDTO mapToDTO(Org entity) {
        OrgDTO dto = new OrgDTO();
        dto.setOrgId(entity.getOrgId());
        dto.setOrgName(entity.getOrgName());
        dto.setOrgCode(entity.getOrgCode());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setAltPhoneNumber(entity.getAltPhoneNumber());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPincode(entity.getPincode());
        dto.setEmailId(entity.getEmailId());
        dto.setWebUrl(entity.getWebUrl());
        dto.setCurCd(entity.getCurCd());
        dto.setCountryCode(entity.getCountryCode());
        dto.setDateFormat(entity.getDateFormat());
        dto.setActive(entity.getActive());
        dto.setLogoPath(entity.getLogoPath());
        dto.setSmsSenderUserName(entity.getSmsSenderUserName());
        dto.setSmsSenderPassword(entity.getSmsSenderPassword());
        dto.setSmsSenderId(entity.getSmsSenderId());
        dto.setSmsSenderUrl(entity.getSmsSenderUrl());
        dto.setSmtpPortNumber(entity.getSmtpPortNumber());
        dto.setSmtpServerName(entity.getSmtpServerName());
        dto.setPopServerName(entity.getPopServerName());
        dto.setPopAccountId(entity.getPopAccountId());
        dto.setPopAccountPwd(entity.getPopAccountPwd());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setFirebaseAccessToken(entity.getFirebaseAccessToken());
        return dto;
    }
}