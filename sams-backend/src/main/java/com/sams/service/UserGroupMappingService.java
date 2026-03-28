package com.sams.service;

import com.sams.dto.UserGroupMappingDTO;
import java.util.List;

public interface UserGroupMappingService {
    UserGroupMappingDTO create(UserGroupMappingDTO dto);
    UserGroupMappingDTO getById(Long id);
    List<UserGroupMappingDTO> getAll();
    UserGroupMappingDTO update(Long id, UserGroupMappingDTO dto);
    void delete(Long id);
}