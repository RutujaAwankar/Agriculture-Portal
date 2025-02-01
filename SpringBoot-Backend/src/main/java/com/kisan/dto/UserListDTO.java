package com.kisan.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.kisan.pojo.FarmingType;
import com.kisan.pojo.UserEntity;
import com.kisan.pojo.UserRole;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(Include.NON_EMPTY)
public class UserListDTO extends BaseDTO{
	@NotBlank
	private String firstName;
	private String lastName;
	private String email;	
	
	private String mobile;	
	private String gender;
	private boolean status; 
	
	private String adrLine1;
	private String adrLine2;
	private String city;
	private String state;
	private String zipCode;
	private UserRole role;
	private FarmingType farmingType;
}

//{
//"firstName":"Rutu",
//"lastName":"Awankar",
//"email":"rutu@gmail.com",
//"password":"123",
//"gender":"FEMALE",
//"role":"FARMER"
//}

