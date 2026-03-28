package com.sams.service;

import com.sams.dto.StateDTO;
import java.util.List;

public interface StateService {
    StateDTO create(StateDTO dto);
    StateDTO getById(Long id);
    List<StateDTO> getAll();
    StateDTO update(Long id, StateDTO dto);
    void delete(Long id);
}