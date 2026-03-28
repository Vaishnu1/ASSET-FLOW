package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelImageDTO {
    private Long modelImageId;
    private Long orgId;
    private Long modelId;
    private String imageName;
    private String imageType;
    private String filePath;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}