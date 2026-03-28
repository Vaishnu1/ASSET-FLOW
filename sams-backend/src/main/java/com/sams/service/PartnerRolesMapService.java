package com.sams.service;

import com.sams.dto.PartnerRolesMapDTO;
import java.util.List;

public interface PartnerRolesMapService {
    PartnerRolesMapDTO create(PartnerRolesMapDTO dto);
    PartnerRolesMapDTO getById(Long id);
    List<PartnerRolesMapDTO> getAll();
    PartnerRolesMapDTO update(Long id, PartnerRolesMapDTO dto);
    void delete(Long id);
}