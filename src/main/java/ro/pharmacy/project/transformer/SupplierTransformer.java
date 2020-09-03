package ro.pharmacy.project.transformer;

import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ro.pharmacy.project.dto.SupplierDto;
import ro.pharmacy.project.entity.Supplier;
import ro.pharmacy.project.repository.DrugRepository;
import ro.pharmacy.project.repository.SupplierRepository;

@Component
public class SupplierTransformer extends AbstractTransformer<Supplier, SupplierDto> {
	
	@Autowired
	private SupplierRepository supplierRepository;
	
	@Autowired
	private DrugRepository drugRepository;
	
	@Override
	public SupplierDto toDto(Supplier entity) {
		SupplierDto dto = new SupplierDto();
		BeanUtils.copyProperties(entity, dto);		
		dto.setDrugIds(
				drugRepository
						.getDrugsByIds(entity.getDrugs().stream().map(supplierDrug -> supplierDrug.getDrug().getId())
								.collect(Collectors.toList()))
						.stream().map(drug -> drug.getId()).collect(Collectors.toList()));
		
		return dto;
	}

	@Override
	public Supplier toEntity(SupplierDto dto) {
		Supplier entity = findById(dto.getId());
		BeanUtils.copyProperties(dto, entity);
		drugRepository.getDrugsByIds(dto.getDrugIds()).forEach(drug -> entity.addDrug(drug));
		return entity;
	}

	@Override
	protected Supplier findById(Long id) {
		return id == null ? new Supplier() : supplierRepository.findById(id).orElseGet(() -> new Supplier());
	}
	
}
