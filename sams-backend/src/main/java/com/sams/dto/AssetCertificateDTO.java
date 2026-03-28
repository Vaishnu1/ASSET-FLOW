package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetCertificateDTO {
    private Long assetCertificateId;
    private Long orgId;
    private Long assetId;
    private Long certificateId;
    private LocalDateTime issueDate;
    private LocalDateTime startDate;
    private LocalDateTime expiryDate;
    private String fileCertificateNo;
    private String documentNo;
    private String contentType;
    private String docName;
    private String filePath;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}