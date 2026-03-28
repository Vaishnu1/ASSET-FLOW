package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrReOpenedDTO {
    private Long srReOpenedId;
    private Long orgId;
    private Long srId;
    private Long reOpenedById;
    private String reOpenedBy;
    private LocalDateTime reOpenedDt;
    private String reOpenedRemarks;
    private LocalDateTime reOpenedCompletedDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}