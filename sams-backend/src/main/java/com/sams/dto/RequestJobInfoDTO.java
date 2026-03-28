package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RequestJobInfoDTO {
    private Long requestId;
    private String requestNo;
    private String jobType;
    private String programName;
    private String filePathUrl;
    private Long requestStatus;
    private String errorLog;
    private String requestedBy;
    private LocalDateTime requestDt;
    private LocalDateTime requestEndDt;
    private Long userId;
}