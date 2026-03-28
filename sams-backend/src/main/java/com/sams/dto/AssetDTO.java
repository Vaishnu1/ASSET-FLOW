package com.sams.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetDTO {

    private Long id;

    @NotBlank(message = "Asset name is mandatory")
    private String assetName;

    @NotBlank(message = "Serial number is mandatory")
    private String serialNumber;

    private String assetType;

    private Double purchaseCost;

    private LocalDateTime purchaseDate;

    private Long departmentId;

    private Long assignedToId;

    private String status;

    private Boolean active;
}
