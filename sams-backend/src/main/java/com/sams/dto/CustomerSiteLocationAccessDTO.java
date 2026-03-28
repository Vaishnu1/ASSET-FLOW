package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomerSiteLocationAccessDTO {
    private Long customerSiteAccessId;
    private Long customerSiteId;
    private Long accessLocationId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}