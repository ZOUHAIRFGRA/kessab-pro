package uit.ac.ma.est.kessabpro.seeders.factory;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.entities.Buyer;
import uit.ac.ma.est.kessabpro.models.entities.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
public class BuyerSeederFactory implements SeederFactory<Buyer> {

    private static final String[] NAMES = {
            "Ahmed", "Mohamed", "Fatima", "Khalid", "Amina", "Youssef", "Saida",
            "Hassan", "Nadia", "Omar", "Karim", "Laila", "Rachid", "Zineb",
            "Tariq", "Salma", "Imane", "Samir", "Soukaina", "Mounir", "Yasmina",
            "Mustapha", "Samira", "Rachida", "Reda", "Latifa", "Yassine", "Meryem",
            "Sofia", "Amine", "Kenza", "Said", "Leila", "Anas", "Wissal", "Zahra",
            "Mouna", "Adil", "Sanae", "Nabil", "Farah", "Azzedine", "Badr", "Hind"
    };

    private static final String[] LAST_NAMES = {
            "El Idrissi", "Benkirane", "El Fassi", "Ouazzani", "Amrani", "Tazi",
            "Bennis", "Chakib", "Alaoui", "Berrada", "Hajji", "Zouiten", "Mahjoubi",
            "El Moussaoui", "Guessous", "Mernissi", "Oukili", "Tahiri", "Moutawakil",
            "Boussaid", "Hajoui", "Oulad", "Rhani", "Zahidi", "Skalli", "Jabri",
            "Filali", "Bourkadi", "Chraibi", "Mourabit", "Naciri", "Rhani", "Sefrioui",
            "Touhami", "El Khatib", "Fadili", "Kadiri", "El Yazidi", "Hammani",
            "El Hassani", "Bouchikhi", "El Amrani", "Aouad", "Benjelloun", "El Haddaoui"
    };

    private static final String[] CITIES = {
            "Casablanca", "Marrakech", "Rabat", "Fes", "Tangier", "Agadir", "Meknes",
            "Oujda", "Tetouan", "Safi", "Beni Mellal", "Kenitra", "Nador", "El Jadida",
            "Taza", "Sidi Kacem", "Al Hoceima", "Khemisset", "Settat", "Ksar El Kebir",
            "Mohammedia", "Laayoune", "Dakhla", "Errachidia", "Taroudant", "Ouarzazate"
    };

    private static final Random RANDOM = new Random();

    @Override
    public List<Buyer> create(int count) {
        List<Buyer> buyers = new ArrayList<>();


        for (int i = 0; i < count; i++) {
            buyers.add(Buyer.builder()
                    .user(null)
                    .fullName(getRandomFullName())
                    .CIN("KB" + (18000 + i))
                    .phone("06" + (50000000 + i))
                    .address("Rue " + (i + 1) + ", " + CITIES[RANDOM.nextInt(CITIES.length)])
                    .build());
        }
        return buyers;
    }



    public List<Buyer> create(User user, int countPerUser) {
        List<Buyer> buyers = new ArrayList<>();
        for (int i = 0; i < countPerUser; i++) {
            buyers.add(Buyer.builder()
                    .user(user)
                    .fullName(getRandomFullName())
                    .CIN("KB" + (51525 + i))
                    .phone("06" + (50000000 + i))
                    .address("Rue " + (i + 1) + ", " + CITIES[RANDOM.nextInt(CITIES.length)])
                    .build());
        }
        return buyers;
    }

    public static String getRandomFullName() {
        return NAMES[RANDOM.nextInt(NAMES.length)] + " " +LAST_NAMES[RANDOM.nextInt(LAST_NAMES.length)];
    }

}
