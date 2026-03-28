package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserLocationAccessDTO {
    private Long userLocationAccessId;
    private Long locationId;
    private String locationName;
    private String loginId;
    private Long userId;
    private Long accessLocationId;
    private String accessLocationName;
    private String createdBy;
    private LocalDateTime createdDt;
}