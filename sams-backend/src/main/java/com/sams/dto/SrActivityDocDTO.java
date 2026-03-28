package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrActivityDocDTO {
    private Long srActivityDocId;
    private Long orgId;
    private Long srId;
    private Long srActivityId;
    private String docName;
    private String docType;
    private String filePath;
    private String contentType;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}