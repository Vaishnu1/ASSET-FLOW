package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierSiteRegDTO {
    private Long id;
    private Long supplierSiteRegId;
    private String registrationName;
    private String registrationNo;
    private String supplierSiteId;
}