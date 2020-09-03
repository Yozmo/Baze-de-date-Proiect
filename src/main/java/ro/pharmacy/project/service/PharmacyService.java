package ro.pharmacy.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.pharmacy.project.dto.PharmacyDto;
import ro.pharmacy.project.repository.PharmacyRepository;
import ro.pharmacy.project.transformer.PharmacyTransformer;

@Service
public class PharmacyService {
	
	@Autowired
	private PharmacyRepository pharmacyRepository;
	
	@Autowired
	private PharmacyTransformer pharmacyTransformer;
	
	@Transactional
	public List<PharmacyDto> getAllPharmacies() {
		return pharmacyRepository.findAll().stream()
				.map(pharmacyTransformer::toDto).collect(Collectors.toList());
	}
	
	@Transactional
	public PharmacyDto findPharmacyById(String id) {
		return pharmacyTransformer.toDto(pharmacyRepository.getById(Long.valueOf(id)));
	}
	
	@Transactional
	public PharmacyDto findPharmacyByName(String name) {
		return pharmacyTransformer.toDto(pharmacyRepository.findByName(name));
	}
	
	@Transactional
	public PharmacyDto findByNameFilter(String name) {
		return pharmacyTransformer.toDto(pharmacyRepository.findByNameRegex(name));
	}
	
	@Transactional
	public PharmacyDto createPharmacy(PharmacyDto pharmacyDto) {
		return pharmacyTransformer.toDto(pharmacyRepository
				.save(pharmacyTransformer.toEntity(pharmacyDto)));
	}	
}
