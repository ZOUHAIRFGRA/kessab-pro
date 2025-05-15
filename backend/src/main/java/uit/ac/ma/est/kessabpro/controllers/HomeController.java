package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Controller to handle the root path and provide basic API information.
 */
@RestController
public class HomeController {

    @Value("${spring.application.name:KessabPro API}")
    private String applicationName;

    /**
     * Handle the root path to provide API information.
     * This helps avoid 404 errors when accessing the root URL.
     *
     * @return API information including status, version, and available endpoints
     */
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("name", applicationName);
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("message", "Welcome to the KessabPro API");
        
        // Add available endpoints for documentation
        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("auth", "/api/auth/** - Authentication endpoints");
        endpoints.put("animals", "/api/animals/** - Animal management");
        endpoints.put("categories", "/api/categories/** - Animal categories");
        endpoints.put("sales", "/api/sales/** - Sales management");
        endpoints.put("buyers", "/api/buyers/** - Buyers management");
        endpoints.put("users", "/api/users/** - User information");
        
        response.put("endpoints", endpoints);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Health check endpoint for monitoring services.
     *
     * @return Simple health status
     */
    @GetMapping(value = "/api/health", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", applicationName);
        return ResponseEntity.ok(response);
    }
}
