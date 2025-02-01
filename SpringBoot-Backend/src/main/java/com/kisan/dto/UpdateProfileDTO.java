package com.kisan.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.kisan.pojo.FarmingType;
import com.kisan.pojo.UserEntity;
import com.kisan.pojo.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
 

											// remaining....
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(Include.NON_EMPTY)
public class UpdateProfileDTO{
	private String firstName;
	private String lastName;
	private String gender;
	private UserRole role;
	private FarmingType farmingType;
	
	private String email; //email is optional
	private String mobile;	
	//address details
	private String adrLine1;
	private String adrLine2;
	private String city;
	private String state;
	private String zipCode;

}


