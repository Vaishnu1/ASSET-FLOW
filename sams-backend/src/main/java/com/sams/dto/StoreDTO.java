package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StoreDTO {
    private Long id;
    private Long storeId;
    private String storeName;
    private String storeCode;
    private String storeDescription;
    private String inchargeName;
    private String inchargeId;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
}