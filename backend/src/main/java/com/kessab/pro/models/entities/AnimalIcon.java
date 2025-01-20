package com.kessab.pro.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimalIcon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment for icons
    private Long id;

    private String iconPath;

    @CreatedDate
    private LocalDateTime createdAt;
}
