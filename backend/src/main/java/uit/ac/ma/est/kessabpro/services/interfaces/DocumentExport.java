package uit.ac.ma.est.kessabpro.services.interfaces;

import jakarta.servlet.http.HttpServletResponse;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.io.IOException;

public interface DocumentExport {
    public void exportSaleDocument(HttpServletResponse response, Sale sale) throws IOException;
    public  void exportTransactionDocument(HttpServletResponse response, Transaction transaction) throws IOException;
}
