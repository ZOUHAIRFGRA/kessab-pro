package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.mappers.AnimalMapper;
import uit.ac.ma.est.kessabpro.mappers.SaleMapper;
import uit.ac.ma.est.kessabpro.models.dto.AnimalDTO;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.dto.responses.SaleDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;
    @Autowired
    private SaleMapper saleMapper;

    @PostMapping
    public ResponseEntity<SaleDTOResponse> createSale(@RequestBody SaleDTO saleDTO) {
        Sale sale = saleService.createSale(saleDTO);
        return ResponseEntity.ok(saleMapper.toSaleDTO(sale));
    }



    @GetMapping("/{id}")
    public ResponseEntity<SaleDTOResponse> getSaleById(@PathVariable UUID id) {
        Sale sale = saleService.getSaleById(id);
        return ResponseEntity.ok(saleMapper.toSaleDTO(sale));
    }

    @GetMapping
    public ResponseEntity<List<SaleDTOResponse>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        return ResponseEntity.ok(saleMapper.toSaleDTOList(sales));
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





}
