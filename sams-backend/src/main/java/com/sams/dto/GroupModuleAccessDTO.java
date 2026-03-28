package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupModuleAccessDTO {
    private Long groupAccessId;
    private Long orgId;
    private Long groupId;
    private Long moduleId;
    private String createFlg;
    private String readFlg;
    private String updateFlg;
    private String deleteFlg;
    private String exportFlg;
    private String importFlg;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}