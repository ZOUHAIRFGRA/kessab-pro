package uit.ac.ma.est.kessabpro.controllers;

import uit.ac.ma.est.kessabpro.models.entities.User;
import uit.ac.ma.est.kessabpro.repositories.UserRepository;
import uit.ac.ma.est.kessabpro.security.CustomUserDetailsService;
import uit.ac.ma.est.kessabpro.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(UserRepository userRepository, AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder,
                          CustomUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
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

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(identifier);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDetails.getUsername(), password));

        String token = jwtUtil.generateToken(userDetails.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
