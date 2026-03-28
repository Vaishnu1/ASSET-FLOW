package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PurchasingTypeDTO {
    private Long purchasingTypeId;
    private Long orgId;
    private String purchasingTypeName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String module;
}