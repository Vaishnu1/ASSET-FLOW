package com.sams.service;

import com.sams.dto.ParameterGroupDTO;
import java.util.List;

public interface ParameterGroupService {
    ParameterGroupDTO createParameterGroup(ParameterGroupDTO dto);
    ParameterGroupDTO getParameterGroupById(Long id);
    List<ParameterGroupDTO> getAllParameterGroups();
    ParameterGroupDTO updateParameterGroup(Long id, ParameterGroupDTO dto);
    void deleteParameterGroup(Long id);
}