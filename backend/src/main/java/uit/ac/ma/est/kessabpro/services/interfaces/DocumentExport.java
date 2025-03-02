package uit.ac.ma.est.kessabpro.services.implementations;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface DocumentExport {
    public void exportSaleDocument(HttpServletResponse response);
    public  void exportTransactionDocument(HttpServletResponse response) throws IOException;
}
