package com.sams.service.impl;

import com.sams.dto.UserDTO;
import com.sams.entity.User;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UserRepository;
import com.sams.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    @Transactional
    public UserDTO create(UserDTO dto) {
        User entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UserDTO getById(Long id) {
        User entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UserDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
        User entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        User mapped = mapToEntity(dto);
        mapped.setUserId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        User entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        repository.delete(entity);
    }

    private User mapToEntity(UserDTO dto) {
        User entity = new User();
        entity.setUserId(dto.getUserId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setOrgId(dto.getOrgId());
        entity.setLoginId(dto.getLoginId());
        entity.setPassword(dto.getPassword());
        entity.setUserName(dto.getUserName());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setEmployeeCode(dto.getEmployeeCode());
        entity.setUserType(dto.getUserType());
        entity.setUserTypeSrcId(dto.getUserTypeSrcId());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        entity.setMobileNumber(dto.getMobileNumber());
        entity.setEmailId(dto.getEmailId());
        entity.setLoginStatus(dto.getLoginStatus());
        entity.setCountryCode(dto.getCountryCode());
        entity.setEmailAuthenticationStatus(dto.getEmailAuthenticationStatus());
        entity.setValidFromDt(dto.getValidFromDt());
        entity.setValidToDt(dto.getValidToDt());
        entity.setMobileToken(dto.getMobileToken());
        entity.setFcmToken(dto.getFcmToken());
        entity.setUserRegisterVerification(dto.getUserRegisterVerification());
        entity.setPwdChangeCount(dto.getPwdChangeCount());
        entity.setToken(dto.getToken());
        entity.setEmailValidityStatus(dto.getEmailValidityStatus());
        entity.setOtp(dto.getOtp());
        entity.setOtpSent(dto.getOtpSent());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setReceiveAutomatedAssetReport(dto.getReceiveAutomatedAssetReport());
        return entity;
    }

    private UserDTO mapToDTO(User entity) {
        UserDTO dto = new UserDTO();
        dto.setUserId(entity.getUserId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setOrgId(entity.getOrgId());
        dto.setLoginId(entity.getLoginId());
        dto.setPassword(entity.getPassword());
        dto.setUserName(entity.getUserName());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setEmployeeCode(entity.getEmployeeCode());
        dto.setUserType(entity.getUserType());
        dto.setUserTypeSrcId(entity.getUserTypeSrcId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        dto.setMobileNumber(entity.getMobileNumber());
        dto.setEmailId(entity.getEmailId());
        dto.setLoginStatus(entity.getLoginStatus());
        dto.setCountryCode(entity.getCountryCode());
        dto.setEmailAuthenticationStatus(entity.getEmailAuthenticationStatus());
        dto.setValidFromDt(entity.getValidFromDt());
        dto.setValidToDt(entity.getValidToDt());
        dto.setMobileToken(entity.getMobileToken());
        dto.setFcmToken(entity.getFcmToken());
        dto.setUserRegisterVerification(entity.getUserRegisterVerification());
        dto.setPwdChangeCount(entity.getPwdChangeCount());
        dto.setToken(entity.getToken());
        dto.setEmailValidityStatus(entity.getEmailValidityStatus());
        dto.setOtp(entity.getOtp());
        dto.setOtpSent(entity.getOtpSent());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setReceiveAutomatedAssetReport(entity.getReceiveAutomatedAssetReport());
        return dto;
    }
}