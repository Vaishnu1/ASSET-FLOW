package com.sams.service;

import com.sams.dto.GroupModuleAccessDTO;
import java.util.List;

public interface GroupModuleAccessService {
    GroupModuleAccessDTO create(GroupModuleAccessDTO dto);
    GroupModuleAccessDTO getById(Long id);
    List<GroupModuleAccessDTO> getAll();
    GroupModuleAccessDTO update(Long id, GroupModuleAccessDTO dto);
    void delete(Long id);
}