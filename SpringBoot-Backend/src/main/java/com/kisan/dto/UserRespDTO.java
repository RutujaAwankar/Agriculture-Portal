package com.kisan.dto;

import com.kisan.pojo.FarmingType;
import com.kisan.pojo.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString                          //no ched chad jwt ke liye hai
public class UserRespDTO extends BaseDTO{
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String gender;	
	private UserRole Role;
	private FarmingType type;

}


