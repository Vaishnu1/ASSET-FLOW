package com.sams.service;

import com.sams.dto.GroupDTO;
import java.util.List;

public interface GroupService {
    GroupDTO create(GroupDTO dto);
    GroupDTO getById(Long id);
    List<GroupDTO> getAll();
    GroupDTO update(Long id, GroupDTO dto);
    void delete(Long id);
}