package ro.pharmacy.project.config;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:database.properties")
public class DatabaseConfiguration {
	private static final String PACKAGES_TO_SCAN = "ro.pharmacy.project.entity";
	
	@Autowired
	private Environment env;
	
	@Value(value = "${hibernate.show_sql}")
	private String hibernateShowSql;
	
	@Bean
	public DataSource dataSource() {
		HikariDataSource dataSource = new HikariDataSource();
		dataSource.setJdbcUrl(env.getRequiredProperty("database.url"));
		dataSource.setUsername(env.getRequiredProperty("database.username"));
		dataSource.setPassword(env.getRequiredProperty("database.password"));
		return dataSource;
	}
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
		LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
		emf.setDataSource(dataSource);
		emf.setPackagesToScan(PACKAGES_TO_SCAN);
		
		HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
		emf.setJpaVendorAdapter(adapter);
		
		Map<String, Object> hibernateProperties = new HashMap<>();
		hibernateProperties.put("hibernate.hbm2ddl.auto", env.getRequiredProperty("hibernate.ddl-auto"));
		hibernateProperties.put("hibernate.dialect", env.getRequiredProperty("hibernate.dialect"));
		hibernateProperties.put("hibernate.show_sql", hibernateShowSql);
		emf.setJpaPropertyMap(hibernateProperties);
		return emf;
	}
	
	@Bean
	public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
		return new JpaTransactionManager(emf);
	}
	
	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}
}
