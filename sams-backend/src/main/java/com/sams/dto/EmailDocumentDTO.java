package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailDocumentDTO {
    private Long emailMessageDocId;
    private Long emailMessageId;
    private Long fileId;
    private String filePath;
    private String fileName;
    private String createdBy;
    private LocalDateTime createdDt;
}