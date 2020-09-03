package ro.pharmacy.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.Center;

@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {

	@Query(value = "SELECT c FROM Center c WHERE c.id = :id")
	Center getById(@Param("id") Long id);
	
	@Query(value = "SELECT c FROM Center c WHERE c.pharmacy.name = :pharmacyName")
	List<Center> getByPharmacyName(@Param("pharmacyName") String pharmacyName);
	
	@Query(value = "SELECT c FROM Center c WHERE c.pharmacy.id = :pharmacyId")
	List<Center> getByPharmacyId(@Param("pharmacyId") Long pharmacyId);
	
}
