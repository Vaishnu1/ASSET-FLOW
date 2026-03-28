package com.sams.service;

import com.sams.dto.MenuModulesDTO;
import java.util.List;

public interface MenuModulesService {
    MenuModulesDTO create(MenuModulesDTO dto);
    MenuModulesDTO getById(Long id);
    List<MenuModulesDTO> getAll();
    MenuModulesDTO update(Long id, MenuModulesDTO dto);
    void delete(Long id);
}