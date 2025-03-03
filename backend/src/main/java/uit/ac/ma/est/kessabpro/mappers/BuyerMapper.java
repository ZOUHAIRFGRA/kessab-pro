package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.requests.BuyerDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.responses.BuyerDTOResponse;
import uit.ac.ma.est.kessabpro.models.dto.responses.BuyerSummaryDTOResponse;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;
import uit.ac.ma.est.kessabpro.repositories.TransactionRepository;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;
import uit.ac.ma.est.kessabpro.services.implementations.TransactionService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class BuyerMapper {

    private final TransactionService transactionService;
    private final TransactionRepository transactionRepository;
    private final SaleService saleService;
    private final SaleRepository saleRepository;

    public BuyerMapper(TransactionService transactionService, TransactionRepository transactionRepository, SaleService saleService, SaleRepository saleRepository) {
        this.transactionService = transactionService;
        this.transactionRepository = transactionRepository;
        this.saleService = saleService;
        this.saleRepository = saleRepository;
    }

    public static BuyerDTOResponse toBuyerDTO(Buyer buyer) {
        return new BuyerDTOResponse(
                buyer.getId(),
                buyer.getFullName(),
                buyer.getCIN(),
                buyer.getPhone(),
                buyer.getAddress()
        );
    }

    public static List<BuyerDTOResponse> toBuyerDTOList(List<Buyer> buyers) {
        return buyers.stream()
                .map(BuyerMapper::toBuyerDTO)
                .collect(Collectors.toList());
    }


    public BuyerSummaryDTOResponse toBuyerSummaryDTO(Buyer buyer) {
        List<Sale> buyerSales = buyer.getSales();
        UUID buyerId = buyer.getId();
        List<UUID> saleIds = buyerSales.stream().map(Sale::getId).toList();
        Double totalPaid = transactionRepository.sumAmountBySaleIdIn(saleIds);
        Double totalToPay = saleRepository.sumRemainingAmountByBuyerId(buyerId);
        Integer totalAnimals = saleRepository.countAnimalsByBuyerId(buyerId);
        Integer animalsNotPickedUp = saleRepository.countAnimalsNotPickedUpByBuyerId(buyerId);

        return new BuyerSummaryDTOResponse(
                toBuyerDTO(buyer),
                animalsNotPickedUp,
                totalAnimals - animalsNotPickedUp,
                totalAnimals,
                totalToPay,
                totalPaid
        );

    }

    public static Buyer toBuyerEntity(BuyerDTORequest buyerDTORequest) {
        Buyer.BuyerBuilder buyer = Buyer.builder().id(buyerDTORequest.id());
        if (buyerDTORequest.fullName() != null) {
            buyer.fullName(buyerDTORequest.fullName());
        }
        if (buyerDTORequest.cin() != null) {
            buyer.CIN(buyerDTORequest.cin());
        }

        if (buyerDTORequest.phone() != null) {
            buyer.phone(buyerDTORequest.phone());
        }

        if (buyerDTORequest.address() != null) {
            buyer.address(buyerDTORequest.address());
        }

        return buyer.build();
    }
}
