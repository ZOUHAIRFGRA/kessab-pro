package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Application is running");
        response.put("timestamp", System.currentTimeMillis());
        response.put("service", "kessab-pro");
        
        // Add system info
        Map<String, String> systemInfo = new HashMap<>();
        systemInfo.put("java.version", System.getProperty("java.version"));
        systemInfo.put("java.vendor", System.getProperty("java.vendor"));
        systemInfo.put("os.name", System.getProperty("os.name"));
        response.put("system", systemInfo);
        
        return ResponseEntity.ok(response);
    }
}
