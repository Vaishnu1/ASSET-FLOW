package com.sams.service.impl;

import com.sams.dto.StateDTO;
import com.sams.entity.State;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StateRepository;
import com.sams.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StateServiceImpl implements StateService {

    private final StateRepository repository;

    @Override
    @Transactional
    public StateDTO create(StateDTO dto) {
        State entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StateDTO getById(Long id) {
        State entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("State not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StateDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StateDTO update(Long id, StateDTO dto) {
        State entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("State not found with ID: " + id));
        State mapped = mapToEntity(dto);
        mapped.setStateId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        State entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("State not found with ID: " + id));
        repository.delete(entity);
    }

    private State mapToEntity(StateDTO dto) {
        State entity = new State();
        entity.setStateId(dto.getStateId());
        entity.setStateName(dto.getStateName());
        entity.setCountryId(dto.getCountryId());
        return entity;
    }

    private StateDTO mapToDTO(State entity) {
        StateDTO dto = new StateDTO();
        dto.setStateId(entity.getStateId());
        dto.setStateName(entity.getStateName());
        dto.setCountryId(entity.getCountryId());
        return dto;
    }
}