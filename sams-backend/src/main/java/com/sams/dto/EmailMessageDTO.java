package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailMessageDTO {
    private Long emailMessageId;
    private Long emailInformationId;
    private Long locationId;
    private Long messageSend;
    private Long messageNew;
    private Long messageDelete;
    private String msgDestinationEmailId;
    private String msgDestinationCcemailId;
    private Boolean readState;
    private Long userId;
    private String createdBy;
    private LocalDateTime createdDt;
}