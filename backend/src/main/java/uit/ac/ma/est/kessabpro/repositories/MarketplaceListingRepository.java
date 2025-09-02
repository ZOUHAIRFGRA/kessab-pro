package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uit.ac.ma.est.kessabpro.models.entities.MarketplaceListing;
import uit.ac.ma.est.kessabpro.models.entities.User;

import java.util.List;

@Repository
public interface MarketplaceListingRepository extends JpaRepository<MarketplaceListing, Long> {
    
    // Find all active listings
    Page<MarketplaceListing> findByStatus(MarketplaceListing.ListingStatus status, Pageable pageable);
    
    // Find listings by farmer
    Page<MarketplaceListing> findByFarmer(User farmer, Pageable pageable);
    
    // Find listings by animal type
    Page<MarketplaceListing> findByAnimalTypeAndStatus(String animalType, MarketplaceListing.ListingStatus status, Pageable pageable);
    
    // Search listings by description or location
    @Query("SELECT l FROM MarketplaceListing l WHERE l.status = :status AND " +
           "(LOWER(l.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(l.location) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<MarketplaceListing> searchListings(@Param("searchTerm") String searchTerm, 
                                           @Param("status") MarketplaceListing.ListingStatus status, 
                                           Pageable pageable);
    
    // Find listings by price range
    @Query("SELECT l FROM MarketplaceListing l WHERE l.status = :status AND " +
           "l.pricePerUnit BETWEEN :minPrice AND :maxPrice")
    Page<MarketplaceListing> findByPriceRange(@Param("minPrice") Double minPrice, 
                                             @Param("maxPrice") Double maxPrice, 
                                             @Param("status") MarketplaceListing.ListingStatus status, 
                                             Pageable pageable);
    
    // Find listings by location (within radius)
    @Query("SELECT l FROM MarketplaceListing l WHERE l.status = :status AND " +
           "l.latitude IS NOT NULL AND l.longitude IS NOT NULL AND " +
           "SQRT(POWER(l.latitude - :lat, 2) + POWER(l.longitude - :lng, 2)) <= :radius")
    Page<MarketplaceListing> findByLocation(@Param("lat") Double latitude, 
                                           @Param("lng") Double longitude, 
                                           @Param("radius") Double radius, 
                                           @Param("status") MarketplaceListing.ListingStatus status, 
                                           Pageable pageable);
    
    // Count active listings by animal type
    @Query("SELECT l.animalType, COUNT(l) FROM MarketplaceListing l WHERE l.status = :status GROUP BY l.animalType")
    List<Object[]> countByAnimalType(@Param("status") MarketplaceListing.ListingStatus status);
    
    // Find top rated listings
    @Query("SELECT l FROM MarketplaceListing l WHERE l.status = :status ORDER BY l.rating DESC, l.reviewCount DESC")
    Page<MarketplaceListing> findTopRated(@Param("status") MarketplaceListing.ListingStatus status, Pageable pageable);
    
    // Find recent listings
    @Query("SELECT l FROM MarketplaceListing l WHERE l.status = :status ORDER BY l.createdAt DESC")
    Page<MarketplaceListing> findRecent(@Param("status") MarketplaceListing.ListingStatus status, Pageable pageable);
    
    // Count listings by status
    long countByStatus(MarketplaceListing.ListingStatus status);
} 