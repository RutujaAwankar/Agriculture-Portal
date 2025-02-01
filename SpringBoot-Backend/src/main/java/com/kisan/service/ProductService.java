package com.kisan.service;

import java.util.List;

import com.kisan.dto.ApiResponse;
import com.kisan.dto.ProductRequestDTO;
import com.kisan.dto.ProductRespDTO;
import com.kisan.dto.SellProductRequestDTO;
import com.kisan.pojo.Products;

public interface ProductService {


	ApiResponse deleteProductDetails(Long id);
	
	ApiResponse addProduct(ProductRequestDTO dto);

	List<ProductRespDTO> getUserProducts();

	List<ProductRespDTO> getAllProducts();

	ProductRequestDTO getAProduct(Long id);

	ApiResponse markForSale(SellProductRequestDTO dto,Long id);
	
}
