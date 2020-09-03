package ro.pharmacy.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ro.pharmacy.project.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	Optional<Account> findByEmail(String email);
	
	List<Account> findByRoles(String role);
	
	@Query(value = "SELECT COUNT(a) FROM Account a")
	long countData();
}
