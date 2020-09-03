package ro.pharmacy.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.SupplierDrug;
import ro.pharmacy.project.entity.SupplierDrugId;

@Repository
public interface SupplierDrugRepository extends JpaRepository<SupplierDrug, SupplierDrugId> {
	
}
