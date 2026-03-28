package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PartnerRolesMapDTO {
    private Long partnerRolesMapId;
    private Long orgId;
    private Long businessPartnerId;
    private Long businessPartnerRoleId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}