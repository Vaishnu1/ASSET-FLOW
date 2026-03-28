package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemTypeDTO {
    private Long id;
    private Long orgId;
    private String itemTypeDesc;
    private Boolean active;
    private Long itemTypeId;
    private String itemTypeName;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
    private Boolean systemGenerated;
}