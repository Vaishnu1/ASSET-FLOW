package com.sams.service.impl;

import com.sams.dto.LocationDTO;
import com.sams.entity.Location;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocationRepository;
import com.sams.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository repository;

    @Override
    @Transactional
    public LocationDTO create(LocationDTO dto) {
        Location entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocationDTO getById(Long id) {
        Location entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocationDTO update(Long id, LocationDTO dto) {
        Location entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location not found with ID: " + id));
        Location mapped = mapToEntity(dto);
        mapped.setLocationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Location entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location not found with ID: " + id));
        repository.delete(entity);
    }

    private Location mapToEntity(LocationDTO dto) {
        Location entity = new Location();
        entity.setLocationId(dto.getLocationId());
        entity.setOrgId(dto.getOrgId());
        entity.setLegalEntityId(dto.getLegalEntityId());
        entity.setLocationName(dto.getLocationName());
        entity.setLocationType(dto.getLocationType());
        entity.setLocationCode(dto.getLocationCode());
        entity.setLocShortName(dto.getLocShortName());
        entity.setCurCd(dto.getCurCd());
        entity.setContactPersonName(dto.getContactPersonName());
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
        entity.setSmtpPortNumber(dto.getSmtpPortNumber());
        entity.setSmtpServerAddr(dto.getSmtpServerAddr());
        entity.setFromEmailAddr(dto.getFromEmailAddr());
        entity.setSmtpAccountId(dto.getSmtpAccountId());
        entity.setSmtpAccountPwd(dto.getSmtpAccountPwd());
        entity.setFieldLabelFilePath(dto.getFieldLabelFilePath());
        entity.setFieldLabelLanguage(dto.getFieldLabelLanguage());
        entity.setLanguageCode(dto.getLanguageCode());
        entity.setRegionId(dto.getRegionId());
        entity.setDateFormat(dto.getDateFormat());
        entity.setEnableCustomerEntry(dto.getEnableCustomerEntry());
        entity.setUserSessionTimeOut(dto.getUserSessionTimeOut());
        entity.setFyStartMonth(dto.getFyStartMonth());
        entity.setFyEndMonth(dto.getFyEndMonth());
        entity.setActive(dto.getActive());
        entity.setCheckAttendanceForAsignEng(dto.getCheckAttendanceForAsignEng());
        entity.setDefaultSrNotifyUser(dto.getDefaultSrNotifyUser());
        entity.setServiceTypeId(dto.getServiceTypeId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setLocAttribute1(dto.getLocAttribute1());
        entity.setLocAttribute2(dto.getLocAttribute2());
        entity.setBookValueCalcType(dto.getBookValueCalcType());
        return entity;
    }

    private LocationDTO mapToDTO(Location entity) {
        LocationDTO dto = new LocationDTO();
        dto.setLocationId(entity.getLocationId());
        dto.setOrgId(entity.getOrgId());
        dto.setLegalEntityId(entity.getLegalEntityId());
        dto.setLocationName(entity.getLocationName());
        dto.setLocationType(entity.getLocationType());
        dto.setLocationCode(entity.getLocationCode());
        dto.setLocShortName(entity.getLocShortName());
        dto.setCurCd(entity.getCurCd());
        dto.setContactPersonName(entity.getContactPersonName());
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
        dto.setSmtpPortNumber(entity.getSmtpPortNumber());
        dto.setSmtpServerAddr(entity.getSmtpServerAddr());
        dto.setFromEmailAddr(entity.getFromEmailAddr());
        dto.setSmtpAccountId(entity.getSmtpAccountId());
        dto.setSmtpAccountPwd(entity.getSmtpAccountPwd());
        dto.setFieldLabelFilePath(entity.getFieldLabelFilePath());
        dto.setFieldLabelLanguage(entity.getFieldLabelLanguage());
        dto.setLanguageCode(entity.getLanguageCode());
        dto.setRegionId(entity.getRegionId());
        dto.setDateFormat(entity.getDateFormat());
        dto.setEnableCustomerEntry(entity.getEnableCustomerEntry());
        dto.setUserSessionTimeOut(entity.getUserSessionTimeOut());
        dto.setFyStartMonth(entity.getFyStartMonth());
        dto.setFyEndMonth(entity.getFyEndMonth());
        dto.setActive(entity.getActive());
        dto.setCheckAttendanceForAsignEng(entity.getCheckAttendanceForAsignEng());
        dto.setDefaultSrNotifyUser(entity.getDefaultSrNotifyUser());
        dto.setServiceTypeId(entity.getServiceTypeId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setLocAttribute1(entity.getLocAttribute1());
        dto.setLocAttribute2(entity.getLocAttribute2());
        dto.setBookValueCalcType(entity.getBookValueCalcType());
        return dto;
    }
}