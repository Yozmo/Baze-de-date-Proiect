package ro.pharmacy.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ro.pharmacy.project.dto.SupplierDto;
import ro.pharmacy.project.service.SupplierService;

@RestController
@RequestMapping(value = "/supplier")
public class SupplierController {
	
	@Autowired
	private SupplierService supplierService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SupplierDto> getAllSuppliers() {
		return supplierService.getAllSuppliers();
	}
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public SupplierDto createSupplier(@RequestBody SupplierDto supplierDto) {
		return supplierService.createSupplier(supplierDto);
	}
}
