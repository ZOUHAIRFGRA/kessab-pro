package uit.ac.ma.est.kessabpro.exceptions;

import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String message;
    private String details;

    public ErrorResponse(int value, String message, String details) {
        this.status = value;
        this.message = message;
        this.details = details;
    }


}