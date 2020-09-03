package ro.pharmacy.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
	
	@Query("SELECT s FROM Supplier s WHERE s.id IN (:supplierIds)")
	List<Supplier> getSuppliersByIds(@Param("supplierIds") List<Long> supplierIds);
}
