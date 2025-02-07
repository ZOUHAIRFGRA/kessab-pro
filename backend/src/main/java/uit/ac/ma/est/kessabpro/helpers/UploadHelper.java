package uit.ac.ma.est.kessabpro.helpers;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Paths;
import java.util.UUID;

public class UploadHelper {
    public static final String USER_DIR = System.getProperty("user.dir");
    public static final String ANIMAL_IMAGES_UPLOAD_DIR = Paths.get(USER_DIR, "uploads", "animals").toString();

    public static void createDirIfNotExist(String dir) {
        File directory = new File(dir);
        if (!directory.exists()) {
            directory.mkdirs(); // ✅ Creates all necessary parent directories
        }
    }

    public static String getCustomFileName(String animalName, MultipartFile file) {
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf("."));
        }

        // Remove spaces and special characters from the animal name
        String sanitizedAnimalName = animalName.trim().replaceAll("\\s+", "_").replaceAll("[^a-zA-Z0-9_]", "");

        return sanitizedAnimalName + "_" + UUID.randomUUID() + extension;
    }

}
