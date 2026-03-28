package com.sams.service;

import com.sams.dto.UserSessionInfoDTO;
import java.util.List;

public interface UserSessionInfoService {
    UserSessionInfoDTO create(UserSessionInfoDTO dto);
    UserSessionInfoDTO getById(Long id);
    List<UserSessionInfoDTO> getAll();
    UserSessionInfoDTO update(Long id, UserSessionInfoDTO dto);
    void delete(Long id);
}