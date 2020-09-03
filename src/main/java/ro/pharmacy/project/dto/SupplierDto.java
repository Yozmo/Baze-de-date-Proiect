package ro.pharmacy.project.dto;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;

@ApiModel("Supplier")
public class SupplierDto extends BaseDto {
	private static final long serialVersionUID = 4937258314890881931L;

	@NotNull
	@Size(min = 0, max = 64)
	private String name;

	@NotNull
	@Size(min = 0, max = 12)
	private String phone;

	@NotNull
	@Size(min = 0, max = 64)
	private String email;
	
	@NotNull
	@Size(min = 0, max = 64)
	private String country;
	
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
	@Size(min = 0, max = 64)
	private List<Long> drugIds;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}
	
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Long> getDrugIds() {
		return drugIds;
	}

	public void setDrugIds(List<Long> drugIds) {
		this.drugIds = drugIds;
	}

	@Override
	public String toString() {
		return "SupplierDto [name=" + name + ", phone=" + phone + ", email=" + email + ", drugIds=" + drugIds + "]";
	}

}
