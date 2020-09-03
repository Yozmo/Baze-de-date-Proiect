package ro.pharmacy.project.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class SupplierDrugId implements Serializable {
	private static final long serialVersionUID = 8630487014282566702L;
	
	@Column(name = "supplier_id")
	private Long supplierId;
	
	@Column(name = "drug_id")
	private Long drugId;

	public SupplierDrugId() {
		super();
	}

	public SupplierDrugId(Long supplierId, Long drugId) {
		super();
		this.supplierId = supplierId;
		this.drugId = drugId;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public Long getDrugId() {
		return drugId;
	}

	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		
		SupplierDrugId that = (SupplierDrugId) o;
		return Objects.equals(supplierId, that.supplierId) &&
				Objects.equals(drugId, that.drugId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(supplierId, drugId);
	}
	
}
