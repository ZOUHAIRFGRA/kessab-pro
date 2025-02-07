package uit.ac.ma.est.kessabpro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uit.ac.ma.est.kessabpro.models.dto.SaleDTO;  // Import SaleDTO
import uit.ac.ma.est.kessabpro.models.entities.Sale;

import java.util.List;
import java.util.UUID;

public interface SaleRepository extends JpaRepository<Sale, UUID> {

    @Query("SELECT s FROM Sale s LEFT JOIN FETCH s.transactions WHERE s.id = :saleId")
    Sale findSaleByIdWithTransactions(UUID saleId);  //this is not used

    @Query("SELECT new uit.ac.ma.est.kessabpro.models.dto.SaleDTO(s.id, s.animal.id, s.buyer.id, s.saleDate, s.agreedAmount, s.paymentStatus) FROM Sale s")
    List<SaleDTO> findAllSales();  //not used
}
