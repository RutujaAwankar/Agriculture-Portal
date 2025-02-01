package com.kisan.repository;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.kisan.pojo.UserEntity;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
//load use details by user name(email)
	Optional<UserEntity> findByEmail(String email);
	boolean existsByEmail(String email);
	Optional<UserEntity> findByEmailAndPassword(String email, String password);
	boolean existsByPassword(String oldPassword);
	List<UserEntity> findByStatusTrue();
	List<UserEntity> findByStatusFalse();
	List<UserEntity> findByFarmingType(String type);
	Optional<UserEntity> findByIdAndStatusTrue(Long id);
}
