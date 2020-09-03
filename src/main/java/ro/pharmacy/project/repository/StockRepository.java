package ro.pharmacy.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

	@Query(value = "SELECT s FROM Stock s WHERE s.id = :id")
	Stock getById(@Param("id") Long id);
	
	@Query(value = "SELECT s FROM Stock s WHERE s.center.id = :id")
	List<Stock> getByCenterId(@Param("id") Long id);
	
	Stock findByNameOfStock(String name);
	
	@Query(value = "SELECT s FROM Stock s WHERE s.drug.id = :id")
	List<Stock> getByDrugId(@Param("id") Long id);
}
