package uit.ac.ma.est.kessabpro.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.mappers.BuyerMapper;
import uit.ac.ma.est.kessabpro.models.dto.requests.BuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.BuyerDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.services.implementations.BuyerService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @PostMapping
    public ResponseEntity<BuyerDTOResponse> createBuyer(@Valid @RequestBody BuyerDTORequest buyerDTO) {
        Buyer buyerEntity = BuyerMapper.toBuyerEntity(buyerDTO);
        Buyer buyer = buyerService.createBuyer(buyerEntity);
        return ResponseEntity.ok(BuyerMapper.toBuyerDTO(buyer));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String,Long>> getAllCount() {
        Map<String,Long> response = new HashMap<>();
        response.put("count",buyerService.getAllCount());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuyerDTOResponse> getBuyerById(@PathVariable UUID id) {
        Buyer buyer = buyerService.getBuyerById(id);
        return ResponseEntity.ok(BuyerMapper.toBuyerDTO(buyer));
    }

    @GetMapping
    public ResponseEntity<Page<BuyerDTOResponse>> getBuyers(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String cin,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fullName") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Buyer> buyers = buyerService.findByFullNameOrCin(fullName, cin, pageable);
        Page<BuyerDTOResponse> buyersDTOs = buyers.map(BuyerMapper::toBuyerDTO);
        return ResponseEntity.ok(buyersDTOs);
    }


    @PutMapping("/{id}")
    public ResponseEntity<BuyerDTOResponse> updateBuyer(@PathVariable UUID id, @RequestBody BuyerDTORequest buyerDTO) {
        Buyer buyerEntity = BuyerMapper.toBuyerEntity(buyerDTO);
        Buyer buyerUpdated = buyerService.updateBuyer(id, buyerEntity);
        return ResponseEntity.ok(BuyerMapper.toBuyerDTO(buyerUpdated));
    }

}
