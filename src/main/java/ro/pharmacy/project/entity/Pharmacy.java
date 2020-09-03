package ro.pharmacy.project.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.Length;

@Entity
public class Pharmacy extends BaseEntity {
	private static final long serialVersionUID = 4684872490981267957L;
	
	@Column(name = "NAME", nullable = false, length = 64)
	@Length(min = 0, max = 64)
	private String name;
	
	@Column(name = "PHARMACY_TYPE", length = 64)
	@Enumerated(EnumType.STRING)
	private PharmacyType pharmacyType;
	
	@OneToMany(
			mappedBy = "pharmacy",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<SupplierPharmacy> suppliers = new ArrayList<>();
	
	public Pharmacy() {
		super();
	}

	public Pharmacy(@Length(min = 0, max = 64) String name, PharmacyType pharmacyType) {
		super();
		this.name = name;
		this.pharmacyType = pharmacyType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PharmacyType getPharmacyType() {
		return pharmacyType;
	}

	public void setPharmacyType(PharmacyType pharmacyType) {
		this.pharmacyType = pharmacyType;
	}

	public List<SupplierPharmacy> getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(List<SupplierPharmacy> suppliers) {
		this.suppliers = suppliers;
	}
	
	public void addSupplier(Supplier supplier) {
		SupplierPharmacy supplierPharmacy = new SupplierPharmacy(supplier, this);
		suppliers.add(supplierPharmacy);
		supplier.getPharmacies().add(supplierPharmacy);
	}
	
	@Override 
	public boolean equals (Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		
		Pharmacy pharmacy = (Pharmacy) o;
		return Objects.equals(name, pharmacy.getName());
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(name);
	}

}
