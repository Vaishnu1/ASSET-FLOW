package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrTatTempDTO {
    private Long srTatTempId;
    private String status;
    private LocalDateTime fromDate;
    private LocalDateTime toDates;
    private LocalDateTime timeDiff;
    private LocalDateTime timeDiffHrs;
}