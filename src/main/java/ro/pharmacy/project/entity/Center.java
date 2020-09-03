package ro.pharmacy.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

@Entity
public class Center extends BaseEntity {
	private static final long serialVersionUID = 4814345140153255243L;
	
	@Column(name = "EMAIL", nullable = false, length = 64)
	@Email
	@Length(min = 0, max = 64)
	private String email;
	
	@Column(name = "PHONE", nullable = false, length = 12)
	@Length(min = 0, max = 12)
	private String phone;
	
	@Column(name = "CITY", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String city;
	
	@Column(name = "COUNTY", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String county;
	
	@Column(name = "STREET", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String street;
	
	@Column(name = "POSTAL_CODE", nullable = false, length = 6)
	@Length(min = 0, max = 6)
	private String postalCode;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "pharmacy_id")
	private Pharmacy pharmacy;
	
	public Center() {
		super();
	}

	public Center(@Email @Length(min = 0, max = 64) String email, @Length(min = 0, max = 10) String phone,
			@Length(min = 0, max = 64) String city, @Length(min = 0, max = 64) String county,
			@Length(min = 0, max = 64) String street, @Length(min = 0, max = 10) String postalCode, 
			Pharmacy pharmacy) {
		super();
		this.email = email;
		this.phone = phone;
		this.city = city;
		this.county = county;
		this.street = street;
		this.postalCode = postalCode;
		this.pharmacy = pharmacy;
	}

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
	
	public Pharmacy getPharmacy() {
		return pharmacy;
	}

	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
}
