package com.sams.service;

import com.sams.dto.OrgDTO;
import java.util.List;

public interface OrgService {
    OrgDTO create(OrgDTO dto);
    OrgDTO getById(Long id);
    List<OrgDTO> getAll();
    OrgDTO update(Long id, OrgDTO dto);
    void delete(Long id);
}