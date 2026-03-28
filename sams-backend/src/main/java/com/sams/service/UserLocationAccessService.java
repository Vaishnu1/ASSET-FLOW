package com.sams.service;

import com.sams.dto.UserLocationAccessDTO;
import java.util.List;

public interface UserLocationAccessService {
    UserLocationAccessDTO create(UserLocationAccessDTO dto);
    UserLocationAccessDTO getById(Long id);
    List<UserLocationAccessDTO> getAll();
    UserLocationAccessDTO update(Long id, UserLocationAccessDTO dto);
    void delete(Long id);
}