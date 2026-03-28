package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_building_room", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuildingRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_room_id")
    private Long buildingRoomId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "room_desc")
    private String roomDesc;

    @Column(name = "block_id")
    private Long blockId;

    @Column(name = "floor_id")
    private Long floorId;

    @Column(name = "segment_id")
    private Long segmentId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}