package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrModelItemInfoDTO {
    private Long srModelItemId;
    private Long srId;
    private Long orgId;
    private Long modelItemId;
    private String itemName;
    private String itemType;
    private Long itemTypeId;
    private String uomCode;
    private Double receivedQty;
    private Double consumedQty;
    private Double remainingQty;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}