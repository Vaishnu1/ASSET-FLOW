package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LegalEntityRegDTO {
    private Long legalEntityRegId;
    private String registrationName;
    private String registrationNo;
    private Long legalEntityId;
    private String legalEntityName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}