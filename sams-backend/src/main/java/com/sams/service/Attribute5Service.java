package com.sams.service;

import com.sams.dto.Attribute5DTO;
import java.util.List;

public interface Attribute5Service {
    Attribute5DTO createAttribute5(Attribute5DTO dto);
    Attribute5DTO getAttribute5ById(Long id);
    List<Attribute5DTO> getAllAttribute5s();
    Attribute5DTO updateAttribute5(Long id, Attribute5DTO dto);
    void deleteAttribute5(Long id);
}