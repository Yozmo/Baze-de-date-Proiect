package ro.pharmacy.project.transformer;

import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ro.pharmacy.project.dto.PharmacyDto;
import ro.pharmacy.project.entity.Pharmacy;
import ro.pharmacy.project.repository.PharmacyRepository;
import ro.pharmacy.project.repository.SupplierRepository;

@Component
public class PharmacyTransformer extends AbstractTransformer<Pharmacy, PharmacyDto> {

	@Autowired
	private PharmacyRepository pharmacyRepository;
	
	@Autowired
	private SupplierRepository supplierRepository;
	
	@Override
	public PharmacyDto toDto(Pharmacy entity) {
		PharmacyDto dto = new PharmacyDto();
		BeanUtils.copyProperties(entity, dto);
		dto.setSupplierIds(supplierRepository
				.getSuppliersByIds(entity.getSuppliers().stream()
						.map(supplierPharamcy -> supplierPharamcy.getSupplier().getId()).collect(Collectors.toList()))
				.stream().map(supplier -> supplier.getId()).collect(Collectors.toList()));
		return dto;
	}

	@Override
	public Pharmacy toEntity(PharmacyDto dto) {
		Pharmacy entity = findById(dto.getId());
		BeanUtils.copyProperties(dto, entity);
		supplierRepository.getSuppliersByIds(dto.getSupplierIds()).forEach(supplier -> entity.addSupplier(supplier));
		return entity;
	}

	@Override
	protected Pharmacy findById(Long id) {
		return id == null ? new Pharmacy() : pharmacyRepository.findById(id).orElseGet(() -> new Pharmacy());
	}
	
}
