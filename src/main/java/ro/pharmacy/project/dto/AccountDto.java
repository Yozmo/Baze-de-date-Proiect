package ro.pharmacy.project.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;

@ApiModel("Account")
public class AccountDto extends BaseDto{
	private static final long serialVersionUID = -2123596604709384538L;
	
	@NotNull
	private String email;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String password;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String name;
	
	private String[] roles;
	
	@NotNull
	private String country;
	
	@NotNull
	private String county;
	
	private String profilePicture;

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
