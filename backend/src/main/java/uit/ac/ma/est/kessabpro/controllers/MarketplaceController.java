package uit.ac.ma.est.kessabpro.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.models.entities.MarketplaceListing;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.MarketplaceListingRepository;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.services.contracts.IAnimalService;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/marketplace")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MarketplaceController {

    private final MarketplaceListingRepository listingRepository;
    private final UserRepository userRepository;
    private final IAnimalService animalService;

    // Get all active listings with pagination
    @GetMapping("/listings")
    public ResponseEntity<Map<String, Object>> getListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String animalType,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String sortBy) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MarketplaceListing> listings;

        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            listings = listingRepository.searchListings(searchTerm, MarketplaceListing.ListingStatus.ACTIVE, pageable);
        } else if (animalType != null && !animalType.trim().isEmpty()) {
            listings = listingRepository.findByAnimalTypeAndStatus(animalType, MarketplaceListing.ListingStatus.ACTIVE, pageable);
        } else if (minPrice != null && maxPrice != null) {
            listings = listingRepository.findByPriceRange(minPrice, maxPrice, MarketplaceListing.ListingStatus.ACTIVE, pageable);
        } else if ("rating".equals(sortBy)) {
            listings = listingRepository.findTopRated(MarketplaceListing.ListingStatus.ACTIVE, pageable);
        } else if ("recent".equals(sortBy)) {
            listings = listingRepository.findRecent(MarketplaceListing.ListingStatus.ACTIVE, pageable);
        } else {
            listings = listingRepository.findByStatus(MarketplaceListing.ListingStatus.ACTIVE, pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("listings", listings.getContent());
        response.put("currentPage", listings.getNumber());
        response.put("totalItems", listings.getTotalElements());
        response.put("totalPages", listings.getTotalPages());

        return ResponseEntity.ok(response);
    }

    // Get listing by ID
    @GetMapping("/listings/{id}")
    public ResponseEntity<MarketplaceListing> getListing(@PathVariable Long id) {
        return listingRepository.findById(id)
                .map(listing -> {
                    // Increment view count
                    listing.setViewCount(listing.getViewCount() + 1);
                    listingRepository.save(listing);
                    return ResponseEntity.ok(listing);
                })
                .orElse(ResponseEntity.notFound().<MarketplaceListing>build());
    }

    // Create new listing
    @PostMapping("/listings")
    public ResponseEntity<MarketplaceListing> createListing(
            @RequestBody MarketplaceListing listing,
            Authentication authentication) {

        String username = authentication.getName();
        User farmer = userRepository.findByPhoneOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        listing.setFarmer(farmer);
        listing.setStatus(MarketplaceListing.ListingStatus.ACTIVE);
        listing.setViewCount(0);
        listing.setReviewCount(0);
        listing.setRating(0.0);

        MarketplaceListing savedListing = listingRepository.save(listing);
        return ResponseEntity.ok(savedListing);
    }

    // Update listing
    @PutMapping("/listings/{id}")
    public ResponseEntity<MarketplaceListing> updateListing(
            @PathVariable Long id,
            @RequestBody MarketplaceListing updatedListing,
            Authentication authentication) {

        String username = authentication.getName();
        return listingRepository.findById(id)
                .map(listing -> {
                    // Check if user owns this listing
                    if (!listing.getFarmer().getUsername().equals(username)) {
                        return ResponseEntity.status(403).<MarketplaceListing>build();
                    }

                    listing.setAnimalType(updatedListing.getAnimalType());
                    listing.setQuantity(updatedListing.getQuantity());
                    listing.setPricePerUnit(updatedListing.getPricePerUnit());
                    listing.setDescription(updatedListing.getDescription());
                    listing.setLocation(updatedListing.getLocation());
                    listing.setLatitude(updatedListing.getLatitude());
                    listing.setLongitude(updatedListing.getLongitude());
                    listing.setIsNegotiable(updatedListing.getIsNegotiable());
                    listing.setContactPhone(updatedListing.getContactPhone());
                    listing.setContactEmail(updatedListing.getContactEmail());

                    return ResponseEntity.ok(listingRepository.save(listing));
                })
                .orElse(ResponseEntity.notFound().<MarketplaceListing>build());
    }

    // Delete listing
    @DeleteMapping("/listings/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        return listingRepository.findById(id)
                .map(listing -> {
                    if (!listing.getFarmer().getUsername().equals(username)) {
                        return ResponseEntity.status(403).<Void>build();
                    }
                    listingRepository.delete(listing);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().<Void>build());
    }

    // Get user's listings
    @GetMapping("/my-listings")
    public ResponseEntity<Page<MarketplaceListing>> getMyListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        String username = authentication.getName();
        User farmer = userRepository.findByPhoneOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<MarketplaceListing> listings = listingRepository.findByFarmer(farmer, pageable);
        return ResponseEntity.ok(listings);
    }

    // Get marketplace statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getMarketplaceStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Count by animal type
        var animalTypeCounts = listingRepository.countByAnimalType(MarketplaceListing.ListingStatus.ACTIVE);
        stats.put("animalTypeCounts", animalTypeCounts);
        
        // Total active listings
        long totalActive = listingRepository.countByStatus(MarketplaceListing.ListingStatus.ACTIVE);
        stats.put("totalActive", totalActive);
        
        return ResponseEntity.ok(stats);
    }

    // Mark listing as sold
    @PatchMapping("/listings/{id}/sold")
    public ResponseEntity<MarketplaceListing> markAsSold(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        return listingRepository.findById(id)
                .map(listing -> {
                    if (!listing.getFarmer().getUsername().equals(username)) {
                        return ResponseEntity.status(403).<MarketplaceListing>build();
                    }
                    listing.setStatus(MarketplaceListing.ListingStatus.SOLD);
                    
                    // Transfer animal ownership to the buyer (if animal exists)
                    if (listing.getAnimal() != null) {
                        // For now, we'll keep the animal with the seller
                        // In a real scenario, you might want to transfer to a specific buyer
                        // animalService.transferAnimalOwnership(listing.getAnimal().getId(), buyerId);
                    }
                    
                    return ResponseEntity.ok(listingRepository.save(listing));
                })
                .orElse(ResponseEntity.notFound().<MarketplaceListing>build());
    }
} 