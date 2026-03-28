package com.sams.service.impl;

import com.sams.dto.OrderReasonDTO;
import com.sams.entity.OrderReason;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.OrderReasonRepository;
import com.sams.service.OrderReasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderReasonServiceImpl implements OrderReasonService {

    private final OrderReasonRepository repository;

    @Override
    @Transactional
    public OrderReasonDTO create(OrderReasonDTO dto) {
        OrderReason entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public OrderReasonDTO getById(Long id) {
        OrderReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OrderReason not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<OrderReasonDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderReasonDTO update(Long id, OrderReasonDTO dto) {
        OrderReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OrderReason not found with ID: " + id));
        OrderReason mapped = mapToEntity(dto);
        mapped.setOrderReasonId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        OrderReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OrderReason not found with ID: " + id));
        repository.delete(entity);
    }

    private OrderReason mapToEntity(OrderReasonDTO dto) {
        OrderReason entity = new OrderReason();
        entity.setOrderReasonId(dto.getOrderReasonId());
        entity.setOrderReasonName(dto.getOrderReasonName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private OrderReasonDTO mapToDTO(OrderReason entity) {
        OrderReasonDTO dto = new OrderReasonDTO();
        dto.setOrderReasonId(entity.getOrderReasonId());
        dto.setOrderReasonName(entity.getOrderReasonName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}