package ro.pharmacy.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.pharmacy.project.dto.StockDto;
import ro.pharmacy.project.repository.StockRepository;
import ro.pharmacy.project.transformer.StockTransformer;

@Service
public class StockService {
	
	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private StockTransformer stockTransformer;
	
	@Transactional
	public List<StockDto> getAllStocks() {
		return stockRepository.findAll().stream()
				.map(stockTransformer::toDto).collect(Collectors.toList());
	}
	
	@Transactional
	public List<StockDto> getByCenterId(String id) {
		return stockRepository.getByCenterId(Long.valueOf(id)).stream()
				.map(stockTransformer::toDto).collect(Collectors.toList());
	}
	
	@Transactional
	public StockDto createStock(StockDto stockDto) {
		return stockTransformer.toDto(stockRepository
				.save(stockTransformer.toEntity(stockDto)));
	}
	
	@Transactional
	public StockDto findByName(String name) {
		return stockTransformer.toDto(stockRepository.findByNameOfStock(name));
	}
	
	public List<StockDto> getByDrugId(Long id) {
		return stockRepository.getByDrugId(id).stream()
				.map(stockTransformer::toDto).collect(Collectors.toList());
	}
	
	public void updateStock(Long id, int quantity) {
		stockRepository.findById(id).ifPresent(stock -> {
			stock.setTotalQuantity(stock.getTotalQuantity() + quantity);
			stockRepository.save(stock);
		});
	}
}	
