package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailSrStatusDTO {
    private Long id;
    private String statusName;
    private Boolean active;
}