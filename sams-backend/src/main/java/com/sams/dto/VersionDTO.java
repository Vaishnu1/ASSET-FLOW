package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class VersionDTO {
    private Long versionSeqNo;
    private String versionName;
    private LocalDateTime releaseDt;
    private String remarks;
}