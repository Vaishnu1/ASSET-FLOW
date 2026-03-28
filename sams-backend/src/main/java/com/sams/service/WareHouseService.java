package com.sams.service;

import com.sams.dto.WareHouseDTO;
import java.util.List;

public interface WareHouseService {
    WareHouseDTO createWareHouse(WareHouseDTO dto);
    WareHouseDTO getWareHouseById(Long id);
    List<WareHouseDTO> getAllWareHouses();
    WareHouseDTO updateWareHouse(Long id, WareHouseDTO dto);
    void deleteWareHouse(Long id);
}