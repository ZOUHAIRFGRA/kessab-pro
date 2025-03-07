package uit.ac.ma.est.kessabpro.auditing;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class UserSpecification {
    public static <T> Specification<T> filterByAuthenticatedUser(UUID authenticatedUserId) {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("user").get("id"), authenticatedUserId);
        };
    }
}
