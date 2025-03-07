package uit.ac.ma.est.kessabpro.seeders.factory;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import uit.ac.ma.est.kessabpro.models.entities.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class UserSeederFactory implements SeederFactory<User> {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final String[] CITIES = {
            "Casablanca", "Marrakech", "Rabat", "Fes", "Tangier", "Agadir", "Meknes",
            "Oujda", "Tetouan", "Safi", "Beni Mellal", "Kenitra", "Nador", "El Jadida",
            "Taza", "Sidi Kacem", "Al Hoceima", "Khemisset", "Settat", "Ksar El Kebir",
            "Mohammedia", "Laayoune", "Dakhla", "Errachidia", "Taroudant", "Ouarzazate"
    };

    private static final String[][] FULL_NAMES = {
            {"Ahmed", "ElAmrani"}, {"Mohamed", "Benkirane"}, {"Fatima", "ElFassi"},
            {"Khalid", "Ouhbi"}, {"Amina", "Tazi"}, {"Youssef", "Moutawakil"},
            {"Saida", "ElKhattabi"}, {"Hassan", "Bouhaddou"}, {"Nadia", "Guessous"},
            {"Omar", "Rahal"}, {"Karim", "Mezzour"}, {"Laila", "Sbai"},
            {"Rachid", "ElIdrissi"}, {"Zineb", "Bahmad"}, {"Tariq", "Abdelmoumen"},
            {"Salma", "Benjelloun"}, {"Imane", "Ouazzani"}, {"Samir", "Bouazza"},
            {"Soukaina", "Chafik"}, {"Mounir", "Jouahri"}, {"Hind", "Benhaddou"},
            {"Reda", "Bennis"}, {"Latifa", "Bourkia"}, {"Mustapha", "ElHassani"},
            {"Sanae", "Bekkali"}, {"Anas", "EchChahed"}, {"Wissal", "ElAzzouzi"},
            {"Hatim", "Zahiri"}, {"Malak", "ElOuafi"}
    };

    private static final Random RANDOM = new Random();

    @Override
    public List<User> create(int count) {
        List<User> users = new ArrayList<>();

        // Admin user
        users.add(User.builder()
                .username("admin")
                .email("admin@gmail.com")
                .phone("123456789")
                .address("123 Admin Street, Casablanca")
                .password(passwordEncoder.encode("admin"))
                .build());

        for (int i = 0; i < count; i++) {
            String firstName = FULL_NAMES[i % FULL_NAMES.length][0];
            String lastName = FULL_NAMES[i % FULL_NAMES.length][1];
            String username = firstName.toLowerCase() + lastName.toLowerCase();

            users.add(User.builder()
                    .username(username)
                    .phone("06" + (50000000 + i))
                    .address("Avenue " + (i + 1) + ", " + CITIES[RANDOM.nextInt(CITIES.length)])
                    .email(username + "@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .build());
        }
        return users;
    }
}
