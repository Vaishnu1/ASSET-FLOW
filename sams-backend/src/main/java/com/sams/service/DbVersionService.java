package com.sams.service;

import com.sams.dto.DbVersionDTO;
import java.util.List;

public interface DbVersionService {
    DbVersionDTO create(DbVersionDTO dto);
    DbVersionDTO getById(Long id);
    List<DbVersionDTO> getAll();
    DbVersionDTO update(Long id, DbVersionDTO dto);
    void delete(Long id);
}