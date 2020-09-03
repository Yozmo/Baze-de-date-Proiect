package ro.pharmacy.project.service.dataloading;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ro.pharmacy.project.dto.CenterDto;
import ro.pharmacy.project.dto.PharmacyDto;
import ro.pharmacy.project.dto.StockDto;
import ro.pharmacy.project.dto.SupplierDto;
import ro.pharmacy.project.entity.Account;
import ro.pharmacy.project.entity.Drug;
import ro.pharmacy.project.exceptionhandling.ServiceException;
import ro.pharmacy.project.repository.CenterRepository;
import ro.pharmacy.project.repository.DrugRepository;
import ro.pharmacy.project.repository.StockRepository;
import ro.pharmacy.project.service.AccountService;
import ro.pharmacy.project.service.PharmacyService;
import ro.pharmacy.project.service.SupplierService;
import ro.pharmacy.project.transformer.CenterTransformer;
import ro.pharmacy.project.transformer.StockTransformer;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ImportService {
	
	private static final Logger LOG = LogManager.getLogger(ImportService.class);
	private static final String DATA_DIR = "data/";
	private static final String DRUGS = "drugs";
	private static final String PHARMACIES = "pharmacies";
	private static final String CENTERS = "centers";
	private static final String SUPPLIERS = "suppliers";
	private static final String STOCKS = "stocks";
	private static final String ACCOUNTS = "accounts";
	
	@Autowired
	private DrugRepository drugRepository;
	
//	@Autowired
//	private SupplierRepository supplierRepository;
//	
//	@Autowired
//	private SupplierTransformer supplierTransformer;
	
	@Autowired
	private SupplierService supplierService;
	
//	@Autowired 
//	private PharmacyRepository pharmacyRepository;
//	
//	@Autowired 
//	private PharmacyTransformer pharmacyTransformer;
	
	@Autowired
	private PharmacyService pharmacyService;
	
	@Autowired
	private CenterRepository centerRepository;
	
	@Autowired
	private CenterTransformer centerTransformer;
	
	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private StockTransformer stockTransformer;
	
//	@Autowired
//	private AccountRepository accountRepository;
	
	@Autowired
	private AccountService accountService;
	
	
	@PostConstruct
	private void importData() throws ServiceException {
		try {
			LOG.info("[IMPORT SERVICE] Performing initial import");
			
			if (drugRepository.countData() == 0) {
				importDrugs();
				importSuppliers();
				importPharmacies();
				importCenters();
				importStocks();
				importAccounts();
			} else {
				LOG.info("[IMPORT SERVICE] Import should run just once! It was runned before.");
			}
			
		} catch (Exception e ) {
			throw new ServiceException(e.getMessage());
		}
	}
	
	private void importDrugs() {
		LOG.info("[IMPORT SERVICE] Import drugs");
		List<Drug> drugs = loadData(DRUGS, new TypeReference<List<Drug>>() {
		});
		drugRepository.saveAll(drugs);
		LOG.info("[IMPORT SERVICE] Import drugs successfully");
	}
	
	private void importSuppliers() {
		LOG.info("[IMPORT SERVICE] Import suppliers");
		List<SupplierDto> suppliers = loadData(SUPPLIERS, new TypeReference<List<SupplierDto>>() {
		});
		
		LOG.info("[IMPORT SERVICE] Suppliers: " + suppliers);
		
//		supplierRepository.saveAll(suppliers.stream()
//				.map(supplierTransformer::toEntity)
//				.collect(Collectors.toList()));
		
		suppliers.forEach(supplierDto -> supplierService.createSupplier(supplierDto));

		
		LOG.info("[IMPORT SERVICE] Import suppliers successfully");
	}
	
	private void importPharmacies() {
		LOG.info("[IMPORT SERVICE] Import pharmacies");
		List<PharmacyDto> pharmacies = loadData(PHARMACIES, new TypeReference<List<PharmacyDto>>() {
		});
//		pharmacyRepository.saveAll(pharmacies.stream()
//				.map(pharmacyTransformer::toEntity)
//				.collect(Collectors.toList()));
		pharmacies.forEach(pharmacy -> pharmacyService.createPharmacy(pharmacy));
		LOG.info("[IMPORT SERVICE] Import pharmacies successfully");
	}
	
	private void importCenters() {
		LOG.info("[IMPORT SERVICE] Import centers");
		List<CenterDto> centers = loadData(CENTERS, new TypeReference<List<CenterDto>>() {
		});
		centerRepository.saveAll(centers.stream()
				.map(centerTransformer::toEntity)
				.collect(Collectors.toList()));
		LOG.info("[IMPORT SERVICE] Import centers successfully");
	}
	
	private void importStocks() {
		LOG.info("[IMPORT SERVICE] Import stocks");
		List<StockDto> stocks = loadData(STOCKS, new TypeReference<List<StockDto>>() {
		});
		stockRepository.saveAll(stocks.stream()
				.map(stockTransformer::toEntity)
				.collect(Collectors.toList()));
		LOG.info("[IMPORT SERVICE] Import stocks successfully");
	}
	
	private void importAccounts() {
		LOG.info("[IMPORT SERVICE] Import accounts");
		List<Account> accounts = loadData(ACCOUNTS, new TypeReference<List<Account>>() {
		});
//		accountRepository.saveAll(accounts);
		accounts.forEach(account -> accountService.createAccount(account));
		LOG.info("[IMPORT SERVICE] Import accounts successfully");
	}
	
	private <T>List<T> loadData(String resourceName, TypeReference<List<T>> typeReference) {
		ObjectMapper mapper = new ObjectMapper();
		Resource inputResource = new ClassPathResource(String.format("%s.json", DATA_DIR + resourceName));
		
		try {
			return mapper.readValue(inputResource.getInputStream(), typeReference);
		} catch (IOException e) {
			LOG.error("Error while loading resource: " + resourceName, e);
		}
		return Collections.emptyList();
	}
}
 