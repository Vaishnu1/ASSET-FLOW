package com.sams.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepartmentDTO {
    
    private Long id;

    @NotBlank(message = "Department name is mandatory")
    private String departmentName;

    private String description;

    private Boolean active;
}
