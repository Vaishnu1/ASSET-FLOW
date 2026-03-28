package com.sams.repository;

import com.sams.entity.LocationParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationParametersRepository extends JpaRepository<LocationParameters, Long> {
}