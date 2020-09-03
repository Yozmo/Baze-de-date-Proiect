package ro.pharmacy.project.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ro.pharmacy.project.dto.AccountDto;
import ro.pharmacy.project.entity.Account;
import ro.pharmacy.project.repository.AccountRepository;
import ro.pharmacy.project.service.AccountService;
import ro.pharmacy.project.transformer.AccountTransformer;

@RestController
@RequestMapping(value = "/account")
public class AccountController {
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private AccountTransformer accountTransformer;
	
	@Autowired
	private AccountRepository accountRepository;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<AccountDto> getAllAccounts() {
		return accountRepository.findAll().stream().map(accountTransformer::toDto).collect(Collectors.toList());
	}
	
	@GetMapping(value = "/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
	public AccountDto getByEmail(@PathVariable String email) {
		return accountService.getByEmail(email);
	}
	
	@GetMapping(value = "/{email}/roles", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> getAccountRoles(@PathVariable String email) {
		return accountService.getAccountRoles(email);
	}
	
	@GetMapping(value = "/{email}/isUnique", produces = MediaType.APPLICATION_JSON_VALUE)
	public Boolean isUnique(@PathVariable String email) {
		return accountService.isEmailUnique(email);
	}
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	public AccountDto createAccount(@RequestBody AccountDto accountDto) {
		Account account = accountTransformer.toEntity(accountDto);
		return accountTransformer.toDto(accountService.createAccount(account));
	}
	
	@PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateAccount(@RequestBody AccountDto accountDto) {
		accountService.updateAccount(accountTransformer.toEntity(accountDto));
	}
}
