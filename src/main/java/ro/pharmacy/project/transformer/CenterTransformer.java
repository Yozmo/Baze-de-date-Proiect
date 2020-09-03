package ro.pharmacy.project.transformer;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ro.pharmacy.project.dto.CenterDto;
import ro.pharmacy.project.entity.Center;
import ro.pharmacy.project.repository.CenterRepository;
import ro.pharmacy.project.repository.PharmacyRepository;

@Component
public class CenterTransformer extends AbstractTransformer<Center, CenterDto>{

	@Autowired
	private CenterRepository centerRepository;
	
	@Autowired
	private PharmacyRepository pharmacyRepository;
	
	@Override
	public CenterDto toDto(Center entity) {
		CenterDto dto = new CenterDto();
		BeanUtils.copyProperties(entity, dto);
		dto.setPharmacyId(entity.getPharmacy().getId());
		return dto;
	}

	@Override
	public Center toEntity(CenterDto dto) {
		Center entity = findById(dto.getId());
		BeanUtils.copyProperties(dto, entity);
		entity.setPharmacy(pharmacyRepository.getById(dto.getPharmacyId()));
		return entity;
	}

	@Override
	protected Center findById(Long id) {
		return id == null ? new Center() : centerRepository.findById(id).orElseGet(() -> new Center());
	}

}
