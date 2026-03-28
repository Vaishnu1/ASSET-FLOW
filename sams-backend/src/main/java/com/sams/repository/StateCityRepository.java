package com.sams.repository;

import com.sams.entity.StateCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateCityRepository extends JpaRepository<StateCity, Long> {
}