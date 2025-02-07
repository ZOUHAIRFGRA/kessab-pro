package uit.ac.ma.est.kessabpro.helpers;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

public class UploadHelper {
   public static String userDir = System.getProperty("user.dir");
   public static String AnimalImagesUploadDir = File.separator + "uploads"+ File.separator+ "animals" + File.separator;

   public static void createDirIfNotExist(String dir) {
       File f = new File(dir);
       if (!f.exists()) {
           f.mkdir();
       }
   }

   public static String getHashedFileName(MultipartFile f) {

       String originalName = f.getOriginalFilename();
       String extension = "";

       if (originalName != null && originalName.contains(".")) {
           extension = originalName.substring(originalName.lastIndexOf("."));
       }


       return UUID.randomUUID().toString() + extension;
   }
}
