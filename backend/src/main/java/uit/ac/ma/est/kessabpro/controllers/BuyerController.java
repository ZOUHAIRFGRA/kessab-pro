package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.services.implementations.BuyerService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @PostMapping
    public ResponseEntity<Buyer> createBuyer(@RequestBody Buyer buyer) {
        return ResponseEntity.ok(buyerService.createBuyer(buyer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Buyer> getBuyerById(@PathVariable UUID id) {
        return ResponseEntity.ok(buyerService.getBuyerById(id));
    }

    @GetMapping
    public ResponseEntity<List<Buyer>> getAllBuyers() {
        return ResponseEntity.ok(buyerService.getAllBuyers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Buyer> updateBuyer(@PathVariable UUID id, @RequestBody Buyer buyer) {
        return ResponseEntity.ok(buyerService.updateBuyer(id, buyer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBuyer(@PathVariable UUID id) {
        buyerService.deleteBuyer(id);
        return ResponseEntity.ok("Buyer deleted successfully.");
    }
}
