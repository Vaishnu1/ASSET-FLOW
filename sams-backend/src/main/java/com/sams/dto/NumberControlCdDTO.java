package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NumberControlCdDTO {
    private Long numberControlCdId;
    private String numberControlCdName;
    private String numberControlCdDesc;
    private String numberControlModule;
    private String prefixCd;
    private String suffixCd;
}