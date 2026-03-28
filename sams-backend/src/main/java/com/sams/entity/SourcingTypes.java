package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sourcing_types", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SourcingTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sourcing_types_id")
    private Long sourcingTypesId;

    @Column(name = "sourcing_types_name")
    private String sourcingTypesName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "display")
    private Boolean display;

}