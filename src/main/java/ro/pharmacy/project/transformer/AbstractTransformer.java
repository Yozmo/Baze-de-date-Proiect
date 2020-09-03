package ro.pharmacy.project.transformer;

import ro.pharmacy.project.dto.BaseDto;
import ro.pharmacy.project.entity.BaseEntity;

public abstract class AbstractTransformer<T extends BaseEntity, X extends BaseDto> {
	
	public abstract X toDto(T entity);
	
	public abstract T toEntity(X dto);
	
	protected abstract T findById(Long id);
}
