package uit.ac.ma.est.kessabpro.services.contracts;

import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.models.entities.Transaction;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface DocumentExport {
    public void exportSaleDocument(ByteArrayOutputStream response, Sale sale) throws IOException;
    public  void exportTransactionDocument(ByteArrayOutputStream  response, Transaction transaction) throws IOException;
}
