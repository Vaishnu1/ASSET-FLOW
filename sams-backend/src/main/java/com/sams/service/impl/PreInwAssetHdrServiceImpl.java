package com.sams.service.impl;

import com.sams.dto.PreInwAssetHdrDTO;
import com.sams.entity.PreInwAssetHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PreInwAssetHdrRepository;
import com.sams.service.PreInwAssetHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreInwAssetHdrServiceImpl implements PreInwAssetHdrService {

    private final PreInwAssetHdrRepository repository;

    @Override
    @Transactional
    public PreInwAssetHdrDTO create(PreInwAssetHdrDTO dto) {
        PreInwAssetHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PreInwAssetHdrDTO getById(Long id) {
        PreInwAssetHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwAssetHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PreInwAssetHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PreInwAssetHdrDTO update(Long id, PreInwAssetHdrDTO dto) {
        PreInwAssetHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwAssetHdr not found with ID: " + id));
        PreInwAssetHdr mapped = mapToEntity(dto);
        mapped.setInwardInventoryHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PreInwAssetHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwAssetHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private PreInwAssetHdr mapToEntity(PreInwAssetHdrDTO dto) {
        PreInwAssetHdr entity = new PreInwAssetHdr();
        entity.setInwardInventoryHdrId(dto.getInwardInventoryHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setPreInwStatusId(dto.getPreInwStatusId());
        entity.setCapexNumber(dto.getCapexNumber());
        entity.setShipToId(dto.getShipToId());
        entity.setShipTo(dto.getShipTo());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerName(dto.getBusinessPartnerName());
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        entity.setPartnerSiteName(dto.getPartnerSiteName());
        entity.setPurchaseOrderNo(dto.getPurchaseOrderNo());
        entity.setPurchaseDt(dto.getPurchaseDt());
        entity.setExpectedDtOfDelivery(dto.getExpectedDtOfDelivery());
        entity.setTotalQty(dto.getTotalQty());
        entity.setTotalUnitPrice(dto.getTotalUnitPrice());
        entity.setTotalTaxAmount(dto.getTotalTaxAmount());
        entity.setTotalAmount(dto.getTotalAmount());
        entity.setRequestRaisedByPhoneNumber(dto.getRequestRaisedByPhoneNumber());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setServiceProviderId(dto.getServiceProviderId());
        entity.setServiceProviderSiteId(dto.getServiceProviderSiteId());
        entity.setInternalPoNumber(dto.getInternalPoNumber());
        entity.setPreInwardNumber(dto.getPreInwardNumber());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setPartnerSiteAddress(dto.getPartnerSiteAddress());
        entity.setServiceProviderSiteAddress(dto.getServiceProviderSiteAddress());
        return entity;
    }

    private PreInwAssetHdrDTO mapToDTO(PreInwAssetHdr entity) {
        PreInwAssetHdrDTO dto = new PreInwAssetHdrDTO();
        dto.setInwardInventoryHdrId(entity.getInwardInventoryHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setPreInwStatusId(entity.getPreInwStatusId());
        dto.setCapexNumber(entity.getCapexNumber());
        dto.setShipToId(entity.getShipToId());
        dto.setShipTo(entity.getShipTo());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerName(entity.getBusinessPartnerName());
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        dto.setPartnerSiteName(entity.getPartnerSiteName());
        dto.setPurchaseOrderNo(entity.getPurchaseOrderNo());
        dto.setPurchaseDt(entity.getPurchaseDt());
        dto.setExpectedDtOfDelivery(entity.getExpectedDtOfDelivery());
        dto.setTotalQty(entity.getTotalQty());
        dto.setTotalUnitPrice(entity.getTotalUnitPrice());
        dto.setTotalTaxAmount(entity.getTotalTaxAmount());
        dto.setTotalAmount(entity.getTotalAmount());
        dto.setRequestRaisedByPhoneNumber(entity.getRequestRaisedByPhoneNumber());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setServiceProviderId(entity.getServiceProviderId());
        dto.setServiceProviderSiteId(entity.getServiceProviderSiteId());
        dto.setInternalPoNumber(entity.getInternalPoNumber());
        dto.setPreInwardNumber(entity.getPreInwardNumber());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setPartnerSiteAddress(entity.getPartnerSiteAddress());
        dto.setServiceProviderSiteAddress(entity.getServiceProviderSiteAddress());
        return dto;
    }
}