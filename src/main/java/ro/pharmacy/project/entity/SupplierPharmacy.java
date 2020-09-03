package ro.pharmacy.project.entity;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "SupplierPharmacy")
@Table(name = "supplier_pharmacy")
public class SupplierPharmacy {
	
	@EmbeddedId
	private SupplierPharmacyId id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("supplierId")
	@JsonIgnore
	private Supplier supplier;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("pharmacyId")
	@JsonIgnore
	private Pharmacy pharmacy;
	
	
	@Column(name = "CONTRACT_VALABILITY")
	private LocalDate contractValability;
	
	@Column(name = "DATE_OF_MAKING")
	private LocalDate dateOfMaking;
	
	public SupplierPharmacy() {
		super();
	}

	public SupplierPharmacy(Supplier supplier, Pharmacy pharmacy) {
		super();
		this.supplier = supplier;
		this.pharmacy = pharmacy;
		this.id = new SupplierPharmacyId(supplier.getId(), pharmacy.getId());
		this.contractValability = LocalDate.now().plusYears(3);
		this.dateOfMaking = LocalDate.now();
	}

	public SupplierPharmacyId getId() {
		return id;
	}

	public void setId(SupplierPharmacyId id) {
		this.id = id;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Pharmacy getPharmacy() {
		return pharmacy;
	}

	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}

	public LocalDate getContractValability() {
		return contractValability;
	}

	public void setContractValability(LocalDate contractValability) {
		this.contractValability = contractValability;
	}

	public LocalDate getDateOfMaking() {
		return dateOfMaking;
	}

	public void setDateOfMaking(LocalDate dateOfMaking) {
		this.dateOfMaking = dateOfMaking;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		
		SupplierPharmacy that = (SupplierPharmacy) o;
		return Objects.equals(supplier, that.supplier) &&
			   Objects.equals(pharmacy, that.pharmacy);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(supplier, pharmacy);
	}
	
}
