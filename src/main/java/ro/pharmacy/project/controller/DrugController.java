package ro.pharmacy.project.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ro.pharmacy.project.dto.DrugDto;
import ro.pharmacy.project.service.DrugService;

@RestController
@RequestMapping(value = "/drug")
public class DrugController {

	@Autowired
	private DrugService drugService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DrugDto> getAllDrugs() {
		return drugService.getAllDrugs();
	}
	
	@GetMapping(value = "/getDrugs", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DrugDto> getDrugsByIds(List<String> ids) {
		return ids.stream().map(id -> drugService.getDrugById(id)).collect(Collectors.toList()); 
	}
		
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public DrugDto createDrug(@RequestBody DrugDto drugDto) {
		return drugService.createDrug(drugDto);
	}
	
	@PutMapping(value = "/update")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateDrug(@RequestBody DrugDto drugDto) {
		drugService.updateDrug(drugDto);
	}
}
