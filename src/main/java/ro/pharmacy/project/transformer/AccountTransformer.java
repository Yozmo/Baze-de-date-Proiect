package ro.pharmacy.project.transformer;

import java.util.Objects;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ro.pharmacy.project.dto.AccountDto;
import ro.pharmacy.project.entity.Account;
import ro.pharmacy.project.repository.AccountRepository;

@Component
public class AccountTransformer extends AbstractTransformer<Account, AccountDto> {

	@Autowired
	private AccountRepository accountRepository;
	
	@Override
	public AccountDto toDto(Account entity) {
		AccountDto dto = new AccountDto();
		BeanUtils.copyProperties(entity, dto, "password");
		return dto;
	}

	@Override
	public Account toEntity(AccountDto dto) {
		Account entity = findById(dto.getId());
		BeanUtils.copyProperties(dto, entity, "password");
		if (entity.getPassword() == null || !Objects.equals(dto.getPassword(), entity.getPassword())) {
			entity.setPassword(dto.getPassword());
		}
		return entity;
	}

	@Override
	protected Account findById(Long id) {
		return id == null ? new Account() : accountRepository.findById(id).orElseGet(() -> new Account());
	}

}
