package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_group_menu", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_menu_id")
    private Long groupMenuId;

    @Column(name = "group_id")
    private Long groupId;

    @Column(name = "menu_id")
    private Long menuId;

    @Column(name = "menu_sequence")
    private Long menuSequence;

}