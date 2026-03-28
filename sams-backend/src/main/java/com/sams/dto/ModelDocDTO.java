package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelDocDTO {
    private Long modelDocId;
    private Long orgId;
    private Long modelId;
    private String docName;
    private String docType;
    private String filePath;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String contentType;
}