package com.kisan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kisan.pojo.FarmingType;
import com.kisan.pojo.Products;

public interface ProductRepository extends JpaRepository<Products, Long> {

	List<Products> findByStatusTrue();
	List<Products> findByStatusFalse();
	List<Products> findByFarmingType(FarmingType farmingType);
//	List<Products> getAllProducts();
//	List<Products> findByIdAndStatusTrue(Long id);
	List<Products> findByStatusTrueAndUserId(Long id);
	

}
