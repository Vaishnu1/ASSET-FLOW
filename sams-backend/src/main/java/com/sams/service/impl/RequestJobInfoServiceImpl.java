package com.sams.service.impl;

import com.sams.dto.RequestJobInfoDTO;
import com.sams.entity.RequestJobInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RequestJobInfoRepository;
import com.sams.service.RequestJobInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestJobInfoServiceImpl implements RequestJobInfoService {

    private final RequestJobInfoRepository repository;

    @Override
    @Transactional
    public RequestJobInfoDTO create(RequestJobInfoDTO dto) {
        RequestJobInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RequestJobInfoDTO getById(Long id) {
        RequestJobInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RequestJobInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RequestJobInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RequestJobInfoDTO update(Long id, RequestJobInfoDTO dto) {
        RequestJobInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RequestJobInfo not found with ID: " + id));
        RequestJobInfo mapped = mapToEntity(dto);
        mapped.setRequestId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RequestJobInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RequestJobInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private RequestJobInfo mapToEntity(RequestJobInfoDTO dto) {
        RequestJobInfo entity = new RequestJobInfo();
        entity.setRequestId(dto.getRequestId());
        entity.setRequestNo(dto.getRequestNo());
        entity.setJobType(dto.getJobType());
        entity.setProgramName(dto.getProgramName());
        entity.setFilePathUrl(dto.getFilePathUrl());
        entity.setRequestStatus(dto.getRequestStatus());
        entity.setErrorLog(dto.getErrorLog());
        entity.setRequestedBy(dto.getRequestedBy());
        entity.setRequestDt(dto.getRequestDt());
        entity.setRequestEndDt(dto.getRequestEndDt());
        entity.setUserId(dto.getUserId());
        return entity;
    }

    private RequestJobInfoDTO mapToDTO(RequestJobInfo entity) {
        RequestJobInfoDTO dto = new RequestJobInfoDTO();
        dto.setRequestId(entity.getRequestId());
        dto.setRequestNo(entity.getRequestNo());
        dto.setJobType(entity.getJobType());
        dto.setProgramName(entity.getProgramName());
        dto.setFilePathUrl(entity.getFilePathUrl());
        dto.setRequestStatus(entity.getRequestStatus());
        dto.setErrorLog(entity.getErrorLog());
        dto.setRequestedBy(entity.getRequestedBy());
        dto.setRequestDt(entity.getRequestDt());
        dto.setRequestEndDt(entity.getRequestEndDt());
        dto.setUserId(entity.getUserId());
        return dto;
    }
}