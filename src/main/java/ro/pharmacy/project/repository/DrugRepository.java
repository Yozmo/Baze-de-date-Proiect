package ro.pharmacy.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.Drug;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

	@Query(value = "SELECT d FROM Drug d WHERE d.id = :id")
	Drug getById(@Param("id") Long id);	
	
	@Query(value = "SELECT d FROM Drug d WHERE d.id IN (:drugIds)")
	List<Drug> getDrugsByIds(@Param("drugIds") List<Long> drugIds);
	
	@Query(value = "SELECT countdrugs()", nativeQuery = true)
	long countData();

}
