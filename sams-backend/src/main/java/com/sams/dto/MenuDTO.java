package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MenuDTO {
    private Long menuId;
    private Long orgId;
    private String menuName;
    private String modulePath;
    private String iconCls;
    private String createdBy;
    private LocalDateTime createdDt;
}