package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetRetDocDTO {
    private Long assetRetDocId;
    private Long orgId;
    private Long assetHdrId;
    private String docName;
    private String fileName;
    private String docType;
    private String filePath;
    private String contentType;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}