package com.kisan.service;

import java.util.List;

import javax.naming.AuthenticationException;

import com.kisan.dto.ApiResponse;
import com.kisan.dto.AuthRequest;
import com.kisan.dto.ChangePassDTO;
import com.kisan.dto.UpdateProfileDTO;
import com.kisan.dto.UserDTO;
import com.kisan.dto.UserListDTO;
import com.kisan.dto.UserRespDTO;
import com.kisan.pojo.UserEntity;

public interface UserService {
	ApiResponse registerNewUser(UserDTO dto);
	ApiResponse changePassword(ChangePassDTO dto);
	ApiResponse updateProfile(UpdateProfileDTO dto);
	
	UserDTO getOneUser(Long userId);
	List<UserListDTO> getAllUsers();
//	List<UserListDTO> getActiveUsers();
//	List<UserListDTO> getDeactiveUsers();
//	List<UserListDTO> getUsersByFarmingType(String type);
	ApiResponse deleteUserByUser();
	ApiResponse deleteUserByAdmin(Long id);
	
	
	
}
