package uit.ac.ma.est.kessabpro.mappers;

import org.springframework.stereotype.Component;
import uit.ac.ma.est.kessabpro.models.dto.AnimalActivitiesLogDTO;
import uit.ac.ma.est.kessabpro.models.entities.AnimalActivitiesLog;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AnimalActivitiesLogMapper {

    public AnimalActivitiesLogDTO toDTO(AnimalActivitiesLog log) {
        return new AnimalActivitiesLogDTO(
                log.getId(),
                log.getAnimal().getId(),
                log.getLogDate(),
                log.getActivity()
        );
    }

    public List<AnimalActivitiesLogDTO> toDTOList(List<AnimalActivitiesLog> logs) {
        return logs.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AnimalActivitiesLog toEntity(AnimalActivitiesLogDTO dto) {
        AnimalActivitiesLog log = new AnimalActivitiesLog();
        log.setId(dto.getId());
        log.setLogDate(dto.getLogDate());
        log.setActivity(dto.getActivity());
        return log;
    }
}
