package com.sams.service;

import com.sams.dto.GroupMenuDTO;
import java.util.List;

public interface GroupMenuService {
    GroupMenuDTO create(GroupMenuDTO dto);
    GroupMenuDTO getById(Long id);
    List<GroupMenuDTO> getAll();
    GroupMenuDTO update(Long id, GroupMenuDTO dto);
    void delete(Long id);
}