package uit.ac.ma.est.kessabpro.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;
import uit.ac.ma.est.kessabpro.services.implementations.SaleService;
import uit.ac.ma.est.kessabpro.services.implementations.TransactionService;
import uit.ac.ma.est.kessabpro.services.interfaces.DocumentExport;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

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

    @GetMapping(value = "/transaction/{id}")
    public void exportTransactionPDFDocument(HttpServletResponse response, @PathVariable UUID id) throws IOException {
        Transaction transaction = transactionService.getTransactionById(id);
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());
        String HeaderKey = "Content-Disposition";
        String HeaderValue = "attachment; filename=\"" + currentDateTime + ".pdf\"";
        response.setHeader(HeaderKey, HeaderValue);
        pDFService.exportTransactionDocument(response, transaction);
    }

    @GetMapping(value = "/sale/{id}")
    public void exportSalePDFDocument(HttpServletResponse response, @PathVariable UUID id) throws IOException {
        Sale sale = saleService.getSaleById(id);
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());
        String HeaderKey = "Content-Disposition";
        String HeaderValue = "attachment; filename=\"" + currentDateTime + ".pdf\"";
        response.setHeader(HeaderKey, HeaderValue);
        pDFService.exportSaleDocument(response, sale);
    }


}
