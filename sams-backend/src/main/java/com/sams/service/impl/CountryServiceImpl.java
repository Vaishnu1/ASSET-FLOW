package com.sams.service.impl;

import com.sams.dto.CountryDTO;
import com.sams.entity.Country;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CountryRepository;
import com.sams.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository repository;

    @Override
    @Transactional
    public CountryDTO create(CountryDTO dto) {
        Country entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CountryDTO getById(Long id) {
        Country entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Country not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CountryDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CountryDTO update(Long id, CountryDTO dto) {
        Country entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Country not found with ID: " + id));
        Country mapped = mapToEntity(dto);
        mapped.setCountryId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Country entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Country not found with ID: " + id));
        repository.delete(entity);
    }

    private Country mapToEntity(CountryDTO dto) {
        Country entity = new Country();
        entity.setCountryId(dto.getCountryId());
        entity.setCountryName(dto.getCountryName());
        entity.setPhoneCode(dto.getPhoneCode());
        entity.setCurrencyCd(dto.getCurrencyCd());
        entity.setCountryCd(dto.getCountryCd());
        entity.setLanguageCd(dto.getLanguageCd());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CountryDTO mapToDTO(Country entity) {
        CountryDTO dto = new CountryDTO();
        dto.setCountryId(entity.getCountryId());
        dto.setCountryName(entity.getCountryName());
        dto.setPhoneCode(entity.getPhoneCode());
        dto.setCurrencyCd(entity.getCurrencyCd());
        dto.setCountryCd(entity.getCountryCd());
        dto.setLanguageCd(entity.getLanguageCd());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}