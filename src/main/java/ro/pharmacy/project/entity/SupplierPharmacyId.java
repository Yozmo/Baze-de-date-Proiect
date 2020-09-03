package ro.pharmacy.project.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class SupplierPharmacyId implements Serializable {
	private static final long serialVersionUID = -5484603843932644305L;
	
	@Column(name = "supplier_id")
	private Long supplierId;
	
	@Column(name = "pharmacy_id")
	private Long pharmacyId;

	public SupplierPharmacyId() {
		super();
	}

	public SupplierPharmacyId(Long supplierId, Long pharmacyId) {
		super();
		this.supplierId = supplierId;
		this.pharmacyId = pharmacyId;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public Long getPharmacyId() {
		return pharmacyId;
	}

	public void setPharmacyId(Long pharmacyId) {
		this.pharmacyId = pharmacyId;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		
		SupplierPharmacyId that = (SupplierPharmacyId) o;
		return Objects.equals(supplierId, that.supplierId) &&
			   Objects.equals(pharmacyId, that.pharmacyId);
	}
	
	@Override 
	public int hashCode() {
		return Objects.hash(supplierId, pharmacyId);
	}
}
