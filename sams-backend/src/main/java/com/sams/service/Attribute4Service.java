package com.sams.service;

import com.sams.dto.Attribute4DTO;
import java.util.List;

public interface Attribute4Service {
    Attribute4DTO createAttribute4(Attribute4DTO dto);
    Attribute4DTO getAttribute4ById(Long id);
    List<Attribute4DTO> getAllAttribute4s();
    Attribute4DTO updateAttribute4(Long id, Attribute4DTO dto);
    void deleteAttribute4(Long id);
}