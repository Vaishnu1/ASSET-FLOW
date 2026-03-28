package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_state_city", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StateCity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "state")
    private String state;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

}