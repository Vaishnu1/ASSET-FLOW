package com.sams.service.impl;

import com.sams.dto.GroupMenuDTO;
import com.sams.entity.GroupMenu;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GroupMenuRepository;
import com.sams.service.GroupMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupMenuServiceImpl implements GroupMenuService {

    private final GroupMenuRepository repository;

    @Override
    @Transactional
    public GroupMenuDTO create(GroupMenuDTO dto) {
        GroupMenu entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GroupMenuDTO getById(Long id) {
        GroupMenu entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GroupMenu not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GroupMenuDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GroupMenuDTO update(Long id, GroupMenuDTO dto) {
        GroupMenu entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GroupMenu not found with ID: " + id));
        GroupMenu mapped = mapToEntity(dto);
        mapped.setGroupMenuId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GroupMenu entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GroupMenu not found with ID: " + id));
        repository.delete(entity);
    }

    private GroupMenu mapToEntity(GroupMenuDTO dto) {
        GroupMenu entity = new GroupMenu();
        entity.setGroupMenuId(dto.getGroupMenuId());
        entity.setGroupId(dto.getGroupId());
        entity.setMenuId(dto.getMenuId());
        entity.setMenuSequence(dto.getMenuSequence());
        return entity;
    }

    private GroupMenuDTO mapToDTO(GroupMenu entity) {
        GroupMenuDTO dto = new GroupMenuDTO();
        dto.setGroupMenuId(entity.getGroupMenuId());
        dto.setGroupId(entity.getGroupId());
        dto.setMenuId(entity.getMenuId());
        dto.setMenuSequence(entity.getMenuSequence());
        return dto;
    }
}