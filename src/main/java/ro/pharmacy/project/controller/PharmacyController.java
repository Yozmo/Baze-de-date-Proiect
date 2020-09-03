package ro.pharmacy.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ro.pharmacy.project.dto.PharmacyDto;
import ro.pharmacy.project.entity.SupplierPharmacy;
import ro.pharmacy.project.repository.SupplierPharmacyRepository;
import ro.pharmacy.project.service.PharmacyService;

@RestController
@RequestMapping(value = "/pharmacy")
public class PharmacyController {

	@Autowired
	private PharmacyService pharmacyService;
	
	@Autowired
	private SupplierPharmacyRepository supplierPharmacyRepository;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PharmacyDto> getAllPharmacies() {
		return pharmacyService.getAllPharmacies();
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PharmacyDto findPharmacyById(@PathVariable String id) {
		return pharmacyService.findPharmacyById(id);
	}
	
	@GetMapping(value = "/findByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public PharmacyDto findByName(@RequestParam String name) {
		return pharmacyService.findPharmacyByName(name);
	}
	
	@GetMapping(value = "/filterByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public PharmacyDto findByNameFilter(@RequestParam String name) {
		return pharmacyService.findByNameFilter(name);
	}
	
	@GetMapping(value = "/{id}/suppliers", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SupplierPharmacy> getSuppliers(@PathVariable String id) {
		return supplierPharmacyRepository.getByPharmacyId(Long.valueOf(id));
	}
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public PharmacyDto createPharmacy(@RequestBody PharmacyDto pharmacyDto) {
		return pharmacyService.createPharmacy(pharmacyDto);
	}
}
