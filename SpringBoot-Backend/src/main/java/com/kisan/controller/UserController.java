package com.kisan.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kisan.dto.AuthRequest;
import com.kisan.dto.AuthResp;
import com.kisan.dto.ChangePassDTO;
import com.kisan.dto.UpdateProfileDTO;
import com.kisan.dto.UserDTO;
import com.kisan.dto.UserListDTO;
import com.kisan.pojo.UserEntity;
import com.kisan.security.JwtUtils;
import com.kisan.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
	//depcy
	@Autowired
	private UserService userService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;
	/*
	 * Desc - user sign up
	 * URL - http://host:port/users/signup
	 * Method - POST
	 * Payload - user req dto
	 * Success resp - Api resp
	 * err - Api resp err mesg
	 */
	@PostMapping("/signup")
	@Operation(description = "User signup")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserDTO dto) {
		System.out.println("register user "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.registerNewUser(dto));
		
	}
		
	@PutMapping("/change-pass")
	@Operation(description = "change pass")
	public ResponseEntity<?> changePassword(@RequestBody ChangePassDTO dto) {
		System.out.println("register user "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.changePassword(dto));
	}
	
//	
	@PutMapping("/update-profile")
	@Operation(description = "update profile")
	public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileDTO dto) {
		System.out.println("updating user to "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.updateProfile(dto));
	}
	
	/*
	 * Desc - user sign in
	 * URL - http://host:port/users/signin
	 * Method - POST
	 * Payload - auth req dto
	 * Success resp -Auth Resp DTO - mesg + JWT
	 * err - Api resp err mesg
	 */
	@PostMapping("/signin")
	@Operation(description = "User sign in")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid
			AuthRequest dto) {
		System.out.println("in sign in "+dto);
		//1. Create auth token using suser supplied em n pwd
		UsernamePasswordAuthenticationToken 
		authenticationToken = new UsernamePasswordAuthenticationToken
		(dto.getEmail(),dto.getPassword());
		System.out.println(authenticationToken.isAuthenticated());//f
		//2. invoke Spring sec supplied auth mgr's authenticate method
		Authentication authToken = 
				authenticationManager.authenticate(authenticationToken);
		//=> auth success
		System.out.println(authToken.isAuthenticated());//t
		//3 . Send auth respone to the client containing JWTS
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new AuthResp("Successful Auth !",
						jwtUtils.generateJwtToken(authToken)));		
		
	}
	
	
	@GetMapping("/list")
	public ResponseEntity<?> getAllUsers() {
		System.out.println("in getAllUsers");
		List<UserListDTO> usersList = 
				userService.getAllUsers();
		if (usersList.isEmpty()) {
			// SC 204 
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			// SC 200 + list
			return ResponseEntity.ok(usersList);
		}
	}

	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable Long id) {
		userService.deleteUserByAdmin(id);
		return new ResponseEntity<>("User Deleted Sucessfully", HttpStatus.OK);
	}
	
	@DeleteMapping("/deactivate")
	public ResponseEntity<?> deleteBook() {
		userService.deleteUserByUser();
		return new ResponseEntity<>("User Deleted Sucessfully", HttpStatus.OK);
	}
	
	
	
//  getActiveUsers
//	getAllUsers
//	getDeactiveUsers
//	getUsersByFarmingType(String)
	
	

}
