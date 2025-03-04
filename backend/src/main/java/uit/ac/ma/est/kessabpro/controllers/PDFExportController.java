package uit.ac.ma.est.kessabpro.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;
import uit.ac.ma.est.kessabpro.services.implementations.TransactionService;
import uit.ac.ma.est.kessabpro.services.interfaces.DocumentExport;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/pdf")
public class PDFExportController {

    private final TransactionService transactionService;
    private final SaleService saleService;
    DocumentExport pDFService;

    PDFExportController(DocumentExport pDFService, TransactionService transactionService, SaleService saleService) {
        this.pDFService = pDFService;
        this.transactionService = transactionService;
        this.saleService = saleService;
    }

    @PostMapping(value = "/transaction/{id}")
    public ResponseEntity<Map<String, String>> exportTransactionPDFDocument(HttpServletResponse  response, @PathVariable UUID id) throws IOException {
        Transaction transaction = transactionService.getTransactionById(id);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        pDFService.exportTransactionDocument(baos, transaction);
        String base64Pdf = Base64.getEncoder().encodeToString(baos.toByteArray());
        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("pdfBase64", base64Pdf);
        jsonResponse.put("filename", "transaction_" + transaction.getTransactionDate() + ".pdf");
        return ResponseEntity.ok(jsonResponse);

    }

    @PostMapping(value = "/sale/{id}")
    public ResponseEntity<Map<String, String>> exportSalePDFDocument(HttpServletResponse response, @PathVariable UUID id) throws IOException {
        Sale sale = saleService.getSaleById(id);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        pDFService.exportSaleDocument( baos, sale);
        String base64Pdf = Base64.getEncoder().encodeToString(baos.toByteArray());
        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("pdfBase64", base64Pdf);
        jsonResponse.put("filename", "sale_" + sale.getSaleDate() + ".pdf");

        return ResponseEntity.ok(jsonResponse);
    }


}
