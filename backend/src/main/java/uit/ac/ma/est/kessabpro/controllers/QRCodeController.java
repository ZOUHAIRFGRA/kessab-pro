package uit.ac.ma.est.kessabpro.controllers;

import com.google.zxing.WriterException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import uit.ac.ma.est.kessabpro.services.implementations.QRCodeService;
import uit.ac.ma.est.kessabpro.services.interfaces.IQRCodeService;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api")
public class QRCodeController {
    private final IQRCodeService qrCodeService;
    public QRCodeController(QRCodeService qrCodeService) {
        this.qrCodeService = qrCodeService;
    }
    @GetMapping("/generateQRCode")
    public ResponseEntity<byte[]> generateQRCode(@RequestParam String text) throws IOException, WriterException {
        byte[] qrCode = qrCodeService.generateQRCode(text);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return ResponseEntity.ok().headers(headers).body(qrCode);
    }

}
