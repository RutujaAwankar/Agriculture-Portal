package com.kisan.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import javax.naming.AuthenticationException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kisan.custom_exceptions.ApiException;
import com.kisan.custom_exceptions.ResourceNotFoundException;
import com.kisan.dto.ApiResponse;
import com.kisan.dto.AuthRequest;
import com.kisan.dto.ChangePassDTO;
import com.kisan.dto.ProductRespDTO;
import com.kisan.dto.UpdateProfileDTO;
import com.kisan.dto.UserDTO;
import com.kisan.dto.UserListDTO;
import com.kisan.dto.UserRespDTO;
import com.kisan.pojo.FarmingType;
import com.kisan.pojo.Products;
import com.kisan.pojo.UserEntity;
import com.kisan.pojo.UserRole;
import com.kisan.repository.UserEntityRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	// depcy - dao
	@Autowired
	private UserEntityRepository userEntityRepository;
	// model mapper
	@Autowired
	private ModelMapper modelMapper;
	//pwd encoder
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse registerNewUser(UserDTO dto) {
		// chk if user alrdy exists
		if (userEntityRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("User email already exists!!!!");
		// map dto -> entity
		UserEntity userEntity = modelMapper.map(dto, UserEntity.class);
		userEntity.setStatus(true);
		userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
		UserEntity savedUser = userEntityRepository.save(userEntity);
		return new ApiResponse("User registered with ID " + savedUser.getId());
	}
	
	
	@Override
	public ApiResponse updateProfile(UpdateProfileDTO dto) {
		//no validations or checking or read write handled*********
		//user ka id mangta hai
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
		Long id =(Long)authentication.getCredentials();		
		UserEntity userEntity = modelMapper.map(dto, UserEntity.class);
		userEntity.setId(id);
		userEntity.setPassword(userEntityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid Id")).getPassword());
		UserEntity savedUser = userEntityRepository.save(userEntity);
		return new ApiResponse("User updated " + savedUser.getId());
	}
	
	@Override
	public ApiResponse changePassword(ChangePassDTO dto) {
		// check if user already exists
		
		System.out.println(userEntityRepository.existsByPassword((dto.getOldPassword())));
			System.out.println("email matched");
		    // map dto -> entity
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
			Long id =(Long)authentication.getCredentials();
			UserEntity user = userEntityRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));		
//			System.out.println(passwordEncoder.matches(dto.getOldPassword(), user.getPassword())); // matched
			if(passwordEncoder.matches(dto.getOldPassword(), user.getPassword()))
			{
			user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
			UserEntity savedUser = userEntityRepository.save(user);
			}else {
				return new ApiResponse("Wrong Password" );
			}
		return new ApiResponse("User Password changed successfully" );
	}


	@Override
	public ApiResponse deleteUserByAdmin(Long id) {
		System.out.println("in UserServiceImpl");
		UserEntity user = userEntityRepository.findByIdAndStatusTrue(id).orElseThrow(()-> new ResourceNotFoundException("Invalid id provided"));
		// Set user status to false (soft delete)
        user.setStatus(false);
        // Set status of all related products to false
        user.getProducts().forEach(product -> product.setStatus(false));
        // Save the user (products will be updated due to cascading)
        userEntityRepository.save(user);
		return new ApiResponse("User deleted by admin");
	}
	@Override
	public ApiResponse deleteUserByUser() {
		System.out.println("in UserServiceImpl");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated User Id from jwt: " + authentication.getCredentials());
		Long id =(Long)authentication.getCredentials();
		UserEntity user = userEntityRepository.findById(id)
		.orElseThrow(() -> new ResourceNotFoundException("Invalid product id !!!!"));		
//		
		// Set user status to false (soft delete)
        user.setStatus(false);
        // Set status of all related products to false
        user.getProducts().forEach(product -> product.setStatus(false));
        // Save the user (products will be updated due to cascading)
        userEntityRepository.save(user);
		return new ApiResponse("User Account Deleted");
	}
	

	@Override
	public UserDTO getOneUser(Long userId) {
		UserEntity user = userEntityRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!!"));
		return modelMapper.map(user, UserDTO.class);
	}
	
	@Override
	public List<UserListDTO> getAllUsers() {
		List<UserEntity> users = userEntityRepository.findAll();
//		return productRepository.findByStatusTrue();
//		return productRepository.findAll();
		return users.stream()
                .map(user -> modelMapper.map(user, UserListDTO.class))
                .collect(Collectors.toList());
	}
	


}
