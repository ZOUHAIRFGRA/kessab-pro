package uit.ac.ma.est.kessabpro.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.seeders.AnimalSeeder;
import uit.ac.ma.est.kessabpro.seeders.BuyerSaleTransactionSeeder;
import uit.ac.ma.est.kessabpro.seeders.UserSeeder;

@Service
public class AppGlobalEventsService {

    private AnimalSeeder animalSeeder;
     private BuyerSaleTransactionSeeder buyerSaleTransactionSeeder;
     private UserSeeder userSeeder;

    @Autowired
    void EventListener(AnimalSeeder animalSeeder , BuyerSaleTransactionSeeder buyerSaleTransactionSeeder , UserSeeder userSeeder){
            this.animalSeeder = animalSeeder;
            this.buyerSaleTransactionSeeder = buyerSaleTransactionSeeder;
            this.userSeeder = userSeeder;
    }


    @EventListener
    public void onReady(ApplicationReadyEvent event){
//        animalSeeder.seedData();
//        userSeeder.seedData();
//        buyerSaleTransactionSeeder.seedData();
    }
}
