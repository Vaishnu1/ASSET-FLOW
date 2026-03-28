package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModulesDTO {
    private Long moduleId;
    private String moduleKey;
    private String moduleDesc;
    private String moduleType;
    private String moduleGroupName;
    private String moduleLocalName;
    private String iconCls;
    private Long parentModuleId;
    private String modulePath;
    private String createdBy;
    private LocalDateTime createdDt;
}