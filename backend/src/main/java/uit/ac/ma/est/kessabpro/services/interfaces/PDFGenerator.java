package uit.ac.ma.est.kessabpro.services.interfaces;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import uit.ac.ma.est.kessabpro.helpers.GlobalHelper;
import uit.ac.ma.est.kessabpro.models.entities.*;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
public class PDFGenerator implements DocumentExport {

    private final IQRCodeService qrCodeService;

    // Font constants
    private static final Font TITLE_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
    private static final Font HEADER_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
    private static final Font NORMAL_FONT = FontFactory.getFont(FontFactory.HELVETICA, 10);
    private static final Font BOLD_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
    private static final String LOGO_PATH = "/static/images/logo.png";

    public PDFGenerator(IQRCodeService qrCodeService) {
        this.qrCodeService = qrCodeService;
    }

    @Override
    public void exportSaleDocument(HttpServletResponse response, Sale sale) throws IOException {
        Document document = new Document(PageSize.A4);

        try (document) {
            setupDocument(document, response, "sale_" + sale.getId() + ".pdf");
            addLogo(document);
            addTitle(document, "REÇU DE VENTE");

            addSaleSection(document, sale);

            Buyer buyer = sale.getBuyer();
            if (buyer != null) {
                addBuyerSection(document, buyer);
            }

            List<Animal> animals = sale.getAnimals();
            if (animals != null && !animals.isEmpty()) {
                addAnimalsSection(document, animals);
            }

            List<Transaction> transactions = sale.getTransactions();
            if (transactions != null && !transactions.isEmpty()) {
                addTransactionsSection(document, transactions);
            }

            addQRCodesSection(document, sale, buyer);
            addFooter(document);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void exportTransactionDocument(HttpServletResponse response, Transaction transaction) throws IOException {
        Document document = new Document(PageSize.A4);

        try (document) {
            setupDocument(document, response, "transaction_" + transaction.getId() + ".pdf");
            addLogo(document);
            addTitle(document, "REÇU DE TRANSACTION DE VENTE");

            addTransactionDetailSection(document, transaction);

            Sale sale = transaction.getSale();
            if (sale != null) {
                addSaleSection(document, sale);

                Buyer buyer = sale.getBuyer();
                if (buyer != null) {
                    addBuyerSection(document, buyer);
                }

                addQRCodesSection(document, sale, buyer);
            }

            addFooter(document);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setupDocument(Document document, HttpServletResponse response, String filename) throws Exception {
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=" + filename);
    }

    private void addLogo(Document document) throws Exception {
        Image logo = Image.getInstance(Objects.requireNonNull(getClass().getResource(LOGO_PATH)));
        logo.setAlignment(Element.ALIGN_CENTER);
        logo.scaleToFit(180, 80);
        document.add(logo);
    }

    private void addTitle(Document document, String titleText) throws Exception {
        Paragraph title = new Paragraph(titleText, TITLE_FONT);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingBefore(10);
        title.setSpacingAfter(20);
        document.add(title);
    }

    private void addSaleSection(Document document, Sale sale) throws Exception {
        Paragraph saleInfo = new Paragraph("Informations de Vente", HEADER_FONT);
        saleInfo.setSpacingBefore(10);
        saleInfo.setSpacingAfter(10);
        document.add(saleInfo);

        PdfPTable saleTable = new PdfPTable(2);
        saleTable.setWidthPercentage(100);
        saleTable.setSpacingAfter(15);

        addTableCell(saleTable, "ID de Vente:", BOLD_FONT);
        addTableCell(saleTable, sale.getId().toString(), NORMAL_FONT);

        addTableCell(saleTable, "Date de Vente:", BOLD_FONT);
        addTableCell(saleTable, GlobalHelper.formatDate(sale.getSaleDate()), NORMAL_FONT);

        addTableCell(saleTable, "Montant Convenu:", BOLD_FONT);
        addTableCell(saleTable, GlobalHelper.formatCurrency(sale.getAgreedAmount()), NORMAL_FONT);

        addTableCell(saleTable, "Statut de Paiement:", BOLD_FONT);
        addTableCell(saleTable, GlobalHelper.translatePaymentStatus(sale.getPaymentStatus().toString()), NORMAL_FONT);

        document.add(saleTable);
    }

    private void addBuyerSection(Document document, Buyer buyer) throws Exception {
        Paragraph buyerInfo = new Paragraph("Informations de l'Acheteur", HEADER_FONT);
        buyerInfo.setSpacingBefore(10);
        buyerInfo.setSpacingAfter(10);
        document.add(buyerInfo);

        PdfPTable buyerTable = new PdfPTable(2);
        buyerTable.setWidthPercentage(100);
        buyerTable.setSpacingAfter(15);

        addTableCell(buyerTable, "Nom Complet:", BOLD_FONT);
        addTableCell(buyerTable, buyer.getFullName(), NORMAL_FONT);

        addTableCell(buyerTable, "CIN:", BOLD_FONT);
        addTableCell(buyerTable, buyer.getCIN(), NORMAL_FONT);

        addTableCell(buyerTable, "Téléphone:", BOLD_FONT);
        addTableCell(buyerTable, buyer.getPhone(), NORMAL_FONT);

        addTableCell(buyerTable, "Adresse:", BOLD_FONT);
        addTableCell(buyerTable, buyer.getAddress(), NORMAL_FONT);

        document.add(buyerTable);
    }

    private void addAnimalsSection(Document document, List<Animal> animals) throws Exception {
        Paragraph animalsInfo = new Paragraph("Détails des Animaux", HEADER_FONT);
        animalsInfo.setSpacingBefore(10);
        animalsInfo.setSpacingAfter(10);
        document.add(animalsInfo);

        PdfPTable animalsTable = new PdfPTable(6);
        animalsTable.setWidthPercentage(100);
        animalsTable.setSpacingAfter(15);

        addTableCell(animalsTable, "Tag", BOLD_FONT);
        addTableCell(animalsTable, "QR Code", BOLD_FONT);
        addTableCell(animalsTable, "Catégorie", BOLD_FONT);
        addTableCell(animalsTable, "Sexe", BOLD_FONT);
        addTableCell(animalsTable, "Poids", BOLD_FONT);
        addTableCell(animalsTable, "Prix", BOLD_FONT);

        for (Animal animal : animals) {
            addTableCell(animalsTable, animal.getTag(), NORMAL_FONT);

            PdfPCell qrCell = new PdfPCell();
            String animalQrText = "ANIMAL/" + animal.getId();
            byte[] animalQrBytes = qrCodeService.generateQRCode(animalQrText);
            Image animalQrImage = Image.getInstance(animalQrBytes);
            animalQrImage.scaleToFit(70, 60);
            animalQrImage.setAlignment(Element.ALIGN_CENTER);
            qrCell.setPadding(5);
            qrCell.setBorderWidth(0.5f);
            qrCell.addElement(animalQrImage);
            animalsTable.addCell(qrCell);

            addTableCell(animalsTable, animal.getCategory() != null ? animal.getCategory().getTypeName() : "-", NORMAL_FONT);
            addTableCell(animalsTable, animal.getSex(), NORMAL_FONT);
            addTableCell(animalsTable, animal.getWeight() + " kg", NORMAL_FONT);
            addTableCell(animalsTable, GlobalHelper.formatCurrency(animal.getPrice().doubleValue()), NORMAL_FONT);
        }

        document.add(animalsTable);
    }

    private void addTransactionDetailSection(Document document, Transaction transaction) throws Exception {
        Paragraph transactionInfo = new Paragraph("Informations de Transaction", HEADER_FONT);
        transactionInfo.setSpacingBefore(10);
        transactionInfo.setSpacingAfter(10);
        document.add(transactionInfo);

        PdfPTable transTable = new PdfPTable(2);
        transTable.setWidthPercentage(100);
        transTable.setSpacingAfter(15);

        addTableCell(transTable, "ID de Transaction:", BOLD_FONT);
        addTableCell(transTable, transaction.getId().toString(), NORMAL_FONT);

        addTableCell(transTable, "Date de Transaction:", BOLD_FONT);
        addTableCell(transTable, GlobalHelper.formatDate(transaction.getTransactionDate()), NORMAL_FONT);

        addTableCell(transTable, "Méthode de Paiement:", BOLD_FONT);
        addTableCell(transTable, GlobalHelper.translatePaymentMethod(transaction.getMethod().toString()), NORMAL_FONT);

        addTableCell(transTable, "Montant:", BOLD_FONT);
        addTableCell(transTable, GlobalHelper.formatCurrency(transaction.getAmount()), NORMAL_FONT);

        document.add(transTable);
    }

    private void addTransactionsSection(Document document, List<Transaction> transactions) throws Exception {
        Paragraph transactionsInfo = new Paragraph("Historique des Transactions", HEADER_FONT);
        transactionsInfo.setSpacingBefore(10);
        transactionsInfo.setSpacingAfter(10);
        document.add(transactionsInfo);

        PdfPTable transactionsTable = new PdfPTable(4);
        transactionsTable.setWidthPercentage(100);
        transactionsTable.setSpacingAfter(15);

        addTableCell(transactionsTable, "ID", BOLD_FONT);
        addTableCell(transactionsTable, "Date", BOLD_FONT);
        addTableCell(transactionsTable, "Méthode", BOLD_FONT);
        addTableCell(transactionsTable, "Montant", BOLD_FONT);

        for (Transaction transaction : transactions) {
            addTableCell(transactionsTable, transaction.getId().toString(), NORMAL_FONT);
            addTableCell(transactionsTable, GlobalHelper.formatDate(transaction.getTransactionDate()), NORMAL_FONT);
            addTableCell(transactionsTable, GlobalHelper.translatePaymentMethod(transaction.getMethod().toString()), NORMAL_FONT);
            addTableCell(transactionsTable, GlobalHelper.formatCurrency(transaction.getAmount()), NORMAL_FONT);
        }

        document.add(transactionsTable);
    }

    private void addQRCodesSection(Document document, Sale sale, Buyer buyer) throws Exception {
        PdfPTable qrTable = new PdfPTable(2);
        qrTable.setWidthPercentage(100);
        qrTable.setSpacingBefore(20);

        if (sale != null) {
            PdfPCell saleQrCell = createQRCodeCell("SALE/" + sale.getId(), "Référence de Vente");
            qrTable.addCell(saleQrCell);
        }

        if (buyer != null) {
            PdfPCell buyerQrCell = createQRCodeCell("BUYER/" + buyer.getId(), "Référence d'Acheteur");
            qrTable.addCell(buyerQrCell);
        }

        document.add(qrTable);
    }

    private PdfPCell createQRCodeCell(String qrText, String labelText) throws Exception {
        PdfPCell qrCell = new PdfPCell();
        qrCell.setBorder(Rectangle.NO_BORDER);
        qrCell.setHorizontalAlignment(Element.ALIGN_CENTER);

        byte[] qrBytes = qrCodeService.generateQRCode(qrText);
        Image qrImage = Image.getInstance(qrBytes);
        qrImage.scaleToFit(100, 100);

        Paragraph qrLabel = new Paragraph(labelText, BOLD_FONT);
        qrLabel.setAlignment(Element.ALIGN_CENTER);

        qrCell.addElement(qrImage);
        qrCell.addElement(qrLabel);

        return qrCell;
    }

    private void addFooter(Document document) throws Exception {
        Paragraph footer = new Paragraph("Nous vous remercions de votre confiance", NORMAL_FONT);
        footer.setAlignment(Element.ALIGN_CENTER);
        footer.setSpacingBefore(20);
        document.add(footer);
    }

    private void addTableCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(5);
        cell.setBorderWidth(0.5f);
        table.addCell(cell);
    }
}