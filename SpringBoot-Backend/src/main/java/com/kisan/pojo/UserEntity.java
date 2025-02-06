package com.kisan.pojo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity // Marks this class as a JPA entity to be mapped to a database table
@Table(name = "users") // Specifies the table name in the database
@NoArgsConstructor // Lombok annotation to generate a no-args constructor
@Getter // Lombok annotation to generate getters for all fields
@Setter // Lombok annotation to generate setters for all fields
@ToString(callSuper = true, exclude = { "password" }) // Generates toString method excluding the password for security
public class UserEntity extends BaseEntity { // Inherits common fields like id, timestamps, etc.

    // User personal details
    @Column(name = "first_name", length = 20) // Maps to 'first_name' column with VARCHAR(20)
    private String firstName;

    @Column(name = "last_name", length = 20) // Maps to 'last_name' column with VARCHAR(20)
    private String lastName;

    @Column(length = 25, unique = true) // Adds unique constraint for emails
    private String email; // Email is optional

    @Column(length = 10, unique = true, nullable = false) // Unique and required mobile number
    private String mobile;

    @Column(length = 500, nullable = false) // Password cannot be null, up to 500 characters
    private String password; // Required for login

    @Column(length = 10) // Gender with max 10 characters
    private String gender; // Required field

    private boolean status; // Used for soft delete and OTP verification

    // Address details
    @Column(name = "adr_line1", length = 100) // Address line 1
    private String adrLine1;

    @Column(name = "adr_line2", length = 100) // Address line 2
    private String adrLine2;

    @Column(length = 20) // City with max 20 characters
    private String city;

    @Column(length = 20) // State with max 20 characters
    private String state;

    @Column(length = 20, name = "zip_code") // Zip code mapped to 'zip_code' column
    private String zipCode;

    // Enum to represent user roles (e.g., ADMIN, USER)
    @Enumerated(EnumType.STRING) // Stores the enum as a string in the DB
    private UserRole role;

    // Enum to represent types of farming
    @Enumerated(EnumType.STRING) // Stores the enum as a string
    private FarmingType farmingType;

    // Image data handling
    @Lob // Specifies large object storage for binary data
    @Column(columnDefinition = "LONGBLOB") // Maps to a long blob column in MySQL
    private byte[] image; // Stores the image as a byte array

    private String imagePath; // Path to the stored image (if using file system)

    // Relationships

    // One-to-Many: A user can have multiple orders
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion during JSON serialization
    private List<Orders> orders;
 
    // One-to-Many: A user can have multiple products
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Ignored during JSON serialization
    private List<Products> products;
  
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Ignored during JSON serialization
    private List<Cart> carts;
    
    // One-to-One: Each user has one active cart
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
     @JoinColumn(name = "active_cart_id", unique = true) // Uncomment to add an explicit foreign key
    private Cart activeCart; 

//    private Long activeCartID;

}
