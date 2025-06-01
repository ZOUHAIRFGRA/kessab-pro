package uit.ac.ma.est.kessabpro.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String welcome() {
        return "KessabPro Backend Application is running!";
    }
}
