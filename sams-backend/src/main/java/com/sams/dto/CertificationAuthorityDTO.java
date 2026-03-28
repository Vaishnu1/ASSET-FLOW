package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CertificationAuthorityDTO {
    private Long id;
    private Long certificationAuthorityId;
    private Long orgId;
    private String certificationAuthorityName;
    private String issuingAuthority;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private String columnName;
    private String direction;
}