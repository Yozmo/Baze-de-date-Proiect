package ro.pharmacy.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.pharmacy.project.dto.CenterDto;
import ro.pharmacy.project.repository.CenterRepository;
import ro.pharmacy.project.transformer.CenterTransformer;

@Service
public class CenterService {
	
	@Autowired
	private CenterRepository centerRepository;
	
	@Autowired
	private CenterTransformer centerTransformer;
	
	@Transactional
	public List<CenterDto> getAllCenters() {
		return centerRepository.findAll().stream()
				.map(centerTransformer::toDto).collect(Collectors.toList());
	}
	
	@Transactional
	public CenterDto getCenterById(String id) {
		return centerTransformer.toDto(centerRepository.getById(Long.valueOf(id)));
	}
	
	@Transactional
	public List<CenterDto> getCentersByName(String name) {
		return centerRepository.getByPharmacyName(name).stream()
				.map(centerTransformer::toDto).collect(Collectors.toList());
	}
	
	@Transactional
	public CenterDto createCenter(CenterDto centerDto) {
		return centerTransformer.toDto(centerRepository
				.save(centerTransformer.toEntity(centerDto)));
	}
	
	@Transactional
	public void updateCenter(CenterDto centerDto) {
		centerRepository.save(centerTransformer.toEntity(centerDto));
	}
	
	@Transactional
	public List<CenterDto> getByPharmacyId(String pharmacyId) {
		return centerRepository.getByPharmacyId(Long.valueOf(pharmacyId)).stream()
				.map(centerTransformer::toDto).collect(Collectors.toList());
	}
}
