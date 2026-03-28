package com.sams.service.impl;

import com.sams.dto.StateCityDTO;
import com.sams.entity.StateCity;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StateCityRepository;
import com.sams.service.StateCityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StateCityServiceImpl implements StateCityService {

    private final StateCityRepository repository;

    @Override
    @Transactional
    public StateCityDTO create(StateCityDTO dto) {
        StateCity entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StateCityDTO getById(Long id) {
        StateCity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StateCity not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StateCityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

//    @Override
//    @Transactional
//    public StateCityDTO update(Long id, StateCityDTO dto) {
//        StateCity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StateCity not found with ID: " + id));
//        StateCity mapped = mapToEntity(dto);
//        //mapped.setState(id); 
//        mapped.setId(id);  //correct (if entity has id field)
//        return mapToDTO(repository.save(mapped));
//    }

    @Override
    @Transactional
    public StateCityDTO update(Long id, StateCityDTO dto) {
        StateCity entity = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("StateCity not found with ID: " + id));

        entity.setState(dto.getState());
        entity.setCity(dto.getCity());
        entity.setCountry(dto.getCountry());

        return mapToDTO(repository.save(entity));
    }
    
    @Override
    @Transactional
    public void delete(Long id) {
        StateCity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StateCity not found with ID: " + id));
        repository.delete(entity);
    }

    private StateCity mapToEntity(StateCityDTO dto) {
        StateCity entity = new StateCity();
        entity.setState(dto.getState());
        entity.setCity(dto.getCity());
        entity.setCountry(dto.getCountry());
        return entity;
    }

    private StateCityDTO mapToDTO(StateCity entity) {
        StateCityDTO dto = new StateCityDTO();
        dto.setState(entity.getState());
        dto.setCity(entity.getCity());
        dto.setCountry(entity.getCountry());
        return dto;
    }
}