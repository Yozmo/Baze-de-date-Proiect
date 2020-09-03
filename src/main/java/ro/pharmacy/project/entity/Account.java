package ro.pharmacy.project.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Email;

@Entity
public class Account extends BaseEntity{
	private static final long serialVersionUID = -2139614064471755049L;
	
	@Column(name = "EMAIL", unique = true, nullable = false)
	@Email
	private String email;
	
	@Column(name = "PASSWORD", nullable = false, length = 64)
	private String password;
	
	@Column(name = "NAME", nullable = false, length = 64)
	private String name;
	
	@Column(name = "ROLES")
	private String[] roles;

	@Column(name = "LAST_LOGIN_ON")
	private LocalDateTime lastLoginOn = LocalDateTime.now();

	@Column(name = "COUNTRY", nullable = false, length = 64)
	private String country;
	
	@Column(name = "COUNTY", nullable = false, length = 64)
	private String county;
	
	@Column(name = "PROFILE_PICTURE")
	private String profilePicture;

	
	public Account() {
		super();
	}

	public Account(@Email String email, String password, String name, String[] roles,
			String country, String county, String profilePicture) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.roles = roles;
		this.country = country;
		this.county = county;
		this.profilePicture = profilePicture;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String[] getRoles() {
		return roles;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}

	public LocalDateTime getLastLoginOn() {
		return lastLoginOn;
	}

	public void setLastLoginOn(LocalDateTime lastLoginOn) {
		this.lastLoginOn = lastLoginOn;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}
	
}
