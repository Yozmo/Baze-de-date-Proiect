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

import ro.pharmacy.project.dto.StockDto;
import ro.pharmacy.project.service.StockService;

@RestController
@RequestMapping(value = "/stock")
public class StockController {
	
	@Autowired
	private StockService stockService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<StockDto> getAllStocks() {
		return stockService.getAllStocks();
	}
	
	@GetMapping(value = "/center/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<StockDto> getStocksByCenterId(@PathVariable String id) {
		return stockService.getByCenterId(id);
	}
	
	@GetMapping(value = "/getByName", produces = MediaType.APPLICATION_JSON_VALUE)
	public StockDto getByName(@RequestParam String name) {
		return stockService.findByName(name);
	}
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public StockDto createStock(@RequestBody StockDto stockDto) {
		return stockService.createStock(stockDto);
	}
}
