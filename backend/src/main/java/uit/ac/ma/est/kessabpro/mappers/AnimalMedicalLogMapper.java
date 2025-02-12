package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.AnimalMedicalLogDTO;
import uit.ac.ma.est.kessabpro.models.entities.AnimalMedicalLog;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AnimalMedicalLogMapper {

    public AnimalMedicalLogDTO toDTO(AnimalMedicalLog log) {
        return new AnimalMedicalLogDTO(
                log.getId(),
                log.getAnimal().getId(),
                log.getLogDate(),
                log.getDescription(),
                log.getVetName()
        );
    }

    public List<AnimalMedicalLogDTO> toDTOList(List<AnimalMedicalLog> logs) {
        return logs.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AnimalMedicalLog toEntity(AnimalMedicalLogDTO dto) {
        AnimalMedicalLog log = new AnimalMedicalLog();
        log.setId(dto.getId());
        log.setLogDate(dto.getLogDate());
        log.setDescription(dto.getDescription());
        log.setVetName(dto.getVetName());
        return log;
    }
}
