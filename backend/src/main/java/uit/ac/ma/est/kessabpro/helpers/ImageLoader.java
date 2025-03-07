package uit.ac.ma.est.kessabpro.helpers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ImageLoader {
    public static List<String> getImagesByCategory(String category) {
        List<String> imagePaths = new ArrayList<>();
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        try {
            Resource[] resources = resolver.getResources("classpath:/static/images/" + category + "/*");
            for (Resource resource : resources) {
                imagePaths.add("/images/" + category + "/" + resource.getFilename());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return imagePaths;
    }
}
