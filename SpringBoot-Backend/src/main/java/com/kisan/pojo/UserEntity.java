package com.kisan.pojo;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity 
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "password"})

public class UserEntity extends BaseEntity {

	@Column(name = "first_name", length = 20) // column name , varchar(20)
	private String firstName;
	@Column(name = "last_name", length = 20) // column name , varchar(20)
	private String lastName;
	@Column(length = 25, unique = true) // adds unique constraint
	private String email; //email is optional
	@Column(length=10,unique = true,nullable=false)
	private String mobile;	
	@Column(length = 500, nullable = false) // not null constraint
	private String password; //required
	@Column(length=10)
	private String gender; //required
	private boolean status; // for soft delete and OTP verification
	
	//address details
	@Column(name="adr_line1",length=100)
	private String adrLine1;
	@Column(name="adr_line2",length=100)
	private String adrLine2;
	@Column(length=20)
	private String city;
	@Column(length=20)
	private String state;
	@Column(length=20,name="zip_code")
	private String zipCode;

	@Enumerated(EnumType.STRING)
	private UserRole role;
	
	@Enumerated(EnumType.STRING)
	private FarmingType farmingType;
	
	@OneToMany(mappedBy = "user", 
			cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Orders> orders;
	
	@OneToMany(mappedBy = "user", 
			cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Products> products;
	


		
}
