package uit.ac.ma.est.kessabpro.services.interfaces;

import com.google.zxing.WriterException;

import java.io.IOException;

public interface IQRCodeService {
    public byte[] generateQRCode(String text) throws WriterException, IOException;
}
