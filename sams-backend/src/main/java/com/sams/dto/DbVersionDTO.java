package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DbVersionDTO {
    private String moduleName;
    private String moduleDdl;
    private String moduleDml;
}