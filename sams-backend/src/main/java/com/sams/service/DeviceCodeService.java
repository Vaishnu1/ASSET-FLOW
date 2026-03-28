package com.sams.service;

import com.sams.dto.DeviceCodeDTO;
import java.util.List;

public interface DeviceCodeService {
    DeviceCodeDTO createDeviceCode(DeviceCodeDTO dto);
    DeviceCodeDTO getDeviceCodeById(Long id);
    List<DeviceCodeDTO> getAllDeviceCodes();
    DeviceCodeDTO updateDeviceCode(Long id, DeviceCodeDTO dto);
    void deleteDeviceCode(Long id);
}