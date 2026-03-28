package com.sams.service.impl;

import com.sams.dto.NumberControlCdDTO;
import com.sams.entity.NumberControlCd;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.NumberControlCdRepository;
import com.sams.service.NumberControlCdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NumberControlCdServiceImpl implements NumberControlCdService {

    private final NumberControlCdRepository repository;

    @Override
    @Transactional
    public NumberControlCdDTO create(NumberControlCdDTO dto) {
        NumberControlCd entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public NumberControlCdDTO getById(Long id) {
        NumberControlCd entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NumberControlCd not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<NumberControlCdDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NumberControlCdDTO update(Long id, NumberControlCdDTO dto) {
        NumberControlCd entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NumberControlCd not found with ID: " + id));
        NumberControlCd mapped = mapToEntity(dto);
        mapped.setNumberControlCdId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        NumberControlCd entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NumberControlCd not found with ID: " + id));
        repository.delete(entity);
    }

    private NumberControlCd mapToEntity(NumberControlCdDTO dto) {
        NumberControlCd entity = new NumberControlCd();
        entity.setNumberControlCdId(dto.getNumberControlCdId());
        entity.setNumberControlCdName(dto.getNumberControlCdName());
        entity.setNumberControlCdDesc(dto.getNumberControlCdDesc());
        entity.setNumberControlModule(dto.getNumberControlModule());
        entity.setPrefixCd(dto.getPrefixCd());
        entity.setSuffixCd(dto.getSuffixCd());
        return entity;
    }

    private NumberControlCdDTO mapToDTO(NumberControlCd entity) {
        NumberControlCdDTO dto = new NumberControlCdDTO();
        dto.setNumberControlCdId(entity.getNumberControlCdId());
        dto.setNumberControlCdName(entity.getNumberControlCdName());
        dto.setNumberControlCdDesc(entity.getNumberControlCdDesc());
        dto.setNumberControlModule(entity.getNumberControlModule());
        dto.setPrefixCd(entity.getPrefixCd());
        dto.setSuffixCd(entity.getSuffixCd());
        return dto;
    }
}