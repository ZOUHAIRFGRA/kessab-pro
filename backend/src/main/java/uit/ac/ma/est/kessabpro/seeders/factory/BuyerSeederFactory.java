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
            "أحمد", "محمد", "فاطمة", "خالد", "أمينة", "يوسف", "سعيدة", "حسن",
            "نادية", "عمر", "كريم", "ليلى", "رشيد", "زينب", "طارق", "سلمى",
            "إيمان", "سمير", "سكينة", "منير", "ياسمين", "مصطفى", "سميرة",
            "هشام", "بلال", "ياسين", "مريم", "أنس", "إلياس", "حليمة", "عبد الله",
            "حمزة", "سارة", "أسماء", "هاجر", "زكرياء", "إكرام", "عثمان", "غزلان",
            "مراد", "نور", "رانيا", "جواد", "صفاء", "عادل", "نعيمة", "وليد"
    };

    private static final String[] LAST_NAMES = {
            "الإدريسي", "بنكيران", "الفاسي", "الوزاني", "العمراني", "التازي",
            "بنيس", "الشاكيب", "العلوي", "برادة", "الحجي", "زويتن", "المهجوبي",
            "الموساوي", "كسوس", "المرنيسي", "أوكيلي", "الطاهري", "المتوكل",
            "بوسعيد", "الحجوي", "اولاد", "الرهاني", "الزاهيدي", "السقالي", "الجابري",
            "الفيلالي", "بوركادي", "الشرايبي", "المرابط", "الناصري", "السفريوي",
            "التوهامي", "الخطيب", "الفضيلي", "القادري", "اليزيدي", "الحماني",
            "الحسني", "بوشيخي", "عواد", "بنجلون", "الحدادي", "الشرقاوي",
            "البقالي", "الفهري", "الزموري", "الصنهاجي", "المزواري", "الحمداوي"
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
