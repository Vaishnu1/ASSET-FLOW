package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupMenuDTO {
    private Long groupMenuId;
    private Long groupId;
    private Long menuId;
    private Long menuSequence;
}