package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StateDTO {
    private Long stateId;
    private String stateName;
    private Long countryId;
}