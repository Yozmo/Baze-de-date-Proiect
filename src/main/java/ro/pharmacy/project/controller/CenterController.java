package ro.pharmacy.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ro.pharmacy.project.dto.CenterDto;
import ro.pharmacy.project.service.CenterService;

@RestController
@RequestMapping(value = "/center")
public class CenterController {
	
	@Autowired
	private CenterService centerService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<CenterDto> getAllCenters() {
		return centerService.getAllCenters();
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public CenterDto getCenterById(@PathVariable String id) {
		return centerService.getCenterById(id);
	}
	
	@GetMapping(value = "/getByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<CenterDto> getCentersByName(@RequestParam String name) {
		return centerService.getCentersByName(name);
	}
	
	@GetMapping(value = "/pharmacy/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<CenterDto> getCentersByPharmacyId(@PathVariable String id) {
		return centerService.getByPharmacyId(id);
	}
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public CenterDto createCenter(@RequestBody CenterDto centerDto) {
		return centerService.createCenter(centerDto);
	}
	
	@PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateCenter(@RequestBody CenterDto centerDto) {
		centerService.updateCenter(centerDto);
	}
}
