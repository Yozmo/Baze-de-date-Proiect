package ro.pharmacy.project.transformer;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ro.pharmacy.project.dto.StockDto;
import ro.pharmacy.project.entity.Stock;
import ro.pharmacy.project.repository.CenterRepository;
import ro.pharmacy.project.repository.DrugRepository;
import ro.pharmacy.project.repository.StockRepository;

@Component
public class StockTransformer extends AbstractTransformer<Stock, StockDto> {

	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private CenterRepository centerRepository;
	
	@Autowired
	private DrugRepository drugRepository;
	
	@Override
	public StockDto toDto(Stock entity) {
		StockDto dto = new StockDto();
		BeanUtils.copyProperties(entity, dto);
		dto.setCenterId(entity.getCenter().getId());
		dto.setDrugId(entity.getDrug().getId());
		return dto;
	}

	@Override
	public Stock toEntity(StockDto dto) {
		Stock entity = findById(dto.getId());
		BeanUtils.copyProperties(dto, entity);
		entity.setCenter(centerRepository.getById(dto.getCenterId()));
		entity.setDrug(drugRepository.getById(dto.getDrugId()));
		return entity;
		
	}

	@Override
	protected Stock findById(Long id) {
		return id == null ? new Stock() : stockRepository.findById(id).orElseGet(() -> new Stock());
	}

}
