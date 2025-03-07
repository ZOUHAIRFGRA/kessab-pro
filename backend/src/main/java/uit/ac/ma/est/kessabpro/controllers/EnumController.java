package uit.ac.ma.est.kessabpro.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uit.ac.ma.est.kessabpro.enums.PaymentMethod;
import uit.ac.ma.est.kessabpro.enums.PaymentStatus;

import java.util.List;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Stream;

@RestController
@RequestMapping(path = "/api/enums")
public class EnumController {

    private static final Map<String, Supplier<Enum<?>[]>> ENUM_MAP = Map.of(
            "payment_method", PaymentMethod::values,
            "payment_status", PaymentStatus::values
    );


    @GetMapping("/{enumType}")
    public ResponseEntity<List<String>> getEnumValues(@PathVariable String enumType) {
        Supplier<Enum<?>[]> enumSupplier = ENUM_MAP.get(enumType.toLowerCase());

        if (enumSupplier == null) {
            return ResponseEntity.badRequest().body(List.of("Invalid enum type"));
        }

        List<String> values = Stream.of(enumSupplier.get())
                .map(Enum::name)
                .toList();

        return ResponseEntity.ok(values);
    }


}
