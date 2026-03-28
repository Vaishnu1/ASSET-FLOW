package com.sams.service.impl;

import com.sams.dto.ItemRegisterDTO;
import com.sams.entity.ItemRegister;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ItemRegisterRepository;
import com.sams.service.ItemRegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemRegisterServiceImpl implements ItemRegisterService {

    private final ItemRegisterRepository repository;

    @Override
    @Transactional
    public ItemRegisterDTO create(ItemRegisterDTO dto) {
        ItemRegister entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ItemRegisterDTO getById(Long id) {
        ItemRegister entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemRegister not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ItemRegisterDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ItemRegisterDTO update(Long id, ItemRegisterDTO dto) {
        ItemRegister entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemRegister not found with ID: " + id));
        ItemRegister mapped = mapToEntity(dto);
        mapped.setItemRegisterId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ItemRegister entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ItemRegister not found with ID: " + id));
        repository.delete(entity);
    }

    private ItemRegister mapToEntity(ItemRegisterDTO dto) {
        ItemRegister entity = new ItemRegister();
        entity.setItemRegisterId(dto.getItemRegisterId());
        entity.setItemId(dto.getItemId());
        entity.setItemCd(dto.getItemCd());
        entity.setInvDtlId(dto.getInvDtlId());
        entity.setItemDesc(dto.getItemDesc());
        entity.setTransactionDt(dto.getTransactionDt());
        entity.setTransactionDesc(dto.getTransactionDesc());
        entity.setInQty(dto.getInQty());
        entity.setOutQty(dto.getOutQty());
        entity.setBalanceQty(dto.getBalanceQty());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ItemRegisterDTO mapToDTO(ItemRegister entity) {
        ItemRegisterDTO dto = new ItemRegisterDTO();
        dto.setItemRegisterId(entity.getItemRegisterId());
        dto.setItemId(entity.getItemId());
        dto.setItemCd(entity.getItemCd());
        dto.setInvDtlId(entity.getInvDtlId());
        dto.setItemDesc(entity.getItemDesc());
        dto.setTransactionDt(entity.getTransactionDt());
        dto.setTransactionDesc(entity.getTransactionDesc());
        dto.setInQty(entity.getInQty());
        dto.setOutQty(entity.getOutQty());
        dto.setBalanceQty(entity.getBalanceQty());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}