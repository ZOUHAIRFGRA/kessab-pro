package uit.ac.ma.est.kessabpro.seeders.factory;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;
import uit.ac.ma.est.kessabpro.models.entities.Animal;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.AnimalRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;

public class SaleSeederFactory {


    private final Random random = new Random();
    private final AnimalRepository animalRepository;

    public SaleSeederFactory(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    public List<Sale> createSales(Buyer buyer, User user, int count) {
        List<Animal> availableAnimals = new ArrayList<>(animalRepository.findByUser_IdAndSaleNull(user.getId()));
        List<Sale> sales = new ArrayList<>();

        for (int i = 0; i < count && !availableAnimals.isEmpty(); i++) {
            int maxAnimals = Math.min(3, availableAnimals.size());
            int animalCount = 1 + random.nextInt(maxAnimals);

            Collections.shuffle(availableAnimals, random);
            List<Animal> selectedAnimals = new ArrayList<>(availableAnimals.subList(0, animalCount));
            availableAnimals.removeAll(selectedAnimals);
            Sale sale = Sale.builder()
                    .saleDate(LocalDate.now().minusDays(random.nextInt(30)))
                    .agreedAmount(BigDecimal.valueOf(1000 + random.nextDouble() * 9000).setScale(2, RoundingMode.HALF_UP).doubleValue())
                    .paymentStatus(PaymentStatus.NOT_PAID)
                    .buyer(buyer)
                    .user(user)
                    .build();

            selectedAnimals.forEach(animal -> animal.setSale(sale));
            sale.setAnimals(selectedAnimals);
            sales.add(sale);
        }
        return sales;
    }
}
