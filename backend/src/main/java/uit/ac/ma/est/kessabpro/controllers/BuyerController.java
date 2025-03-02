package uit.ac.ma.est.kessabpro.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.mappers.BuyerMapper;
import uit.ac.ma.est.kessabpro.models.dto.requests.BuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.BuyerDTOResponse;
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
    public ResponseEntity<Buyer> createBuyer(@Valid @RequestBody BuyerDTORequest buyerDTO) {
        Buyer buyerEntity = BuyerMapper.toBuyerEntity(buyerDTO);
        Buyer buyer = buyerService.createBuyer(buyerEntity);
        return ResponseEntity.ok(buyer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuyerDTOResponse> getBuyerById(@PathVariable UUID id) {
        Buyer buyer = buyerService.getBuyerById(id);
        return ResponseEntity.ok(BuyerMapper.toBuyerDTO(buyer));
    }

    @GetMapping
    public ResponseEntity<List<BuyerDTOResponse>> getAllBuyers() {
        List<Buyer> buyers = buyerService.getAllBuyers();
        return ResponseEntity.ok(BuyerMapper.toBuyerDTOList(buyers));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuyerDTOResponse> updateBuyer(@PathVariable UUID id, @RequestBody BuyerDTORequest buyerDTO) {
        Buyer buyerEntity = BuyerMapper.toBuyerEntity(buyerDTO);
        Buyer buyerUpdated = buyerService.updateBuyer(id, buyerEntity);
        return ResponseEntity.ok(BuyerMapper.toBuyerDTO(buyerUpdated));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteBuyer(@PathVariable UUID id) {
//        buyerService.deleteBuyer(id);
//        return ResponseEntity.ok("Buyer deleted successfully.");
//    }
}
