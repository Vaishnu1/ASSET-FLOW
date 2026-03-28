package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrDocDTO {
    private Long srDocId;
    private Long orgId;
    private Long srId;
    private String docName;
    private String docType;
    private String filePath;
    private String contentType;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}