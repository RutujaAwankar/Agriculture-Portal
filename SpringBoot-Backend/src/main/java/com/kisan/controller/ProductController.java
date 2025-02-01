package com.kisan.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kisan.custom_exceptions.ResourceNotFoundException;
import com.kisan.dto.ProductRequestDTO;
import com.kisan.dto.ProductRespDTO;
import com.kisan.dto.SellProductRequestDTO;
import com.kisan.dto.UpdateProfileDTO;
import com.kisan.pojo.FarmingType;
import com.kisan.pojo.MetricType;
import com.kisan.pojo.ProductType;
import com.kisan.pojo.Products;
import com.kisan.pojo.UserEntity;
import com.kisan.service.ProductService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping("/view")
	public ResponseEntity<?> viewProducts() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
		System.out.println("Admin from c#");
		System.out.println(authentication.getDetails());
		System.out.println(authentication.getPrincipal());
		System.out.println(authentication.getPrincipal());
		Long id =(Long)authentication.getCredentials();
		
		System.out.println("Admin from c# : "+id);
		
		return ResponseEntity.ok
				(productService.getAllProducts());
	}
	
	@GetMapping("/user-products")
	public  ResponseEntity<?> getUserProducts() {
		List<ProductRespDTO> usersList = productService.getUserProducts();
		if (usersList.isEmpty()) {
			// SC 204 
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			// SC 200 + list
			return ResponseEntity.ok(usersList);
		}
	}
	
	@GetMapping("/getproduct/{id}")
	public ResponseEntity<?> getAProduct(@PathVariable Long id) {
		System.out.println(id);
		return new ResponseEntity<>(productService.getAProduct(id), HttpStatus.OK);
	}
	  //mark for sale 
	@PutMapping("/mark-sale/{id}")
	public ResponseEntity<?> markForSale(@RequestBody SellProductRequestDTO dto,@PathVariable Long id) {
		System.out.println("updating product to "+dto+" with id: "+id);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(productService.markForSale(dto,id));
	}
	
	
	
	@GetMapping("/view-products")
	public  ResponseEntity<?> viewAllProducts() {
		List<ProductRespDTO> usersList = productService.getAllProducts();
		if (usersList.isEmpty()) {
			// SC 204 
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			// SC 200 + list
			return ResponseEntity.ok(usersList);
		}
	}
	
	@PostMapping("/add")
	public  ResponseEntity<?> addProduct(@RequestBody ProductRequestDTO product) {
		System.out.println("in add product of service");
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(productService.addProduct(product));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteProducts(@PathVariable Long id) {
		System.out.println("in delete product controller, id:"+id);
		return ResponseEntity.ok
				(productService.deleteProductDetails(id));
	}

}
