package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uit.ac.ma.est.kessabpro.enums.PaymentMethod;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping(path = "/api/payment_methods")
public class PaymentMethodController {
    @GetMapping
    public ResponseEntity<List<String>> getPaymentMethods() {
        List<String> paymentMethods = Stream.of(PaymentMethod.values())
                .map(Enum::name).toList();
        return ResponseEntity.ok(paymentMethods);
    }
}
