package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StoreLocDTO {
    private Long id;
    private Long storeLocId;
    private Long locationId;
    private Integer locationName;
}