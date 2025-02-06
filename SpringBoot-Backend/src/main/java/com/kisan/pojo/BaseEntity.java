package com.kisan.pojo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * BaseEntity serves as a base class for other entity classes.
 * It contains common fields (id, createdOn, updatedOn) which will be inherited by other entities.
 * It is mapped as a superclass and does not have its own database table.
 */
@MappedSuperclass // Specifies that this class is a base class for other entities, no table is created for it.
@Getter // Automatically generates getter methods for all fields
@Setter // Automatically generates setter methods for all fields
@ToString // Automatically generates a toString method to print out field values
public class BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Primary key for the entity, with auto-generated values
    private Long id; // Unique identifier for the entity
    
    @CreationTimestamp // Automatically sets the value when the entity is created
    private LocalDate createdOn; // Timestamp indicating when the entity was created
    
    @UpdateTimestamp // Automatically updates the value when the entity is modified
    private LocalDateTime updatedOn; // Timestamp indicating the last update time for the entity

}
