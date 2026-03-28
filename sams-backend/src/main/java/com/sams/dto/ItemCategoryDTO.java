package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemCategoryDTO {
    private Long id;
    private Long orgId;
    private String categoryDesc;
    private Boolean active;
    private Long categoryId;
    private String categoryName;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
}