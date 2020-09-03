package ro.pharmacy.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.pharmacy.project.dto.DrugDto;
import ro.pharmacy.project.repository.DrugRepository;
import ro.pharmacy.project.transformer.DrugTransformer;

@Service
public class DrugService {
	
	@Autowired
	private DrugRepository drugRepository;
	
	@Autowired
	private DrugTransformer drugTransformer;
	
	public List<DrugDto> getAllDrugs() {
		return drugRepository.findAll().stream() 
				.map(drugTransformer::toDto).collect(Collectors.toList());
	}
	
	@Transactional
	public DrugDto createDrug(DrugDto drugDto) {
		return drugTransformer.toDto(drugRepository.save(drugTransformer.toEntity(drugDto)));
	}
	
	@Transactional
	public void updateDrug(DrugDto drugDto) {
		drugRepository.save(drugTransformer.toEntity(drugDto));
	}
	
	public DrugDto getDrugById(String id) {
		return drugTransformer.toDto(drugRepository.getById(Long.valueOf(id)));
	}
}
