package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.services.interfaces.ISaleService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Override
    public SaleDTO createSale(Sale sale) {
        Sale savedSale = saleRepository.save(sale);
        return convertToDTO(savedSale);
    }

    @Override
    public SaleDTO getSaleById(UUID id) {
        Sale sale = saleRepository.findById(id).orElseThrow(() -> new RuntimeException("Sale not found"));
        return convertToDTO(sale);
    }

    @Override
    public List<SaleDTO> getAllSales() {
        List<Sale> sales = saleRepository.findAll();
        return sales.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public SaleDTO updateSale(UUID id, Sale updatedSale) {
        // Fetch the existing Sale entity
        Sale existingSale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        // Update the fields of the existing Sale entity
        existingSale.setSaleDate(updatedSale.getSaleDate());
        existingSale.setAgreedAmount(updatedSale.getAgreedAmount());
        existingSale.setPaymentStatus(updatedSale.getPaymentStatus());
        existingSale.setAnimal(updatedSale.getAnimal());
        existingSale.setBuyer(updatedSale.getBuyer());

        // Save the updated Sale entity
        Sale savedSale = saleRepository.save(existingSale);

        // Return the updated Sale as a DTO
        return convertToDTO(savedSale);
    }

    @Override
    public void deleteSale(UUID id) {
        saleRepository.deleteById(id);
    }

    // Helper method to convert Sale entity to SaleDTO
    private SaleDTO convertToDTO(Sale sale) {
        return new SaleDTO(
                sale.getId(),
                sale.getAnimal().getId(), // Assuming you want the animal ID
                sale.getBuyer().getId(),  // Assuming you want the buyer ID
                sale.getSaleDate(),
                sale.getAgreedAmount(),
                sale.getPaymentStatus()
        );
    }
}
