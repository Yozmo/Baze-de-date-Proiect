package ro.pharmacy.project.config.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import ro.pharmacy.project.config.security.encoder.DigestPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.headers().frameOptions().sameOrigin();
		http.authorizeRequests().antMatchers("/swagger-ui.html", "/v2/api-docs", "/webjars/springfox-swagger-ui/**",
				"/swagger-resources/**", "/assets/i18n/login/**").permitAll();
		http.authorizeRequests().anyRequest().authenticated();
		http.httpBasic().disable();
		http.cors();
		http.csrf().disable();
	}
	
	@Bean
	@SuppressWarnings("deprecation")
	public PasswordEncoder passwordEncoder() {
		String encodingId = "sha256";
		Map<String, PasswordEncoder> encoders = new HashMap<>();
		encoders.put(encodingId, new DigestPasswordEncoder());
		encoders.put("noop", org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance());
		DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder(encodingId, encoders);
		passwordEncoder.setDefaultPasswordEncoderForMatches(new DigestPasswordEncoder());
		return passwordEncoder;
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterBean() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}


}
