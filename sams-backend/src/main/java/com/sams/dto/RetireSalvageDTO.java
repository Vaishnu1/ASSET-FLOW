package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RetireSalvageDTO {
    private Long retireSalvageId;
    private Long assetRetireId;
    private String salvageType;
    private Long modelId;
    private Long moduleId;
    private Long itemId;
    private Long storeId;
    private Long quantity;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}