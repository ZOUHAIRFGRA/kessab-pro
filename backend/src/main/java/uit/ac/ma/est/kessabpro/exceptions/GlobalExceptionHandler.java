package uit.ac.ma.est.kessabpro.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uit.ac.ma.est.kessabpro.enums.PaymentMethod;

import java.time.format.DateTimeParseException;
import java.util.Arrays;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Invalid input format.", ex.getMessage());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(EntityNotFoundException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Entity not found.", ex.getMessage());
    }@ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(DateTimeParseException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Date invalid.", "the provided date is invalid");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(IllegalArgumentException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Argument not valid.", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationError(MethodArgumentNotValidException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation failed.", ex.getBindingResult().getFieldError().getField() + " " + ex.getBindingResult().getFieldError().getDefaultMessage());
    }

    private ResponseEntity<Object> buildErrorResponse(HttpStatus status, String message, String details) {
        ErrorResponse response = new ErrorResponse(status.value(), message, details);
        return new ResponseEntity<>(response, status);
    }


}
