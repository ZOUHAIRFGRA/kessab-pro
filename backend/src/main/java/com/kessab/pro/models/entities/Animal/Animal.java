package com.kessab.pro.models.entities.Animal;

import com.kessab.pro.enums.AnimalType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public abstract class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(insertable = false, updatable = false)
    private AnimalType type;

    private String tag;
    private String sex;
    private LocalDate birthDate;
    private BigDecimal price;
    private BigDecimal weight;


    private String imagePaths;

    @Nullable
    private LocalDate pickUpDate;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

