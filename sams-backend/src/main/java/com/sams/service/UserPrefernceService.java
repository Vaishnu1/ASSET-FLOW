package com.sams.service;

import com.sams.dto.UserPrefernceDTO;
import java.util.List;

public interface UserPrefernceService {
    UserPrefernceDTO create(UserPrefernceDTO dto);
    UserPrefernceDTO getById(Long id);
    List<UserPrefernceDTO> getAll();
    UserPrefernceDTO update(Long id, UserPrefernceDTO dto);
    void delete(Long id);
}