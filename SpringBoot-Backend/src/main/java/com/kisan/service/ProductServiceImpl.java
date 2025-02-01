package com.kisan.service;

import java.util.ArrayList;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kisan.custom_exceptions.ResourceNotFoundException;
import com.kisan.dto.ApiResponse;
import com.kisan.dto.ProductRequestDTO;
import com.kisan.dto.ProductRespDTO;
import com.kisan.dto.SellProductRequestDTO;
import com.kisan.pojo.Products;
import com.kisan.pojo.UserEntity;
import com.kisan.repository.ProductRepository;
import com.kisan.repository.UserEntityRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserEntityRepository userEntityRepository;
	@Autowired
	private ModelMapper mapper;


	@Override
	public ApiResponse addProduct(ProductRequestDTO dto) {
		System.out.println("in add product of service");

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
		Long id =(Long)authentication.getCredentials();
		UserEntity user = userEntityRepository.findById(id)
		.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));		
		
		
		System.out.println("user mila  "+user.getEmail());
		Products product = mapper.map(dto, Products.class);
		product.setStatus(true);
		product.setUser(user);
		product.setFarmingType(user.getFarmingType());
		List<Products>ls=new ArrayList();
		ls.add(product);
		user.setProducts(ls);
		userEntityRepository.save(user);
		return new ApiResponse("Added new product with ID " + product.getId());
	}

	

	@Override
	public ApiResponse deleteProductDetails(Long prodid) {
			Products product = productRepository.findById(prodid)
					.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
			Long userid =(Long)authentication.getCredentials();
			if(product.getUser().getId()==userid)
			{
				System.out.println("match");
				product.setStatus(false);
				productRepository.save(product);
			}else
			{
				System.out.println("match nhi hua");
				return new ApiResponse("deleted product failed(Not your product)");	
			}
//			productRepository.deleteById(product.getId());
			return new ApiResponse("deleted product");
	}
	

	@Override
	public List<ProductRespDTO> getUserProducts() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
		Long id =(Long)authentication.getCredentials();
		UserEntity user = userEntityRepository.findById(id)
		.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));		
		List<Products> products = productRepository.findByStatusTrueAndUserId(id);

//		List<Products> products = productRepository.findByStatusTrue();
//		return productRepository.findByStatusTrue();
//		return productRepository.findAll();
		return products.stream()
                .map(product -> mapper.map(product, ProductRespDTO.class))
                .collect(Collectors.toList()); 
	}

	@Override
	public List<ProductRespDTO> getAllProducts() {
		
		List<Products> products = productRepository.findAll();
//		return productRepository.findByStatusTrue();
//		return productRepository.findAll();
		return products.stream()
                .map(product -> mapper.map(product, ProductRespDTO.class))
                .collect(Collectors.toList()); 
	}



	@Override
	public ProductRequestDTO getAProduct(Long id) {
		Products product = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));
		return mapper.map(product, ProductRequestDTO.class);
	}



	@Override
	public ApiResponse markForSale(SellProductRequestDTO dto,Long id) {
		Products product = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));
		
		//validations...
		product.setPrice(dto.getPrice());
		product.setStockToSell(dto.getStockToSell());
		product.setMarkedForSale(true);
		
		return new ApiResponse("Product Marked for Sell"+product.getStockToSell());
	}



	
	
	

}
