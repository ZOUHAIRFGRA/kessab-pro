package uit.ac.ma.est.kessabpro.controllers;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.mappers.TransactionMapper;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.SaleDTOResponse;
import uit.ac.ma.est.kessabpro.models.dto.responses.TransactionDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.services.interfaces.ISaleService;

import java.nio.file.AccessDeniedException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/sales")
@Validated
public class SaleController {


    private final ISaleService saleService;
    private final SaleMapper saleMapper;

    SaleController(ISaleService saleService, SaleMapper saleMapper) {
        this.saleService = saleService;
        this.saleMapper = saleMapper;
    }


    @PostMapping
    @Transactional
    public ResponseEntity<?> createSale(@Valid @RequestBody SaleDTORequest saleDTORequest) throws AccessDeniedException {
        saleService.createSale(saleDTORequest);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PostMapping(value = "/{id}/close")
    @Transactional
    public ResponseEntity<?> closeSale(@PathVariable  UUID id) {
        Sale sale = saleService.getSaleById(id);
        saleService.closeSale(sale);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }


    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<SaleDTOResponse>> getSalesByBuyer(@PathVariable UUID buyerId) {
        List<Sale> sales = saleService.getSalesByBuyerId(buyerId);
        return ResponseEntity.ok((new SaleMapper()).toSaleDTOList(sales));
    }


    @GetMapping("/{id}")
    public ResponseEntity<SaleDTOResponse> getSaleById(@PathVariable UUID id) {
        Sale sale = saleService.getSaleById(id);
        return ResponseEntity.ok(saleMapper.toSaleDTO(sale));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String,Long>> getAllCount() {
        Map<String,Long> response = new HashMap<>();
        response.put("count",saleService.getAllCount());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SaleDTOResponse> updateSale(@PathVariable UUID id, @RequestBody Sale sale, @RequestParam List<UUID> newAnimalIds) {
        Sale updatedSale = saleService.updateSale(id, sale, newAnimalIds);
        return ResponseEntity.ok(saleMapper.toSaleDTO(updatedSale));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable UUID id) {
        saleService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<SaleDTOResponse>> getSales(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) LocalDate saleDate,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "saleDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Sale> sales = saleService.getFilteredSales(fullName, categoryId, paymentStatus,  saleDate, pageable);
        Page<SaleDTOResponse> saleDTOs = sales.map(sale -> (new SaleMapper()).toSaleDTO(sale));

        return ResponseEntity.ok(saleDTOs);
    }





}
