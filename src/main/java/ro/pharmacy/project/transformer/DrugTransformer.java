package ro.pharmacy.project.transformer;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ro.pharmacy.project.dto.DrugDto;
import ro.pharmacy.project.entity.Drug;
import ro.pharmacy.project.repository.DrugRepository;

@Component
public class DrugTransformer extends AbstractTransformer<Drug, DrugDto> {
	
	@Autowired
	private DrugRepository drugRepository;

	public DrugDto toDto(Drug entity) {
		DrugDto dto = new DrugDto();
		BeanUtils.copyProperties(entity, dto);
		return dto;
	}
	
	public Drug toEntity(DrugDto dto) {
		Drug entity = findById(dto.getId());
		BeanUtils.copyProperties(dto, entity);
		return entity;
	}
	
	protected Drug findById(Long id) {
		return id == null ? new Drug() : drugRepository.findById(id).orElseGet(() -> new Drug());
	}

}
