package ro.pharmacy.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.Pharmacy;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
	
	@Query(value = "SELECT p FROM Pharmacy p where p.id = :id")
	Pharmacy getById(@Param("id") Long id);
	
	@Query(value = "SELECT p FROM Pharmacy p WHERE LOWER(p.name) = LOWER(:name)")
	Pharmacy findByName(@Param("name") String name);
	
	@Query(value = "SELECT p FROM Pharmacy p WHERE p.name like 'name%'")
	Pharmacy findByNameRegex(@Param("name") String name);
}
