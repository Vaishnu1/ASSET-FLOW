package com.sams.service;

import com.sams.dto.ContractTypeDTO;
import java.util.List;

public interface ContractTypeService {
    ContractTypeDTO create(ContractTypeDTO dto);
    ContractTypeDTO getById(Long id);
    List<ContractTypeDTO> getAll();
    ContractTypeDTO update(Long id, ContractTypeDTO dto);
    void delete(Long id);
}