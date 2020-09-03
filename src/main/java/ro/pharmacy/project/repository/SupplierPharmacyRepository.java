package ro.pharmacy.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ro.pharmacy.project.entity.SupplierPharmacy;
import ro.pharmacy.project.entity.SupplierPharmacyId;

public interface SupplierPharmacyRepository extends JpaRepository<SupplierPharmacy, SupplierPharmacyId>{

	@Query(value = "SELECT sp FROM SupplierPharmacy sp WHERE sp.pharmacy.id = :pharmacyId")
	List<SupplierPharmacy> getByPharmacyId(@Param("pharmacyId") Long pharmacyId);
}
