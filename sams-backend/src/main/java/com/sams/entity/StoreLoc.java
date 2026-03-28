package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_store_loc", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreLoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "store_loc_id")
    private Long storeLocId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private Integer locationName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}