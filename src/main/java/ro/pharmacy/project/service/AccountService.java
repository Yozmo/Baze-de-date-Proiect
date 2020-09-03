package ro.pharmacy.project.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import ro.pharmacy.project.dto.AccountDto;
import ro.pharmacy.project.entity.Account;
import ro.pharmacy.project.repository.AccountRepository;
import ro.pharmacy.project.transformer.AccountTransformer;

@Service
public class AccountService {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private AccountTransformer accountTransformer;

	
	@Transactional
	public Account createAccount(Account account) {
		Optional<Account> accountOpt = accountRepository.findByEmail(account.getEmail());
		if (accountOpt.isPresent()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT);
		} else {
			account.setPassword(encodePassword(account.getPassword()));
			return accountRepository.save(account);
		}
	}
	
	@Transactional
	public void updateAccount(Account account) {
		Optional<Account> accountOpt = accountRepository.findByEmail(account.getEmail());
		accountOpt.ifPresent(persistedAccount -> {
			String newPassword = account.getPassword();
			if (!persistedAccount.getPassword().trim().equals(newPassword)) {
				account.setPassword(encodePassword(newPassword));
			}
			account.setPassword(encodePassword(newPassword));
			accountRepository.save(account);
		});
	}
	
	@Transactional
	public AccountDto getByEmail(String email) {
		return accountRepository.findByEmail(email).map(accountTransformer::toDto)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	public List<String> getAccountRoles(String email) {
		return accountRepository.findByEmail(email).map(Account::getRoles).map(Arrays::asList)
				.orElse(Collections.emptyList());
	}
	
	public boolean isEmailUnique(String email) {
		Optional<Account> account = accountRepository.findByEmail(email);
		return account.isPresent() ? false : true;
	}
	
	private String encodePassword(String rawPassword) {
		String encodedPassword = passwordEncoder.encode(rawPassword);
		return encodedPassword.replace("{sha256}", "");
	}
}
