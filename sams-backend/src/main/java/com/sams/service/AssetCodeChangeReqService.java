package com.sams.service;

import com.sams.dto.AssetCodeChangeReqDTO;
import java.util.List;

public interface AssetCodeChangeReqService {
    AssetCodeChangeReqDTO create(AssetCodeChangeReqDTO dto);
    AssetCodeChangeReqDTO getById(Long id);
    List<AssetCodeChangeReqDTO> getAll();
    AssetCodeChangeReqDTO update(Long id, AssetCodeChangeReqDTO dto);
    void delete(Long id);
}