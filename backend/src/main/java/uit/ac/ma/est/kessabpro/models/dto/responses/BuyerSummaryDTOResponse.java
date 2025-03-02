package uit.ac.ma.est.kessabpro.models.dto.responses;

public record BuyerSummaryDTOResponse(
        BuyerDTOResponse buyer,
        Integer animalsNotPickedUp,
        Integer animalsPickedUp,
        Integer totalAnimals,
        Double totalToPay,
        Double totalPaid

        ) {
}
