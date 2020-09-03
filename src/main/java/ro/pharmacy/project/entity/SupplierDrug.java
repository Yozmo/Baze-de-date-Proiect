package ro.pharmacy.project.entity;

import java.math.BigDecimal;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity(name = "SupplierDrug")
@Table(name = "supplier_drug")
public class SupplierDrug {
	
	@EmbeddedId
	private SupplierDrugId id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("supplierId")
	private Supplier supplier;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("drugId")
	private Drug drug;
	
	@Column(name = "PRICE")
	private BigDecimal price;
	
	public SupplierDrug() {
		super();
	}

	public SupplierDrug(Supplier supplier, Drug drug) {
		super();
		this.supplier = supplier;
		this.drug = drug;
		this.id = new SupplierDrugId(supplier.getId(), drug.getId());
	}

	public SupplierDrugId getId() {
		return id;
	}

	public void setId(SupplierDrugId id) {
		this.id = id;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Drug getDrug() {
		return drug;
	}

	public void setDrug(Drug drug) {
		this.drug = drug;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		
		SupplierDrug that = (SupplierDrug) o;
		return Objects.equals(supplier, that.supplier) &&
			   Objects.equals(drug, that.drug);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(supplier, drug);
	}	
}
