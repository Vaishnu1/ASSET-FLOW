package com.sams.service;

import com.sams.dto.Attribute3DTO;
import java.util.List;

public interface Attribute3Service {
    Attribute3DTO createAttribute3(Attribute3DTO dto);
    Attribute3DTO getAttribute3ById(Long id);
    List<Attribute3DTO> getAllAttribute3s();
    Attribute3DTO updateAttribute3(Long id, Attribute3DTO dto);
    void deleteAttribute3(Long id);
}