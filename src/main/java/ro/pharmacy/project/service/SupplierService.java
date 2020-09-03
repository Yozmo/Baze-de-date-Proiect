package ro.pharmacy.project.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.pharmacy.project.dto.SupplierDto;
import ro.pharmacy.project.repository.SupplierRepository;
import ro.pharmacy.project.transformer.SupplierTransformer;

@Service
public class SupplierService {

	@Autowired
	private SupplierRepository supplierRepository;

	@Autowired
	private SupplierTransformer supplierTransformer;

	@Transactional
	public SupplierDto createSupplier(SupplierDto supplierDto) {
		return supplierTransformer.toDto(supplierRepository.save(
				supplierTransformer.toEntity(supplierDto)));
	}
	
	@Transactional
	public List<SupplierDto> getAllSuppliers() {
		return supplierRepository.findAll().stream() 
				.map(supplierTransformer::toDto).collect(Collectors.toList());
	}
}
