package com.sams.service.impl;

import com.sams.dto.AssetDTO;
import com.sams.entity.Asset;
import com.sams.entity.Department;
import com.sams.entity.Employee;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetRepository;
import com.sams.repository.DepartmentRepository;
import com.sams.repository.EmployeeRepository;
import com.sams.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public AssetDTO createAsset(AssetDTO dto) {
        if (assetRepository.existsBySerialNumber(dto.getSerialNumber())) {
            throw new IllegalArgumentException("Asset Serial Number already exists!");
        }

        Asset asset = mapToEntity(dto);
        Asset savedAsset = assetRepository.save(asset);
        return mapToDTO(savedAsset);
    }

    @Override
    public AssetDTO getAssetById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with ID: " + id));
        return mapToDTO(asset);
    }

    @Override
    public List<AssetDTO> getAllAssets() {
        return assetRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetDTO updateAsset(Long id, AssetDTO dto) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with ID: " + id));

        if (!asset.getSerialNumber().equals(dto.getSerialNumber()) &&
                assetRepository.existsBySerialNumber(dto.getSerialNumber())) {
            throw new IllegalArgumentException("Asset Serial Number already exists!");
        }

        asset.setAssetName(dto.getAssetName());
        asset.setSerialNumber(dto.getSerialNumber());
        asset.setAssetType(dto.getAssetType());
        asset.setPurchaseCost(dto.getPurchaseCost());
        asset.setPurchaseDate(dto.getPurchaseDate());
        asset.setStatus(dto.getStatus());
        if (dto.getActive() != null) {
            asset.setActive(dto.getActive());
        }

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));
            asset.setDepartment(department);
        } else {
            asset.setDepartment(null);
        }

        if (dto.getAssignedToId() != null) {
            Employee employee = employeeRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + dto.getAssignedToId()));
            asset.setAssignedTo(employee);
        } else {
            asset.setAssignedTo(null);
        }

        Asset updatedAsset = assetRepository.save(asset);
        return mapToDTO(updatedAsset);
    }

    @Override
    @Transactional
    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with ID: " + id));
        assetRepository.delete(asset);
    }

    private Asset mapToEntity(AssetDTO dto) {
        Asset asset = new Asset();
        asset.setAssetName(dto.getAssetName());
        asset.setSerialNumber(dto.getSerialNumber());
        asset.setAssetType(dto.getAssetType());
        asset.setPurchaseCost(dto.getPurchaseCost());
        asset.setPurchaseDate(dto.getPurchaseDate());
        asset.setStatus(dto.getStatus());
        if (dto.getActive() != null) {
            asset.setActive(dto.getActive());
        }

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));
            asset.setDepartment(department);
        }

        if (dto.getAssignedToId() != null) {
            Employee employee = employeeRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + dto.getAssignedToId()));
            asset.setAssignedTo(employee);
        }

        return asset;
    }

    private AssetDTO mapToDTO(Asset entity) {
        AssetDTO dto = new AssetDTO();
        dto.setId(entity.getId());
        dto.setAssetName(entity.getAssetName());
        dto.setSerialNumber(entity.getSerialNumber());
        dto.setAssetType(entity.getAssetType());
        dto.setPurchaseCost(entity.getPurchaseCost());
        dto.setPurchaseDate(entity.getPurchaseDate());
        dto.setStatus(entity.getStatus());
        dto.setActive(entity.getActive());

        if (entity.getDepartment() != null) {
            dto.setDepartmentId(entity.getDepartment().getId());
        }

        if (entity.getAssignedTo() != null) {
            dto.setAssignedToId(entity.getAssignedTo().getId());
        }

        return dto;
    }
}
