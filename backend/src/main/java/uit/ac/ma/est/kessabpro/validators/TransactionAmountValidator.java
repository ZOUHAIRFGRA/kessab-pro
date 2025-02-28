package uit.ac.ma.est.kessabpro.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import uit.ac.ma.est.kessabpro.annotations.ValidateTransactionAmount;
import uit.ac.ma.est.kessabpro.helpers.ValidationHelper;
import uit.ac.ma.est.kessabpro.models.dto.requests.SaleDTORequest;
import uit.ac.ma.est.kessabpro.models.dto.requests.TransactionDTORequest;
import uit.ac.ma.est.kessabpro.models.entities.Sale;
import uit.ac.ma.est.kessabpro.repositories.SaleRepository;

import java.util.Optional;
import java.util.UUID;


public class TransactionAmountValidator implements ConstraintValidator<ValidateTransactionAmount, TransactionDTORequest> {


    @Autowired
    SaleRepository saleRepository;

    @Override
    public void initialize(ValidateTransactionAmount constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(TransactionDTORequest transactionDTORequest, ConstraintValidatorContext constraintValidatorContext) {

        if (transactionDTORequest.sale_id() == null || !ValidationHelper.isValidUUID(String.valueOf(transactionDTORequest.sale_id())))
            return true;

        Optional<Sale> sale = saleRepository.findById(transactionDTORequest.sale_id());

        if (sale.isEmpty()) {
            return false;
        }

        double totalSaleAmount = sale.get().getAgreedAmount();
        return !(transactionDTORequest.amount() > totalSaleAmount);
    }


}
