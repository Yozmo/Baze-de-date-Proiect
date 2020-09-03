package ro.pharmacy.project.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;

@ApiModel("Center")
public class CenterDto extends BaseDto {
	private static final long serialVersionUID = 5560655864371589116L;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String email;
	
	@NotNull
	@Size(min = 0, max = 12)
	private String phone;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String city;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String county;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String street;
	
	@NotNull
	@Size(min = 0, max = 6)
	private String postalCode;
	
	@NotNull
	@Positive
	private Long pharmacyId;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}
	
	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	
	public Long getPharmacyId() {
		return pharmacyId;
	}

	public void setPharmacyId(Long pharmacyId) {
		this.pharmacyId = pharmacyId;
	}
}
