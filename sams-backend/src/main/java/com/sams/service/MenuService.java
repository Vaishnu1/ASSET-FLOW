package com.sams.service;

import com.sams.dto.MenuDTO;
import java.util.List;

public interface MenuService {
    MenuDTO create(MenuDTO dto);
    MenuDTO getById(Long id);
    List<MenuDTO> getAll();
    MenuDTO update(Long id, MenuDTO dto);
    void delete(Long id);
}