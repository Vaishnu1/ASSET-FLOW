package com.sams.service;

import com.sams.dto.OrderReasonDTO;
import java.util.List;

public interface OrderReasonService {
    OrderReasonDTO create(OrderReasonDTO dto);
    OrderReasonDTO getById(Long id);
    List<OrderReasonDTO> getAll();
    OrderReasonDTO update(Long id, OrderReasonDTO dto);
    void delete(Long id);
}