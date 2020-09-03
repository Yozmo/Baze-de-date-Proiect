package ro.pharmacy.project.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

@Entity
public class Supplier extends BaseEntity {
	private static final long serialVersionUID = 7729735221501649159L;
	
	@Column(name = "NAME", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String name;
	
	@Column(name = "PHONE", nullable = false, length = 12)
	@Length(min = 0, max = 12)
	private String phone;
	
	@Column(name = "EMAIL", nullable = false, length = 64, unique = true)
	@Email
	@Length(min = 0, max = 64)
	private String email;
	
	@Column(name = "COUNTRY", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String country;
	
	@Column(name = "CITY", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String city;
	
	@Column(name = "COUNTY", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String county;
	
	@Column(name = "STREET", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String street; 
	
	
	@OneToMany(
			mappedBy = "supplier",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<SupplierDrug> drugs = new ArrayList<>();
	
	
	@OneToMany(
			mappedBy = "supplier",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<SupplierPharmacy> pharmacies = new ArrayList<>();
	

	public Supplier() {
		super();
	}

	public Supplier(@Length(min = 0, max = 64) String name, @Length(min = 0, max = 10) String phone,
			@Email @Length(min = 0, max = 64) String email, @Length(min = 0, max = 64) String country, 
			@Length(min = 0, max = 64) String city, @Length(min = 0, max = 64) String county,
			@Length(min = 0, max = 64) String street) {
		super();
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.country = country;
		this.city = city;
		this.county = county;
		this.street = street;
	}

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

	public void setEmail(String email) {
		this.email = email;
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

	public List<SupplierDrug> getDrugs() {
		return drugs;
	}

	public void setDrugs(List<SupplierDrug> drugs) {
		this.drugs = drugs;
	}

	public void addDrug(Drug drug) {
		SupplierDrug supplierDrug = new SupplierDrug(this, drug);
		drugs.add(supplierDrug);
		drug.getSuppliers().add(supplierDrug);
		
	}
		
	public List<SupplierPharmacy> getPharmacies() {
		return pharmacies;
	}

	public void setPharmacies(List<SupplierPharmacy> pharmacies) {
		this.pharmacies = pharmacies;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		
		if (o == null || getClass() != o.getClass()) return false;
		
		Supplier supplier = (Supplier) o;
		return Objects.equals(name, supplier.getName());
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(name);
	}
}
