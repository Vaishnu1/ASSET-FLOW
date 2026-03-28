package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CertificateDTO {
    private Long id;
    private Long certificateId;
    private Long orgId;
    private Long certificationAuthorityId;
    private String certificationAuthorityName;
    private String certificateName;
    private String renewalRequired;
    private String issuingAuthority;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private String columnName;
    private String direction;
}