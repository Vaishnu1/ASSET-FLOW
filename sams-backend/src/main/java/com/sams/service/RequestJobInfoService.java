package com.sams.service;

import com.sams.dto.RequestJobInfoDTO;
import java.util.List;

public interface RequestJobInfoService {
    RequestJobInfoDTO create(RequestJobInfoDTO dto);
    RequestJobInfoDTO getById(Long id);
    List<RequestJobInfoDTO> getAll();
    RequestJobInfoDTO update(Long id, RequestJobInfoDTO dto);
    void delete(Long id);
}