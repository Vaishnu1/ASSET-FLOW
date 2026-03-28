package com.sams.service;

import com.sams.dto.UserCatDeptMappingDTO;
import java.util.List;

public interface UserCatDeptMappingService {
    UserCatDeptMappingDTO create(UserCatDeptMappingDTO dto);
    UserCatDeptMappingDTO getById(Long id);
    List<UserCatDeptMappingDTO> getAll();
    UserCatDeptMappingDTO update(Long id, UserCatDeptMappingDTO dto);
    void delete(Long id);
}