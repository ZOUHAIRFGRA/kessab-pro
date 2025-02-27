package uit.ac.ma.est.kessabpro.exceptions;

import lombok.Data;

import java.util.List;

@Data
public class ErrorResponse {
    private int status;
    private String message;
    private String errors;

    public ErrorResponse(int value, String message, String errors) {
        this.status = value;
        this.message = message;
        this.errors = errors;
    }


}