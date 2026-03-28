package com.sams.service;

import com.sams.dto.LocatorWarehouseDTO;
import java.util.List;

public interface LocatorWarehouseService {
    LocatorWarehouseDTO createLocatorWarehouse(LocatorWarehouseDTO dto);
    LocatorWarehouseDTO getLocatorWarehouseById(Long id);
    List<LocatorWarehouseDTO> getAllLocatorWarehouses();
    LocatorWarehouseDTO updateLocatorWarehouse(Long id, LocatorWarehouseDTO dto);
    void deleteLocatorWarehouse(Long id);
}