package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.models.entities.AnimalCategory;
import uit.ac.ma.est.kessabpro.models.entities.AnimalIcon;
import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.AnimalIconRepository;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.security.CustomUserDetailsService;
import uit.ac.ma.est.kessabpro.security.JwtUtil;
import uit.ac.ma.est.kessabpro.services.implementations.AnimalCategoryService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final AnimalCategoryService animalCategoryService;
    private final AnimalIconRepository animalIconRepository;

    public AuthController(UserRepository userRepository, AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder,
                          CustomUserDetailsService customUserDetailsService, AnimalCategoryService animalCategoryService,
                          AnimalIconRepository animalIconRepository) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.animalCategoryService = animalCategoryService;
        this.animalIconRepository = animalIconRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String identifier = loginRequest.get("identifier");
        String password = loginRequest.get("password");

        // Load user details and authenticate
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(identifier);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDetails.getUsername(), password));

        // Set the authentication in the SecurityContext for the aspect to use
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        // Ensure the user has a "Livestock" category
        List<AnimalCategory> userCategories = animalCategoryService.getAllCategories();
        boolean hasUserSpecificCategory = userCategories.stream().anyMatch(cat -> cat.getUser() != null);
        if (!hasUserSpecificCategory) {
            // Create a user-specific "Livestock" category with a predefined icon
            Optional<AnimalIcon> livestockIcon = animalIconRepository.findByIconPath("/icons/live_stock.png");
            AnimalIcon icon = livestockIcon.orElseGet(() -> {
                AnimalIcon newIcon = new AnimalIcon();
                newIcon.setIconPath("/icons/live_stock.png");
                return animalIconRepository.save(newIcon);
            });

            AnimalCategory userLivestock = new AnimalCategory();
            userLivestock.setTypeName("Livestock");
            userLivestock.setIcon(icon);
            // getLoggedInUserId in AnimalCategoryService will set the user_id
            animalCategoryService.createCategory(userLivestock);
        }

        // Generate and return JWT token
        String token = jwtUtil.generateToken(userDetails.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }
}